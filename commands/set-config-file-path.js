/**
 * @module commands/set-config-file-path
 */

const vscode = require('vscode')

const {
  fileExists,
  normalizeConfigFile,
  parseIni,
  readFileAsString
} = require('../utils')
const {
  EXTENSION_NAME,
  CONFIG_FILE_PATH_CONFIGURATION_PROPERTY,
  DEFAULT_CONFIG_FILE_PATH
} = require('../config')
const {
  NonexistentConfigFileError,
  NoConfigProfilesError
} = require('../errors')

const { workspace, window, commands } = vscode
const { getConfiguration } = workspace
const { setStatusBarMessage, showErrorMessage, showInputBox } = window
const { executeCommand } = commands

/**
 * Prompts the user for the absolute location of an AWS configuration
 * file. This command will:
 *
 *   1. Validate the files existence.
 *   2. Validate that the file has at least one named profile.
 *   3. Update the workspace configuration.
 *   4. Show a success message upon successful update.
 *   5. Prompt the user to select a named profile from the file.
 *
 * @see https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
 * @return {Function<Promise<undefined>>}
 */
function setConfigFilePath() {
  return async () => {
    try {
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      let configFilePath = await workspaceConfiguration.get(CONFIG_FILE_PATH_CONFIGURATION_PROPERTY)
      if (!configFilePath) {
        configFilePath = DEFAULT_CONFIG_FILE_PATH
      }
      const inputBoxOptions = {
        prompt: 'Absolute path to your AWS configuration file',
        value: configFilePath,
        valueSelection: undefined // Selects all text
      }
      const path = await showInputBox(inputBoxOptions)
      if (!path || path === '') return // Esc or Enter with no value
      const exists = await fileExists(path)
      if (!exists) throw new NonexistentConfigFileError(path)
      const file = await readFileAsString(path)
      const parsedIni = parseIni(file)
      const normalizedConfigFile = normalizeConfigFile(parsedIni)
      const profiles = Object.keys(normalizedConfigFile)
      if (!profiles.length) throw new NoConfigProfilesError(path)
      await workspaceConfiguration.update(CONFIG_FILE_PATH_CONFIGURATION_PROPERTY, path)
      setStatusBarMessage(`Configuration file set to '${path}'`, 4000)
      await executeCommand('extension.setProfile')
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}

module.exports = setConfigFilePath
