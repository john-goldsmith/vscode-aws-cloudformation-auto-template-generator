import { promisify } from 'util'
import { CloudFormation } from 'aws-sdk'

/**
 * Fetches a list of all CloudFormation types. If the previous paginated
 * request didn't return all of the remaining results, the response
 * object's `NextToken` parameter value is set to a token, and this
 * function will be called recursilvey until the `NextToken` parameter
 * is `null`, indicating that there are no more results.
 *
 * @async
 * @param {CloudFormation} cloudformation A configured CloudFormation instance
 * @param {string} visibility One of 'PUBLIC' or 'PRIVATE'
 * @param {string} nextToken An AWS-issued token indicating that there are more results available, or `null` if there are no more results
 * @param {Array} typeSummaries An array storing previous results
 * @return {Promise<Array>}
 */
export default async function getAllTypes(cloudformation: CloudFormation, visibility = 'PUBLIC', nextToken: CloudFormation.NextToken | undefined = undefined, typeSummaries: CloudFormation.TypeSummaries = []): Promise<CloudFormation.TypeSummaries> {
  try {
    const listTypesParams: CloudFormation.Types.ListTypesInput = {
      DeprecatedStatus: 'LIVE',
      MaxResults: 100,
      NextToken: nextToken,
      Visibility: visibility
    }
    const listTypes = promisify<CloudFormation.ListTypesInput, CloudFormation.ListTypesOutput>(cloudformation.listTypes.bind(cloudformation))
    const listTypesResponse = await listTypes(listTypesParams)
    if (listTypesResponse.TypeSummaries) {
      typeSummaries.push(...listTypesResponse.TypeSummaries)
    }
    if (listTypesResponse.NextToken) {
      await getAllTypes(cloudformation, visibility, listTypesResponse.NextToken, typeSummaries)
    }
    return typeSummaries
  } catch (err) {
    return typeSummaries
  }
}
