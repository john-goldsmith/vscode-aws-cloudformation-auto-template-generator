import { window, workspace } from 'vscode'

import pkg from '../../package.json'
import { EXTENSION_NAME, RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY } from '../config'

const { getConfiguration } = workspace
const { showQuickPick, setStatusBarMessage, showErrorMessage } = window

type ResourceVisibilities = ['PUBLIC', 'PRIVATE']

/**
 * Prompts the user to select the CloudFormation resource visibility.
 * The values are imported from the `package.json` file (since that's
 * where settings are defined). Valid values include:
 *
 * `PRIVATE`: The type is only visible and usable within the account in
 *            which it is registered. Currently, AWS CloudFormation marks
 *            any types you create as PRIVATE.
 *
 * `PUBLIC`: The type is publically visible and usable within any Amazon
 *           account.
 *
 * @see https://docs.aws.amazon.com/cli/latest/reference/cloudformation/list-types.html
 * @return {Function<Promise<undefined>>}
 */
export default function setResourceVisibility() {
  return async (): Promise<void> => {
    try {
      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      const { enum: resourceVisibilityValues }: { enum: ResourceVisibilities } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY}`]
      const options = resourceVisibilityValues.map(value => ({label: value, value}))
      const selectedResourceVisibility = await showQuickPick(options)
      if (!selectedResourceVisibility) return // Esc
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      await workspaceConfiguration.update(RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY, selectedResourceVisibility.value)
      setStatusBarMessage(`Visibility set to '${selectedResourceVisibility.value.toLowerCase()}'`, 4000)
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}
