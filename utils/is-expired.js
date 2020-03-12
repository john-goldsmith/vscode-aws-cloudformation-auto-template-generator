/**
 * @module utils/is-expired
 */

function isExpired(expiration, cacheTtlInDays) {
  const now = Date.now()
  const expirationDate = new Date(expiration)
  return now > expirationDate.setDate(expirationDate.getDate() + cacheTtlInDays)
}

module.exports = isExpired
