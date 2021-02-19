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

/* eslint camelcase: 0 */

'use strict'

const { join } = require('path')
const dedent = require('dedent')
const semver = require('semver')
const allowedMethods = {
  noBody: ['GET', 'HEAD', 'DELETE'],
  body: ['POST', 'PUT', 'DELETE']
}

// if a parameter is depracted in a minor release
// we should be able to support it until the next major
const deprecatedParameters = require('./patch.json')

// list of apis that does not need any kind of validation
// because of how the url is built or the `type` handling in ES7
const noPathValidation = [
  'create',
  'exists',
  'explain',
  'get',
  'get_source',
  'index',
  'indices.get_alias',
  'indices.exists_alias',
  'indices.get_field_mapping',
  'indices.get_mapping',
  'indices.get_settings',
  'indices.put_mapping',
  'indices.stats',
  'delete',
  'nodes.info',
  'nodes.stats',
  'nodes.usage',
  'tasks.cancel',
  'termvectors',
  'update'
]

// apis that uses bulkBody property
const ndjsonApi = [
  'bulk',
  'msearch',
  'msearch_template',
  'ml.find_file_structure',
  'monitoring.bulk',
  'xpack.ml.find_file_structure',
  'xpack.monitoring.bulk'
]

function generateNamespace (namespace, nested, folders, version) {
  const common = require(join(folders.apiFolder, '_common.json'))
  let code = dedent`
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

  /* eslint camelcase: 0 */
  /* eslint no-unused-vars: 0 */

  const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
`
  if (nested.length > 0) {
    let getters = ''
    for (const n of nested) {
      if (n.includes('_')) {
        const nameSnaked = n
          .replace(/\.([a-z])/g, k => k[1].toUpperCase())
          .replace(/_([a-z])/g, k => k[1].toUpperCase())
        getters += `${n}: { get () { return this.${nameSnaked} } },\n`
      }
    }
    const api = generateMultiApi(version, namespace, nested, common, folders)
    if (getters.length > 0) {
      getters = `Object.defineProperties(${api.namespace}Api.prototype, {\n${getters}})`
    }

    code += `
  const acceptedQuerystring = ${JSON.stringify(api.acceptedQuerystring)}
  const snakeCase = ${JSON.stringify(api.snakeCase)}

  function ${api.namespace}Api (transport, ConfigurationError) {
    this.transport = transport
    this[kConfigurationError] = ConfigurationError
  }

  ${api.code}

  ${getters}

  module.exports = ${api.namespace}Api
    `
  } else {
    let spec = null
    try {
      spec = require(join(folders.apiFolder, `${namespace}.json`))
    } catch (err) {
      spec = require(join(folders.xPackFolder, `${namespace}.json`))
    }
    const api = generateSingleApi(version, spec, common)
    code += `
  const acceptedQuerystring = ${JSON.stringify(api.acceptedQuerystring)}
  const snakeCase = ${JSON.stringify(api.snakeCase)}

  ${api.code}

  module.exports = ${api.name}Api
    `
  }
  return code
}

function generateMultiApi (version, namespace, nested, common, folders) {
  const namespaceSnaked = namespace
    .replace(/\.([a-z])/g, k => k[1].toUpperCase())
    .replace(/_([a-z])/g, k => k[1].toUpperCase())
  let code = ''
  const snakeCase = {}
  const acceptedQuerystring = []
  for (const n of nested) {
    let spec = null
    const nameSnaked = n
      .replace(/\.([a-z])/g, k => k[1].toUpperCase())
      .replace(/_([a-z])/g, k => k[1].toUpperCase())
    try {
      spec = require(join(folders.apiFolder, `${namespace}.${n}.json`))
    } catch (err) {
      spec = require(join(folders.xPackFolder, `${namespace}.${n}.json`))
    }
    const api = generateSingleApi(version, spec, common)
    code += `${Uppercase(namespaceSnaked)}Api.prototype.${nameSnaked} = ${api.code}\n\n`
    Object.assign(snakeCase, api.snakeCase)
    for (const q of api.acceptedQuerystring) {
      if (!acceptedQuerystring.includes(q)) {
        acceptedQuerystring.push(q)
      }
    }
  }
  return { code, snakeCase, acceptedQuerystring, namespace: Uppercase(namespaceSnaked) }
}

function generateSingleApi (version, spec, common) {
  const release = semver.valid(version) ? semver.major(version) : version
  const api = Object.keys(spec)[0]
  const name = api
    .replace(/\.([a-z])/g, k => k[1].toUpperCase())
    .replace(/_([a-z])/g, k => k[1].toUpperCase())

  const { paths } = spec[api].url
  const { params } = spec[api]
  const acceptedQuerystring = []
  const required = []

  const methods = paths.reduce((acc, val) => {
    for (const method of val.methods) {
      if (!acc.includes(method)) acc.push(method)
    }
    return acc
  }, [])
  const parts = paths.reduce((acc, val) => {
    if (!val.parts) return acc
    for (const part of Object.keys(val.parts)) {
      if (!acc.includes(part)) acc.push(part)
    }
    return acc
  }, [])

  // get the required parts from the url
  // if the url has at least one static path,
  // then there are not required parts of the url
  let allParts = []
  for (const path of paths) {
    if (path.parts) {
      allParts.push(Object.keys(path.parts))
    } else {
      allParts = []
      break
    }
  }
  if (allParts.length > 0) {
    intersect(...allParts).forEach(r => required.push(r))
  }

  for (const key in params) {
    if (params[key].required) {
      required.push(key)
    }

    acceptedQuerystring.push(key)
    if (deprecatedParameters[release] && deprecatedParameters[release][key]) {
      acceptedQuerystring.push(deprecatedParameters[release][key])
    }
  }

  for (const key in spec[api]) {
    const k = spec[api][key]
    if (k && k.required) {
      required.push(key)
    }
  }
  if (common && common.params) {
    for (const key in common.params) {
      acceptedQuerystring.push(key)
    }
  }

  const code = `
  function ${name}Api (params, options, callback) {
    ;[params, options, callback] = normalizeArguments(params, options, callback)

    ${genRequiredChecks()}

    ${genUrlValidation(paths, api)}

    let { ${genQueryBlacklist(false)}, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

    let path = ''
    ${buildPath(api)}

    // build request object
    const request = {
      method,
      path,
      ${genBody(api, methods, spec[api].body)}
      querystring
    }

    return this.transport.request(request, options, callback)
  }
  `.trim() // always call trim to avoid newlines

  return {
    name,
    code,
    acceptedQuerystring: acceptedQuerystring,
    snakeCase: genSnakeCaseMap(),
    documentation: generateDocumentation(spec[api], api)
  }

  function genRequiredChecks (param) {
    const code = required
      .map(_genRequiredCheck)
      .concat(_noBody())
      .filter(Boolean)

    if (code.length) {
      code.unshift('// check required parameters')
    }

    return code.join('\n        ')

    function _genRequiredCheck (param) {
      const camelCased = param[0] === '_'
        ? '_' + param.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : param.replace(/_([a-z])/g, k => k[1].toUpperCase())

      if (param === camelCased) {
        const check = `
          if (params['${param}'] == null) {
            const err = new this[kConfigurationError]('Missing required parameter: ${param}')
            return handleError(err, callback)
          }
        `
        return check.trim()
      } else {
        const check = `
          if (params['${param}'] == null && params['${camelCased}'] == null) {
            const err = new this[kConfigurationError]('Missing required parameter: ${param} or ${camelCased}')
            return handleError(err, callback)
          }
        `
        return check.trim()
      }
    }

    function _noBody () {
      const check = `
        if (params.body != null) {
          const err = new this[kConfigurationError]('This API does not require a body')
          return handleError(err, callback)
        }
      `
      return spec[api].body === null ? check.trim() : ''
    }
  }

  function genSnakeCaseMap () {
    const toCamelCase = str => {
      return str[0] === '_'
        ? '_' + str.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : str.replace(/_([a-z])/g, k => k[1].toUpperCase())
    }

    return acceptedQuerystring.reduce((acc, val, index) => {
      if (toCamelCase(val) !== val) {
        acc[toCamelCase(val)] = val
      }
      return acc
    }, {})
  }

  function genQueryBlacklist (addQuotes = true) {
    const toCamelCase = str => {
      return str[0] === '_'
        ? '_' + str.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : str.replace(/_([a-z])/g, k => k[1].toUpperCase())
    }

    const blacklist = ['method', 'body']
    parts.forEach(p => {
      const camelStr = toCamelCase(p)
      if (camelStr !== p) blacklist.push(`${camelStr}`)
      blacklist.push(`${p}`)
    })
    return addQuotes ? blacklist.map(q => `'${q}'`) : blacklist
  }

  function buildPath () {
    const toCamelCase = str => {
      return str[0] === '_'
        ? '_' + str.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : str.replace(/_([a-z])/g, k => k[1].toUpperCase())
    }

    const genAccessKey = str => {
      const camelStr = toCamelCase(str)
      return camelStr === str
        ? str
        : `${str} || ${camelStr}`
    }

    const genCheck = path => {
      return path
        .split('/')
        .filter(Boolean)
        .map(p => p.startsWith('{') ? `(${genAccessKey(p.slice(1, -1))}) != null` : false)
        .filter(Boolean)
        .join(' && ')
    }

    const genPath = path => {
      path = path
        .split('/')
        .filter(Boolean)
        .map(p => p.startsWith('{') ? `encodeURIComponent(${genAccessKey(p.slice(1, -1))})` : `'${p}'`)
        .join(' + \'/\' + ')
      return path.length > 0 ? ('\'/\' + ' + path) : '\'/\''
    }

    let hasStaticPath = false
    const sortedPaths = paths
      // some legacy API have mutliple statis paths
      // this filter removes them
      .filter(p => {
        if (p.path.includes('{')) return true
        if (hasStaticPath === false && p.deprecated == null) {
          hasStaticPath = true
          return true
        }
        return false
      })
      // sort by number of parameters (desc)
      .sort((a, b) => Object.keys(b.parts || {}).length - Object.keys(a.parts || {}).length)

    let code = ''
    for (let i = 0; i < sortedPaths.length; i++) {
      const { path, methods } = sortedPaths[i]
      if (sortedPaths.length === 1) {
        code += `if (method == null) method = ${generatePickMethod(methods)}
          path = ${genPath(path)}
        `
      } else if (i === 0) {
        code += `if (${genCheck(path)}) {
            if (method == null) method = ${generatePickMethod(methods)}
            path = ${genPath(path)}
          }
        `
      } else if (i === sortedPaths.length - 1) {
        code += ` else {
            if (method == null) method = ${generatePickMethod(methods)}
            path = ${genPath(path)}
          }
        `
      } else {
        code += ` else if (${genCheck(path)}) {
            if (method == null) method = ${generatePickMethod(methods)}
            path = ${genPath(path)}
          }
        `
      }
    }

    return code
  }
}

function generatePickMethod (methods) {
  if (methods.length === 1) {
    return `'${methods[0]}'`
  }
  const bodyMethod = getBodyMethod(methods)
  const noBodyMethod = getNoBodyMethod(methods)
  if (bodyMethod && noBodyMethod) {
    return `body == null ? '${noBodyMethod}' : '${bodyMethod}'`
  } else if (bodyMethod) {
    return `'${bodyMethod}'`
  } else {
    return `'${noBodyMethod}'`
  }
}

function genBody (api, methods, body) {
  const bodyMethod = getBodyMethod(methods)
  if (ndjsonApi.indexOf(api) > -1) {
    return 'bulkBody: body,'
  }
  if (body === null && bodyMethod) {
    return 'body: \'\','
  } else if (bodyMethod) {
    return 'body: body || \'\','
  } else {
    return 'body: null,'
  }
}

function getBodyMethod (methods) {
  const m = methods.filter(m => ~allowedMethods.body.indexOf(m))
  if (m.length) return m[0]
  return null
}

function getNoBodyMethod (methods) {
  const m = methods.filter(m => ~allowedMethods.noBody.indexOf(m))
  if (m.length) return m[0]
  return null
}

function genUrlValidation (paths, api) {
  // this api does not need url validation
  if (!needsPathValidation(api)) return ''
  // gets only the dynamic components of the url in an array
  // then we reverse it. A parameters always require what is
  // at its right in the array.
  const chunks = paths
    .sort((a, b) => Object.keys(a.parts || {}).length > Object.keys(b.parts || {}).length ? -1 : 1)
    .slice(0, 1)
    .reduce((acc, val) => val.path, '')
    // .reduce((a, b) => a.path.split('/').length > b.path.split('/').length ? a.path : b.path)
    .split('/')
    .filter(s => s.startsWith('{'))
    .map(s => s.slice(1, -1))
    .reverse()

  let code = ''

  const len = chunks.length
  chunks.forEach((chunk, index) => {
    if (index === len - 1) return
    const params = []
    let camelCased = chunk[0] === '_'
      ? '_' + chunk.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
      : chunk.replace(/_([a-z])/g, k => k[1].toUpperCase())

    if (chunk === camelCased) {
      code += `${index ? '} else ' : ''}if (params['${chunk}'] != null && (`
    } else {
      code += `${index ? '} else ' : ''}if ((params['${chunk}'] != null || params['${camelCased}'] != null) && (`
    }
    for (let i = index + 1; i < len; i++) {
      params.push(chunks[i])
      // url parts can be declared in camelCase fashion
      camelCased = chunks[i][0] === '_'
        ? '_' + chunks[i].slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : chunks[i].replace(/_([a-z])/g, k => k[1].toUpperCase())

      if (chunks[i] === camelCased) {
        code += `params['${chunks[i]}'] == null${i === len - 1 ? '' : ' || '}`
      } else {
        code += `(params['${chunks[i]}'] == null && params['${camelCased}'] == null)${i === len - 1 ? '' : ' || '}`
      }
    }
    code += `)) {
      const err = new this[kConfigurationError]('Missing required parameter of the url: ${params.join(', ')}')
      return handleError(err, callback)
    `
  })

  if (chunks.length > 1) {
    code += '\n}'
  }

  if (code.length) {
    code = '// check required url components\n' + code
  }

  return code.trim()
}

function generateDocumentation ({ documentation }, op) {
  // we use `replace(/\u00A0/g, ' ')` to remove no breaking spaces
  // because some parts of the description fields are using it

  if (documentation == null) return ''

  let doc = '/**\n'
  doc += `     * Perform a ${op} request\n`
  if (documentation.description) {
    doc += `     * ${documentation.description.replace(/\u00A0/g, ' ')}\n`
  }
  if (documentation.url) {
    doc += `     * ${documentation.url}\n`
  }
  doc += '     */'

  return doc
}

function needsPathValidation (api) {
  return noPathValidation.indexOf(api) === -1
}

function intersect (first, ...rest) {
  return rest.reduce((accum, current) => {
    return accum.filter(x => current.indexOf(x) !== -1)
  }, first)
}

function Uppercase (str) {
  return str[0].toUpperCase() + str.slice(1)
}

module.exports = generateNamespace
module.exports.ndjsonApi = ndjsonApi
