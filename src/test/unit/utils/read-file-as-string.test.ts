import readFileAsString from '../../../utils/read-file-as-string'
import { readFile } from 'fs-extra' // See __mocks__/fs-extra.js

describe('Utils', () => {

  describe('readFileAsString', () => {

    describe('when no options are provided', () => {

      it('defaults to utf-8 encoding', () => {
        readFileAsString('/foo/bar.txt')
        expect(readFile).toHaveBeenCalledWith('/foo/bar.txt', {encoding: 'utf8'})
      })

    })

    describe('when options are provided', () => {

      it('defaults to utf-8', () => {
        readFileAsString('/foo/bar/baz', {encoding: 'ascii'})
        expect(readFile).toHaveBeenCalledWith('/foo/bar/baz', {encoding: 'ascii'})
      })

    })

  })

})
