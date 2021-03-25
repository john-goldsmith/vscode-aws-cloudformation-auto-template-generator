import BaseError from './base'

/**
 * @param {string} [message]
 */
export default class SecretAccessKeyMissingError extends BaseError {

  constructor(message = 'Secret access key missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SecretAccessKeyMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
