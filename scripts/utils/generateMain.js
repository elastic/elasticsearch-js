// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/* eslint-disable no-template-curly-in-string  */

'use strict'

const { readdirSync } = require('fs')
const { join } = require('path')
const dedent = require('dedent')
const deepmerge = require('deepmerge')
const { ndjsonApi } = require('./generateApis')

const supportedResponses = [
  'Search',
  'MSearch',
  'Create',
  'Index',
  'Delete',
  'Update',
  'Get',
  'Bulk'
]

const ndjsonApiKey = ndjsonApi
  .map(api => {
    return api
      .replace(/\.([a-z])/g, k => k[1].toUpperCase())
      .replace(/_([a-z])/g, k => k[1].toUpperCase())
  })
  .map(toPascalCase)

function genFactory (folder, paths) {
  // get all the API files
  const apiFiles = readdirSync(folder)
  const types = apiFiles
    .map(file => {
      const name = file
        .slice(0, -3)
        .replace(/\.([a-z])/g, k => k[1].toUpperCase())
        .replace(/_([a-z])/g, k => k[1].toUpperCase())

      return file
        .slice(0, -3) // remove `.js` extension
        .split('.')
        .reverse()
        .reduce((acc, val) => {
          const body = hasBody(paths, file.slice(0, -3))
          const methods = acc === null ? buildMethodDefinition(val, name, body) : null
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

  const apis = apiFiles
    .map(file => {
      // const name = format(file.slice(0, -3))
      return file
        .slice(0, -3) // remove `.js` extension
        .split('.')
        .reverse()
        .reduce((acc, val) => {
          const obj = {
            [val]: acc === null
              ? `lazyLoad('${file.slice(0, -3)}', opts)` // `${name}(opts)`
              : acc
          }
          if (isSnakeCased(val)) {
            obj[camelify(val)] = acc === null
              ? `lazyLoad('${file.slice(0, -3)}', opts)` // `${name}(opts)`
              : acc
          }
          return obj
        }, null)
    })
    .reduce((acc, val) => deepmerge(acc, val), {})

  // serialize the API object
  const apisStr = JSON.stringify(apis, null, 2)
    // split & join to fix the indentation
    .split('\n')
    .join('\n    ')
    // remove useless quotes
    .replace(/"/g, '')

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

  const fn = dedent`
  // Licensed to Elasticsearch B.V under one or more agreements.
  // Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
  // See the LICENSE file in the project root for more information

  'use strict'

  const assert = require('assert')

  function ESAPI (opts) {
    assert(opts.makeRequest, 'Missing makeRequest function')
    assert(opts.ConfigurationError, 'Missing ConfigurationError class')
    assert(opts.result, 'Missing default result object')

    const { result } = opts
    opts.handleError = handleError
    opts.snakeCaseKeys = snakeCaseKeys

    const apis = ${apisStr}


    return apis

    function handleError(err, callback) {
      if (callback) return callback(err, result)
      return Promise.reject(err)
    }

    function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
      var target = {}
      var keys = Object.keys(querystring)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        target[snakeCase[key] || key] = querystring[key]
        if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
          warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
        }
      }
      return target
    }
  }

  // It's unlikely that a user needs all of our APIs,
  // and since require is a sync operation that takes time
  // (given the amount of APIs we have), let's lazy load them,
  // so a given API file will be required only
  // if the user actually needs that API.
  // The following implementation takes advantage
  // of js closures to have a simple cache with the least overhead.
  function lazyLoad (file, opts) {
    var fn = null
    return function _lazyLoad (params, options, callback) {
      if (fn === null) {
        fn = require(${'`./api/${file}.js`'})(opts)
      }
      return fn(params, options, callback)
    }
  }

  module.exports = ESAPI
  `

  // new line at the end of file
  return { fn: fn + '\n', types: typesStr }
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

function buildMethodDefinition (api, name, hasBody) {
  const Name = toPascalCase(name)
  const bodyType = ndjsonApiKey.includes(Name) ? 'RequestNDBody' : 'RequestBody'
  const defaultBodyType = ndjsonApiKey.includes(Name) ? 'Record<string, any>[]' : 'Record<string, any>'
  const responseType = supportedResponses.includes(Name) ? `Res.${Name}Response` : 'Record<string, any>'

  if (hasBody) {
    let methods = [
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params?: Req.${Name}Request<TRequestBody>, options?: TransportRequestOptions)`, val: `TransportRequestPromise<ApiResponse<TResponse, TContext>>` },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params: Req.${Name}Request<TRequestBody>, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
      { key: `${api}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params: Req.${Name}Request<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` }
    ]
    if (isSnakeCased(api)) {
      methods = methods.concat([
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params?: Req.${Name}Request<TRequestBody>, options?: TransportRequestOptions)`, val: `TransportRequestPromise<ApiResponse<TResponse, TContext>>` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params: Req.${Name}Request<TRequestBody>, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TRequestBody extends ${bodyType} = ${defaultBodyType}, TContext = unknown>(params: Req.${Name}Request<TRequestBody>, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` }
      ])
    }
    return methods
  } else {
    let methods = [
      { key: `${api}<TResponse = ${responseType}, TContext = unknown>(params?: Req.${Name}Request, options?: TransportRequestOptions)`, val: `TransportRequestPromise<ApiResponse<TResponse, TContext>>` },
      { key: `${api}<TResponse = ${responseType}, TContext = unknown>(callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
      { key: `${api}<TResponse = ${responseType}, TContext = unknown>(params: Req.${Name}Request, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
      { key: `${api}<TResponse = ${responseType}, TContext = unknown>(params: Req.${Name}Request, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` }
    ]
    if (isSnakeCased(api)) {
      methods = methods.concat([
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = unknown>(params?: Req.${Name}Request, options?: TransportRequestOptions)`, val: `TransportRequestPromise<ApiResponse<TResponse, TContext>>` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = unknown>(callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = unknown>(params: Req.${Name}Request, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` },
        { key: `${camelify(api)}<TResponse = ${responseType}, TContext = unknown>(params: Req.${Name}Request, options: TransportRequestOptions, callback: callbackFn<TResponse, TContext>)`, val: `TransportRequestCallback` }
      ])
    }
    return methods
  }
}

function hasBody (paths, file) {
  const spec = readSpec()
  return !!spec[file].body

  function readSpec () {
    try {
      return require(join(paths[0], file))
    } catch (err) {}

    try {
      return require(join(paths[1], file))
    } catch (err) {}

    throw new Error(`Cannot read spec file ${file}`)
  }
}

module.exports = genFactory
