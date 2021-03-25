// import vscode from 'vscode' // See __mocks__/vscode.js
import vscode from '../../../../__mocks__/vscode'

import setResourceVisibility from '../../../commands/set-resource-visibility'

describe('Commands', () => {

  describe('setResourceVisibility', () => {

    it('returns a function', () => {
      const actual = setResourceVisibility()
      expect(typeof actual).toBe('function')
    })

    describe('when all promises resolve', () => {

      it('shows a status bar message', async () => {
        jest.clearAllMocks()
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Foo', value: 'foo'}))
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setResourceVisibility()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'PUBLIC', value: 'PUBLIC'},
          {label: 'PRIVATE', value: 'PRIVATE'}
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('resourceVisibility', 'foo')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Visibility set to \'foo\'', 4000)
        expect(actual).toBeUndefined()
      })

    })

    describe('when no resource visibility is chosen', () => {

      it('does not update the workspace configuration', async () => {
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve())
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setResourceVisibility()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'PUBLIC', value: 'PUBLIC'},
          {label: 'PRIVATE', value: 'PRIVATE'}
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
        const actual = await setResourceVisibility()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: 'PUBLIC', value: 'PUBLIC'},
          {label: 'PRIVATE', value: 'PRIVATE'}
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('resourceVisibility', 'foo')
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('fail')
        expect(actual).toBeUndefined()
      })

    })

  })

})
