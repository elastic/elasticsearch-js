'use strict'

const dedent = require('dedent')
const allowedMethods = {
  noBody: ['GET', 'HEAD', 'DELETE'],
  body: ['POST', 'PUT', 'DELETE']
}

// list of apis that does not need any kind of validation
// because of how the url is built
const noPathValidation = [
  'indices.get_alias',
  'indices.exists_alias',
  'indices.get_field_mapping',
  'indices.get_mapping',
  'indices.get_settings',
  'indices.put_mapping',
  'indices.stats',
  'nodes.info',
  'nodes.stats',
  'nodes.usage',
  'tasks.cancel'
]

// apis that uses bulkBody property
const ndjsonApi = [
  'bulk',
  'msearch',
  'msearch_template'
]

function generate (spec, common) {
  const api = Object.keys(spec)[0]
  const name = api
    .replace(/\.([a-z])/g, k => k[1].toUpperCase())
    .replace(/_([a-z])/g, k => k[1].toUpperCase())

  const methods = spec[api].methods
  const { path, paths, parts, params } = spec[api].url
  const acceptedQuerystring = []
  const required = []

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
  function ${safeWords(name)} (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        ${safeWords(name)}(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    ${genRequiredChecks()}

    ${genUrlValidation(paths, api)}

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      ${genAcceptedQuerystring()}
    ]
    const acceptedQuerystringCamelCased = [
      ${genAcceptedQuerystringCamelCased()}
    ]

    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      if (acceptedQuerystring.indexOf(key) !== -1) {
        querystring[key] = params[key]
      } else {
        var camelIndex = acceptedQuerystringCamelCased.indexOf(key)
        if (camelIndex !== -1) {
          querystring[acceptedQuerystring[camelIndex]] = params[key]
        }
      }
    }

    // configure http method
    var method = params.method
    if (method == null) {
      ${generatePickMethod(methods)}
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(\`Headers should be an object, instead got: \${typeof params.headers}\`),
        { body: null, headers: null, statusCode: null }
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ${getUrlParts()}
    const request = {
      method,
      ${buildPath(api)}
      querystring,
      ${genBody(api, methods, spec[api].body)}
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
  `.trim() // always call trim to avoid newlines

  const fn = dedent`
  'use strict'

  function build${name[0].toUpperCase() + name.slice(1)} (opts) {
    // eslint-disable-next-line no-unused-vars
    const { makeRequest, ConfigurationError } = opts
    ${generateDocumentation(spec[api], api)}
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
            return callback(
              new ConfigurationError('Missing required parameter: ${param}'),
              { body: null, headers: null, statusCode: null }
            )
          }
        `
        return check.trim()
      } else {
        const check = `
          if (params['${param}'] == null && params['${camelCased}'] == null) {
            return callback(
              new ConfigurationError('Missing required parameter: ${param} or ${camelCased}'),
              { body: null, headers: null, statusCode: null }
            )
          }
        `
        return check.trim()
      }
    }

    function _noBody () {
      const check = `
        if (params.body != null) {
          return callback(
            new ConfigurationError('This API does not require a body'),
            { body: null, headers: null, statusCode: null }
          )
        }
      `
      return spec[api].body === null ? check.trim() : ''
    }
  }

  function genAcceptedQuerystring () {
    return acceptedQuerystring
      .map(q => `'${q}'`)
      .join(',\n          ')
  }

  function genAcceptedQuerystringCamelCased () {
    return acceptedQuerystring
      .map(q => {
        // if the key starts with `_` we should not camelify the first occurence
        // eg: _source_include => _sourceInclude
        return q[0] === '_'
          ? '_' + q.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
          : q.replace(/_([a-z])/g, k => k[1].toUpperCase())
      })
      .map(q => `'${q}'`)
      .join(',\n          ')
  }

  function buildPath () {
    // if the default path is static, we should add a dynamic check
    // to figure out which path to use, see cluster.stats
    // otherwise we can skip that check
    const p1 = paths
      .reduce((a, b) => a.split('/').length > b.split('/').length ? a : b)
      .split('/')
      .filter(chunk => !chunk.startsWith('{'))
      .join('/')

    const p2 = path
      .split('/')
      .filter(chunk => !chunk.startsWith('{'))
      .join('/')

    if (p1 === p2 || !needsPathValidation(api)) {
      return `path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),`.trim()
    }

    const dynamicParts = checkDynamicParts()
    if (dynamicParts.length) {
      return `
        path: ${dynamicParts}
          ? '/' + parts.filter(Boolean).join('/')
          : '${path}',
      `.trim()
    } else {
      return `path: '/' + parts.filter(Boolean).join('/'),`.trim()
    }
  }

  function checkDynamicParts () {
    const chunks = paths
      .reduce((a, b) => a.split('/').length > b.split('/').length ? a : b)
      .split('/')
      .filter(Boolean)

    var str = ''
    chunks.forEach((chunk, index) => {
      if (chunk.startsWith('{') && chunk.endsWith('}')) {
        chunk = chunk.slice(1, -1)
        // url parts can be declared in camelCase fashion
        var camelCased = chunk[0] === '_'
          ? '_' + chunk.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
          : chunk.replace(/_([a-z])/g, k => k[1].toUpperCase())

        if (chunk === camelCased) {
          str += `params['${chunk}'] != null && `
        } else {
          str += `(params['${chunk}'] || params['${camelCased}']) != null && `
        }
      }
    })

    // removes last ' && '
    return str.slice(0, -4)
  }

  function getUrlParts () {
    const chunks = paths
      .reduce((a, b) => a.split('/').length > b.split('/').length ? a : b)
      .split('/')
      .filter(Boolean)
    var str = '['
    chunks.forEach((chunk, index) => {
      if (chunk.startsWith('{') && chunk.endsWith('}')) {
        chunk = chunk.slice(1, -1)
        // url parts can be declared in camelCase fashion
        var camelCased = chunk[0] === '_'
          ? '_' + chunk.slice(1).replace(/_([a-z])/g, k => k[1].toUpperCase())
          : chunk.replace(/_([a-z])/g, k => k[1].toUpperCase())

        if (chunk === camelCased) {
          str += `params['${chunk}']`
        } else {
          str += `params['${chunk}'] || params['${camelCased}']`
        }
      } else {
        str += `'${chunk}'`
      }
      if (index !== chunks.length - 1) {
        str += ', '
      }
    })
    str += ']'
    return str
  }
}

function safeWords (str) {
  if (str === 'delete') {
    return '_delete'
  }
  return str
}

function generatePickMethod (methods) {
  if (methods.length === 1) {
    return `method = '${methods[0]}'`
  }
  const bodyMethod = getBodyMethod(methods)
  const noBodyMethod = getNoBodyMethod(methods)
  if (bodyMethod && noBodyMethod) {
    return `method = params.body == null ? '${noBodyMethod}' : '${bodyMethod}'`
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
    return 'bulkBody: params.body,'
  }
  if (body === null && bodyMethod) {
    return `body: '',`
  } else if (bodyMethod) {
    return `body: params.body || '',`
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
        code += `(params['${chunks[i]}'] == null || params['${camelCased}')${i === len - 1 ? '' : ' || '}`
      }
    }
    code += `)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: ${params.join(', ')}'),
        { body: null, headers: null, statusCode: null }
      )`
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
    doc += `     * @param {${obj.type}} ${part} - ${obj.description.replace(/\u00A0/g, ' ')}\n`
  })

  Object.keys(params).forEach(param => {
    const obj = params[param]
    doc += `     * @param {${obj.type}} ${param} - ${obj.description.replace(/\u00A0/g, ' ')}\n`
  })

  if (body) {
    doc += `     * @param {${body.type || 'object'}} body - ${body.description.replace(/\u00A0/g, ' ')}\n`
  }

  doc += '     */'

  return doc
}

function needsPathValidation (api) {
  return noPathValidation.indexOf(api) === -1
}

module.exports = generate
