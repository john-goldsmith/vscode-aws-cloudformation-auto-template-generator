import * as index from '../../../errors/index'

describe('Errors', () => {

  describe('index', () => {

    it('exports an object', () => {
      expect(typeof index).toBe('object')
      expect(index).toHaveProperty('ProfileNotSetError')
      expect(index).toHaveProperty('NonexistentConfigFileError')
      expect(index).toHaveProperty('NoConfigProfilesError')
      expect(index).toHaveProperty('NoActiveTextEditorError')
      expect(index).toHaveProperty('AccessKeyIdMissingError')
      expect(index).toHaveProperty('SecretAccessKeyMissingError')
    })

  })

})
