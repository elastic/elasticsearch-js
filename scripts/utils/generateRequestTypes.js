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

function generate (version, api) {
  const release = semver.valid(version) ? semver.major(version) : version
  var types = `/*
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
