const { access } = require('fs-extra')

/**
 * Checks if a file exists at the provided file path location.
 *
 * @async
 * @param {string} filePath
 * @return {Promise<boolean>}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/filesystemUtilities.ts#L19-L27
 */
async function fileExists(filePath) {
  try {
    await access(filePath)
  } catch (err) {
    return false
  }
  return true
}

module.exports = fileExists
