/**
 * @module utils/is-format-json
 */

 /**
  * @param {String} format
  * @return {Boolean}
  */
function isFormatJson(format) {
  return format.toLowerCase() === 'json'
}

module.exports = isFormatJson
