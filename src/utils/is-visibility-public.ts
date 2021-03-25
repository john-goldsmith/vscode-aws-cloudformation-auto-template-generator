/**
 * Determines if the providied visibility is `public`.
 *
 * @param {string} visibility
 * @return {boolean}
 */
export default function isVisibilityPublic(visibility: string): boolean {
  if (typeof visibility !== 'string') return false
  return visibility.toLowerCase() === 'public'
}
