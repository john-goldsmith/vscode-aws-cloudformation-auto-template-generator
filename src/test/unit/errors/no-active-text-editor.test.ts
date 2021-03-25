import BaseError from '../../../errors/base'
import NoActiveTextEditorError from '../../../errors/no-active-text-editor'

describe('Errors', () => {

  describe('AccessKeyIdMissingError', () => {

    it('extends the Error class', () => {
      expect(NoActiveTextEditorError.prototype instanceof BaseError).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new NoActiveTextEditorError()
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('No active text editor')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new NoActiveTextEditorError('foobar')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new NoActiveTextEditorError()
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          const originalCaptureStackTrace = Error.captureStackTrace
          // @ts-expect-error Type 'boolean' is not assignable to type '(targetObject: object, constructorOpt?: Function | undefined) => void'.
          Error.captureStackTrace = false
          new NoActiveTextEditorError()
          Error.captureStackTrace = originalCaptureStackTrace
        })

      })

    })

  })

})
