const cacheKeys = require('../../cache-keys')

describe('Cache keys', () => {

  it('exports an object', () => {
    expect(typeof cacheKeys).toBe('object')
    expect(Object.keys(cacheKeys).length).toBe(4)
  })

  it('exports a \'PUBLIC_TYPE_LIST_CACHE_KEY\' key', () => {
    expect(cacheKeys).toHaveProperty('PUBLIC_TYPE_LIST_CACHE_KEY')
    expect(cacheKeys.PUBLIC_TYPE_LIST_CACHE_KEY).toBe('publicTypeListCache')
  })

  it('exports a \'PUBLIC_TYPE_CACHE_KEY\' key', () => {
    expect(cacheKeys).toHaveProperty('PUBLIC_TYPE_CACHE_KEY')
    expect(cacheKeys.PUBLIC_TYPE_CACHE_KEY).toBe('publicTypeCache')
  })

  it('exports a \'PRIVATE_TYPE_LIST_CACHE_KEY\' key', () => {
    expect(cacheKeys).toHaveProperty('PRIVATE_TYPE_LIST_CACHE_KEY')
    expect(cacheKeys.PRIVATE_TYPE_LIST_CACHE_KEY).toBe('privateTypeListCache')
  })

  it('exports a \'PRIVATE_TYPE_CACHE_KEY\' key', () => {
    expect(cacheKeys).toHaveProperty('PRIVATE_TYPE_CACHE_KEY')
    expect(cacheKeys.PRIVATE_TYPE_CACHE_KEY).toBe('privateTypeCache')
  })

})
