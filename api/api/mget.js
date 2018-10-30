'use strict'

function buildMget (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError } = opts
  /**
   * Perform a [mget](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-get.html) request
   *
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document
   * @param {list} stored_fields - A comma-separated list of stored fields to return in the response
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {boolean} realtime - Specify whether to perform the operation in realtime or search mode
   * @param {boolean} refresh - Refresh the shard containing the document before performing the operation
   * @param {string} routing - Specific routing value
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_exclude - A list of fields to exclude from the returned _source field
   * @param {list} _source_include - A list of fields to extract and return from the _source field
   * @param {object} body - Document identifiers; can be either `docs` (containing full document information) or `ids` (when index and type is provided in the URL.
   */
  return function mget (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        mget(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'stored_fields',
      'preference',
      'realtime',
      'refresh',
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
      'storedFields',
      'preference',
      'realtime',
      'refresh',
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
        { body: null, headers: null, statusCode: null }
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['index'], params['type'], '_mget']
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

module.exports = buildMget
