/**
 * @module utils/is-valid-format
 */

const { VALID_TEMPLATE_FORMATS } = require('../config')

function isValidFormat(format) {
  return VALID_TEMPLATE_FORMATS.includes(format)
}

module.exports = isValidFormat
