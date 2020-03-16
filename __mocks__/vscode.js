/**
 * @see https://code.visualstudio.com/api/references/vscode-api#commands
 */
const commands = {
  executeCommand: jest.fn(() => Promise.resolve()),
  registerCommand: jest.fn(() => 1)
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#workspace
 */
const workspace = {
  getConfiguration: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Progress
 */
const Progress = {
  report: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#window
 */
const window = {
  showInformationMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  setStatusBarMessage: jest.fn(),
  showQuickPick: jest.fn(),
  showInputBox: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#ProgressLocation
 */
const ProgressLocation = {
  Window: 1
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#TextEditorEdit
 *
const TextEditorEdit = {
  Window: 1
}*/

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Position
 */
const Position = jest.fn()

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Selection
 */
const Selection = jest.fn()

module.exports = {
  commands,
  window,
  workspace,
  ProgressLocation,
  Progress,
  Position,
  Selection
}
