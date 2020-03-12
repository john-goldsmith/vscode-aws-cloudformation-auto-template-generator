// jest.resetModules()
jest.mock('../../../utils/get-home-dir', () => {
  return () => 'home'
})
jest.mock('path', () => {
  return {
    join: () => 'joined/path'
  }
})
// const setConfigFilePath = require('../../../commands/set-config-file-path')

describe('Commands', () => {

  describe('insertResource', () => {

    it('returns a function', () => {
      jest.resetModules()
      const insertResource = require('../../../commands/insert-resource')
      const actual = insertResource()
      expect(typeof actual).toBe('function')
    })

    /*describe('when the current file mode is JSON', () => {

      it('inserts a JSON template and selects the logical ID', async () => {
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('editor')
        expect(editorWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('tabsize')
        expect(workspaceGetConfigurationGetSpy).toHaveBeenCalledWith('profile')
        expect(workspaceGetConfigurationGetSpy).toHaveBeenCalledWith('region')
        expect(AWS.SharedIniFileCredentials).toHaveBeenCalledWith({profile: ''})
        expect(workspaceGetConfigurationGetSpy).toHaveBeenCalledWith('resourceVisibility', 'PUBLIC')
        expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(1, 'PUBLIC')
        expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(2, 'PUBLIC')
        expect(vscode.workspaceState.get).toHaveBeenCalledWith('', {updatedAt: 0})
        expect(isExpiredSpy).toHaveBeenNthCalledWith(1, 0, 1)
        expect(vscode.window.withProgress).toHaveBeenCalledWith({location, title}, () => {})
        expect(getAllTypesSpy).toHaveBeenCalledWith(cloudformation, 'PUBLIC')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Fetched ${} resources', 3000)
        expect(vscode.workspaceState.update).toHaveBeenCalledWith('', {updatedAt: 0, typeSummaries: []})
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          {label: '', value: ''}
        ])
        expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(3, 'PUBLIC')
        expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(4, 'PUBLIC')
        expect(vscode.workspaceState.get).toHaveBeenCalledWith('', {})
        expect(isExpiredSpy).toHaveBeenNthCalledWith(2, 0, 1)
        expect(util.promisify).toHaveBeenCalledWith()
        expect(vscode.window.withProgress).toHaveBeenCalledWith({location, title}, () => {})
        expect(describeTypeSpy).toHaveBeenCalledWith({})
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Fetched ${}', 3000)
        expect(vscode.workspaceState.update).toHaveBeenCalledWith('', {})
        expect(isValidTemplateFormatSpy).toHaveBeenCalledWith('')
        expect(jsonParseSpy).toHaveBeenCalledWith()
        expect(vscode.Position).toHaveBeenCalledWith(0, 0)
        expect(getTemplateSpy).toHaveBeenCalledWith({})
        expect(isFormatJsonSpy).toHaveBeenCalledWith('')
        expect(jsonStringifySpy).toHaveBeenCalledWith({}, null, 2)
        expect(vscode.window.activeTextEditor.edit).toHaveBeenCalledWith(() => {})
        expect(isFormatJsonSpy).toHaveBeenCalledWith('')
        expect(vscode.Selection).toHaveBeenCalledWith(position1, position2)

        // VS Code call counts
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledTimes(2)
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledTimes(2)
        expect(vscode.window.withProgress).toHaveBeenCalledTimes(2)
        expect(vscode.window.showQuickPick).toHaveBeenCalledTimes(1)
        expect(vscode.workspaceState.update).toHaveBeenCalledTimes(2)
        expect(vscode.workspaceState.get).toHaveBeenCalledTimes(2)
        expect(vscode.window.activeTextEditor.edit).toHaveBeenCalledTimes(1)
        expect(vscode.Position).toHaveBeenCalledTimes(5)
        expect(vscode.Selection).toHaveBeenCalledTimes(1)

        // Other call counts
        expect(isFormatJsonSpy).toHaveBeenCalledTimes(2)
        expect(getAllTypesSpy).toHaveBeenCalledTimes(1)
        expect(describeTypeSpy).toHaveBeenCalledTimes(1)
        expect(isExpiredSpy).toHaveBeenCalledTimes(2)
        expect(isValidTemplateFormatSpy).toHaveBeenCalledTimes(1)
        expect(isVisibilityPublicSpy).toHaveBeenCalledTimes(4)
        expect(getTemplateSpy).toHaveBeenCalledTimes(1)
        expect(jsonParseSpy).toHaveBeenCalledTimes(1)
        expect(jsonStringifySpy).toHaveBeenCalledTimes(1)
        expect(workspaceGetConfigurationGetSpy).toHaveBeenCalledTimes(3)
        expect(util.promisify).toHaveBeenCalledTimes(1)
      })

    })*/

    /*describe('when the current file mode is YAML', () => {

      it('inserts a YAML template and selects the logical ID', async () => {

      })

    })*/

    /*describe('when the current file mode is neither JSON nor YAML', () => {

      it('inserts the default template format and selects the logical ID', async () => {

      })

    })*/

    /*describe('when one of the promises rejects', () => {

      it('shows an error message', async () => {

      })

    })*/

    /*describe('when there is no active text editor', () => {

      it('shows an error message', async () => {

      })

    })*/

    /*describe('when the access key ID is missing', () => {

      it('shows an error message', async () => {

      })

    })*/

    /*describe('when the secret access key is missing', () => {

      it('shows an error message', async () => {

      })

    })*/

    /*describe('when no type is selected', () => {

      it('returns', async () => {

      })

    })*/

    /*describe('when types cache is expired', () => {

      it('fetches new types and caches them', async () => {

      })

    })*/

    /*describe('when the selected type cache is expired', () => {

      it('fetches the type and caches it', async () => {

      })

    })*/

  })

})
