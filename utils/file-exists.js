/**
 * @module utils/file-exists
 */

const { access } = require('fs-extra')

// See https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/filesystemUtilities.ts#L19-L27
async function fileExists(filePath) {
  try {
    await access(filePath)
  } catch (err) {
    return false
  }
  return true
}

module.exports = fileExists
