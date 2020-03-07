const vscode = require('vscode')

const commandHandlerMapping = require('./commands')

/**
 * This method is called when the extension is activated.
 *
 * @param {vscode.ExtensionContext} context
 * @type {Function}
 * @return {undefined}
 */
function activate(context) {
	commandHandlerMapping.forEach((handler, command) => {
		const disposable = vscode.commands.registerCommand(command, handler(context))
		context.subscriptions.push(disposable)
	})
}

/**
 * This method is called when the extension is deactivated.
 *
 * @type {Function}
 * @return {undefined}
 */
function deactivate() {}

exports.activate = activate

module.exports = {
	activate,
	deactivate
}
