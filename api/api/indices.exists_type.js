'use strict'

function buildIndicesExistsType (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.exists_type](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-types-exists.html) request
   *
   * @param {list} index - A comma-separated list of index names; use `_all` to check the types across all indices
   * @param {list} type - A comma-separated list of document types to check
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   */
  return function indicesExistsType (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesExistsType(params, (err, body) => {
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
    if (params['type'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: type'),
        result
      )
    }
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'ignore_unavailable',
      'allow_no_indices',
      'expand_wildcards',
      'local',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
      'local',
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['index'], '_mapping', params['type']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: null,
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildIndicesExistsType
