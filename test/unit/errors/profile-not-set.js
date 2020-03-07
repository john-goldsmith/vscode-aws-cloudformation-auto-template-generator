const BaseError = require('../../../errors/base')
const ProfileNotSetError = require('../../../errors/profile-not-set')

describe('Errors', () => {

  describe('ProfileNotSetError', () => {

    it('extends the Error class', () => {
      expect(ProfileNotSetError.prototype instanceof BaseError).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new ProfileNotSetError()
          expect(instance.name).toBe('ProfileNotSetError')
          expect(instance.message).toBe('Profile not set')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new ProfileNotSetError('foobar')
          expect(instance.name).toBe('ProfileNotSetError')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new ProfileNotSetError()
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          const originalCaptureStackTrace = Error.captureStackTrace
          Error.captureStackTrace = false
          new ProfileNotSetError()
          Error.captureStackTrace = originalCaptureStackTrace
        })

      })

    })

  })

})
