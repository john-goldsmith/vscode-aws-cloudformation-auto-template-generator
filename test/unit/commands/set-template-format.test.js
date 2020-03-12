const vscode = require('vscode') // See __mocks__/vscode.js

const setTemplateFormat = require('../../../commands/set-template-format')

describe('Commands', () => {

  describe('setTemplateFormat', () => {

    it('returns a function', () => {
      const actual = setTemplateFormat()
      expect(typeof actual).toBe('function')
    })

    describe('when all promises resolve', () => {

      it('shows a status bar message', async () => {
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'foo'}))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setTemplateFormat()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'JSON', value: 'json'},
          {label: 'YAML', value: 'yaml'}
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('templateFormat', 'foo')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Template format set to FOO', 4000)
        expect(actual).toBeUndefined()
      })

    })

    describe('when no template format is chosen', () => {

      it('does not update the workspace configuration', async () => {
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve())
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setTemplateFormat()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'JSON', value: 'json'},
          {label: 'YAML', value: 'yaml'}
        ])
        expect(vscode.workspace.getConfiguration).not.toHaveBeenCalled()
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).not.toHaveBeenCalled()
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(actual).toBeUndefined()
      })

    })

    describe('when updating the workspace configuration fails', () => {

      it('shows an error message', async () => {
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'foo'}))
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn(() => Promise.reject(new Error('fail')))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setTemplateFormat()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'JSON', value: 'json'},
          {label: 'YAML', value: 'yaml'}
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('templateFormat', 'foo')
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('fail')
        expect(actual).toBeUndefined()
      })

    })

  })

})
