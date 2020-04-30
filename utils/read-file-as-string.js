const { readFile } = require('fs-extra')

/**
 * @constant {string}
 */
const DEFAULT_ENCODING = 'utf8'

/**
 *
 * @async
 * @param {string} pathLike
 * @param {Object} [options={ encoding: DEFAULT_ENCODING }]
 * @return {Promise<string>}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/filesystemUtilities.ts#L29-L42
 */
async function readFileAsString(pathLike, options = { encoding: DEFAULT_ENCODING }) {
  return readFile(pathLike, options)
}

module.exports = readFileAsString
