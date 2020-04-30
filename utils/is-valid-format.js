const { VALID_TEMPLATE_FORMATS } = require('../config')

/**
 * Determines if the provided format is valid (`yaml` or `json`).
 *
 * @param {string} format
 * @return {boolean}
 */
function isValidFormat(format) {
  if (typeof format !== 'string') return false
  return VALID_TEMPLATE_FORMATS.includes(format.toLowerCase())
}

module.exports = isValidFormat
