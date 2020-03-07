const stateKeys = require('../../cache-keys')

describe('State keys', () => {

  it('exports an object', () => {
    expect(typeof stateKeys).toBe('object')
    expect(stateKeys).toHaveProperty('DEFAULT_PROFILE')
    expect(stateKeys.DEFAULT_PROFILE).toBe('default')
  })

})
