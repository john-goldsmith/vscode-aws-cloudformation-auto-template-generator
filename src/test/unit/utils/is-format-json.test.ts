import isFormatJson from '../../../utils/is-format-json'

describe('Utils', () => {

  describe('isFormatJson', () => {

    describe('when the format is JSON (uppercase)', () => {

      it('returns true', () => {
        const actual = isFormatJson('JSON')
        expect(actual).toBe(true)
      })

    })

    describe('when the format is json (lowercase)', () => {

      it('returns true', () => {
        const actual = isFormatJson('json')
        expect(actual).toBe(true)
      })

    })

    describe('when the format is anything else', () => {

      it('returns false', () => {
        const actual = isFormatJson('foo')
        expect(actual).toBe(false)
      })

    })

    describe('when no format is provided', () => {

      it('returns false', () => {
        // @ts-expect-error Expected 1 arguments, but got 0.
        const actual = isFormatJson()
        expect(actual).toBe(false)
      })

    })

  })

})
