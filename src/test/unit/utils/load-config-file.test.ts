/* eslint-disable @typescript-eslint/no-var-requires */

jest.mock('path', () => {
  return {
    join: () => 'path/to/config'
  }
})

import path from 'path'

describe('Utils', () => {

  describe('loadConfig', () => {

    describe('when no file path is provided', () => {

      it('uses a default config location and returns a normalized object', async () => {
        jest.resetModules()

        jest.mock('../../../utils/file-exists', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve(true))
          }
        })

        jest.mock('../../../utils/get-home-dir', () => {
          return {
            __esModule: true,
            default: jest.fn(() => 'home')
          }
        })

        jest.mock('../../../utils/read-file-as-string', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve('# comment\n[profile test]\nregion = us-west-1'))
          }
        })

        jest.mock('../../../utils/parse-ini', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({'profile test': {region: 'us-west-1'}}))
          }
        })

        jest.mock('../../../utils/normalize-config-file', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({test1: {region: 'us-west-1'}}))
          }
        })

        const fileExistsSpy = require('../../../utils/file-exists').default
        const getHomeDirSpy = require('../../../utils/get-home-dir').default
        const readFileAsStringSpy = require('../../../utils/read-file-as-string').default
        const parseIniSpy = require('../../../utils/parse-ini').default
        const normalizeConfigFileSpy = require('../../../utils/normalize-config-file').default
        const loadConfigFile = require('../../../utils/load-config-file').default
        const actual = await loadConfigFile()
        const expected = {
          test1: {
            region: 'us-west-1'
          }
        }
        expect(getHomeDirSpy).toHaveBeenCalled()
        expect(fileExistsSpy).toHaveBeenCalledWith('path/to/config')
        expect(readFileAsStringSpy).toHaveBeenCalledWith('path/to/config')
        expect(parseIniSpy).toHaveBeenCalledWith('# comment\n[profile test]\nregion = us-west-1')
        expect(normalizeConfigFileSpy).toHaveBeenCalledWith({'profile test': {region: 'us-west-1'}})
        expect(actual).toStrictEqual(expected)
      })

    })

    describe('when the provided file does not exist', () => {

      it('shows an error and returns an empty object', async () => {
        // jest.resetModules()
        // const vscode = require('vscode').default
        // jest.mock('../../../utils/file-exists', () => {
        //   return () => Promise.resolve(false)
        // })
        // const loadConfigFile = require('../../../utils/load-config-file').default
        // const actual = await loadConfigFile('path/to/nowhere')
        // const expected = {}
        // expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('No configuration file found at path/to/nowhere')
        // expect(actual).toStrictEqual(expected)
        jest.resetModules()

        jest.mock('../../../utils/file-exists', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve(false))
          }
        })
        const fileExistsSpy = require('../../../utils/file-exists').default

        jest.mock('../../../utils/get-home-dir', () => {
          return {
            __esModule: true,
            default: jest.fn(() => 'home')
          }
        })
        const getHomeDirSpy = require('../../../utils/get-home-dir').default

        jest.spyOn(path, 'join').mockImplementation(() => 'path/to/config')

        jest.mock('../../../utils/read-file-as-string', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve('# comment\n[profile test]\nregion = us-west-1'))
          }
        })
        const readFileAsStringSpy = require('../../../utils/read-file-as-string').default

        jest.mock('../../../utils/parse-ini', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({'profile test': {region: 'us-west-1'}}))
          }
        })
        const parseIniSpy = require('../../../utils/parse-ini').default

        jest.mock('../../../utils/normalize-config-file', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({test1: {region: 'us-west-1'}}))
          }
        })
        const normalizeConfigFileSpy = require('../../../utils/normalize-config-file').default
        const vscode = require('vscode').default

        const loadConfigFile = require('../../../utils/load-config-file').default
        const actual = await loadConfigFile('path/to/nowhere')
        const expected = {}
        expect(getHomeDirSpy).not.toHaveBeenCalled()
        expect(path.join).not.toHaveBeenCalled()
        expect(fileExistsSpy).toHaveBeenCalledWith('path/to/nowhere')
        expect(vscode.window.showErrorMessage).toHaveBeenCalledWith('No configuration file found at path/to/nowhere')
        expect(readFileAsStringSpy).not.toHaveBeenCalled()
        expect(parseIniSpy).not.toHaveBeenCalled()
        expect(normalizeConfigFileSpy).not.toHaveBeenCalled()
        expect(actual).toStrictEqual(expected)
      })

    })

    describe('when the provided file exists', () => {

      it('returns a normalized object', async () => {
        jest.resetModules()

        jest.mock('../../../utils/file-exists', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve(true))
          }
        })
        const fileExistsSpy = require('../../../utils/file-exists').default

        jest.mock('../../../utils/get-home-dir', () => {
          return {
            __esModule: true,
            default: jest.fn(() => 'home')
          }
        })
        const getHomeDirSpy = require('../../../utils/get-home-dir').default

        jest.spyOn(path, 'join').mockImplementation(() => 'path/to/config')

        jest.mock('../../../utils/read-file-as-string', () => {
          return {
            __esModule: true,
            default: jest.fn(() => Promise.resolve('# comment\n[profile test]\nregion = us-west-1'))
          }
        })
        const readFileAsStringSpy = require('../../../utils/read-file-as-string').default

        jest.mock('../../../utils/parse-ini', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({'profile test': {region: 'us-west-1'}}))
          }
        })
        const parseIniSpy = require('../../../utils/parse-ini').default

        jest.mock('../../../utils/normalize-config-file', () => {
          return {
            __esModule: true,
            default: jest.fn(() => ({test1: {region: 'us-west-1'}}))
          }
        })
        const normalizeConfigFileSpy = require('../../../utils/normalize-config-file').default

        const loadConfigFile = require('../../../utils/load-config-file').default
        const actual = await loadConfigFile('foo/bar/baz.txt')
        const expected = {
          test1: {
            region: 'us-west-1'
          }
        }
        expect(getHomeDirSpy).not.toHaveBeenCalled()
        expect(path.join).not.toHaveBeenCalled()
        expect(fileExistsSpy).toHaveBeenCalledWith('foo/bar/baz.txt')
        expect(readFileAsStringSpy).toHaveBeenCalledWith('foo/bar/baz.txt')
        expect(parseIniSpy).toHaveBeenCalledWith('# comment\n[profile test]\nregion = us-west-1')
        expect(normalizeConfigFileSpy).toHaveBeenCalledWith({'profile test': {region: 'us-west-1'}})
        expect(actual).toStrictEqual(expected)
      })

    })

  })

})
