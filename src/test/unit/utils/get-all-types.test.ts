/* eslint-disable @typescript-eslint/no-var-requires */

describe('Utils', () => {

  describe('getAllTypes', () => {

    describe('when no next token is provided', () => {

      it('does not recurse and returns an array', async () => {
        jest.resetModules()
        const AWS = require('aws-sdk')
        const util = require('util')
        const cloudformation = new AWS.CloudFormation()
        const visibility = 'visibility'
        const nextToken = undefined
        // @ts-expect-error Variable 'typeSummaries' implicitly has type 'any[]' in some locations where its type cannot be determined.
        const typeSummaries = []
        const apiResponse = {
          TypeSummaries: [
            {
              TypeName: "AWS::DummyResource",
              TypeArn: "arn:aws:cloudformation:us-east-1::type/resource/AWS-DummyResource",
              Type: "RESOURCE",
              LastUpdated: "2019-11-15T17:25:48.517Z"
            }
          ]
        }
        const listTypesSpy = jest.fn().mockImplementation(() => {
          return Promise.resolve(apiResponse)
        })
        const utilPromisifySpy = jest.spyOn(util, 'promisify').mockImplementation(() => listTypesSpy)

        const getAllTypes = require('../../../utils/get-all-types').default
        const listTypesParams = {
          DeprecatedStatus: 'LIVE',
          MaxResults: 100,
          NextToken: nextToken,
          Visibility: visibility
        }
        const expected = [
          {
            TypeName: "AWS::DummyResource",
            TypeArn: "arn:aws:cloudformation:us-east-1::type/resource/AWS-DummyResource",
            Type: "RESOURCE",
            LastUpdated: "2019-11-15T17:25:48.517Z"
          }
        ]
        // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'ConstructorPropertyNames<any[]>'.
        const typeSummariesPushSpy = jest.spyOn(Array.prototype, 'push')
        // @ts-expect-error Variable 'typeSummaries' implicitly has an 'any[]' type.
        const actual = await getAllTypes(cloudformation, visibility, nextToken, typeSummaries)

        expect(utilPromisifySpy).toHaveBeenCalled()
        expect(listTypesSpy).toHaveBeenCalledWith(listTypesParams)
        expect(typeSummariesPushSpy).toHaveBeenCalledWith(...apiResponse.TypeSummaries)
        expect(actual).toMatchObject(expected)
      })

    })

    describe('when the API call fails', () => {

      it('returns the current state of type summaries', async () => {
        jest.resetModules()
        const AWS = require('aws-sdk')
        const util = require('util')
        const cloudformation = new AWS.CloudFormation()
        const visibility = 'visibility'
        const nextToken = undefined
        const typeSummaries = [{
          test: 1
        }]
        const listTypesSpy = jest.fn().mockImplementation(() => {
          return Promise.reject()
        })
        const utilPromisifySpy = jest.spyOn(util, 'promisify').mockImplementation(() => listTypesSpy)
        const getAllTypes = require('../../../utils/get-all-types').default
        const listTypesParams = {
          DeprecatedStatus: 'LIVE',
          MaxResults: 100,
          NextToken: nextToken,
          Visibility: visibility
        }
        // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'ConstructorPropertyNames<any[]>'.
        const typeSummariesPushSpy = jest.spyOn(Array.prototype, 'push')
        const actual = await getAllTypes(cloudformation, visibility, nextToken, typeSummaries)

        expect(utilPromisifySpy).toHaveBeenCalled()
        expect(listTypesSpy).toHaveBeenCalledWith(listTypesParams)
        expect(typeSummariesPushSpy).not.toHaveBeenCalledWith({test: 1})
        expect(actual).toMatchObject(typeSummaries)
      })

    })

    describe('when a next token is provided', () => {

      it('is called recursively and returns and array', async () => {
        jest.resetModules()
        const AWS = require('aws-sdk')
        const util = require('util')
        const cloudformation = new AWS.CloudFormation()
        const listTypesSpy = jest.fn()
          .mockImplementationOnce(() => {
            return Promise.resolve({
              TypeSummaries: [
                {
                  foo: 1
                },
                {
                  foo: 2
                }
              ],
              NextToken: 'abc123'
            })
          })
          .mockImplementationOnce(() => {
            return Promise.resolve({
              TypeSummaries: [
                {
                  foo: 3
                },
                {
                  foo: 4
                }
              ]
              // Note the absence of the 'NextToken' property
            })
          })
        const utilPromisifySpy = jest.spyOn(util, 'promisify').mockImplementation(() => listTypesSpy)
        const getAllTypes = require('../../../utils/get-all-types').default
        // @ts-expect-error Argument of type 'string' is not assignable to parameter of type 'ConstructorPropertyNames<any[]>'
        const typeSummariesPushSpy = jest.spyOn(Array.prototype, 'push')
        typeSummariesPushSpy.mockReset() // Lots of other things call Array#push
        const actual = await getAllTypes(cloudformation/*, visibility, nextToken, typeSummaries*/)

        expect(utilPromisifySpy).toHaveBeenCalledTimes(2)
        expect(listTypesSpy).toHaveBeenCalledTimes(2)
        expect(listTypesSpy).toHaveBeenNthCalledWith(1, {
          DeprecatedStatus: 'LIVE',
          MaxResults: 100,
          NextToken: undefined,
          Visibility: 'PUBLIC'
        })
        expect(listTypesSpy).toHaveBeenNthCalledWith(2, {
          DeprecatedStatus: 'LIVE',
          MaxResults: 100,
          NextToken: 'abc123',
          Visibility: 'PUBLIC'
        })
        expect(typeSummariesPushSpy).toHaveBeenNthCalledWith(1,
          {
            foo: 1
          },
          {
            foo: 2
          }
        )
        expect(typeSummariesPushSpy).toHaveBeenNthCalledWith(2,
          {
            foo: 3
          },
          {
            foo: 4
          }
        )
        expect(actual).toMatchObject([
          {
            foo: 1
          },
          {
            foo: 2
          },
          {
            foo: 3
          },
          {
            foo: 4
          }
        ])
      })

    })

  })

})
