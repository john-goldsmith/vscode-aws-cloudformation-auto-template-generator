import getLogicalId from './get-logical-id'

/**
 * @see https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/resource-type-schema.html#resource-type-schema-syntax
 */
export interface ResourceTypeSchema {
  typeName: string;
  description?: string;
  sourceUrl?: string;
  documentationUrl?: string;
  definitions: Record<string, ResourceProperties>;
  properties: Record<string, ResourceProperties>;
  remote?: unknown;
  required?: string[];
  readOnlyProperties: string[];
  writeOnlyProperties?: string[];
  primaryIdentifier?: string[];
  createOnlyProperties?: string[];
  deprecatedProperties?: string[];
  additionalIdentifiers?: string[][];
  handlers?: {
    create: {
      permissions: string[];
    };
    read: {
      permissions: string[];
    };
    update: {
      permissions: string[];
    };
    delete: {
      permissions: string[];
    };
    list: {
      permissions: string[];
    };
  }
}

/**
 * @see https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/resource-type-schema.html#schema-properties-properties
 */
interface ResourceProperties {
  insertionOrder?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  dependencies?: string[];
  patternProperties?: Record<string, unknown>;
  properties?: {
    [key: string]: ResourceProperties;
  };
  allOf?: unknown;
  anyOf?: unknown;
  oneOf?: unknown;
  items?: ResourceProperties;
  $ref?: string;
  $comment?: unknown;
  title?: unknown;
  description?: unknown;
  examples?: unknown;
  default?: unknown;
  multipleOf?: unknown;
  maximum?: unknown;
  exclusiveMaximum?: unknown;
  minimum?: unknown;
  exclusiveMinimum?: unknown;
  minLength?: unknown;
  pattern?: unknown;
  maxItems?: unknown;
  minItems?: unknown;
  uniqueItems?: unknown;
  contains?: unknown;
  maxProperties?: unknown;
  required?: unknown;
  const?: unknown;
  enum?: unknown;
  type?: string;
  format?: unknown;
}

interface Template {
  [key: string]: {
    Type: string;
    Properties: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}

/**
 * Constructs the CloudFormation template.
 *
 * @param {Object} schema
 * @param {string} [logicalId]
 * @return {Object}
 */
export default function getTemplate(schema: ResourceTypeSchema, logicalId = getLogicalId(schema.typeName)): Template {
  const readOnlyProperties = schema.readOnlyProperties.map(property => {
    const pieces = property.split('/')
    return pieces[pieces.length - 1]
  })
  const propertyKeys = Object.keys(schema.properties)
  const writablePropertyKeys = propertyKeys.filter(propertyKey => !readOnlyProperties.includes(propertyKey))
  const template: Template = {
    [logicalId]: {
      Type: schema.typeName,
      Properties: {}
    }
  }

  /**
   * @param {string} key
   * @param {Object} value
   * @param {Object|Array} template
   */
  function getProperties(key: string, value: ResourceProperties, template: Template['key']['Properties'] | unknown[]) {

    if (value['$ref']) {
      const definitionPieces = value['$ref'].split('/')
      const definitionKey = definitionPieces[definitionPieces.length - 1]
      const definitionValue = schema.definitions[definitionKey]
      getProperties(key, definitionValue, template)
    }

    if (value.type) {
      switch (value.type.toLowerCase()) {
        case 'boolean':
          Array.isArray(template)
            ? template.push(true)
            : template[key] = true
          break

        case 'number':
          Array.isArray(template)
            ? template.push('1.23')
            : template[key] = '1.23'
          break

        case 'integer':
          Array.isArray(template)
            ? template.push(123)
            : template[key] = 123
          break

        case 'string':
          Array.isArray(template)
            ? template.push('string')
            : template[key] = 'string'
          break

        case 'array':
          Array.isArray(template)
            ? template.push([])
            : template[key] = []
          if (value.items) {
            getProperties(key, value.items, Array.isArray(template) ? template[0] : template[key])
          }
          break

        case 'object':
          Array.isArray(template)
            ? template.push({})
            : template[key] = {}
          Object.keys(value.properties || {}).forEach(propertyKey => {
            if (value.properties) {
              getProperties(propertyKey, value.properties[propertyKey], Array.isArray(template) ? template[0] : template[key])
            }
          })
          break

        default:
          // Capitalizes the first letter
          const str = `UnknownType${value.type.charAt(0).toUpperCase() + value.type.substr(1)}` // eslint-disable-line no-case-declarations
          Array.isArray(template)
            ? template.push(str)
            : template[key] = str
      }
    }

    return template
  }

  writablePropertyKeys.forEach(writablePropertyKey => {
    const writablePropertyValue = schema.properties[writablePropertyKey]
    getProperties(writablePropertyKey, writablePropertyValue, template[logicalId].Properties)
  })

  return template
}
