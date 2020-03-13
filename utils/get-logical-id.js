/**
 * @module utils/get-logical-id
 */

 /**
  * @param {String} type
  * @return {String}
  */
function getLogicalId(type) {
  if (typeof type !== 'string') return 'MyResource'
  const logicalId = `My${type.replace(/::/g, '')}`
  return logicalId
}

module.exports = getLogicalId
