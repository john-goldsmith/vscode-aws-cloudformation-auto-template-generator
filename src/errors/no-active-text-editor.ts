import BaseError from './base'

/**
 * @param {string} [message]
 */
export default class NoActiveTextEditorError extends BaseError {

  constructor(message = 'No active text editor') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoActiveTextEditorError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
