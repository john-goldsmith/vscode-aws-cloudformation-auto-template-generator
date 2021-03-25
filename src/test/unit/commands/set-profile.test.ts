/* eslint-disable @typescript-eslint/no-var-requires */

jest.mock('path', () => {
  return {
    join: jest.fn(() => '/foo/bar/baz')
  }
})

describe('Commands', () => {

  describe('setProfile', () => {

    it('returns a function', () => {
      const setProfile = require('../../../commands/set-profile').default
      const actual = setProfile()
      expect(typeof actual).toBe('function')
    })

    describe('when all promises resolve', () => {

      it('shows a status bar message', async () => {
        jest.resetModules()
        const vscode = require('vscode').default
        jest.mock('../../../utils/load-config-file', () => {
          return () => Promise.resolve({
            fooProfile: {
              region: 'iceland'
            }
          })
        })
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
          .mockImplementationOnce(() => Promise.resolve())
          .mockImplementationOnce(() => Promise.resolve())
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn(() => 'path/to/config')
        const objectKeysSpy = jest.spyOn(Object, 'keys')
        // const arrayProtoTypeMapSpy = jest.spyOn(Array.prototype, 'map')
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'fooProfile'}))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setProfile = require('../../../commands/set-profile').default
        const actual = await setProfile()()
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath', '/foo/bar/baz')
        expect(objectKeysSpy).toHaveBeenCalledWith({
          fooProfile: {
            region: 'iceland'
          }
        })
        // expect(arrayProtoTypeMapSpy).toHaveBeenCalledWith()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'fooProfile', value: 'fooProfile'}
        ])
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenNthCalledWith(1, 'profile', 'fooProfile')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenNthCalledWith(2, 'region', 'iceland')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Profile set to \'fooProfile\'', 3000)
        expect(vscode.window.showErrorMessage).not.toHaveBeenCalled()
        expect(actual).toBeUndefined()
      })

    })

    describe('when no region is chosen', () => {

      it('does not update the workspace configuration', async () => {
        jest.resetModules()
        const vscode = require('vscode').default
        jest.mock('../../../utils/load-config-file', () => {
          return () => Promise.resolve({
            fooProfile: {
              region: 'iceland'
            }
          })
        })
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn(() => 'path/to/config')
        const objectKeysSpy = jest.spyOn(Object, 'keys')
        // const arrayProtoTypeMapSpy = jest.spyOn(Array.prototype, 'map')
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve())
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setProfile = require('../../../commands/set-profile').default
        const actual = await setProfile()()
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath', '/foo/bar/baz')
        expect(objectKeysSpy).toHaveBeenCalledWith({
          fooProfile: {
            region: 'iceland'
          }
        })
        // expect(arrayProtoTypeMapSpy).toHaveBeenCalledWith()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'fooProfile', value: 'fooProfile'}
        ])
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).not.toHaveBeenCalled()
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).not.toHaveBeenCalled()
        expect(actual).toBeUndefined()
      })

    })

    describe('when updating the workspace configuration fails', () => {

      it('shows an error message', async () => {
        jest.resetModules()
        const vscode = require('vscode').default
        jest.mock('../../../utils/load-config-file', () => {
          return () => Promise.resolve({
            fooProfile: {
              region: 'iceland'
            }
          })
        })
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn(() => Promise.reject(new Error('failure')))
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn(() => 'path/to/config')
        const objectKeysSpy = jest.spyOn(Object, 'keys')
        // const arrayProtoTypeMapSpy = jest.spyOn(Array.prototype, 'map')
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'fooProfile'}))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setProfile = require('../../../commands/set-profile').default
        const actual = await setProfile()()
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath', '/foo/bar/baz')
        expect(objectKeysSpy).toHaveBeenCalledWith({
          fooProfile: {
            region: 'iceland'
          }
        })
        // expect(arrayProtoTypeMapSpy).toHaveBeenCalledWith()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'fooProfile', value: 'fooProfile'}
        ])
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('profile', 'fooProfile')
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('failure')
        expect(actual).toBeUndefined()
      })

    })

    describe('when no profile region is set', () => {

      it('calls the \'setRegion\' command', async () => {
        jest.resetModules()
        const vscode = require('vscode').default
        jest.mock('../../../utils/load-config-file', () => {
          return () => Promise.resolve({
            fooProfile: {}
          })
        })
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
          .mockImplementationOnce(() => Promise.resolve())
          .mockImplementationOnce(() => Promise.resolve())
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn(() => 'path/to/config')
        const objectKeysSpy = jest.spyOn(Object, 'keys')
        // const arrayProtoTypeMapSpy = jest.spyOn(Array.prototype, 'map')
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'fooProfile'}))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy,
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const setProfile = require('../../../commands/set-profile').default
        const actual = await setProfile()()
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('configFilePath', '/foo/bar/baz')
        expect(objectKeysSpy).toHaveBeenCalledWith({
          fooProfile: {}
        })
        // expect(arrayProtoTypeMapSpy).toHaveBeenCalledWith()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'fooProfile', value: 'fooProfile'}
        ])
        expect(vscode.commands.executeCommand).toHaveBeenCalledWith('extension.setRegion')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledTimes(1)
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('profile', 'fooProfile')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Profile set to \'fooProfile\'', 3000)
        expect(vscode.window.showErrorMessage).not.toHaveBeenCalled()
        expect(actual).toBeUndefined()
      })

    })

  })

})
