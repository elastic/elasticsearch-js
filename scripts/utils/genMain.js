'use strict'

const { readdirSync } = require('fs')
const dedent = require('dedent')

function genFactory (folder) {
  const apiToCamel = {}
  // get all the API files
  const apis = readdirSync(folder)
    .map(file => {
      const chunks = file.split('.')
      // if the api has not a namespace
      if (chunks.length === 2) {
        return { name: chunks[0], group: null, file }
      } else {
        const [group, name] = chunks
        return { name, group, file }
      }
    })
    .reduce((acc, obj) => {
      const { group, name, file } = obj
      // create a namespace if present
      if (group) {
        acc[group] = acc[group] || {}
        acc[group][name] = `require('./api/${file}')(opts)`
      } else {
        acc[name] = `require('./api/${file}')(opts)`
      }
      // save the snake_cased APIs for later use
      if (isSnakeCased(name)) {
        apiToCamel[group || '__root'] = apiToCamel[group || '__root'] || []
        apiToCamel[group || '__root'].push(name)
      }
      return acc
    }, {})

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

    const apis = ${apisStr}

    ${generateDefinedProperties(apiToCamel).join('\n\n    ')}

    return apis
  }

  module.exports = ESAPI
  `

  // new line at the end of file
  return fn + '\n'
}

// generates an array of Object.defineProperties
// to allow the use of camelCase APIs
// instead of snake_cased
function generateDefinedProperties (apiToCamel) {
  const arr = []
  for (const api in apiToCamel) {
    const obj = api === '__root'
      ? 'apis'
      : `apis.${api}`
    const code = `
    Object.defineProperties(${obj}, {
      ${apiToCamel[api].map(createGetter).join(',\n      ')}
    })
    `.trim()
    arr.push(code)
  }

  return arr

  function createGetter (api) {
    return `
      ${camelify(api)}: {
        get: function () { return this.${api} },
        enumerable: true
      }
    `.trim()
  }
}

// from snake_case to camelCase
function camelify (str) {
  return str.replace(/_([a-z])/g, k => k[1].toUpperCase())
}

function isSnakeCased (str) {
  return !!~str.indexOf('_')
}

module.exports = genFactory
