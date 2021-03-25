import StateKeys from '../../cache-keys'

describe('Cache keys', () => {

  it('exports an object', () => {
    expect(typeof StateKeys).toBe('object')
    expect(Object.keys(StateKeys).length).toBe(4)
  })

  it('exports a \'PUBLIC_TYPE_LIST_CACHE_KEY\' key', () => {
    expect(StateKeys).toHaveProperty('PUBLIC_TYPE_LIST_CACHE_KEY')
    expect(StateKeys.PUBLIC_TYPE_LIST_CACHE_KEY).toBe('publicTypeListCache')
  })

  it('exports a \'PUBLIC_TYPE_CACHE_KEY\' key', () => {
    expect(StateKeys).toHaveProperty('PUBLIC_TYPE_CACHE_KEY')
    expect(StateKeys.PUBLIC_TYPE_CACHE_KEY).toBe('publicTypeCache')
  })

  it('exports a \'PRIVATE_TYPE_LIST_CACHE_KEY\' key', () => {
    expect(StateKeys).toHaveProperty('PRIVATE_TYPE_LIST_CACHE_KEY')
    expect(StateKeys.PRIVATE_TYPE_LIST_CACHE_KEY).toBe('privateTypeListCache')
  })

  it('exports a \'PRIVATE_TYPE_CACHE_KEY\' key', () => {
    expect(StateKeys).toHaveProperty('PRIVATE_TYPE_CACHE_KEY')
    expect(StateKeys.PRIVATE_TYPE_CACHE_KEY).toBe('privateTypeCache')
  })

})
