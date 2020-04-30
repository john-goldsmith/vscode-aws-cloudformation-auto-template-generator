const vscode = require('vscode')

const pkg = require('../package.json')
const { EXTENSION_NAME, REGION_CONFIGURATION_PROPERTY } = require('../config')

const { window, workspace } = vscode
const { showQuickPick, setStatusBarMessage, showErrorMessage } = window
const { getConfiguration } = workspace

/**
 * Prompts the user to select an AWS region to use when making API calls
 * (a required field). This is useful if the user wants to manually
 * override the region present in the config file, or in the event that
 * the config file omits a region.
 *
 * Although it's possible to programmatically get EC2 regions via
 * the SDK (`new AWS.EC2().describeRegions()`), it's not being done
 * here because a cyclical dependency occurs: a region is needed
 * to query all regions.
 *
 * The values are imported from the `package.json`
 * file (since that's where settings are defined), and that list
 * should be audited from time to time as more regions become
 * available.
 *
 * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions
 * @return {Function<Promise<undefined>>}
 */
function setRegion() {
  return async () => {
    try {
      const {
        enum: regionValues,
        enumDescriptions: regionLabels
      } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${REGION_CONFIGURATION_PROPERTY}`]
      const options = regionValues.map((value, index) => ({label: `${regionLabels[index]} (${value})`, value}))
      const selectedRegion = await showQuickPick(options)
      if (!selectedRegion) return // Esc
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      await workspaceConfiguration.update(REGION_CONFIGURATION_PROPERTY, selectedRegion.value)
      setStatusBarMessage(`Region set to '${selectedRegion.value}'`, 3000)
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}

module.exports = setRegion
