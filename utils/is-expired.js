/**
 * Determines if a date has expired.
 *
 * @param {string} expiration
 * @param {string | number} cacheTtlInDays
 * @return {boolean}
 */
function isExpired(expiration, cacheTtlInDays) {
  const now = Date.now()
  const expirationDate = new Date(expiration)
  return now > expirationDate.setDate(expirationDate.getDate() + cacheTtlInDays)
}

module.exports = isExpired
