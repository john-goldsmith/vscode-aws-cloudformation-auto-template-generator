const { join } = require('path')

jest.mock('../../utils/get-home-dir', () => {
  return function getHomeDir() {
    const { join } = require('path')
    return join('path', 'to', 'dir')
  }
})

const config = require('../../config')

describe('Config', () => {

  it('exports an object', () => {
    expect(typeof config).toBe('object')
    expect(Object.keys(config).length).toBe(17)
  })

  it('exports a \'EXTENSION_NAME\' key', () => {
    expect(config).toHaveProperty('EXTENSION_NAME')
    expect(config.EXTENSION_NAME).toBe('awsCfnAutoTemplateGenerator')
  })

  it('exports a \'DESCRIBE_TYPE_CACHE_TTL_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('DESCRIBE_TYPE_CACHE_TTL_CONFIGURATION_PROPERTY')
    expect(config.DESCRIBE_TYPE_CACHE_TTL_CONFIGURATION_PROPERTY).toBe('describeTypeCacheTtl')
  })

  it('exports a \'LIST_TYPES_CACHE_TTL_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('LIST_TYPES_CACHE_TTL_CONFIGURATION_PROPERTY')
    expect(config.LIST_TYPES_CACHE_TTL_CONFIGURATION_PROPERTY).toBe('listTypesCacheTtl')
  })

  it('exports a \'PROFILE_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('PROFILE_CONFIGURATION_PROPERTY')
    expect(config.PROFILE_CONFIGURATION_PROPERTY).toBe('profile')
  })

  it('exports a \'REGION_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('REGION_CONFIGURATION_PROPERTY')
    expect(config.REGION_CONFIGURATION_PROPERTY).toBe('region')
  })

  it('exports a \'RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY')
    expect(config.RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY).toBe('resourceVisibility')
  })

  it('exports a \'TEMPLATE_FORMAT_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('TEMPLATE_FORMAT_CONFIGURATION_PROPERTY')
    expect(config.TEMPLATE_FORMAT_CONFIGURATION_PROPERTY).toBe('templateFormat')
  })

  it('exports a \'CONFIG_FILE_PATH_CONFIGURATION_PROPERTY\' key', () => {
    expect(config).toHaveProperty('CONFIG_FILE_PATH_CONFIGURATION_PROPERTY')
    expect(config.CONFIG_FILE_PATH_CONFIGURATION_PROPERTY).toBe('configFilePath')
  })

  it('exports a \'PUBLIC_TYPE_LIST_CACHE_TTL_DAYS\' key', () => {
    expect(config).toHaveProperty('PUBLIC_TYPE_LIST_CACHE_TTL_DAYS')
    expect(config.PUBLIC_TYPE_LIST_CACHE_TTL_DAYS).toBe(1)
  })

  it('exports a \'PUBLIC_TYPE_CACHE_TTL_DAYS\' key', () => {
    expect(config).toHaveProperty('PUBLIC_TYPE_CACHE_TTL_DAYS')
    expect(config.PUBLIC_TYPE_CACHE_TTL_DAYS).toBe(1)
  })

  it('exports a \'PRIVATE_TYPE_LIST_CACHE_TTL_DAYS\' key', () => {
    expect(config).toHaveProperty('PRIVATE_TYPE_LIST_CACHE_TTL_DAYS')
    expect(config.PRIVATE_TYPE_LIST_CACHE_TTL_DAYS).toBe(1)
  })

  it('exports a \'PRIVATE_TYPE_CACHE_TTL_DAYS\' key', () => {
    expect(config).toHaveProperty('PRIVATE_TYPE_CACHE_TTL_DAYS')
    expect(config.PRIVATE_TYPE_CACHE_TTL_DAYS).toBe(1)
  })

  it('exports a \'VALID_TEMPLATE_FORMATS\' key', () => {
    expect(config).toHaveProperty('VALID_TEMPLATE_FORMATS')
    expect(config.VALID_TEMPLATE_FORMATS).toStrictEqual(['yaml', 'json'])
  })

  it('exports a \'DEFAULT_TEMPLATE_FORMAT\' key', () => {
    expect(config).toHaveProperty('DEFAULT_TEMPLATE_FORMAT')
    expect(config.DEFAULT_TEMPLATE_FORMAT).toBe('yaml')
  })

  it('exports a \'DEFAULT_CONFIG_FILE_PATH\' key', () => {
    expect(config).toHaveProperty('DEFAULT_CONFIG_FILE_PATH')
    expect(config.DEFAULT_CONFIG_FILE_PATH).toBe(join('path', 'to', 'dir', '.aws', 'config'))
  })

  it('exports a \'VALID_RESOURCE_VISIBILITY_OPTIONS\' key', () => {
    expect(config).toHaveProperty('VALID_RESOURCE_VISIBILITY_OPTIONS')
    expect(config.VALID_RESOURCE_VISIBILITY_OPTIONS).toStrictEqual(['PUBLIC', 'PRIVATE'])
  })

  it('exports a \'DEFAULT_RESOURCE_VISIBILITY\' key', () => {
    expect(config).toHaveProperty('DEFAULT_RESOURCE_VISIBILITY')
    expect(config.DEFAULT_RESOURCE_VISIBILITY).toBe('PUBLIC')
  })

})
