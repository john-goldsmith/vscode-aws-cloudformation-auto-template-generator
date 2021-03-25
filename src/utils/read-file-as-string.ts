import { readFile } from 'fs-extra'

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
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/filesystemUtilities.ts#L41-L54
 */
export default async function readFileAsString(pathLike: string, options = { encoding: DEFAULT_ENCODING }): Promise<string> {
  return readFile(pathLike, options)
}
