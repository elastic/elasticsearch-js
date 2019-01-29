'use strict'

function buildIndicesPutMapping (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.put_mapping](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-put-mapping.html) request
   *
   * @param {list} index - A comma-separated list of index names the mapping should be added to (supports wildcards); use `_all` or omit to add the mapping on all indices.
   * @param {string} type - The name of the document type
   * @param {string} include_type_name - Whether a type should be expected in the body of the mappings.
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {object} body - The mapping definition
   */
  return function indicesPutMapping (params, options, callback) {
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
        indicesPutMapping(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
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
      'include_type_name',
      'timeout',
      'master_timeout',
      'ignore_unavailable',
      'allow_no_indices',
      'expand_wildcards',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'includeTypeName',
      'timeout',
      'masterTimeout',
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
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

    var path = ''

    if ((params['index']) != null && (params['type']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + encodeURIComponent(params['type']) + '/' + '_mapping'
    } else if ((params['index']) != null && (params['type']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mapping' + '/' + encodeURIComponent(params['type'])
    } else if ((params['index']) != null && (params['type']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + encodeURIComponent(params['type']) + '/' + '_mappings'
    } else if ((params['index']) != null && (params['type']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mappings' + '/' + encodeURIComponent(params['type'])
    } else if ((params['type']) != null) {
      path = '/' + '_mapping' + '/' + encodeURIComponent(params['type'])
    } else if ((params['type']) != null) {
      path = '/' + '_mappings' + '/' + encodeURIComponent(params['type'])
    } else if ((params['index']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mappings'
    } else {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_mapping'
    }

    // build request object
    const request = {
      method,
      path,
      body: params.body || '',
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

module.exports = buildIndicesPutMapping
