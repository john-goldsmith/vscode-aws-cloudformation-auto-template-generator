jest.mock('aws-sdk')
jest.mock('../../../utils/get-home-dir', () => {
  return () => 'home'
})
jest.mock('path', () => {
  return {
    join: () => 'joined/path'
  }
})

describe('Commands', () => {

  describe('insertResource', () => {

    it('returns a function', () => {
      jest.resetModules()
      const insertResource = require('../../../commands/insert-resource')
      const actual = insertResource()
      expect(typeof actual).toBe('function')
    })

    describe('when the current file mode is JSON', () => {

      it('inserts a JSON template and selects the logical ID', async () => {
        jest.resetModules()
        jest.mock('../../../utils/is-visibility-public', () => {
          return () => true
        })
        const vscode = require('vscode')
        const vscodeWorkspaceGetConfigurationGetSpy = jest.fn()
          .mockImplementationOnce(() => Promise.resolve(2)) // editor.tabSize
          .mockImplementationOnce(() => Promise.resolve('myProfile')) // awsCfnAutoTemplateGenerator.profile
          .mockImplementationOnce(() => Promise.resolve('region-1')) // awsCfnAutoTemplateGenerator.region
          .mockImplementationOnce(() => Promise.resolve('public')) // awsCfnAutoTemplateGenerator.resourceVisibility
          .mockImplementationOnce(() => Promise.resolve('json')) // awsCfnAutoTemplateGenerator.templateFormat
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            get: vscodeWorkspaceGetConfigurationGetSpy
          }
        })
        const textEditorEditInsertSpy = jest.fn()
        vscode.TextEditorEdit = jest.fn(() => {
          return {
            insert: textEditorEditInsertSpy
          }
        })
        vscode.window.activeTextEditor = {
          edit: jest.fn(/*textEditorEdit => textEditorEdit.insert()*/),
          document: {
            languageId: 'json'
          },
          selection: {
            active: {
              line: 0,
              character: 0
            }
          }
        }
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve({label: 'Option', value: 'option'}))
        const contextWorkspaceStateGetSpy = jest.fn()
          .mockImplementationOnce(() => { // type list cache
            return Promise.resolve({
              updatedAt: Date.now() + (1000 * 60 * 60), // 1 hour in the future
              typeSummaries: [
                {TypeName: 'Foo'},
                {TypeName: 'Bar'},
                {TypeName: 'Baz'}
              ]
            })
          })
          .mockImplementationOnce(() => {
            return Promise.resolve({ // type cache
              option: {
                updatedAt: Date.now() + (1000 * 60 * 60), // 1 hour in the future
                data: {
                  Schema: JSON.stringify(
                    {
                      typeName: 'AWS::Foo',
                      readOnlyProperties: [],
                      properties: {},
                      definitions: {}
                    }
                  )
                }
              }
            })
          }) // type cache
        const contextWorkspaceStateUpdateSpy = jest.fn()
          .mockImplementationOnce(() => {}) // type list cache
          .mockImplementationOnce(() => {}) // type cache
        const context = {
          workspaceState: {
            get: contextWorkspaceStateGetSpy,
            update: contextWorkspaceStateUpdateSpy
          }
        }
        const AWS = require('aws-sdk')
        AWS.SharedIniFileCredentials.prototype.constructor.mockImplementation(() => {
          return {
            accessKeyId: 'access-key-id',
            secretAccessKey: 'secret-access-key'
          }
        })
        const insertResource = require('../../../commands/insert-resource')
        const actual = await insertResource(context)()
        expect(actual).toBeUndefined()
        expect(vscode.workspace.getConfiguration).toHaveBeenCalled()
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('editor.tabSize')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator.profile', 'default')
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator.region', 'us-east-1')
        expect(AWS.SharedIniFileCredentials).toHaveBeenCalledWith({profile: 'myProfile'})
        expect(vscodeWorkspaceGetConfigurationGetSpy).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator.resourceVisibility', 'PUBLIC')
        // expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(1, 'PUBLIC')
        // expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(2, 'PUBLIC')
        expect(context.workspaceState.get).toHaveBeenCalledWith('publicTypeListCache', {updatedAt: 0})
        // expect(isExpiredSpy).toHaveBeenNthCalledWith(1, 0, 1)
        // expect(vscode.window.withProgress).toHaveBeenCalledWith({location, title}, () => {})
        // expect(getAllTypesSpy).toHaveBeenCalledWith(cloudformation, 'PUBLIC')
        // expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Fetched 1 resources', 3000)
        // expect(vscode.workspaceState.update).toHaveBeenCalledWith('', {updatedAt: 0, typeSummaries: []})
        // expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
        //   {label: '', value: ''}
        // ])
        // expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(3, 'PUBLIC')
        // expect(isVisibilityPublicSpy).toHaveBeenNthCalledWith(4, 'PUBLIC')
        // expect(vscode.workspaceState.get).toHaveBeenCalledWith('', {})
        // expect(isExpiredSpy).toHaveBeenNthCalledWith(2, 0, 1)
        // expect(util.promisify).toHaveBeenCalledWith()
        // expect(vscode.window.withProgress).toHaveBeenCalledWith({location, title}, () => {})
        // expect(describeTypeSpy).toHaveBeenCalledWith({})
        // expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Fetched ${}', 3000)
        // expect(vscode.workspaceState.update).toHaveBeenCalledWith('', {})
        // expect(isValidTemplateFormatSpy).toHaveBeenCalledWith('')
        // expect(jsonParseSpy).toHaveBeenCalledWith()
        // expect(vscode.Position).toHaveBeenCalledWith(0, 0)
        // expect(getTemplateSpy).toHaveBeenCalledWith({})
        // expect(isFormatJsonSpy).toHaveBeenCalledWith('')
        // expect(jsonStringifySpy).toHaveBeenCalledWith({}, null, 2)
        expect(vscode.window.activeTextEditor.edit).toHaveBeenCalled()
        // expect(textEditorEditInsertSpy).toHaveBeenCalled()
        // expect(isFormatJsonSpy).toHaveBeenCalledWith('')
        // expect(vscode.Selection).toHaveBeenCalledWith(position1, position2)

        // // VS Code call counts
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledTimes(1)
        // expect(vscode.window.setStatusBarMessage).toHaveBeenCalledTimes(2)
        // expect(vscode.window.withProgress).toHaveBeenCalledTimes(2)
        expect(vscode.window.showQuickPick).toHaveBeenCalledTimes(1)
        // expect(vscode.workspaceState.update).toHaveBeenCalledTimes(2)
        expect(contextWorkspaceStateGetSpy).toHaveBeenCalledTimes(2)
        expect(vscode.window.activeTextEditor.edit).toHaveBeenCalledTimes(1)
        expect(vscode.Position).toHaveBeenCalledTimes(1)
        expect(vscode.Selection).toHaveBeenCalledTimes(1)

        // // Other call counts
        // expect(isFormatJsonSpy).toHaveBeenCalledTimes(2)
        // expect(getAllTypesSpy).toHaveBeenCalledTimes(1)
        // expect(describeTypeSpy).toHaveBeenCalledTimes(1)
        // expect(isExpiredSpy).toHaveBeenCalledTimes(2)
        // expect(isValidTemplateFormatSpy).toHaveBeenCalledTimes(1)
        // expect(isVisibilityPublicSpy).toHaveBeenCalledTimes(4)
        // expect(getTemplateSpy).toHaveBeenCalledTimes(1)
        // expect(jsonParseSpy).toHaveBeenCalledTimes(1)
        // expect(jsonStringifySpy).toHaveBeenCalledTimes(1)
        // expect(workspaceGetConfigurationGetSpy).toHaveBeenCalledTimes(3)
        // expect(util.promisify).toHaveBeenCalledTimes(1)
      })

    })

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

    describe('when there is no active text editor', () => {

      it('shows an error message', async () => {
        jest.resetModules()
        const vscode = require('vscode')
        vscode.window.activeTextEditor = null
        const insertResource = require('../../../commands/insert-resource')
        const actual = await insertResource()()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('No active text editor')
        expect(actual).toBeUndefined()
      })

    })

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
