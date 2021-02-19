/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const semver = require('semver')
const deprecatedParameters = require('./patch.json')
const { ndjsonApi } = require('./generateApis')

const ndjsonApiKey = ndjsonApi
  .map(api => {
    return api
      .replace(/\.([a-z])/g, k => k[1].toUpperCase())
      .replace(/_([a-z])/g, k => k[1].toUpperCase())
  })
  .map(toPascalCase)

function generate (version, api) {
  const release = semver.valid(version) ? semver.major(version) : version
  let types = `/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { RequestBody, RequestNDBody } from '../lib/Transport'

export interface Generic {
  method?: string;
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
    let allParts = []
    let requiredParts = []
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

    const bodyGeneric = ndjsonApiKey.includes(toPascalCase(name)) ? 'RequestNDBody' : 'RequestBody'

    const code = `
export interface ${toPascalCase(name)}${body ? `<T = ${bodyGeneric}>` : ''} extends Generic {
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
      case 'enum': {
        // the following code changes 'true' | 'false' to boolean
        let foundTrue = false
        let foundFalse = false
        options = options
          .map(k => {
            if (k === 'true') {
              foundTrue = true
              return true
            } else if (k === 'false') {
              foundFalse = true
              return false
            } else {
              return `'${k}'`
            }
          })
          .filter(k => {
            if (foundTrue && foundFalse && (k === true || k === false)) {
              return false
            }
            return true
          })
        if (foundTrue && foundFalse) {
          options.push('boolean')
        }
        return options.join(' | ')
      }
      case 'int':
      case 'double':
      case 'long':
        return 'number'
      case 'boolean|long':
        return 'boolean | number'
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

function toPascalCase (str) {
  return str[0].toUpperCase() + str.slice(1)
}

module.exports = generate
