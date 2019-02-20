'use strict'

const dedent = require('dedent')

function generateDocs (common, spec) {
  var doc = '= API Reference\n\n'
  doc += commonParameters(common)
  spec.forEach(s => {
    doc += '\n' + generateApiDoc(s)
  })
  return doc
}

function commonParameters (spec) {
  var doc = dedent`
  === Common parameters
  Parameters that are accepted by all API endpoints.
  https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html
  [cols=2*]
  |===\n`
  Object.keys(spec.params).forEach(key => {
    const name = isSnakeCased(key) && key !== camelify(key)
      ? '`' + key + '` or `' + camelify(key) + '`'
      : '`' + key + '`'

    doc += dedent`
    |${name}
    |${'`' + spec.params[key].type + '`'} - ${spec.params[key].description}`
    if (spec.params[key].default) {
      doc += ` +
    _Default:_ ${'`' + spec.params[key].default + '`'}`
    }
    doc += '\n\n'
  })

  doc += dedent`
  |===
  `
  return doc
}

function generateApiDoc (spec) {
  const name = Object.keys(spec)[0]
  const documentationUrl = spec[name].documentation
  const params = []
  // url params
  const urlParts = spec[name].url.parts
  if (urlParts) {
    Object.keys(urlParts).forEach(param => {
      params.push({
        name: param,
        type: getType(urlParts[param].type, urlParts[param].options),
        description: urlParts[param].description,
        default: urlParts[param].default
      })
    })
  }

  // query params
  const urlParams = spec[name].url.params
  if (urlParams) {
    Object.keys(urlParams).forEach(param => {
      params.push({
        name: param,
        type: getType(urlParams[param].type, urlParams[param].options),
        description: urlParams[param].description,
        default: urlParams[param].default
      })
    })
  }

  // body params
  const body = spec[name].body
  if (body) {
    params.push({
      name: 'body',
      type: 'object',
      description: body.description,
      default: body.default
    })
  }

  var doc = dedent`
  === ${camelify(name)}
  [source,js]
  ----
  client.${camelify(name)}([params] [, options] [, callback])
  ----
  ${documentationUrl || ''}
  [cols=2*]
  |===`

  doc += '\n' + params.reduce((acc, val) => {
    const name = isSnakeCased(val.name) && val.name !== camelify(val.name)
      ? '`' + val.name + '` or `' + camelify(val.name) + '`'
      : '`' + val.name + '`'
    acc += dedent`
    |${name}
    |${'`' + val.type + '`'} - ${val.description}`
    if (val.default) {
      acc += ` +
    _Default:_ ${'`' + val.default + '`'}`
    }
    return acc + '\n\n'
  }, '')

  doc += dedent`
  |===
  `
  return doc
}

function getType (type, options) {
  switch (type) {
    case 'list':
      return 'string, string[]'
    case 'date':
    case 'time':
    case 'timeout':
      return 'string'
    case 'enum':
      return options.map(k => `'${k}'`).join(', ')
    case 'int':
    case 'double':
    case 'long':
      return 'number'
    default:
      return type
  }
}

function camelify (str) {
  return str[0] === '_'
    ? '_' + str.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
    : str.replace(/_([a-z])/g, k => k[1].toUpperCase())
}

function isSnakeCased (str) {
  return !!~str.indexOf('_')
}

module.exports = generateDocs
