import { join } from 'path'

import getHomeDir from './utils/get-home-dir'

export const EXTENSION_NAME = 'awsCfnAutoTemplateGenerator'

export const DESCRIBE_TYPE_CACHE_TTL_CONFIGURATION_PROPERTY = 'describeTypeCacheTtl'
export const LIST_TYPES_CACHE_TTL_CONFIGURATION_PROPERTY = 'listTypesCacheTtl'
export const PROFILE_CONFIGURATION_PROPERTY = 'profile'
export const REGION_CONFIGURATION_PROPERTY = 'region'
export const RESOURCE_VISIBILITY_CONFIGURATION_PROPERTY = 'resourceVisibility'
export const TEMPLATE_FORMAT_CONFIGURATION_PROPERTY = 'templateFormat'
export const CONFIG_FILE_PATH_CONFIGURATION_PROPERTY = 'configFilePath'

export const PUBLIC_TYPE_LIST_CACHE_TTL_DAYS = 1
export const PUBLIC_TYPE_CACHE_TTL_DAYS = 1

export const PRIVATE_TYPE_LIST_CACHE_TTL_DAYS = 1
export const PRIVATE_TYPE_CACHE_TTL_DAYS = 1

export const VALID_TEMPLATE_FORMATS = ['yaml', 'json']
export const DEFAULT_TEMPLATE_FORMAT = 'yaml'

export const DEFAULT_CONFIG_FILE_PATH = join(getHomeDir(), '.aws', 'config')

export const VALID_RESOURCE_VISIBILITY_OPTIONS = ['PUBLIC', 'PRIVATE']
export const DEFAULT_RESOURCE_VISIBILITY = 'PUBLIC'
