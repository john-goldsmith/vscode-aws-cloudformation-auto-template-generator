/**
 * @module utils/is-visibility-public
 */

 function isVisibilityPublic(visibility) {
   if (typeof visibility !== 'string') return false
   return visibility.toLowerCase() === 'public'
 }

 module.exports = isVisibilityPublic
