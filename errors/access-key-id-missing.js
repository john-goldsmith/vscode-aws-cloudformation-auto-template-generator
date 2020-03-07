/**
 * @module errors/access-key-id-missing
 */

const BaseError = require('./base')

/**
 * @class
 */
class AccessKeyIdMissingError extends BaseError {

  /**
   * Creates an instance of NotLoggedInError.
   *
   * @param {String} message
   */
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

module.exports = AccessKeyIdMissingError
