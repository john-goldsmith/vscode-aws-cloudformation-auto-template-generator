/**
 * @module errors/base
 */

/**
 * The class that all other errors should inherit from.
 *
 * @class
 */
class BaseError extends Error {

  /**
   * Creates an instance of BaseError.
   *
   * @param {String} message
   */
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
