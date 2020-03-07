/**
 * @module commands/set-template-format
 */

const vscode = require('vscode')
const pkg = require('../package.json')

const { EXTENSION_NAME, TEMPLATE_FORMAT_CONFIGURATION_PROPERTY } = require('../config')

const { window, workspace } = vscode
const { showQuickPick, setStatusBarMessage, showErrorMessage } = window
const { getConfiguration } = workspace

/**
 * Prompts the user to select a preferred authoring format (when the current
 * text editor is neither YAML or JSON). Said differently, the file mode
 * (language ID) of the current text editor takes precedence over this
 * setting.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-formats.html
 * @return {Function<Promise<undefined>>}
 */
function setTemplateFormat() {
  return async () => {
    try {
      const {enum: formatValues} = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${TEMPLATE_FORMAT_CONFIGURATION_PROPERTY}`]
      const options = formatValues.map(value => ({label: value.toUpperCase(), value}))
      const selectedTemplateFormat = await showQuickPick(options)
      if (!selectedTemplateFormat) return // Esc
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      await workspaceConfiguration.update(TEMPLATE_FORMAT_CONFIGURATION_PROPERTY, selectedTemplateFormat.value)
      setStatusBarMessage(`Template format set to ${selectedTemplateFormat.value.toUpperCase()}`, 4000)
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}

module.exports = setTemplateFormat
