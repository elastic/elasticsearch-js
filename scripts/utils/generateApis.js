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

const dedent = require('dedent')
const allowedMethods = {
  noBody: ['GET', 'HEAD', 'DELETE'],
  body: ['POST', 'PUT', 'DELETE']
}

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

function generate (spec, common) {
  const api = Object.keys(spec)[0]
  const name = api
    .replace(/\.([a-z])/g, k => k[1].toUpperCase())
    .replace(/_([a-z])/g, k => k[1].toUpperCase())

  const methods = spec[api].methods
  const { paths, deprecated_paths, parts, params } = spec[api].url
  const acceptedQuerystring = []
  const required = []

  if (deprecated_paths) {
    for (const p of deprecated_paths) {
      paths.push(p.path)
    }
  }

  for (const key in parts) {
    if (parts[key].required) {
      required.push(key)
    }
  }

  for (const key in params) {
    if (params[key].required) {
      required.push(key)
    }
    acceptedQuerystring.push(key)
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
  function ${safeWords(name)} (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }

    ${genRequiredChecks()}

    ${genUrlValidation(paths, api)}

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(\`Headers should be an object, instead got: \${typeof options.headers}\`)
      return handleError(err, callback)
    }

    var warnings = null
    var { ${genQueryBlacklist(false)} } = params
    var querystring = semicopy(params, [${genQueryBlacklist()}])

    if (method == null) {
      ${generatePickMethod(methods)}
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }


    var path = ''
    ${buildPath(api)}

    // build request object
    const request = {
      method,
      path,
      ${genBody(api, methods, spec[api].body)}
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      querystring: options.querystring || null,
      compression: options.compression || false,
      id: options.id || null,
      context: options.context || null,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
  `.trim() // always call trim to avoid newlines

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

  /* eslint camelcase: 0 */
  /* eslint no-unused-vars: 0 */

  function build${name[0].toUpperCase() + name.slice(1)} (opts) {
    // eslint-disable-next-line no-unused-vars
    const { makeRequest, ConfigurationError, handleError } = opts
    ${generateDocumentation(spec[api], api)}

    const acceptedQuerystring = [
      ${acceptedQuerystring.map(q => `'${q}'`).join(',\n')}
    ]

    const snakeCase = {
      ${genSnakeCaseMap()}
    }

    return ${code}
  }

  module.exports = build${name[0].toUpperCase() + name.slice(1)}
`

  // new line at the end of file
  return fn + '\n'

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
      var camelCased = param[0] === '_'
        ? '_' + param.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : param.replace(/_([a-z])/g, k => k[1].toUpperCase())

      if (param === camelCased) {
        const check = `
          if (params['${param}'] == null) {
            const err = new ConfigurationError('Missing required parameter: ${param}')
            return handleError(err, callback)
          }
        `
        return check.trim()
      } else {
        const check = `
          if (params['${param}'] == null && params['${camelCased}'] == null) {
            const err = new ConfigurationError('Missing required parameter: ${param} or ${camelCased}')
            return handleError(err, callback)
          }
        `
        return check.trim()
      }
    }

    function _noBody () {
      const check = `
        if (params.body != null) {
          const err = new ConfigurationError('This API does not require a body')
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
        acc += `${toCamelCase(val)}: '${val}'`
        if (index !== acceptedQuerystring.length - 1) {
          acc += ',\n'
        }
      }
      return acc
    }, '')
  }

  function genQueryBlacklist (addQuotes = true) {
    const toCamelCase = str => {
      return str[0] === '_'
        ? '_' + str.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
        : str.replace(/_([a-z])/g, k => k[1].toUpperCase())
    }

    const blacklist = ['method', 'body']
    if (typeof parts === 'object' && parts !== null) {
      Object.keys(parts).forEach(p => {
        const camelStr = toCamelCase(p)
        if (camelStr !== p) blacklist.push(`${camelStr}`)
        blacklist.push(`${p}`)
      })
    }
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

    var code = ''
    var hasStaticPath = false
    var singlePathComponent = false
    paths
      .filter(path => {
        if (path.indexOf('{') > -1) return true
        if (hasStaticPath === false) {
          hasStaticPath = true
          return true
        }
        return false
      })
      .sort((a, b) => (b.split('{').length + b.split('/').length) - (a.split('{').length + a.split('/').length))
      .forEach((path, index, arr) => {
        if (arr.length === 1) {
          singlePathComponent = true
          code += `
            path = ${genPath(path)}
          `
        } else if (index === 0) {
          code += `
            if (${genCheck(path)}) {
              path = ${genPath(path)}
          `
        } else if (index === arr.length - 1) {
          code += `
            } else {
              path = ${genPath(path)}
          `
        } else {
          code += `
            } else if (${genCheck(path)}) {
              path = ${genPath(path)}
          `
        }
      })

    code += singlePathComponent ? '' : '}'
    return code
  }
}

function safeWords (str) {
  switch (str) {
    // delete is a reserved word
    case 'delete':
      return '_delete'
    // index is also a parameter
    case 'index':
      return '_index'
    default:
      return str
  }
}

function generatePickMethod (methods) {
  if (methods.length === 1) {
    return `method = '${methods[0]}'`
  }
  const bodyMethod = getBodyMethod(methods)
  const noBodyMethod = getNoBodyMethod(methods)
  if (bodyMethod && noBodyMethod) {
    return `method = body == null ? '${noBodyMethod}' : '${bodyMethod}'`
  } else if (bodyMethod) {
    return `
        method = '${bodyMethod}'
    `.trim()
  } else {
    return `
        method = '${noBodyMethod}'
    `.trim()
  }
}

function genBody (api, methods, body) {
  const bodyMethod = getBodyMethod(methods)
  if (ndjsonApi.indexOf(api) > -1) {
    return 'bulkBody: body,'
  }
  if (body === null && bodyMethod) {
    return `body: '',`
  } else if (bodyMethod) {
    return `body: body || '',`
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
    .reduce((a, b) => a.split('/').length > b.split('/').length ? a : b)
    .split('/')
    .filter(s => s.startsWith('{'))
    .map(s => s.slice(1, -1))
    .reverse()

  var code = ''

  const len = chunks.length
  chunks.forEach((chunk, index) => {
    if (index === len - 1) return
    var params = []
    var camelCased = chunk[0] === '_'
      ? '_' + chunk.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
      : chunk.replace(/_([a-z])/g, k => k[1].toUpperCase())

    if (chunk === camelCased) {
      code += `${index ? '} else ' : ''}if (params['${chunk}'] != null && (`
    } else {
      code += `${index ? '} else ' : ''}if ((params['${chunk}'] != null || params['${camelCased}'] != null) && (`
    }
    for (var i = index + 1; i < len; i++) {
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
      const err = new ConfigurationError('Missing required parameter of the url: ${params.join(', ')}')
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

function generateDocumentation (api, op) {
  const { parts = {}, params = {} } = api.url
  const { body } = api

  // we use `replace(/\u00A0/g, ' ')` to remove no breaking spaces
  // because some parts of the description fields are using it

  var doc = '/**\n'
  doc += `     * Perform a [${op}](${api.documentation}) request\n     *\n`
  Object.keys(parts).forEach(part => {
    const obj = parts[part]
    const description = obj.description || ''
    doc += `     * @param {${obj.type}} ${part} - ${description.replace(/\u00A0/g, ' ')}\n`
  })

  Object.keys(params).forEach(param => {
    const obj = params[param]
    const description = obj.description || ''
    doc += `     * @param {${obj.type}} ${param} - ${description.replace(/\u00A0/g, ' ')}\n`
  })

  if (body) {
    const description = body.description || ''
    doc += `     * @param {${body.type || 'object'}} body - ${description.replace(/\u00A0/g, ' ')}\n`
  }

  doc += '     */'

  return doc
}

function needsPathValidation (api) {
  return noPathValidation.indexOf(api) === -1
}

module.exports = generate
