'use strict'

function buildIndicesValidateQuery (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.validate_query](http://www.elastic.co/guide/en/elasticsearch/reference/master/search-validate.html) request
   *
   * @param {list} index - A comma-separated list of index names to restrict the operation; use `_all` or empty string to perform the operation on all indices
   * @param {list} type - A comma-separated list of document types to restrict the operation; leave empty to perform the operation on all types
   * @param {boolean} explain - Return detailed information about the error
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {string} q - Query in the Lucene query string syntax
   * @param {string} analyzer - The analyzer to use for the query string
   * @param {boolean} analyze_wildcard - Specify whether wildcard and prefix queries should be analyzed (default: false)
   * @param {enum} default_operator - The default operator for query string query (AND or OR)
   * @param {string} df - The field to use as default where no field prefix is given in the query string
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {boolean} rewrite - Provide a more detailed explanation showing the actual Lucene query that will be executed.
   * @param {boolean} all_shards - Execute validation on all shards instead of one random shard per index
   * @param {object} body - The query definition specified with the Query DSL
   */
  return function indicesValidateQuery (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesValidateQuery(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
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
      'explain',
      'ignore_unavailable',
      'allow_no_indices',
      'expand_wildcards',
      'q',
      'analyzer',
      'analyze_wildcard',
      'default_operator',
      'df',
      'lenient',
      'rewrite',
      'all_shards',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'explain',
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
      'q',
      'analyzer',
      'analyzeWildcard',
      'defaultOperator',
      'df',
      'lenient',
      'rewrite',
      'allShards',
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['index'], params['type'], '_validate', 'query']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildIndicesValidateQuery
