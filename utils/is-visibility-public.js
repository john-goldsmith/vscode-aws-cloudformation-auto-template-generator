/**
 * Determines if the providied visibility is `public`.
 *
 * @param {*} visibility
 * @return {boolean}
 */
function isVisibilityPublic(visibility) {
  if (typeof visibility !== 'string') return false
  return visibility.toLowerCase() === 'public'
}

 module.exports = isVisibilityPublic
