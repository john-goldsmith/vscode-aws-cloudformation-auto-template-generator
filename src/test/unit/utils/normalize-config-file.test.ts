import normalizeConfigFile from '../../../utils/normalize-config-file'
import { ParsedIniData } from '../../../utils/parse-ini'

describe('Utils', () => {

  describe('normalizeConfigFile', () => {

    describe('when a \'default\' key is present', () => {

      it('uses the data as-is', () => {
        const data: ParsedIniData = {
          default: {
            foo: 'bar'
          },
          'no match': {
            // @ts-expect-error Type 'number' is not assignable to type 'string | undefined'.
            bar: 123
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
