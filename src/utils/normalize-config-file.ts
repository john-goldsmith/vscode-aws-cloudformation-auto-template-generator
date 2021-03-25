import { ParsedIniData } from "./parse-ini"

/**
 * @constant {RegExp}
 */
const PROFILE_KEY_REGEX = /^profile\s(["'])?([^\1]+)\1$/

/**
 * Normalizes data from an AWS config file.
 *
 * @param {Object} data
 * @return {Object}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/credentials/credentialsFile.ts#L106-L125
 */
export default function normalizeConfigFile(data: ParsedIniData): ParsedIniData {
  const map: ParsedIniData = {}
  for (const key of Object.keys(data)) {
    if (key === 'default') {
      map.default = data.default
    } else {
      const matches = PROFILE_KEY_REGEX.exec(key)
      if (matches) {
        const [_1, _2, normalizedKey] = matches // eslint-disable-line @typescript-eslint/no-unused-vars
        if (normalizedKey) {
          map[normalizedKey] = data[key]
        }
      }
    }
  }
  return map
}
