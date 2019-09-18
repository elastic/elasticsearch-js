// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const semver = require('semver')
const deprecatedParameters = require('./patch.json')

function generate (version, api) {
  const release = semver.valid(version) ? semver.major(version) : version
  var types = `// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

export interface Generic {
  method?: string;
  ignore?: number | number[];
  filter_path?: string | string[];
  pretty?: boolean;
  human?: boolean;
  error_trace?: boolean;
  source?: string;
}
`

  api.forEach(generateRequestType)
  return types

  function generateRequestType (spec) {
    const api = Object.keys(spec)[0]
    const name = api
      .replace(/\.([a-z])/g, k => k[1].toUpperCase())
      .replace(/_([a-z])/g, k => k[1].toUpperCase())

    const { paths = {} } = spec[api].url
    const { body, params = {} } = spec[api]

    // get the required parts from the url
    // if the url has at least one static path,
    // then there are not required parts of the url
    var allParts = []
    var requiredParts = []
    for (const path of paths) {
      if (path.parts) {
        allParts.push(Object.keys(path.parts))
      } else {
        allParts = []
        break
      }
    }
    if (allParts.length > 0) {
      requiredParts = intersect(...allParts)
    }

    const parts = paths.reduce((acc, path) => {
      if (!path.parts) return acc
      for (const part in path.parts) {
        if (acc[part] != null) continue
        acc[part] = { key: part, value: path.parts[part], required: requiredParts.includes(part) }
      }
      return acc
    }, {})
    const deprecatedParametersToAdd = []
    const paramsArr = Object.keys(params)
      .filter(k => !Object.keys(parts).includes(k))
      .map(k => {
        if (deprecatedParameters[release] && deprecatedParameters[release][k]) {
          deprecatedParametersToAdd.push({
            key: deprecatedParameters[release][k],
            value: params[k],
            required: params[k].required
          })
        }
        return { key: k, value: params[k], required: params[k].required }
      })

    const partsArr = Object.keys(parts).map(k => parts[k])
    deprecatedParametersToAdd.forEach(k => partsArr.push(k))

    const genLine = e => {
      const optional = e.required ? '' : '?'
      return `${e.key}${optional}: ${getType(e.value.type, e.value.options)};`
    }

    const code = `
export interface ${name[0].toUpperCase() + name.slice(1)}${body ? '<T = any>' : ''} extends Generic {
  ${partsArr.map(genLine).join('\n  ')}
  ${paramsArr.map(genLine).join('\n  ')}
  ${body ? `body${body.required ? '' : '?'}: T;` : ''}
}
`

    types += '\n'
    // remove empty lines
    types += code.replace(/^\s*\n/gm, '')
  }

  function getType (type, options) {
    switch (type) {
      case 'list':
        return 'string | string[]'
      case 'date':
      case 'time':
      case 'timeout':
        return 'string'
      case 'enum':
        return options.map(k => `'${k}'`).join(' | ')
      case 'int':
      case 'double':
      case 'long':
        return 'number'
      default:
        return type
    }
  }
}

function intersect (first, ...rest) {
  return rest.reduce((accum, current) => {
    return accum.filter(x => current.indexOf(x) !== -1)
  }, first)
}

module.exports = generate
