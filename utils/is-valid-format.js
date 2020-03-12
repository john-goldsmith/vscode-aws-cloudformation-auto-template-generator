/**
 * @module utils/is-valid-format
 */

const { VALID_TEMPLATE_FORMATS } = require('../config')

function isValidFormat(format) {
  if (typeof format !== 'string') return false
  return VALID_TEMPLATE_FORMATS.includes(format.toLowerCase())
}

module.exports = isValidFormat
