import BaseError from '../../../errors/base'

describe('Errors', () => {

  describe('BaseError', () => {

    it('extends the Error class', () => {
      expect(BaseError.prototype instanceof Error).toBe(true)
    })

    describe('constructor', () => {

      describe('when no message is provided', () => {

        it('uses a default message', () => {
          const instance = new BaseError()
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('An unknown error occurred')
        })

      })

      describe('when a message is provided', () => {

        it('uses the provided message', () => {
          const instance = new BaseError('foobar')
          expect(instance.name).toBe('Error')
          expect(instance.message).toBe('foobar')
        })

      })

      describe('when Error.captureStackTrace is truthy', () => {

        it('maintains proper stack traces', () => {
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace')
          new BaseError()
          expect(captureStackTraceSpy).toHaveBeenCalled()
          captureStackTraceSpy.mockRestore()
        })

      })

      describe('when Error.captureStackTrace is falsey', () => {

        it('does not maintain proper stack traces', () => {
          // @ts-expect-error Argument of type 'boolean' is not assignable to parameter of type 'void'.
          const captureStackTraceSpy = jest.spyOn(Error, 'captureStackTrace').mockReturnValue(false)
          new BaseError()
          captureStackTraceSpy.mockRestore()
        })

      })

    })

  })

})
