'use strict'

function buildSearchTemplate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [search_template](http://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html) request
   *
   * @param {list} index - A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices
   * @param {list} type - A comma-separated list of document types to search; leave empty to perform the operation on all types
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {time} scroll - Specify how long a consistent view of the index should be maintained for scrolled search
   * @param {enum} search_type - Search operation type
   * @param {boolean} explain - Specify whether to return detailed information about score computation as part of a hit
   * @param {boolean} profile - Specify whether to profile the query execution
   * @param {boolean} typed_keys - Specify whether aggregation and suggester names should be prefixed by their respective types in the response
   * @param {object} body - The search definition template and its params
   */
  return function searchTemplate (params, options, callback) {
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
        searchTemplate(params, options, (err, body) => {
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
      'preference',
      'routing',
      'scroll',
      'search_type',
      'explain',
      'profile',
      'typed_keys',
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
      'preference',
      'routing',
      'scroll',
      'searchType',
      'explain',
      'profile',
      'typedKeys',
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
      method = params.body == null ? 'GET' : 'POST'
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
    const parts = [params['index'], params['type'], '_search', 'template']
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

module.exports = buildSearchTemplate
