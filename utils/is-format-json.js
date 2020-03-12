/**
 * @module utils/is-format-json
 */

 /**
  * @param {String} format
  * @return {Boolean}
  */
function isFormatJson(format) {
  if (typeof format !== 'string') return false
  return format.toLowerCase() === 'json'
}

module.exports = isFormatJson
