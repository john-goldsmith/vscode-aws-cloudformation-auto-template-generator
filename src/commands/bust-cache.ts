import { ExtensionContext, window } from 'vscode'

import StateKeys from '../cache-keys'

/**
 * A utility command that will clear workspace data containing cached
 * API responses as a result of listing all CloudFormation resource types
 * and fetching individual CloudFormation resource types. This is useful,
 * for example, if the cache TTL is set to a higher number, or as private
 * resource types are registered and deregistered.
 *
 * @param {ExtensionContext} context
 * @return {Function<Promise<undefined>>}
 */
export default function bustCache(context: ExtensionContext) {
  return async (): Promise<void> => {
    try {
      await Promise.all([
        context.workspaceState.update(StateKeys.PUBLIC_TYPE_LIST_CACHE_KEY, {updatedAt: 0}),
        context.workspaceState.update(StateKeys.PUBLIC_TYPE_CACHE_KEY, {}),
        context.workspaceState.update(StateKeys.PRIVATE_TYPE_LIST_CACHE_KEY, {updatedAt: 0}),
        context.workspaceState.update(StateKeys.PRIVATE_TYPE_CACHE_KEY, {})
      ])
      window.setStatusBarMessage('Cache busted', 3000)
    } catch (err) {
      window.showErrorMessage(err.message)
    }
  }
}
