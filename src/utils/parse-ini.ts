export interface ParsedIniData {
  [key: string]: Profile
}

interface Profile {
  [key: string]: string | undefined
}

/**
 * Parses a stringified AWS config file.
 *
 * @param {string} iniData
 * @return {Object}
 * @see https://github.com/aws/aws-toolkit-vscode/blob/master/src/shared/credentials/credentialsFile.ts#L127-L145
 */
export default function parseIni(iniData: string): ParsedIniData {
  const map: ParsedIniData = {}
  let currentSection: string | undefined
  for (let line of iniData.split(/\r?\n/)) {
    line = line.split(/(^|\s)[;#]/)[0] // remove comments
    const section = line.match(/^\s*\[([^[\]]+)]\s*$/)
    if (section) {
      currentSection = section[1]
    } else if (currentSection) {
      const item = line.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/)
      if (item) {
        map[currentSection] = map[currentSection] || {}
        map[currentSection][item[1]] = item[2]
      }
    }
  }
  return map
}
