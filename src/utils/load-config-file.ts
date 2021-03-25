import { window } from 'vscode'
import { join } from 'path'

import fileExists from './file-exists'
import getHomeDir from './get-home-dir'
import readFileAsString from './read-file-as-string'
import parseIni, { ParsedIniData } from './parse-ini'
import normalizeConfigFile from './normalize-config-file'

/**
 * Attempts to load an AWS config file at the provided location.
 *
 * @async
 * @param {string} configFilePath
 * @return {Promise<Object>}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/credentials/credentialsFile.ts#L61-L72
 */
export default async function loadConfigFile(configFilePath: string): Promise<ParsedIniData> {
  if (!configFilePath) {
    configFilePath = join(getHomeDir(), '.aws', 'config')
  }

  if (!(await fileExists(configFilePath))) {
    window.showErrorMessage(`No configuration file found at ${configFilePath}`)
    return {}
  }

  return normalizeConfigFile(parseIni(await readFileAsString(configFilePath)))
}
