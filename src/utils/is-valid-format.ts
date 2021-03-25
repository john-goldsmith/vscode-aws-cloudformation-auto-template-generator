import { VALID_TEMPLATE_FORMATS } from '../config'

/**
 * Determines if the provided format is valid (`yaml` or `json`).
 *
 * @param {string} format
 * @return {boolean}
 */
export default function isValidFormat(format: string): boolean {
  if (typeof format !== 'string') return false
  return VALID_TEMPLATE_FORMATS.includes(format.toLowerCase())
}
