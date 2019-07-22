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

    const { parts = {}, params = {} } = spec[api].url
    const { body } = spec[api]

    const partsArr = Object.keys(parts)
      .map(k => ({ key: k, value: parts[k] }))
    const deprecatedParametersToAdd = []
    const paramsArr = Object.keys(params)
      .filter(k => !Object.keys(parts).includes(k))
      .map(k => {
        if (deprecatedParameters[release] && deprecatedParameters[release][k]) {
          deprecatedParametersToAdd.push({
            key: deprecatedParameters[release][k],
            value: params[k]
          })
        }
        return { key: k, value: params[k] }
      })

    deprecatedParametersToAdd.forEach(k => partsArr.push(k))

    const genLine = e => {
      const optional = e.value.required ? '' : '?'
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

module.exports = generate
