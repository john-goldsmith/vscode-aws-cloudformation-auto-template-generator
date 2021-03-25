import { workspace, window, commands, InputBoxOptions } from 'vscode'

import {
  fileExists,
  normalizeConfigFile,
  parseIni,
  readFileAsString
} from '../utils'
import {
  EXTENSION_NAME,
  CONFIG_FILE_PATH_CONFIGURATION_PROPERTY,
  DEFAULT_CONFIG_FILE_PATH
} from '../config'
import {
  NonexistentConfigFileError,
  NoConfigProfilesError
} from '../errors'

const { getConfiguration } = workspace
const { setStatusBarMessage, showErrorMessage, showInputBox } = window
const { executeCommand } = commands

/**
 * Prompts the user for the absolute location of an AWS configuration
 * file. This command will:
 *
 *   1. Validate the file's existence.
 *   2. Validate that the file has at least one named profile.
 *   3. Update the workspace configuration.
 *   4. Show a success message upon successful update.
 *   5. Prompt the user to select a named profile from the file.
 *
 * @see https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
 * @return {Function<Promise<undefined>>}
 * @throws {NonexistentConfigFileError}
 * @throws {NoConfigProfilesError}
 */
export default function setConfigFilePath() {
  return async (): Promise<void> => {
    try {
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      let configFilePath = await workspaceConfiguration.get<string>(CONFIG_FILE_PATH_CONFIGURATION_PROPERTY)
      if (!configFilePath) {
        configFilePath = DEFAULT_CONFIG_FILE_PATH
      }
      const inputBoxOptions: InputBoxOptions = {
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
