'use strict'

function buildIndicesUpdateAliases (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError } = opts
  /**
   * Perform a [indices.update_aliases](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html) request
   *
   * @param {time} timeout - Request timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {object} body - The definition of `actions` to perform
   */
  return function indicesUpdateAliases (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesUpdateAliases(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
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
      method = 'POST'
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
    const parts = ['_aliases']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
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

module.exports = buildIndicesUpdateAliases
