// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

/* eslint-disable no-template-curly-in-string  */

'use strict'

const { readdirSync } = require('fs')
const dedent = require('dedent')
const deepmerge = require('deepmerge')

function genFactory (folder) {
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
          const obj = {
            [val]: acc === null
              ? `ApiMethod<RequestParams.${name[0].toUpperCase() + name.slice(1)}>`
              : acc
          }
          if (isSnakeCased(val)) {
            obj[camelify(val)] = acc === null
              ? `ApiMethod<RequestParams.${name[0].toUpperCase() + name.slice(1)}>`
              : acc
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
    .map(key => `${key}: ${JSON.stringify(types[key], null, 2)}`)
    .join('\n')
    // remove useless quotes and commas
    .replace(/"/g, '')
    .replace(/,/g, '')

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

module.exports = genFactory
