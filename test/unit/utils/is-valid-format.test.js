const isValidFormat = require('../../../utils/is-valid-format')

describe('Utils', () => {

  describe('isValidFormat', () => {

    describe('when the format is valid', () => {

      it('returns true', () => {
        const actual = isValidFormat('JSON')
        expect(actual).toBe(true)
      })

    })

    describe('when the format is invalid', () => {

      it('returns true', () => {
        const actual = isValidFormat('csv')
        expect(actual).toBe(false)
      })

    })

    describe('when the format is not a string', () => {

      it('returns false', () => {
        const actual = isValidFormat()
        expect(actual).toBe(false)
      })

    })

  })

})
