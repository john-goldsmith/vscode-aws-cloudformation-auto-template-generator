/**
 * @module utils/is-visibility-public
 */

 function isVisibilityPublic(visibility) {
   return visibility.toLowerCase() === 'public'
 }

 module.exports = isVisibilityPublic
