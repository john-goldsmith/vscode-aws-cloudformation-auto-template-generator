/**
 * @module utils/read-file-as-string
 */

const { readFile } = require('fs-extra')

const DEFAULT_ENCODING = 'utf8'

// See https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/filesystemUtilities.ts#L29-L42
async function readFileAsString(pathLike, options = { encoding: DEFAULT_ENCODING }) {
  return readFile(pathLike, options)
}

module.exports = readFileAsString
