/**
 * @module utils/get-template
 */

 /**
  * @param {Object} schema
  * @return {Object}
  */
function getTemplate(schema) {
  const readOnlyProperties = schema.readOnlyProperties.map(property => {
    const pieces = property.split('/')
    return pieces[pieces.length - 1]
  })
  const propertyKeys = Object.keys(schema.properties)
  const writablePropertyKeys = propertyKeys.filter(propertyKey => !readOnlyProperties.includes(propertyKey))
  const logicalId = `My${schema.typeName.replace(/::/g, '')}`
  const template = {
    [logicalId]: {
      Type: schema.typeName,
      Properties: {}
    }
  }

  /**
   * @param {String} key
   * @param {Object} value
   * @param {Object|Array} template
   */
  function getProperties(key, value, template) {
    const isTemplateArray = Array.isArray(template)

    if (value['$ref']) {
      isTemplateArray
        ? template.push({})
        : template[key] = {}
      const definitionPieces = value['$ref'].split('/')
      const definitionKey = definitionPieces[definitionPieces.length - 1]
      const definitionValue = schema.definitions[definitionKey]
      getProperties(definitionKey, definitionValue, isTemplateArray ? template[0] : template[key])
    }

    if (value.type) {
      switch (value.type.toLowerCase()) {
        case 'boolean':
          isTemplateArray
            ? template.push(true)
            : template[key] = true
          break

        case 'number':
          isTemplateArray
            ? template.push('1.23')
            : template[key] = '1.23'
          break

        case 'integer':
          isTemplateArray
            ? template.push(123)
            : template[key] = 123
          break

        case 'string':
          isTemplateArray
            ? template.push('string')
            : template[key] = 'string'
          break

        case 'array':
          isTemplateArray
            ? template.push([])
            : template[key] = []
          getProperties(key, value.items, isTemplateArray ? template[0] : template[key])
          break

        case 'object':
          isTemplateArray
            ? template.push({})
            : template[key] = {}
          Object.keys(value.properties).forEach(propertyKey => {
            getProperties(propertyKey, value.properties[key], isTemplateArray ? template[0] : template[key])
          })
          break

        default:
          const str = `UnknownType${value.type.charAt(0).toUpperCase() + value.type.substr(1)}` // Capitalizes the first letter
          isTemplateArray
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

module.exports = getTemplate
