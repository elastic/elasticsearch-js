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

/* eslint-disable no-template-curly-in-string  */

'use strict'

const { readdirSync } = require('fs')
const { join } = require('path')
const dedent = require('dedent')
const deepmerge = require('deepmerge')
const { ndjsonApi } = require('./generateApis')

const ndjsonApiKey = ndjsonApi
  .map(api => {
    return api
      .replace(/\.([a-z])/g, k => k[1].toUpperCase())
      .replace(/_([a-z])/g, k => k[1].toUpperCase())
  })
  .map(toPascalCase)

function genFactory (folder, paths, namespaces) {
  // get all the API files
  // const apiFiles = readdirSync(folder)
  const apiFiles = readdirSync(paths[0])
    .concat(readdirSync(paths[1]))
    .filter(file => file !== '_common.json')
    .filter(file => !file.includes('deprecated'))
    .sort()
  const types = apiFiles
    .map(file => {
      const name = file
        .slice(0, -5)
        .replace(/\.([a-z])/g, k => k[1].toUpperCase())
        .replace(/_([a-z])/g, k => k[1].toUpperCase())

      return file
        .slice(0, -5) // remove `.json` extension
        .split('.')
        .reverse()
        .reduce((acc, val) => {
          const spec = readSpec(paths, file.slice(0, -5))
          const isHead = isHeadMethod(spec, file.slice(0, -5))
          const body = hasBody(spec, file.slice(0, -5))
          const methods = acc === null ? buildMethodDefinition({ kibana: false }, val, name, body, isHead) : null
          const obj = {}
          if (methods) {
            for (const m of methods) {
              obj[m.key] = m.val
            }
          } else {
            obj[val] = acc
            if (isSnakeCased(val)) {
              obj[camelify(val)] = acc
            }
          }
          return obj
        }, null)
    })
    .reduce((acc, val) => deepmerge(acc, val), {})

  const kibanaTypes = apiFiles
    .map(file => {
      const name = file
        .slice(0, -5)
        .replace(/\.([a-z])/g, k => k[1].toUpperCase())
        .replace(/_([a-z])/g, k => k[1].toUpperCase())

      return file
        .slice(0, -5) // remove `.json` extension
        .split('.')
        .reverse()
        .reduce((acc, val) => {
          const spec = readSpec(paths, file.slice(0, -5))
          const isHead = isHeadMethod(spec, file.slice(0, -5))
          const body = hasBody(spec, file.slice(0, -5))
          const methods = acc === null ? buildMethodDefinition({ kibana: true }, val, name, body, isHead) : null
          const obj = {}
          if (methods) {
            for (const m of methods) {
              obj[m.key] = m.val
            }
          } else {
            obj[camelify(val)] = acc
          }
          return obj
        }, null)
    })
    .reduce((acc, val) => deepmerge(acc, val), {})

  // serialize the type object
  const typesStr = Object.keys(types)
    .map(key => {
      const line = `  ${key}: ${JSON.stringify(types[key], null, 4)}`
      if (line.slice(-1) === '}') {
        return line.slice(0, -1) + '  }'
      }
      return line
    })
    .join('\n')
    // remove useless quotes and commas
    .replace(/"/g, '')
    .replace(/,$/gm, '')
  const kibanaTypesStr = Object.keys(kibanaTypes)
    .map(key => {
      const line = `  ${key}: ${JSON.stringify(kibanaTypes[key], null, 4)}`
      if (line.slice(-1) === '}') {
        return line.slice(0, -1) + '  }'
      }
      return line
    })
    .join('\n')
    // remove useless quotes and commas
    .replace(/"/g, '')
    .replace(/,$/gm, '')

  let apisStr = ''
  const getters = []
  for (const namespace in namespaces) {
    if (namespaces[namespace].length > 0) {
      getters.push(`${camelify(namespace)}: {
        get () {
          if (this[k${toPascalCase(camelify(namespace))}] === null) {
            this[k${toPascalCase(camelify(namespace))}] = new ${toPascalCase(camelify(namespace))}Api(this.transport, this[kConfigurationError])
          }
          return this[k${toPascalCase(camelify(namespace))}]
        }
      },\n`)
      if (namespace.includes('_')) {
        getters.push(`${namespace}: { get () { return this.${camelify(namespace)} } },\n`)
      }
    } else {
      apisStr += `ESAPI.prototype.${camelify(namespace)} = ${camelify(namespace)}Api\n`
      if (namespace.includes('_')) {
        getters.push(`${namespace}: { get () { return this.${camelify(namespace)} } },\n`)
      }
    }
  }

  apisStr += '\nObject.defineProperties(ESAPI.prototype, {\n'
  for (const getter of getters) {
    apisStr += getter
  }
  apisStr += '})'

  let modules = ''
  let symbols = ''
  let symbolsInstance = ''
  for (const namespace in namespaces) {
    if (namespaces[namespace].length > 0) {
      modules += `const ${toPascalCase(camelify(namespace))}Api = require('./api/${namespace}')\n`
      symbols += `const k${toPascalCase(camelify(namespace))} = Symbol('${toPascalCase(camelify(namespace))}')\n`
      symbolsInstance += `this[k${toPascalCase(camelify(namespace))}] = null\n`
    } else {
      modules += `const ${camelify(namespace)}Api = require('./api/${namespace}')\n`
    }
  }

  const fn = dedent`
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

  ${modules}

  const { kConfigurationError } = require('./utils')
  ${symbols}

  function ESAPI (opts) {
    this[kConfigurationError] = opts.ConfigurationError
    ${symbolsInstance}
  }

  ${apisStr}

  module.exports = ESAPI
  `

  // new line at the end of file
  return { fn: fn + '\n', types: typesStr, kibanaTypes: kibanaTypesStr }
}

// from snake_case to camelCase
function camelify (str) {
  return str.replace(/_([a-z])/g, k => k[1].toUpperCase())
}

function isSnakeCased (str) {
  return !!~str.indexOf('_')
}

function toPascalCase (str) {
  return str[0].toUpperCase() + str.slice(1)
}

function buildMethodDefinition (opts, api, name, hasBody, isHead) {
  const Name = toPascalCase(name)
  const bodyType = ndjsonApiKey.includes(Name) ? 'RequestNDBody' : 'RequestBody'
  const responseType = isHead ? 'boolean' : 'Record<string, any>'
  const defaultBodyType = ndjsonApiKey.includes(Name) ? 'Record<string, any>[]' : 'Record<string, any>'

  if (opts.kibana) {
    if (hasBody) {
      return [
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params?: RequestParams.${Name}<TRequestBody>, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' }
      ]
    } else {
      return [
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = Context>(params?: RequestParams.${Name}, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' }
      ]
    }
  }

  if (hasBody) {
    let methods = [
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params?: RequestParams.${Name}<TRequestBody>, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params: RequestParams.${Name}<TRequestBody>, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params: RequestParams.${Name}<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' }
    ]
    if (isSnakeCased(api)) {
      methods = methods.concat([
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params?: RequestParams.${Name}<TRequestBody>, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params: RequestParams.${Name}<TRequestBody>, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = Context>(params: RequestParams.${Name}<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' }
      ])
    }
    return methods
  } else {
    let methods = [
      { key: `${api}<TResponse = ${responseType}, TContext = Context>(params?: RequestParams.${Name}, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' },
      { key: `${api}<TResponse = ${responseType}, TContext = Context>(callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
      { key: `${api}<TResponse = ${responseType}, TContext = Context>(params: RequestParams.${Name}, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
      { key: `${api}<TResponse = ${responseType}, TContext = Context>(params: RequestParams.${Name}, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' }
    ]
    if (isSnakeCased(api)) {
      methods = methods.concat([
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = Context>(params?: RequestParams.${Name}, options?: TransportRequestOptions)`, val: 'TransportRequestPromise<ApiResponse<TResponse, TContext>>' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = Context>(callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = Context>(params: RequestParams.${Name}, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = Context>(params: RequestParams.${Name}, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: 'TransportRequestCallback' }
      ])
    }
    return methods
  }
}

function hasBody (spec, api) {
  return !!spec[api].body
}

function isHeadMethod (spec, api) {
  const { paths } = spec[api].url
  const methods = []
  for (const path of paths) {
    for (const method of path.methods) {
      if (!methods.includes(method)) {
        methods.push(method)
      }
    }
  }
  return methods.length === 1 && methods[0] === 'HEAD'
}

function readSpec (paths, file) {
  try {
    return require(join(paths[0], file))
  } catch (err) {}

  try {
    return require(join(paths[1], file))
  } catch (err) {}

  throw new Error(`Cannot read spec file ${file}`)
}

module.exports = genFactory
