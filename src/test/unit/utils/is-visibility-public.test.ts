import isVisibilityPublic from '../../../utils/is-visibility-public'

describe('Utils', () => {

  describe('isVisibilityPublic', () => {

    describe('when the format is valid', () => {

      it('returns true', () => {
        const actual = isVisibilityPublic('PUBLIC')
        expect(actual).toBe(true)
      })

    })

    describe('when the format is invalid', () => {

      it('returns true', () => {
        const actual = isVisibilityPublic('custom')
        expect(actual).toBe(false)
      })

    })

    describe('when the format is not a string', () => {

      it('returns false', () => {
        // @ts-expect-error Expected 1 arguments, but got 0.
        const actual = isVisibilityPublic()
        expect(actual).toBe(false)
      })

    })

  })

})
