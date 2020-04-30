/**
 * Determines if the provided format is equal to `json`.
 *
 * @param {string} format
 * @return {boolean}
 */
function isFormatJson(format) {
  if (typeof format !== 'string') return false
  return format.toLowerCase() === 'json'
}

module.exports = isFormatJson
