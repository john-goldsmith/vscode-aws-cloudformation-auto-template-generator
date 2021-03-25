import BaseError from './base'

/**
 * @param {string} [message]
 */
export default class AccessKeyIdMissingError extends BaseError {

  constructor(message = 'Access key ID missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AccessKeyIdMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
