/**
 * @module errors/profile-not-set
 */

const BaseError = require('./base')

/**
 * @class
 */
class ProfileNotSetError extends BaseError {

  /**
   * Creates an instance of NotLoggedInError.
   *
   * @param {String} message
   */
  constructor(message = 'Profile not set') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProfileNotSetError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = ProfileNotSetError
