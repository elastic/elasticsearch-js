'use strict'

const { readdirSync } = require('fs')
const dedent = require('dedent')
const deepmerge = require('deepmerge')

function genFactory (folder) {
  // get all the API files
  const apiFiles = readdirSync(folder)
  const apis = apiFiles
    .map(file => {
      const name = format(file.slice(0, -3))
      return file
        .slice(0, -3) // remove `.js` extension
        .split('.')
        .reverse()
        .reduce((acc, val) => {
          const obj = {
            [val]: acc === null
              ? `${name}(opts)`
              : acc
          }
          if (isSnakeCased(val)) {
            obj[camelify(val)] = acc === null
              ? `${name}(opts)`
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

  ${generateApiRequire(apiFiles)}

  function ESAPI (opts) {
    assert(opts.makeRequest, 'Missing makeRequest function')
    assert(opts.ConfigurationError, 'Missing ConfigurationError class')
    assert(opts.result, 'Missing default result object')

    const apis = ${apisStr}


    return apis
  }

  module.exports = ESAPI
  `

  // new line at the end of file
  return fn + '\n'
}

function generateApiRequire (apiFiles) {
  return apiFiles
    .map(file => {
      const name = format(file.slice(0, -3))
      return `const ${name} = require('./api/${file}')`
    })
    .join('\n')
}

// from snake_case to camelCase
function camelify (str) {
  return str.replace(/_([a-z])/g, k => k[1].toUpperCase())
}

// from 'hello.world to helloWorld
function undot (str) {
  return str.replace(/\.([a-z])/g, k => k[1].toUpperCase())
}

function safeWords (str) {
  if (str === 'delete') {
    return '_delete'
  }
  return str
}

function format (str) {
  return safeWords(undot(camelify(str)))
}

function isSnakeCased (str) {
  return !!~str.indexOf('_')
}

module.exports = genFactory
