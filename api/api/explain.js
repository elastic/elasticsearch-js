'use strict'

function buildExplain (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [explain](http://www.elastic.co/guide/en/elasticsearch/reference/master/search-explain.html) request
   *
   * @param {string} id - The document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {boolean} analyze_wildcard - Specify whether wildcards and prefix queries in the query string query should be analyzed (default: false)
   * @param {string} analyzer - The analyzer for the query string query
   * @param {enum} default_operator - The default operator for query string query (AND or OR)
   * @param {string} df - The default field for query string query (default: _all)
   * @param {list} stored_fields - A comma-separated list of stored fields to return in the response
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {string} parent - The ID of the parent document
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {string} q - Query in the Lucene query string syntax
   * @param {string} routing - Specific routing value
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_exclude - A list of fields to exclude from the returned _source field
   * @param {list} _source_include - A list of fields to extract and return from the _source field
   * @param {object} body - The query definition using the Query DSL
   */
  return function explain (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        explain(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['id'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: id'),
        result
      )
    }
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

    // check required url components
    if (params['id'] != null && (params['type'] == null || params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: type, index'),
        result
      )
    } else if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'analyze_wildcard',
      'analyzer',
      'default_operator',
      'df',
      'stored_fields',
      'lenient',
      'parent',
      'preference',
      'q',
      'routing',
      '_source',
      '_source_exclude',
      '_source_include',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'analyzeWildcard',
      'analyzer',
      'defaultOperator',
      'df',
      'storedFields',
      'lenient',
      'parent',
      'preference',
      'q',
      'routing',
      '_source',
      '_sourceExclude',
      '_sourceInclude',
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
    const parts = [params['index'], params['type'], params['id'], '_explain']
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

module.exports = buildExplain
