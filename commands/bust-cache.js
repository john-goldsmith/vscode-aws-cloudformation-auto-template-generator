const vscode = require('vscode')

const {
  PUBLIC_TYPE_LIST_CACHE_KEY,
  PUBLIC_TYPE_CACHE_KEY,
  PRIVATE_TYPE_LIST_CACHE_KEY,
  PRIVATE_TYPE_CACHE_KEY
} = require('../cache-keys')

/**
 * A utility command that will clear workspace data containing cached
 * API responses as a result of listing all CloudFormation resource types
 * and fetching individual CloudFormation resource types. This is useful,
 * for example, if the cache TTL is set to a higher number, or as private
 * resource types are registered and deregistered.
 *
 * @param {vscode.ExtensionContext} context
 * @return {Function<Promise<undefined>>}
 */
function bustCache(context) {
  return async () => {
    try {
      await Promise.all([
        context.workspaceState.update(PUBLIC_TYPE_LIST_CACHE_KEY, {updatedAt: 0}),
        context.workspaceState.update(PUBLIC_TYPE_CACHE_KEY, {}),
        context.workspaceState.update(PRIVATE_TYPE_LIST_CACHE_KEY, {updatedAt: 0}),
        context.workspaceState.update(PRIVATE_TYPE_CACHE_KEY, {})
      ])
      vscode.window.setStatusBarMessage('Cache busted', 3000)
    } catch (err) {
      vscode.window.showErrorMessage(err.message)
    }
  }
}

module.exports = bustCache
