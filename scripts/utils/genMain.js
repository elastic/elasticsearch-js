'use strict'

const { readdirSync } = require('fs')
const dedent = require('dedent')
const deepmerge = require('deepmerge')

function genFactory (folder) {
  // get all the API files
  const apiFiles = readdirSync(folder)
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
              ? `lazyLoad('./api/${file}', opts)` // `${name}(opts)`
              : acc
          }
          if (isSnakeCased(val)) {
            obj[camelify(val)] = acc === null
              ? `lazyLoad('./api/${file}', opts)` // `${name}(opts)`
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

  const fn = dedent`
  'use strict'

  const assert = require('assert')

  function ESAPI (opts) {
    assert(opts.makeRequest, 'Missing makeRequest function')
    assert(opts.ConfigurationError, 'Missing ConfigurationError class')
    assert(opts.result, 'Missing default result object')

    const apis = ${apisStr}


    return apis
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
    return function _lazyLoad (params, callback) {
      if (fn === null) {
        fn = require(file)(opts)
      }
      return fn(params, callback)
    }
  }

  module.exports = ESAPI
  `

  // new line at the end of file
  return fn + '\n'
}

// from snake_case to camelCase
function camelify (str) {
  return str.replace(/_([a-z])/g, k => k[1].toUpperCase())
}

function isSnakeCased (str) {
  return !!~str.indexOf('_')
}

module.exports = genFactory
