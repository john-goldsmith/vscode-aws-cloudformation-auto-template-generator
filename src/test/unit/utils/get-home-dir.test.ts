jest.mock('os', () => {
  return {
    homedir: jest.fn(() => '/blah')
  }
})
jest.mock('path', () => {
  return {
    sep: '+'
  }
})

import os from 'os'

import getHomeDir from '../../../utils/get-home-dir'

describe('Utils', () => {

  describe('getHomeDir', () => {

    let realProcessEnv: NodeJS.ProcessEnv

    beforeAll(() => {
      realProcessEnv = Object.assign({}, process.env)
    })

    afterAll(() => {
      process.env = realProcessEnv
    })

    describe('when the HOME environment variable is set', () => {

      it('returns it', () => {
        process.env.HOME = 'home'
        process.env.USERPROFILE = ''
        process.env.HOMEPATH = ''
        process.env.HOMEDRIVE = ''
        const actual = getHomeDir()
        expect(actual).toBe('home')
      })

    })

    describe('when the USERPROFILE environment variable is set', () => {

      it('returns it', () => {
        process.env.HOME = ''
        process.env.USERPROFILE = 'userprofile'
        process.env.HOMEPATH = ''
        process.env.HOMEDRIVE = ''
        const actual = getHomeDir()
        expect(actual).toBe('userprofile')
      })

    })

    describe('when the HOMEPATH environment variable is set', () => {

      describe('when the HOMEDRIVE environment variable is not set', () => {

        it('appends it to the default HOMEDRIVE', () => {
          process.env.HOME = ''
          process.env.USERPROFILE = ''
          process.env.HOMEPATH = 'homepath'
          delete process.env.HOMEDRIVE
          const actual = getHomeDir()
          expect(actual).toBe('C:+homepath')
        })

      })

      describe('when the HOMEDRIVE environment variable is set', () => {

        it('appends it to the provided HOMEDRIVE', () => {
          process.env.HOME = ''
          process.env.USERPROFILE = ''
          process.env.HOMEPATH = 'homepath'
          process.env.HOMEDRIVE = 'D:|'
          const actual = getHomeDir()
          expect(actual).toBe('D:|homepath')
        })

      })

    })

    describe('when none of the environment variables are set', () => {

      it('uses os.homedir', () => {
        process.env.HOME = ''
        process.env.USERPROFILE = ''
        process.env.HOMEPATH = ''
        process.env.HOMEDRIVE = ''
        jest.spyOn(os, 'homedir').mockImplementation(() => '/blah/glah')
        const actual = getHomeDir()
        expect(actual).toBe('/blah/glah')
      })

    })

  })

})
