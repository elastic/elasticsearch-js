'use strict'

function buildIndicesGetFieldMapping (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.get_field_mapping](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-get-field-mapping.html) request
   *
   * @param {list} index - A comma-separated list of index names
   * @param {list} type - A comma-separated list of document types
   * @param {list} fields - A comma-separated list of fields
   * @param {boolean} include_defaults - Whether the default mapping values should be returned as well
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   */
  return function indicesGetFieldMapping (params, options, callback) {
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
        indicesGetFieldMapping(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['fields'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: fields'),
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
      'include_defaults',
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
      'includeDefaults',
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

    var path = ''

    if ((params['index']) != null && (params['type']) != null && (params['fields']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mapping' + '/' + encodeURIComponent(params['type']) + '/' + 'field' + '/' + encodeURIComponent(params['fields'])
    } else if ((params['index']) != null && (params['fields']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(params['fields'])
    } else if ((params['type']) != null && (params['fields']) != null) {
      path = '/' + '_mapping' + '/' + encodeURIComponent(params['type']) + '/' + 'field' + '/' + encodeURIComponent(params['fields'])
    } else {
      path = '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(params['fields'])
    }

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

module.exports = buildIndicesGetFieldMapping
