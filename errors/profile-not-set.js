const BaseError = require('./base')

/**
 * @param {string} [message]
 */
class ProfileNotSetError extends BaseError {

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
