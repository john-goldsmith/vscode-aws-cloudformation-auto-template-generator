/**
 * The class that all other errors should inherit from.
 *
 * @param {string} [message]
 */
export default class BaseError extends Error {

  constructor(message = 'An unknown error occurred') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
