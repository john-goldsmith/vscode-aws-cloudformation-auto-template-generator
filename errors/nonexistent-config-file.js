const BaseError = require('./base')

/**
 * @param {string} [message]
 */
class NonexistentConfigFileError extends BaseError {

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
