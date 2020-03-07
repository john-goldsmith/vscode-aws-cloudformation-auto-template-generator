const vscode = require('vscode')

const setProfile = require('../../../commands/set-profile')

describe('Commands', () => {

  describe('setProfile', () => {

    it('returns a function', () => {
      expect(typeof setProfile()).toBe('function')
    })

  })

})
