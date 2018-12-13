'use strict'

function buildTermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [termvectors](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-termvectors.html) request
   *
   * @param {string} index - The index in which the document resides.
   * @param {string} type - The type of the document.
   * @param {string} id - The id of the document, when not specified a doc param should be supplied.
   * @param {boolean} term_statistics - Specifies if total term frequency and document frequency should be returned.
   * @param {boolean} field_statistics - Specifies if document count, sum of document frequencies and sum of total term frequencies should be returned.
   * @param {list} fields - A comma-separated list of fields to return.
   * @param {boolean} offsets - Specifies if term offsets should be returned.
   * @param {boolean} positions - Specifies if term positions should be returned.
   * @param {boolean} payloads - Specifies if term payloads should be returned.
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random).
   * @param {string} routing - Specific routing value.
   * @param {string} parent - Parent id of documents.
   * @param {boolean} realtime - Specifies if request is real-time as opposed to near-real-time (default: true).
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - Define parameters and or supply a document to get termvectors for. See documentation.
   */
  return function termvectors (params, options, callback) {
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
        termvectors(params, options, (err, body) => {
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
      'term_statistics',
      'field_statistics',
      'fields',
      'offsets',
      'positions',
      'payloads',
      'preference',
      'routing',
      'parent',
      'realtime',
      'version',
      'version_type',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'termStatistics',
      'fieldStatistics',
      'fields',
      'offsets',
      'positions',
      'payloads',
      'preference',
      'routing',
      'parent',
      'realtime',
      'version',
      'versionType',
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
    const parts = [params['index'], params['type'], params['id'], '_termvectors']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
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

module.exports = buildTermvectors
