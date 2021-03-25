import { window, workspace } from 'vscode'

import * as pkg from '../../package.json'
import { EXTENSION_NAME, TEMPLATE_FORMAT_CONFIGURATION_PROPERTY } from '../config'

const { showQuickPick, setStatusBarMessage, showErrorMessage } = window
const { getConfiguration } = workspace

type Formats = ['json', 'yaml']

/**
 * Prompts the user to select a preferred authoring format (when the current
 * text editor is neither YAML nor JSON). Said differently, the file mode
 * (language ID) of the current text editor takes precedence over this
 * setting.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-formats.html
 * @return {Function<Promise<undefined>>}
 */
export default function setTemplateFormat(): () => Promise<void> {
  return async (): Promise<void> => {
    try {
      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { enum: formatValues }: { enum: Formats } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${TEMPLATE_FORMAT_CONFIGURATION_PROPERTY}`]
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
