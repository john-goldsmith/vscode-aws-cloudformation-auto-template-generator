import BaseError from '../../../errors/base'
import NonexistentConfigFileError from '../../../errors/nonexistent-config-file'

describe('Errors', () => {

  describe('NonexistentConfigFileError', () => {

    it('extends the Error class', () => {
      expect(NonexistentConfigFileError.prototype instanceof BaseError).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new NonexistentConfigFileError('path/to/config')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('No configuration file found at path/to/config')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new NonexistentConfigFileError('/path/to/config', 'foobar')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new NonexistentConfigFileError('path/to/config')
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          const originalCaptureStackTrace = Error.captureStackTrace
          // @ts-expect-error Type 'boolean' is not assignable to type '(targetObject: object, constructorOpt?: Function | undefined) => void'.
          Error.captureStackTrace = false
          new NonexistentConfigFileError('path/to/config')
          Error.captureStackTrace = originalCaptureStackTrace
        })

      })

    })

  })

})
