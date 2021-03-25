import isExpired from '../../../utils/is-expired'

describe('Utils', () => {

  describe('isExpired', () => {

    describe('when the cache has expired', () => {

      it('returns true', () => {
        const expiration = Date.now() - (1000 * 60 * 60 * 24 * 7) // 1 week in the past
        const cacheTtlInDays = 1
        const actual = isExpired(expiration, cacheTtlInDays)
        expect(actual).toBe(true)
      })

    })

    describe('when the cache has not expired', () => {

      it('returns false', () => {
        const expiration = Date.now() + (1000 * 60) // 1 minute in the future
        const cacheTtlInDays = 1
        const actual = isExpired(expiration, cacheTtlInDays)
        expect(actual).toBe(false)
      })

    })

  })

})
