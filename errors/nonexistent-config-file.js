/**
 * @module errors/profile-not-set
 */

const BaseError = require('./base')

/**
 * @class
 */
class NonexistentConfigFileError extends BaseError {

  /**
   * Creates an instance of NotLoggedInError.
   *
   * @param {String} message
   */
  constructor(path, message = `No configuration file found at ${path}`) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonexistentConfigFileError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = NonexistentConfigFileError
