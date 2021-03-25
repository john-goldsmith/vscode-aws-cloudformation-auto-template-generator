import vscode from '../../../../__mocks__/vscode'

import setRegion from '../../../commands/set-region'

describe('Commands', () => {

  describe('setRegion', () => {

    it('returns a function', () => {
      const actual = setRegion()
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
        const actual = await setRegion()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1'},
          { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2'},
          { label: 'US West (N. California) (us-west-1)', value: 'us-west-1'},
          { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2'},
          { label: 'Africa (Cape Town) (af-south-1)', value: 'af-south-1'},
          { label: 'Asia Pacific (Hong Kong) (ap-east-1)', value: 'ap-east-1'},
          { label: 'Asia Pacific (Mumbai) (ap-south-1)', value: 'ap-south-1'},
          { label: 'Asia Pacific (Osaka) (ap-northeast-3)', value: 'ap-northeast-3'},
          { label: 'Asia Pacific (Seoul) (ap-northeast-2)', value: 'ap-northeast-2'},
          { label: 'Asia Pacific (Singapore) (ap-southeast-1)', value: 'ap-southeast-1'},
          { label: 'Asia Pacific (Sydney) (ap-southeast-2)', value: 'ap-southeast-2'},
          { label: 'Asia Pacific (Tokyo) (ap-northeast-1)', value: 'ap-northeast-1'},
          { label: 'Canada (Central) (ca-central-1)', value: 'ca-central-1'},
          { label: 'Europe (Frankfurt) (eu-central-1)', value: 'eu-central-1'},
          { label: 'Europe (Ireland) (eu-west-1)', value: 'eu-west-1'},
          { label: 'Europe (London) (eu-west-2)', value: 'eu-west-2'},
          { label: 'Europe (Paris) (eu-west-3)', value: 'eu-west-3'},
          { label: 'Europe (Milan) (eu-south-1)', value: 'eu-south-1'},
          { label: 'Europe (Stockholm) (eu-north-1)', value: 'eu-north-1'},
          { label: 'Middle East (Bahrain) (me-south-1)', value: 'me-south-1'},
          { label: 'South America (São Paulo) (sa-east-1)', value: 'sa-east-1'},
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('region', 'foo')
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Region set to \'foo\'', 3000)
        expect(actual).toBeUndefined()
      })

    })

    describe('when no region is chosen', () => {

      it('does not update the workspace configuration', async () => {
        vscode.window.showQuickPick.mockImplementation(() => Promise.resolve())
        const vscodeWorkspaceGetConfigurationUpdateSpy = jest.fn()
        vscode.workspace.getConfiguration.mockImplementation(() => {
          return {
            update: vscodeWorkspaceGetConfigurationUpdateSpy
          }
        })
        const actual = await setRegion()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1'},
          { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2'},
          { label: 'US West (N. California) (us-west-1)', value: 'us-west-1'},
          { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2'},
          { label: 'Africa (Cape Town) (af-south-1)', value: 'af-south-1'},
          { label: 'Asia Pacific (Hong Kong) (ap-east-1)', value: 'ap-east-1'},
          { label: 'Asia Pacific (Mumbai) (ap-south-1)', value: 'ap-south-1'},
          { label: 'Asia Pacific (Osaka) (ap-northeast-3)', value: 'ap-northeast-3'},
          { label: 'Asia Pacific (Seoul) (ap-northeast-2)', value: 'ap-northeast-2'},
          { label: 'Asia Pacific (Singapore) (ap-southeast-1)', value: 'ap-southeast-1'},
          { label: 'Asia Pacific (Sydney) (ap-southeast-2)', value: 'ap-southeast-2'},
          { label: 'Asia Pacific (Tokyo) (ap-northeast-1)', value: 'ap-northeast-1'},
          { label: 'Canada (Central) (ca-central-1)', value: 'ca-central-1'},
          { label: 'Europe (Frankfurt) (eu-central-1)', value: 'eu-central-1'},
          { label: 'Europe (Ireland) (eu-west-1)', value: 'eu-west-1'},
          { label: 'Europe (London) (eu-west-2)', value: 'eu-west-2'},
          { label: 'Europe (Paris) (eu-west-3)', value: 'eu-west-3'},
          { label: 'Europe (Milan) (eu-south-1)', value: 'eu-south-1'},
          { label: 'Europe (Stockholm) (eu-north-1)', value: 'eu-north-1'},
          { label: 'Middle East (Bahrain) (me-south-1)', value: 'me-south-1'},
          { label: 'South America (São Paulo) (sa-east-1)', value: 'sa-east-1'},
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
        const actual = await setRegion()()
        expect(vscode.window.showQuickPick).toHaveBeenCalledWith([
          { label: 'US East (N. Virginia) (us-east-1)', value: 'us-east-1'},
          { label: 'US East (Ohio) (us-east-2)', value: 'us-east-2'},
          { label: 'US West (N. California) (us-west-1)', value: 'us-west-1'},
          { label: 'US West (Oregon) (us-west-2)', value: 'us-west-2'},
          { label: 'Africa (Cape Town) (af-south-1)', value: 'af-south-1'},
          { label: 'Asia Pacific (Hong Kong) (ap-east-1)', value: 'ap-east-1'},
          { label: 'Asia Pacific (Mumbai) (ap-south-1)', value: 'ap-south-1'},
          { label: 'Asia Pacific (Osaka) (ap-northeast-3)', value: 'ap-northeast-3'},
          { label: 'Asia Pacific (Seoul) (ap-northeast-2)', value: 'ap-northeast-2'},
          { label: 'Asia Pacific (Singapore) (ap-southeast-1)', value: 'ap-southeast-1'},
          { label: 'Asia Pacific (Sydney) (ap-southeast-2)', value: 'ap-southeast-2'},
          { label: 'Asia Pacific (Tokyo) (ap-northeast-1)', value: 'ap-northeast-1'},
          { label: 'Canada (Central) (ca-central-1)', value: 'ca-central-1'},
          { label: 'Europe (Frankfurt) (eu-central-1)', value: 'eu-central-1'},
          { label: 'Europe (Ireland) (eu-west-1)', value: 'eu-west-1'},
          { label: 'Europe (London) (eu-west-2)', value: 'eu-west-2'},
          { label: 'Europe (Paris) (eu-west-3)', value: 'eu-west-3'},
          { label: 'Europe (Milan) (eu-south-1)', value: 'eu-south-1'},
          { label: 'Europe (Stockholm) (eu-north-1)', value: 'eu-north-1'},
          { label: 'Middle East (Bahrain) (me-south-1)', value: 'me-south-1'},
          { label: 'South America (São Paulo) (sa-east-1)', value: 'sa-east-1'},
        ])
        expect(vscode.workspace.getConfiguration).toHaveBeenCalledWith('awsCfnAutoTemplateGenerator')
        expect(vscodeWorkspaceGetConfigurationUpdateSpy).toHaveBeenCalledWith('region', 'foo')
        expect(vscode.window.setStatusBarMessage).not.toHaveBeenCalled()
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('fail')
        expect(actual).toBeUndefined()
      })

    })

  })

})
