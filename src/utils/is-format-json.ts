/**
 * Determines if the provided format is equal to `json`.
 *
 * @param {string} format
 * @return {boolean}
 */
export default function isFormatJson(format: string): boolean {
  if (typeof format !== 'string') return false
  return format.toLowerCase() === 'json'
}
