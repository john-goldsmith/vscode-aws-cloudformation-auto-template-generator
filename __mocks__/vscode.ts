/**
 * @see https://code.visualstudio.com/api/references/vscode-api#commands
 */
export const commands = {
  executeCommand: jest.fn(() => Promise.resolve()),
  registerCommand: jest.fn(() => 1)
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#workspace
 */
export const workspace = {
  getConfiguration: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Progress
 */
export const Progress = {
  report: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#window
 */
export const window = {
  showInformationMessage: jest.fn(),
  showErrorMessage: jest.fn(),
  setStatusBarMessage: jest.fn(),
  showQuickPick: jest.fn(),
  showInputBox: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#ProgressLocation
 */
export const ProgressLocation = {
  Window: 1
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#TextEditorEdit
 *
export const TextEditorEdit = {
  Window: 1
}*/

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Position
 */
export const Position = jest.fn()

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Selection
 */
export const Selection = jest.fn()

export default {
  commands,
  window,
  workspace,
  ProgressLocation,
  Progress,
  Position,
  Selection
}
