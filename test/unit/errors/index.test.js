const index = require('../../../errors/index')

describe('Errors', () => {

  describe('index', () => {

    it('exports an object', () => {
      expect(typeof index).toBe('object')
      expect(index).toHaveProperty('ProfileNotSetError')
    })

  })

})
