import BaseError from '../../../errors/base'
import NoConfigProfilesError from '../../../errors/no-config-profiles'

describe('Errors', () => {

  describe('AccessKeyIdMissingError', () => {

    it('extends the Error class', () => {
      expect(NoConfigProfilesError.prototype instanceof BaseError).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new NoConfigProfilesError('path/to/config')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('No configuration profiles found in path/to/config')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new NoConfigProfilesError('/path/to/config', 'foobar')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new NoConfigProfilesError('path/to/config')
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          const originalCaptureStackTrace = Error.captureStackTrace
          // @ts-expect-error Type 'boolean' is not assignable to type '(targetObject: object, constructorOpt?: Function | undefined) => void'.
          Error.captureStackTrace = false
          new NoConfigProfilesError('path/to/config')
          Error.captureStackTrace = originalCaptureStackTrace
        })

      })

    })

  })

})
