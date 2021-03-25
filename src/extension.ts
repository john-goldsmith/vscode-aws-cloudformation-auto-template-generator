import { ExtensionContext, commands } from 'vscode'

import commandHandlerMapping from './commands'

/**
 * This method is called when the extension is activated.
 *
 * @param {ExtensionContext} context
 * @type {Function}
 * @return {undefined}
 */
export function activate(context: ExtensionContext): void {
	commandHandlerMapping.forEach((handler, command) => {
		const disposable = commands.registerCommand(command, handler(context))
		context.subscriptions.push(disposable)
	})
}

/**
 * This method is called when the extension is deactivated.
 *
 * @type {Function}
 * @return {undefined}
 */
export function deactivate(): void {} // eslint-disable-line @typescript-eslint/no-empty-function
