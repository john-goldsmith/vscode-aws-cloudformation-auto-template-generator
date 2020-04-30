const vscode = require('vscode')

const {
  EXTENSION_NAME,
  PROFILE_CONFIGURATION_PROPERTY,
  REGION_CONFIGURATION_PROPERTY,
  CONFIG_FILE_PATH_CONFIGURATION_PROPERTY,
  DEFAULT_CONFIG_FILE_PATH
} = require('../config')
const { loadConfigFile } = require('../utils')

const { workspace, window, commands } = vscode
const { getConfiguration } = workspace
const { showQuickPick, setStatusBarMessage, showErrorMessage } = window
const { executeCommand } = commands

/**
 * Prompts the user to select a named profile from the AWS config file.
 * If the selected profile does not include a 'region' value, the user
 * will be prompted to select a region.
 *
 * @see https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
 * @return {Function<Promise<undefined>>}
 */
function setProfile() {
  return async () => {
    try {
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      const configFilePath = await workspaceConfiguration.get(CONFIG_FILE_PATH_CONFIGURATION_PROPERTY, DEFAULT_CONFIG_FILE_PATH)
      const profiles = await loadConfigFile(configFilePath)
      const options = Object.keys(profiles).map(profile => ({label: profile, value: profile}))
      const selectedProfile = await showQuickPick(options)
      if (!selectedProfile) return // Esc
      const profile = profiles[selectedProfile.value]
      await workspaceConfiguration.update(PROFILE_CONFIGURATION_PROPERTY, selectedProfile.value)
      /*
       * TODO: Is the following region check needed? Is it enforced by
       * the AWS CLI?
       */
      if (profile.region) {
        await workspaceConfiguration.update(REGION_CONFIGURATION_PROPERTY, profile.region)
      } else {
        await executeCommand('extension.setRegion')
      }
      setStatusBarMessage(`Profile set to '${selectedProfile.value}'`, 3000)
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}

module.exports = setProfile
