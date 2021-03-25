jest.mock('../../commands', () => {
  return new Map([
    ['foo', jest.fn]
  ])
})

import { ExtensionContext } from 'vscode'
import * as extension from '../../extension'

describe('Extension', () => {

  it('exports an object', () => {
    expect(typeof extension).toBe('object')
    expect(extension).toHaveProperty('activate')
    expect(extension).toHaveProperty('deactivate')
    expect(typeof extension.activate).toBe('function')
    expect(typeof extension.deactivate).toBe('function')
  })

  describe('activate', () => {

    it('returns undefined', () => {
      const context = {
        subscriptions: [] as unknown
      } as ExtensionContext // TODO: Create better mock
      expect(extension.activate(context)).toBe(undefined)
    })

    it('populates context.subscriptions', () => {
      const context = {
        subscriptions: [] as unknown
      } as ExtensionContext // TODO: Create better mock
      extension.activate(context)
      expect(context.subscriptions.length).toBe(1)
      expect(context.subscriptions).toEqual([1])
    })

  })

  describe('deactivate', () => {

    it('returns undefined', () => {
      expect(extension.deactivate()).toBe(undefined)
    })

  })

})
