const { promisify } = require('util')

/**
 * Fetches a list of all CloudFormation types. If the previous paginated
 * request didn't return all of the remaining results, the response
 * object's `NextToken` parameter value is set to a token, and this
 * function will be called recursilvey until the `NextToken` parameter
 * is `null`, indicating that there are no more results.
 *
 * @async
 * @param {AWS.CloudFormation} cloudformation A configured CloudFormation instance
 * @param {string} visibility One of 'PUBLIC' or 'PRIVATE'
 * @param {string} nextToken An AWS-issued token indicating that there are more results available, or `null` if there are no more results
 * @param {Array} typeSummaries An array storing previous results
 * @return {Promise<Array>}
 */
async function getAllTypes(cloudformation, visibility = 'PUBLIC', nextToken = null, typeSummaries = []) {
  try {
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
  } catch (err) {
    return typeSummaries
  }
}

module.exports = getAllTypes
