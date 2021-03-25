import fileExists from '../../../utils/file-exists'
import fse from 'fs-extra' // See __mocks__/fs-extra.js

describe('Utils', () => {

  describe('fileExists', () => {

    describe('when the file exists', () => {

      it('returns true', async () => {
        jest.spyOn(fse, 'access').mockImplementation(() => Promise.resolve())
        const actual = await fileExists('/foo/bar.txt')
        expect(fse.access).toHaveBeenCalledWith('/foo/bar.txt')
        expect(actual).toBe(true)
      })

    })

    describe('when the file does not exist', () => {

      it('returns false', async () => {
        jest.spyOn(fse, 'access').mockImplementation(() => Promise.reject())
        const actual = await fileExists('/foo/bar/baz')
        expect(fse.access).toHaveBeenCalledWith('/foo/bar/baz')
        expect(actual).toBe(false)
      })

    })

  })

})
