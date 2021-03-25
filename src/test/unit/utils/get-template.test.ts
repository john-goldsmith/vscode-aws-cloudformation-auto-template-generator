import getTemplate, { ResourceTypeSchema } from '../../../utils/get-template'

describe('Utils', () => {

  describe('getTemplate', () => {

    describe('when no logical ID is provided', () => {

      it('returns a template object', () => {
        const schema: ResourceTypeSchema = {
          typeName: 'Test::Resource',
          readOnlyProperties: [
            '/foo/bar'
          ],
          properties: {
            prop1: {
              type: 'boolean'
            },
            prop2: {
              type: 'string'
            },
            prop3: {
              type: 'number'
            },
            prop4: {
              type: 'integer'
            },
            prop5: {
              type: 'nothing'
            },
            prop6: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            prop7: {
              type: 'object',
              properties: {
                prop7a: {
                  type: 'boolean'
                }
              }
            },
            prop8: {
              '$ref': 'foo/bar/baz'
            },
            prop9: {
              type: 'array',
              items: {
                type: 'boolean'
              }
            },
            prop10: {
              type: 'array',
              items: {
                type: 'number'
              }
            },
            prop11: {
              type: 'array',
              items: {
                type: 'integer'
              }
            },
            prop12: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            },
            prop13: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  prop13a: {
                    type: 'boolean'
                  }
                }
              }
            },
            prop14: {
              type: 'array',
              items: {
                type: 'widget'
              }
            },
            prop15: {
              type: 'array',
              items: {
                '$ref': '/foo/baz'
              }
            }
          },
          definitions: {
            baz: {
              type: 'integer'
            }
          }
        }
        const actual = getTemplate(schema)
        const expected = {
          MyTestResource: {
            Type: 'Test::Resource',
            Properties: {
              prop1: true,
              prop2: 'string',
              prop3: '1.23',
              prop4: 123,
              prop5: 'UnknownTypeNothing',
              prop6: ['string'],
              prop7: {
                prop7a: true
              },
              prop8: 123,
              prop9: [true],
              prop10: ['1.23'],
              prop11: [123],
              prop12: [
                ['string']
              ],
              prop13: [
                {
                  prop13a: true
                }
              ],
              prop14: ['UnknownTypeWidget'],
              prop15: [123]
            }
          }
        }
        expect(actual).toStrictEqual(expected)
      })

    })

    describe('when a logical ID is provided', () => {

      it('returns a template object', () => {
        const schema: ResourceTypeSchema = {
          typeName: 'Test::Resource',
          readOnlyProperties: [
            '/foo/bar'
          ],
          properties: {
            prop1: {
              type: 'boolean'
            },
            prop2: {
              type: 'string'
            },
            prop3: {
              type: 'number'
            },
            prop4: {
              type: 'integer'
            },
            prop5: {
              type: 'nothing'
            },
            prop6: {
              type: 'array',
              items: {
                type: 'string'
              }
            },
            prop7: {
              type: 'object',
              properties: {
                prop7a: {
                  type: 'boolean'
                }
              }
            },
            prop8: {
              '$ref': 'foo/bar/baz'
            },
            prop9: {
              type: 'array',
              items: {
                type: 'boolean'
              }
            },
            prop10: {
              type: 'array',
              items: {
                type: 'number'
              }
            },
            prop11: {
              type: 'array',
              items: {
                type: 'integer'
              }
            },
            prop12: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            },
            prop13: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  prop13a: {
                    type: 'boolean'
                  }
                }
              }
            },
            prop14: {
              type: 'array',
              items: {
                type: 'widget'
              }
            },
            prop15: {
              type: 'array',
              items: {
                '$ref': '/foo/baz'
              }
            }
          },
          definitions: {
            baz: {
              type: 'integer'
            }
          }
        }
        const actual = getTemplate(schema, 'MyLogicalId')
        const expected = {
          MyLogicalId: {
            Type: 'Test::Resource',
            Properties: {
              prop1: true,
              prop2: 'string',
              prop3: '1.23',
              prop4: 123,
              prop5: 'UnknownTypeNothing',
              prop6: ['string'],
              prop7: {
                prop7a: true
              },
              prop8: 123,
              prop9: [true],
              prop10: ['1.23'],
              prop11: [123],
              prop12: [
                ['string']
              ],
              prop13: [
                {
                  prop13a: true
                }
              ],
              prop14: ['UnknownTypeWidget'],
              prop15: [123]
            }
          }
        }
        expect(actual).toStrictEqual(expected)
      })

    })

  })

})
