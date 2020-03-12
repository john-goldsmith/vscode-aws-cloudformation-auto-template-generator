const normalizeConfigFile = require('../../../utils/normalize-config-file')

describe('Utils', () => {

  describe('normalizeConfigFile', () => {

    describe('when a \'default\' key is present', () => {

      it('uses the data as-is', () => {
        const data = {
          default: {
            foo: 'bar'
          },
          nomatch: {
            abc: 123
          },
          'profile match': {
            region: 'us-west-1'
          },
          'nope ': {
            format: 'json'
          }
        }
        const actual = normalizeConfigFile(data)
        const expected = {
          default: {
            foo: 'bar'
          },
          match: {
            region: 'us-west-1'
          }
        }
        expect(actual).toStrictEqual(expected)
      })

    })

  })

})
