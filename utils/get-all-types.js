/**
 * @module utils/get-all-types
 */

const { promisify } = require('util')

/**
 * @param {AWS.CloudFormation} cloudformation
 * @param {String} visibility
 * @param {String} nextToken
 * @param {Array} typeSummaries
 * @return {Promise<Array>}
 */
async function getAllTypes(cloudformation, visibility = 'PUBLIC', nextToken = null, typeSummaries = []) {
  const listTypesParams = {
    DeprecatedStatus: 'LIVE',
    MaxResults: 100,
    NextToken: nextToken,
    Visibility: visibility
  }
  const listTypes = promisify(cloudformation.listTypes.bind(cloudformation))
  const listTypesResponse = await listTypes(listTypesParams)
  typeSummaries.push(...listTypesResponse.TypeSummaries)
  if (listTypesResponse.NextToken) {
    await getAllTypes(cloudformation, visibility, listTypesResponse.NextToken, typeSummaries)
  }
  return typeSummaries
}

module.exports = getAllTypes
