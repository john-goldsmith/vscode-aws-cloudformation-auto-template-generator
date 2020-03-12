/**
 * @see https://code.visualstudio.com/api/references/vscode-api#commands.registerCommand
 */
const commands = {
  executeCommand: jest.fn().mockImplementation(() => Promise.resolve()),
  registerCommand: jest.fn().mockImplementation(() => 1)
}

const workspace = {
  getConfiguration: jest.fn()
  // getConfiguration: jest.fn(() => {
  //   return {
  //     update: jest.fn()
  //   }
  // })
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Progress
 */
const progress = {
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
  // withProgress: jest.fn().mockImplementation((options, cb) => {
  //   cb(progress)
  // })
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#env
 */
const env = {
  openExternal: jest.fn()
}

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#Uri
 */
const Uri = jest.fn()

/**
 * @see https://code.visualstudio.com/api/references/vscode-api#ProgressLocation
 */
const ProgressLocation = {
  Window: 1
}

module.exports = {
  commands,
  window,
  workspace,
  Uri,
  env,
  ProgressLocation,
  progress
}
