/**
 * @module errors/profile-not-set
 */

const BaseError = require('./base')

/**
 * @class
 */
class NoConfigProfilesError extends BaseError {

  /**
   * Creates an instance of NoConfigProfilesError.
   *
   * @param {String} message
   */
  constructor(path, message = `No configuration profiles found in ${path}`) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoConfigProfilesError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = NoConfigProfilesError
