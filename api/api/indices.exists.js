'use strict'

function buildIndicesExists (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.exists](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-exists.html) request
   *
   * @param {list} index - A comma-separated list of index names
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {boolean} ignore_unavailable - Ignore unavailable indexes (default: false)
   * @param {boolean} allow_no_indices - Ignore if a wildcard expression resolves to no concrete indices (default: false)
   * @param {enum} expand_wildcards - Whether wildcard expressions should get expanded to open or closed indices (default: open)
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {boolean} include_defaults - Whether to return all default setting for each of the indices.
   */
  return function indicesExists (params, options, callback) {
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
        indicesExists(params, options, (err, body) => {
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
      method = 'HEAD'
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

    var path = ''

    path = '/' + encodeURIComponent(params['index'])

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildIndicesExists
