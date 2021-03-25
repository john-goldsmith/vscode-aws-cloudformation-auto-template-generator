/* eslint-disable @typescript-eslint/no-var-requires */

// jest.resetModules()
jest.mock('../../../utils/get-home-dir', () => {
  return () => 'home'
})
jest.mock('path', () => {
  return {
    join: () => 'joined/path'
  }
})

describe('Commands', () => {

  describe('setConfigFilePath', () => {

    it('returns a function', () => {
      jest.resetModules()
      const setConfigFilePath = require('../../../commands/set-config-file-path').default
      const actual = setConfigFilePath()
      expect(typeof actual).toBe('function')
    })

    describe('when all promises resolve', () => {

      it('updates the workspace config, shows a status bar message, and calls the \'setProfile\' command', async () => {
        jest.resetModules()
        jest.mock('../../../utils/file-exists', () => {
          return () => Promise.resolve(true)
        })
        jest.mock('../../../utils/read-file-as-string', () => {
          return () => Promise.resolve('[profile default]\nregion=us-west-1')
        })
        const vscode = require('vscode').default
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn().mockImplementation(() => Promise.resolve('/path/to/saved/config'))
        vscode.window.showInputBox.mockImplementation(() => Promise.resolve('/path/to/new/config'))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setConfigFilePath = require('../../../commands/set-config-file-path').default
        const actual = await setConfigFilePath()()

        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath')
        expect(vscode.window.showInputBox).toHaveBeenCalledWith({
          prompt: 'Absolute path to your AWS configuration file',
          value: '/path/to/saved/config',
          valueSelection: undefined
        })
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('configFilePath', '/path/to/new/config')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Configuration file set to \'/path/to/new/config\'', 4000)
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith('extension.setProfile')
        expect(actual).toBeUndefined()
      })

    })

    describe('when no config file has been previously set', () => {

      it('uses the default config file path', async () => {
        jest.resetModules()
        jest.mock('../../../utils/file-exists', () => {
          return () => Promise.resolve(true)
        })
        jest.mock('../../../utils/read-file-as-string', () => {
          return () => Promise.resolve('[profile default]\nregion=us-west-1')
        })
        const vscode = require('vscode').default
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn().mockImplementation(() => Promise.resolve(''))
        vscode.window.showInputBox.mockImplementation(() => Promise.resolve('/path/to/new/config'))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setConfigFilePath = require('../../../commands/set-config-file-path').default
        const actual = await setConfigFilePath()()

        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath')
        expect(vscode.window.showInputBox).toHaveBeenCalledWith({
          prompt: 'Absolute path to your AWS configuration file',
          value: 'joined/path',
          valueSelection: undefined
        })
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('configFilePath', '/path/to/new/config')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Configuration file set to \'/path/to/new/config\'', 4000)
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith('extension.setProfile')
        expect(actual).toBeUndefined()
      })

    })

    describe('when no path is provided', () => {

      it('returns', async () => {
        jest.resetModules()
        jest.mock('../../../utils/file-exists', () => {
          return () => Promise.resolve(true)
        })
        jest.mock('../../../utils/read-file-as-string', () => {
          return () => Promise.resolve('[profile default]\nregion=us-west-1')
        })
        const vscode = require('vscode').default
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn().mockImplementation(() => Promise.resolve('/path/to/saved/config'))
        vscode.window.showInputBox.mockImplementation(() => Promise.resolve(''))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setConfigFilePath = require('../../../commands/set-config-file-path').default
        const actual = await setConfigFilePath()()

        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath')
        expect(vscode.window.showInputBox).toHaveBeenCalledWith({
          prompt: 'Absolute path to your AWS configuration file',
          value: '/path/to/saved/config',
          valueSelection: undefined
        })
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).not.toHaveBeenCalled()
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.commands.executeCommand).not.toHaveBeenCalled()
        expect(actual).toBeUndefined()
      })

    })

    describe('when the provided file doesn\'t exist', () => {

      it ('shows an error message', async () => {
        jest.resetModules()
        jest.mock('../../../utils/file-exists', () => {
          return () => Promise.resolve(false)
        })
        jest.mock('../../../utils/read-file-as-string', () => {
          return () => Promise.resolve('[profile default]\nregion=us-west-1')
        })
        const vscode = require('vscode').default
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn().mockImplementation(() => Promise.resolve('/path/to/saved/config'))
        vscode.window.showInputBox.mockImplementation(() => Promise.resolve('/path/to/new/config'))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setConfigFilePath = require('../../../commands/set-config-file-path').default
        const actual = await setConfigFilePath()()

        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath')
        expect(vscode.window.showInputBox).toHaveBeenCalledWith({
          prompt: 'Absolute path to your AWS configuration file',
          value: '/path/to/saved/config',
          valueSelection: undefined
        })
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).not.toHaveBeenCalled()
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.commands.executeCommand).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('No configuration file found at /path/to/new/config')
        expect(actual).toBeUndefined()
      })

    })

    describe('when the provided file doesn\'t have any profiles', () => {

      it ('shows an error message', async () => {
        jest.resetModules()
        jest.mock('../../../utils/file-exists', () => {
          return () => Promise.resolve(true)
        })
        jest.mock('../../../utils/read-file-as-string', () => {
          return () => Promise.resolve('# no profiles')
        })
        const vscode = require('vscode').default
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn().mockImplementation(() => Promise.resolve('/path/to/saved/config'))
        vscode.window.showInputBox.mockImplementation(() => Promise.resolve('/path/to/new/config'))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setConfigFilePath = require('../../../commands/set-config-file-path').default
        const actual = await setConfigFilePath()()

        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath')
        expect(vscode.window.showInputBox).toHaveBeenCalledWith({
          prompt: 'Absolute path to your AWS configuration file',
          value: '/path/to/saved/config',
          valueSelection: undefined
        })
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).not.toHaveBeenCalled()
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.commands.executeCommand).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('No configuration profiles found in /path/to/new/config')
        expect(actual).toBeUndefined()
      })

    })

  })

})
