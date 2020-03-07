/**
 * @module utils/get-home-dir
 */

const { homedir } = require('os')
const { sep } = require('path')

// See https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/credentials/credentialsFile.ts#L147-L162
function getHomeDir() {
  const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${sep}` } = process.env

  if (HOME) {
    return HOME
  }
  if (USERPROFILE) {
    return USERPROFILE
  }
  if (HOMEPATH) {
    return `${HOMEDRIVE}${HOMEPATH}`
  }

  return homedir()
}

module.exports = getHomeDir
