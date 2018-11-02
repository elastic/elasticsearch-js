'use strict'

function buildIndicesPutAlias (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError } = opts
  /**
   * Perform a [indices.put_alias](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html) request
   *
   * @param {list} index - A comma-separated list of index names the alias should point to (supports wildcards); use `_all` to perform the operation on all indices.
   * @param {string} name - The name of the alias to be created or updated
   * @param {time} timeout - Explicit timestamp for the document
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {object} body - The settings for the alias, such as `routing` or `filter`
   */
  return function indicesPutAlias (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesPutAlias(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
        { body: null, headers: null, statusCode: null }
      )
    }
    if (params['name'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: name'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // check required url components
    if (params['name'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'timeout',
      'master_timeout',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'timeout',
      'masterTimeout',
      'pretty',
      'human',
      'errorTrace',
      'source',
      'filterPath'
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
      method = 'PUT'
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof params.headers}`),
        { body: null, headers: null, statusCode: null }
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['index'], '_aliases', params['name']]
    const request = {
      method,
      path: params['index'] != null && params['name'] != null
        ? '/' + parts.filter(Boolean).map(encodeURIComponent).join('/')
        : '/{index}/_alias/{name}',
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildIndicesPutAlias
