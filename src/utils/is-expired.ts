/**
 * Determines if a date has expired.
 *
 * @param {number} expiration
 * @param {number} cacheTtlInDays
 * @return {boolean}
 */
export default function isExpired(expiration: number, cacheTtlInDays: number): boolean {
  const now = Date.now()
  const expirationDate = new Date(expiration)
  return now > expirationDate.setDate(expirationDate.getDate() + cacheTtlInDays)
}
