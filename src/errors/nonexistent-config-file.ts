import BaseError from './base'

/**
 * @param {string} path
 * @param {string} [message]
 */
export default class NonexistentConfigFileError extends BaseError {

  constructor(path: string, message = `No configuration file found at ${path}`) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NonexistentConfigFileError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
