import index from '../../../commands/index'

describe('Commands', () => {

  describe('index', () => {

    it('exports a mapping of commands and handlers', () => {
      expect(index instanceof Map).toBe(true)
      expect(index.size).toBe(7)
    })

    it('exports a \'setProfile\' command', () => {
      expect(index.has('extension.setProfile')).toBe(true)
      expect(typeof index.get('extension.setProfile')).toBe('function')
    })

    it('exports a \'setRegion\' command', () => {
      expect(index.has('extension.setRegion')).toBe(true)
      expect(typeof index.get('extension.setRegion')).toBe('function')
    })

    it('exports a \'setTemplateFormat\' command', () => {
      expect(index.has('extension.setTemplateFormat')).toBe(true)
      expect(typeof index.get('extension.setTemplateFormat')).toBe('function')
    })

    it('exports a \'insertResource\' command', () => {
      expect(index.has('extension.insertResource')).toBe(true)
      expect(typeof index.get('extension.insertResource')).toBe('function')
    })

    it('exports a \'bustCache\' command', () => {
      expect(index.has('extension.bustCache')).toBe(true)
      expect(typeof index.get('extension.bustCache')).toBe('function')
    })

    it('exports a \'setConfigFilePath\' command', () => {
      expect(index.has('extension.setConfigFilePath')).toBe(true)
      expect(typeof index.get('extension.setConfigFilePath')).toBe('function')
    })

    it('exports a \'setResourceVisibility\' command', () => {
      expect(index.has('extension.setResourceVisibility')).toBe(true)
      expect(typeof index.get('extension.setResourceVisibility')).toBe('function')
    })

  })

})
