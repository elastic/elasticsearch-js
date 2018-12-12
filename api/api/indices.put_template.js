'use strict'

function buildIndicesPutTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.put_template](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-templates.html) request
   *
   * @param {string} name - The name of the template
   * @param {number} order - The order for this template when merging multiple matching ones (higher numbers are merged later, overriding the lower numbers)
   * @param {boolean} create - Whether the index template should only be added if new or can also replace an existing one
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {object} body - The template definition
   */
  return function indicesPutTemplate (params, options, callback) {
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
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesPutTemplate(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['name'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: name'),
        result
      )
    }
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'order',
      'create',
      'timeout',
      'master_timeout',
      'flat_settings',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'order',
      'create',
      'timeout',
      'masterTimeout',
      'flatSettings',
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
        result
      )
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_template', params['name']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildIndicesPutTemplate
