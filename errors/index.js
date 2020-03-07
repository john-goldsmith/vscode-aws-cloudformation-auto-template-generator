const ProfileNotSetError = require('./profile-not-set')
const NonexistentConfigFileError = require('./nonexistent-config-file')
const NoConfigProfilesError = require('./no-config-profiles')
const NoActiveTextEditorError = require('./no-active-text-editor')
const AccessKeyIdMissingError = require('./access-key-id-missing')
const SecretAccessKeyMissingError = require('./secret-access-key-missing')

module.exports = {
  ProfileNotSetError,
  NonexistentConfigFileError,
  NoConfigProfilesError,
  NoActiveTextEditorError,
  AccessKeyIdMissingError,
  SecretAccessKeyMissingError
}
