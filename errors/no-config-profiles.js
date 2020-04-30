const BaseError = require('./base')

/**
 * @param {string} [message]
 */
class NoConfigProfilesError extends BaseError {

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
