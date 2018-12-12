'use strict'

function buildIndicesGet (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.get](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-index.html) request
   *
   * @param {list} index - A comma-separated list of index names
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {boolean} ignore_unavailable - Ignore unavailable indexes (default: false)
   * @param {boolean} allow_no_indices - Ignore if a wildcard expression resolves to no concrete indices (default: false)
   * @param {enum} expand_wildcards - Whether wildcard expressions should get expanded to open or closed indices (default: open)
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {boolean} include_defaults - Whether to return all default setting for each of the indices.
   * @param {time} master_timeout - Specify timeout for connection to master
   */
  return function indicesGet (params, options, callback) {
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
        indicesGet(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
        result
      )
    }
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'local',
      'ignore_unavailable',
      'allow_no_indices',
      'expand_wildcards',
      'flat_settings',
      'include_defaults',
      'master_timeout',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'local',
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
      'flatSettings',
      'includeDefaults',
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
      method = 'GET'
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
    const parts = [params['index']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: null,
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

module.exports = buildIndicesGet
