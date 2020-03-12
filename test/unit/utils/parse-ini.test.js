const parseIni = require('../../../utils/parse-ini')

describe('Utils', () => {

  describe('parseIni', () => {

    it('returns an object', () => {
      const data = '# comment\n[profile test1]\nfoo = bar\n\n[profile test2]\nregion=us-west-1'
      const actual = parseIni(data)
      const expected = {
        'profile test1': {
          foo: 'bar'
        },
        'profile test2': {
          region: 'us-west-1'
        }
      }
      expect(actual).toStrictEqual(expected)
    })

  })

})
