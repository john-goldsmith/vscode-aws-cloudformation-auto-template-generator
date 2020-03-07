/**
 * @module errors/no-active-text-editor
 */

const BaseError = require('./base')

/**
 * @class
 */
class NoActiveTextEditorError extends BaseError {

  /**
   * Creates an instance of NotLoggedInError.
   *
   * @param {String} message
   */
  constructor(path, message = `No active text editor`) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoActiveTextEditorError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

module.exports = NoActiveTextEditorError
