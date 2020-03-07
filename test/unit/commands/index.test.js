const index = require('../../../commands/index')

describe('Commands', () => {

  describe('index', () => {

    it('exports a mapping of commands and handlers', () => {
      expect(index instanceof Map).toBe(true)
      expect(index.size).toBe(9)
      expect(index.has('extension.setProfile')).toBe(true)
      expect(typeof index.get('extension.setProfile')).toBe('function')
    })

  })

})
