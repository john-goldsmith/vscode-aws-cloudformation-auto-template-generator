import { window, workspace, ProgressLocation, Position, Selection, ExtensionContext } from 'vscode'
import { CloudFormation, SharedIniFileCredentials } from 'aws-sdk'
import { promisify } from 'util'
import yaml from 'js-yaml'

import pkg from '../../package.json'
import StateKeys from '../cache-keys'
import {
  isFormatJson,
  isVisibilityPublic,
  isExpired,
  isValidFormat,
  getTemplate,
  getAllTypes,
  getLogicalId
} from '../utils'
import {
  EXTENSION_NAME,
  PROFILE_CONFIGURATION_PROPERTY,
  REGION_CONFIGURATION_PROPERTY,
  RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY,
  TEMPLATE_FORMAT_CONFIGURATION_PROPERTY,
  PUBLIC_TYPE_LIST_CACHE_TTL_DAYS,
  PUBLIC_TYPE_CACHE_TTL_DAYS,
  PRIVATE_TYPE_LIST_CACHE_TTL_DAYS,
  PRIVATE_TYPE_CACHE_TTL_DAYS
} from '../config'
import {
  NoActiveTextEditorError,
  AccessKeyIdMissingError,
  SecretAccessKeyMissingError
} from '../errors'
import { ResourceTypeSchema } from '../utils/get-template'

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
 * @param {ExtensionContext} context
 * @return {Function<Promise<undefined>>}
 * @throws {NoActiveTextEditorError}
 * @throws {AccessKeyIdMissingError}
 * @throws {SecretAccessKeyMissingError}
 */
export default function insertResource(context: ExtensionContext) {
  return async (): Promise<void> => {
    try {
      const { activeTextEditor } = window
      if (!activeTextEditor) throw new NoActiveTextEditorError()
      const { workspaceState } = context
      const configuration = getConfiguration()

      const editorTabSize = configuration.get<number>('editor.tabSize', 2)

      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { default: defaultProfile }: { default: string } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${PROFILE_CONFIGURATION_PROPERTY}`]
      const profile = await configuration.get(`${EXTENSION_NAME}.${PROFILE_CONFIGURATION_PROPERTY}`, defaultProfile)
      // if (!profile) {
      //   await executeCommand('extension.setProfile')
      // }

      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { default: defaultRegion }: { default: string } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${REGION_CONFIGURATION_PROPERTY}`]
      const region = await configuration.get(`${EXTENSION_NAME}.${REGION_CONFIGURATION_PROPERTY}`, defaultRegion)
      // if (!region) {
      //   await executeCommand('extension.setRegion')
      // }

      const creds = new SharedIniFileCredentials({profile})
      const { accessKeyId, secretAccessKey } = creds
      if (!accessKeyId) throw new AccessKeyIdMissingError()
      if (!secretAccessKey) throw new SecretAccessKeyMissingError()
      const cloudformation = new CloudFormation({
        accessKeyId,
        secretAccessKey,
        region
      })

      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { default: defaultResourceVisibility }: { default: string } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY}`]
      const visibility = await configuration.get(`${EXTENSION_NAME}.${RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY}`, defaultResourceVisibility)
      const isPublic = isVisibilityPublic(visibility)
      const typeListCacheKey = isPublic
        ? StateKeys.PUBLIC_TYPE_LIST_CACHE_KEY
        : StateKeys.PRIVATE_TYPE_LIST_CACHE_KEY
      const typeListCacheTtlDays = isPublic
        ? PUBLIC_TYPE_LIST_CACHE_TTL_DAYS
        : PRIVATE_TYPE_LIST_CACHE_TTL_DAYS
      let types: CloudFormation.TypeSummaries = []
      const typeListCache = await workspaceState.get(typeListCacheKey, { updatedAt: 0, typeSummaries: [] })
      const isTypesCacheExpired = isExpired(typeListCache.updatedAt, typeListCacheTtlDays)
      if (isTypesCacheExpired) {
        types = await withProgress({
          location: ProgressLocation.Notification,
          title: `Fetching all ${visibility.toLowerCase()} resources...`
        }, () => getAllTypes(cloudformation, visibility))
        setStatusBarMessage(`Fetched ${types.length} resources`, 3000)
        await workspaceState.update(typeListCacheKey, {
          updatedAt: Date.now(),
          typeSummaries: types
        })
      } else {
        types = typeListCache.typeSummaries
      }
      const options = types.map(type => ({ label: type.TypeName as string, value: type.TypeName as string }))
      const selectedTypeName = await showQuickPick(options)
      if (!selectedTypeName) return // Esc

      let type: {
        updatedAt?: number,
        data: CloudFormation.DescribeTypeOutput
      } = {
        data: {}
      }
      const typeCacheKey = isPublic
        ? StateKeys.PUBLIC_TYPE_CACHE_KEY
        : StateKeys.PRIVATE_TYPE_CACHE_KEY
      const typeCacheTtlDays = isPublic
        ? PUBLIC_TYPE_CACHE_TTL_DAYS
        : PRIVATE_TYPE_CACHE_TTL_DAYS
      const typeCache: Record<string, { updatedAt: number, data: CloudFormation.DescribeTypeOutput }> = await workspaceState.get(typeCacheKey, {})
      const selectedTypeCache = typeCache[selectedTypeName.value] || { updatedAt: 0, data: {} }
      const isSelectedTypeCacheExpired = isExpired(selectedTypeCache.updatedAt, typeCacheTtlDays)
      if (isSelectedTypeCacheExpired) {
        const describeType = promisify<CloudFormation.DescribeTypeInput, CloudFormation.DescribeTypeOutput>(cloudformation.describeType.bind(cloudformation))
        const describeTypeResponse = await withProgress({
          location: ProgressLocation.Notification,
          title: `Fetching ${selectedTypeName.value}...`
        }, () => {
          const describeTypeParams: CloudFormation.DescribeTypeInput = {
            Type: 'RESOURCE',
            TypeName: selectedTypeName.value
            // TODO: Implement `VersionId`
          }
          return describeType(describeTypeParams)
        })
        setStatusBarMessage(`Fetched ${selectedTypeName.value}`, 3000)
        await workspaceState.update(typeCacheKey, {
          ...typeCache,
          [selectedTypeName.value]: {
            updatedAt: Date.now(),
            data: describeTypeResponse
          }
        })
        type = {
          updatedAt: Date.now(),
          data: describeTypeResponse
        }
      } else {
        type = typeCache[selectedTypeName.value]
      }

      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { default: defaultTemplateFormat }: { default: string } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${TEMPLATE_FORMAT_CONFIGURATION_PROPERTY}`]
      const { languageId } = activeTextEditor.document
      const templateFormat = isValidFormat(languageId)
        ? languageId
        : await configuration.get(`${EXTENSION_NAME}.${TEMPLATE_FORMAT_CONFIGURATION_PROPERTY}`, defaultTemplateFormat)
      // TODO: if (type.data.Schema) {...}
      const schema: ResourceTypeSchema = JSON.parse(type.data.Schema as string)
      const { line, character } = activeTextEditor.selection.active
      const position = new Position(line, character)
      const logicalId = getLogicalId(schema.typeName)
      const template = getTemplate(schema, logicalId)
      const isJson = isFormatJson(templateFormat)
      const value = isJson
        ? JSON.stringify(template, null, editorTabSize)
        : yaml.dump(template, {indent: editorTabSize})

      await activeTextEditor.edit(textEditorEdit => textEditorEdit.insert(position, value))

      /**
       * @ignore
       * The following automatically highlights the logical ID for easy
       * editing. The expression `line + 1` accounts for the opening curly
       * brace `{` found in JSON. The expression `editorTabSize + 1`
       * accounts for the opening double quotes `"` of the first property
       * found in JSON.
       */
      const [anchorLine, anchorCharacter, activeLine, activeCharacter] = isJson
        ? [line + 1, editorTabSize + 1, line + 1, editorTabSize + 1 + logicalId.length]
        : [line, character, line, logicalId.length]
      const selection = new Selection(anchorLine, anchorCharacter, activeLine, activeCharacter)
      activeTextEditor.selection = selection
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}
