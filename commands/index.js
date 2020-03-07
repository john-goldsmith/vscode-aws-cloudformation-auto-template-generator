const setProfile = require('./set-profile')
const setTemplateFormat = require('./set-template-format')
const insertResource = require('./insert-resource')
const bustCache = require('./bust-cache')
const setConfigFilePath = require('./set-config-file-path')
const setResourceVisibility = require('./set-resource-visibility')
const setRegion = require('./set-region')

const commandHandlerMapping = new Map([
  ['extension.setProfile', setProfile],
  ['extension.setRegion', setRegion],
  ['extension.setTemplateFormat', setTemplateFormat],
  ['extension.insertResource', insertResource],
  ['extension.bustCache', bustCache],
  ['extension.setConfigFilePath', setConfigFilePath],
  ['extension.setResourceVisibility', setResourceVisibility]
])

module.exports = commandHandlerMapping
