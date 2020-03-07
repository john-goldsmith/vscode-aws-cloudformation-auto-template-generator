/**
 * @module commands/insert-resource
 */

const vscode = require('vscode')
const AWS = require('aws-sdk')
const { promisify } = require('util')
const yaml = require('js-yaml')

const pkg = require('../package.json')
const {
  PUBLIC_TYPE_LIST_CACHE_KEY,
  PUBLIC_TYPE_CACHE_KEY,
  PRIVATE_TYPE_LIST_CACHE_KEY,
  PRIVATE_TYPE_CACHE_KEY
} = require('../cache-keys')
const {
  isFormatJson,
  isVisibilityPublic,
  isExpired,
  isValidTemplateFormat,
  getTemplate,
  getAllTypes
} = require('../utils')
const {
  EXTENSION_NAME,
  PROFILE_CONFIGURATION_PROPERTY,
  REGION_CONFIGURATION_PROPERTY,
  RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY,
  TEMPLATE_FORMAT_CONFIGURATION_PROPERTY,
  PUBLIC_TYPE_LIST_CACHE_TTL_DAYS,
  PUBLIC_TYPE_CACHE_TTL_DAYS,
  PRIVATE_TYPE_LIST_CACHE_TTL_DAYS,
  PRIVATE_TYPE_CACHE_TTL_DAYS
} = require('../config')
const {
  NoActiveTextEditorError,
  AccessKeyIdMissingError,
  SecretAccessKeyMissingError
} = require('../errors')

const { CloudFormation } = AWS
const {
  window,
  workspace,
  ProgressLocation,
  Position,
  Selection
} = vscode
const {
  withProgress,
  setStatusBarMessage,
  showQuickPick,
  showErrorMessage
} = window
const { getConfiguration } = workspace

/**
 * Inserts a fully-expanded CloudFormation resource template into the
 * currently active text editor. The format of the template will first
 * attempt to match the file mode (language ID) of the text editor
 * (detecting either JSON or YAML), otherwise deferring the user's
 * preferred setting.
 *
 * @param {vscode.ExtensionContext} context
 * @return {Function<Promise<undefined>>}
 */
function insertResource(context) {
  return async () => {
    try {
      const { activeTextEditor } = window
      if (!activeTextEditor) throw new NoActiveTextEditorError()
      const { workspaceState } = context
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      const editorWorkspaceConfiguration = getConfiguration('editor')

      const editorTabSize = editorWorkspaceConfiguration.get('tabSize')
      const { default: defaultProfile } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${PROFILE_CONFIGURATION_PROPERTY}`]
      const profile = await workspaceConfiguration.get(PROFILE_CONFIGURATION_PROPERTY, defaultProfile)
      // if (!awsProfile) {
      //   await vscode.commands.executeCommand('extension.setProfile')
      // }
      const { default: defaultRegion } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${REGION_CONFIGURATION_PROPERTY}`]
      const region = await workspaceConfiguration.get(REGION_CONFIGURATION_PROPERTY, defaultRegion)
      // if (!awsRegion) {
      //   await vscode.commands.executeCommand('extension.setRegion')
      // }
      const creds = new AWS.SharedIniFileCredentials({profile})
      const { accessKeyId, secretAccessKey } = creds
      if (!accessKeyId) throw new AccessKeyIdMissingError()
      if (!secretAccessKey) throw new SecretAccessKeyMissingError()
      const cloudformation = new CloudFormation({
        accessKeyId,
        secretAccessKey,
        region
      })

      const now = Date.now()
      const { default: defaultResourceVisibility } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY}`]
      const visibility = await workspaceConfiguration.get(RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY, defaultResourceVisibility)
      const typeListCacheKey = isVisibilityPublic(visibility)
        ? PUBLIC_TYPE_LIST_CACHE_KEY
        : PRIVATE_TYPE_LIST_CACHE_KEY
      const typeListCacheTtlDays = isVisibilityPublic(visibility)
        ? PUBLIC_TYPE_LIST_CACHE_TTL_DAYS
        : PRIVATE_TYPE_LIST_CACHE_TTL_DAYS
      let types = []
      let typeListCache = await workspaceState.get(typeListCacheKey, {updatedAt: 0})
      const typeListExpiration = new Date(typeListCache.updatedAt)
      const isTypesCacheExpired = isExpired(now, typeListExpiration, typeListCacheTtlDays)
      if (isTypesCacheExpired) {
        types = await withProgress({
          location: ProgressLocation.Notification,
          title: `Fetching all ${visibility.toLowerCase()} resources...`
        }, () => getAllTypes(cloudformation, visibility))
        setStatusBarMessage(`Fetched ${types.length} resources`, 3000)
        await workspaceState.update(typeListCacheKey, {
          updatedAt: now,
          typeSummaries: types
        })
      } else {
        types = typeListCache.typeSummaries
      }

      const options = types.map(type => ({label: type.TypeName, value: type.TypeName}))
      const selectedTypeName = await showQuickPick(options)
      if (!selectedTypeName) return // Esc

      const describeTypeParams = {
        Type: 'RESOURCE',
        TypeName: selectedTypeName.value
        // VersionId
      }

      let type = {}
      const typeCacheKey = isVisibilityPublic(visibility)
        ? PUBLIC_TYPE_CACHE_KEY
        : PRIVATE_TYPE_CACHE_KEY
      const typeCacheTtlDays = isVisibilityPublic(visibility)
        ? PUBLIC_TYPE_CACHE_TTL_DAYS
        : PRIVATE_TYPE_CACHE_TTL_DAYS
      const typeCache = await workspaceState.get(typeCacheKey, {})
      const selectedTypeCache = typeCache[selectedTypeName.value] || {updatedAt: 0}
      const selectedTypeExpiration = new Date(selectedTypeCache.updatedAt)
      const isSelectedTypeCacheExpired = isExpired(now, selectedTypeExpiration, typeCacheTtlDays)
      if (isSelectedTypeCacheExpired) {
        const describeType = promisify(cloudformation.describeType.bind(cloudformation))
        const describeTypeResponse = await withProgress({
          location: ProgressLocation.Notification,
          title: `Fetching ${selectedTypeName.value}...`
        }, () => describeType(describeTypeParams))
        setStatusBarMessage(`Fetched ${selectedTypeName.value}`, 3000)
        await workspaceState.update(typeCacheKey, {
          ...typeCache,
          [selectedTypeName.value]: {
            updatedAt: now,
            data: describeTypeResponse
          }
        })
        type = {
          updatedAt: now,
          data: describeTypeResponse
        }
      } else {
        type = typeCache[selectedTypeName.value]
      }

      const { default: defaultTemplateFormat } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${TEMPLATE_FORMAT_CONFIGURATION_PROPERTY}`]
      const { languageId } = activeTextEditor.document
      const templateFormat = isValidTemplateFormat(languageId)
        ? languageId
        : await workspaceConfiguration.get(TEMPLATE_FORMAT_CONFIGURATION_PROPERTY, defaultTemplateFormat)
      const schema = JSON.parse(type.data.Schema)
      const { line, character } = activeTextEditor.selection.active
      const position = new Position(line, character)
      const logicalId = `My${schema.typeName.replace(/::/g, '')}`
      const template = getTemplate(schema)
      const value = isFormatJson(templateFormat)
        ? JSON.stringify(template, null, editorTabSize)
        : yaml.safeDump(template, {indent: editorTabSize})

      await activeTextEditor.edit(textEditorEdit => textEditorEdit.insert(position, value))

      /**
       * The following automatically highlights the logical ID for easy
       * editing. The expression 'line + 1' accounts for the opening curly
       * brace found in JSON '{'. The expression 'editorTabSize + 1'
       * accounts for the opening double quotes '"' of the first property
       * found in JSON.
       */
      const selection = isFormatJson(templateFormat)
        ? new Selection(new Position(line + 1, editorTabSize + 1), new Position(line + 1, editorTabSize + 1 + logicalId.length))
        : new Selection(new Position(line, character), new Position(line, logicalId.length))
      activeTextEditor.selection = selection
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}

module.exports = insertResource
