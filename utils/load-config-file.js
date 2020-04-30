const vscode = require('vscode')
const { join } = require('path')

const fileExists = require('./file-exists')
const getHomeDir = require('./get-home-dir')
const readFileAsString = require('./read-file-as-string')
const parseIni = require('./parse-ini')
const normalizeConfigFile = require('./normalize-config-file')

/**
 * Attempts to load an AWS config file at the provided location.
 *
 * @async
 * @param {string} configFilePath
 * @return {Promise<Object>}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/credentials/credentialsFile.ts#L61-L72
 */
async function loadConfigFile(configFilePath) {
  if (!configFilePath) {
    configFilePath = join(getHomeDir(), '.aws', 'config')
  }

  if (!(await fileExists(configFilePath))) {
    vscode.window.showErrorMessage(`No configuration file found at ${configFilePath}`)
    return {}
  }

  return normalizeConfigFile(parseIni(await readFileAsString(configFilePath)))
}

module.exports = loadConfigFile
