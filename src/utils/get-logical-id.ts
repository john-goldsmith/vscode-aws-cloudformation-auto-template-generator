/**
 * Creates and returns a logical ID. If the provided `type` param is a
 * string, it will prefix with `My` and remove all instances of `::`.
 * If the provided `type` param is not a string, it defaults to `MyResource`.
 *
 * @param {string} type
 * @return {string}
 */
export default function getLogicalId(type: string): string {
  if (typeof type !== 'string') return 'MyResource'
  const logicalId = `My${type.replace(/::/g, '')}`
  return logicalId
}
