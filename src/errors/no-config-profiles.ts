import BaseError from './base'

/**
 * @param {string} path
 * @param {string} [message]
 */
export default class NoConfigProfilesError extends BaseError {

  constructor(path: string, message = `No configuration profiles found in ${path}`) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoConfigProfilesError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}
