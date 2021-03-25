import vscode, { ExtensionContext } from 'vscode'

import bustCache from '../../../commands/bust-cache'

describe('Commands', () => {

  describe('bustCache', () => {

    it('returns a function', () => {
      const context = {} as ExtensionContext
      const actual = bustCache(context)
      expect(typeof actual).toBe('function')
    })

    describe('when all promises resolve', () => {

      it('shows a status bar message', async () => {
        const context = {
          workspaceState: {
            update: jest.fn()
              .mockImplementationOnce(() => Promise.resolve())
              .mockImplementationOnce(() => Promise.resolve())
              .mockImplementationOnce(() => Promise.resolve())
              .mockImplementationOnce(() => Promise.resolve())
          } as unknown
        } as ExtensionContext
        const actual = await bustCache(context)()
        expect(context.workspaceState.update).toHaveBeenCalledTimes(4)
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(1, 'publicTypeListCache', {updatedAt: 0})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(2, 'publicTypeCache', {})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(3, 'privateTypeListCache', {updatedAt: 0})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(4, 'privateTypeCache', {})
        expect(vscode.window.setStatusBarMessage).toHaveBeenCalledWith('Cache busted', 3000)
        expect(actual).toBeUndefined()
      })

    })

    describe('when at least one promise rejects', () => {

      it('shows an error message', async () => {
        const context = {
          workspaceState: {
            update: jest.fn()
              .mockImplementationOnce(() => Promise.resolve())
              .mockImplementationOnce(() => Promise.reject(new Error('nope')))
              .mockImplementationOnce(() => Promise.resolve())
              .mockImplementationOnce(() => Promise.resolve())
          } as unknown
        } as ExtensionContext
        const actual = await bustCache(context)()
        expect(context.workspaceState.update).toHaveBeenCalledTimes(4)
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(1, 'publicTypeListCache', {updatedAt: 0})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(2, 'publicTypeCache', {})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(3, 'privateTypeListCache', {updatedAt: 0})
        expect(context.workspaceState.update).toHaveBeenNthCalledWith(4, 'privateTypeCache', {})
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('nope')
        expect(actual).toBeUndefined()
      })

    })

  })

})
