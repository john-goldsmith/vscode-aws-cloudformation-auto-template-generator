import BaseError from './base'

/**
 * @param {string} [message]
 */
export default class ProfileNotSetError extends BaseError {

  constructor(message = 'Profile not set') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProfileNotSetError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
