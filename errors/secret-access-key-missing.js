/**
 * @module errors/secret-access-key-missing
 */

const BaseError = require('./base')

/**
 * @class
 */
class SecretAccessKeyMissingError extends BaseError {

  /**
   * Creates an instance of SecretAccessKeyMissingError.
   *
   * @param {String} message
   */
  constructor(message = 'Secret access key missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SecretAccessKeyMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = SecretAccessKeyMissingError
