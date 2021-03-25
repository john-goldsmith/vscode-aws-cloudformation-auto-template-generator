import setProfile from './set-profile'
import setTemplateFormat from './set-template-format'
import insertResource from './insert-resource'
import bustCache from './bust-cache'
import setConfigFilePath from './set-config-file-path'
import setResourceVisibility from './set-resource-visibility'
import setRegion from './set-region'

const commandHandlerMapping = new Map([
  ['extension.setProfile', setProfile],
  ['extension.setRegion', setRegion],
  ['extension.setTemplateFormat', setTemplateFormat],
  ['extension.insertResource', insertResource],
  ['extension.bustCache', bustCache],
  ['extension.setConfigFilePath', setConfigFilePath],
  ['extension.setResourceVisibility', setResourceVisibility]
])

export default commandHandlerMapping
