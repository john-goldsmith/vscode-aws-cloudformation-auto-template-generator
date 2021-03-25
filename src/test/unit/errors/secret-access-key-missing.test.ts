import BaseError from '../../../errors/base'
import SecretAccessKeyMissingError from '../../../errors/secret-access-key-missing'

describe('Errors', () => {

  describe('SecretAccessKeyMissingError', () => {

    it('extends the Error class', () => {
      expect(SecretAccessKeyMissingError.prototype instanceof BaseError).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new SecretAccessKeyMissingError()
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('Secret access key missing')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new SecretAccessKeyMissingError('foobar')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new SecretAccessKeyMissingError()
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          const originalCaptureStackTrace = Error.captureStackTrace
          // @ts-expect-error Type 'boolean' is not assignable to type '(targetObject: object, constructorOpt?: Function | undefined) => void'.
          Error.captureStackTrace = false
          new SecretAccessKeyMissingError()
          Error.captureStackTrace = originalCaptureStackTrace
        })

      })

    })

  })

})
