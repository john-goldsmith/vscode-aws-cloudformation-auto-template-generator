/**
 * The class that all other errors should inherit from.
 *
 * @param {string} [message]
 */
class BaseError extends Error {

  constructor(message = 'Error') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = BaseError
