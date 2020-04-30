const BaseError = require('./base')

/**
 * @param {string} [message]
 */
class NoActiveTextEditorError extends BaseError {

  constructor(message = `No active text editor`) {
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
