import { window, workspace } from 'vscode'

import pkg from '../../package.json'
import { EXTENSION_NAME, REGION_CONFIGURATION_PROPERTY } from '../config'

const { showQuickPick, setStatusBarMessage, showErrorMessage } = window
const { getConfiguration } = workspace

type Regions = [
  'us-east-1',
  'us-east-2',
  'us-west-1',
  'us-west-2',
  'af-south-1',
  'ap-east-1',
  'ap-south-1',
  'ap-northeast-3',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ap-northeast-1',
  'ca-central-1',
  'eu-central-1',
  'eu-west-1',
  'eu-west-2',
  'eu-west-3',
  'eu-south-1',
  'eu-north-1',
  'me-south-1',
  'sa-east-1'
]

type RegionDescriptions = [
  'US East (N. Virginia)',
  'US East (Ohio)',
  'US West (N. California)',
  'US West (Oregon)',
  'Africa (Cape Town)',
  'Asia Pacific (Hong Kong)',
  'Asia Pacific (Mumbai)',
  'Asia Pacific (Osaka)',
  'Asia Pacific (Seoul)',
  'Asia Pacific (Singapore)',
  'Asia Pacific (Sydney)',
  'Asia Pacific (Tokyo)',
  'Canada (Central)',
  'Europe (Frankfurt)',
  'Europe (Ireland)',
  'Europe (London)',
  'Europe (Paris)',
  'Europe (Milan)',
  'Europe (Stockholm)',
  'Middle East (Bahrain)',
  'South America (São Paulo)'
]

/**
 * Prompts the user to select an AWS region to use when making API calls
 * (a required field). This is useful if the user wants to manually
 * override the region present in the config file, or in the event that
 * the config file omits a region.
 *
 * Although it's possible to programmatically get EC2 regions via
 * the SDK (`new AWS.EC2().describeRegions()`), it's not being done
 * here because a cyclical dependency occurs: a region is needed
 * to query all regions.
 *
 * The values are imported from the `package.json`
 * file (since that's where settings are defined), and that list
 * should be audited from time to time as more regions become
 * available.
 *
 * @see https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions
 * @return {Function<Promise<undefined>>}
 */
export default function setRegion() {
  return async (): Promise<void> => {
    try {
      const {
        enum: regionValues,
        enumDescriptions: regionLabels
      }: {
        enum: Regions,
        enumDescriptions: RegionDescriptions
      // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
      } = pkg.contributes.configuration.properties[`${EXTENSION_NAME}.${REGION_CONFIGURATION_PROPERTY}`]
      const options = regionValues.map((value, index) => ({label: `${regionLabels[index]} (${value})`, value}))
      const selectedRegion = await showQuickPick(options)
      if (!selectedRegion) return // Esc
      const workspaceConfiguration = getConfiguration(EXTENSION_NAME)
      await workspaceConfiguration.update(REGION_CONFIGURATION_PROPERTY, selectedRegion.value)
      setStatusBarMessage(`Region set to '${selectedRegion.value}'`, 3000)
    } catch (err) {
      showErrorMessage(err.message)
    }
  }
}
