'use strict'

function buildExists (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [exists](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html) request
   *
   * @param {string} id - The document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document (use `_all` to fetch the first document matching the ID across all types)
   * @param {list} stored_fields - A comma-separated list of stored fields to return in the response
   * @param {string} parent - The ID of the parent document
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {boolean} realtime - Specify whether to perform the operation in realtime or search mode
   * @param {boolean} refresh - Refresh the shard containing the document before performing the operation
   * @param {string} routing - Specific routing value
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   */
  return function exists (params, options, callback) {
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
        exists(params, options, (err, body) => {
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
      'stored_fields',
      'parent',
      'preference',
      'realtime',
      'refresh',
      'routing',
      '_source',
      '_source_excludes',
      '_source_includes',
      'version',
      'version_type',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'storedFields',
      'parent',
      'preference',
      'realtime',
      'refresh',
      'routing',
      '_source',
      '_sourceExcludes',
      '_sourceIncludes',
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

    if ((params['index']) != null && (params['type']) != null && (params['id']) != null) {
      path = '/' + encodeURIComponent(params['index']) + '/' + encodeURIComponent(params['type']) + '/' + encodeURIComponent(params['id'])
    } else {
      path = '/' + encodeURIComponent(params['index']) + '/' + '_doc' + '/' + encodeURIComponent(params['id'])
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

module.exports = buildExists
