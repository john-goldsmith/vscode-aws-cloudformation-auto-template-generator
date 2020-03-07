/**
 * @module utils/is-expired
 */

function isExpired(now, expiration, days) {
  return now > expiration.setDate(expiration.getDate() + days)
}

module.exports = isExpired
