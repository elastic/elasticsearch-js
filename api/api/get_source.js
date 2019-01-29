'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildGetSource (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [get_source](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-get.html) request
   *
   * @param {string} id - The document ID
   * @param {string} index - The name of the index
   * @param {string} type - The type of the document; use `_all` to fetch the first document matching the ID across all types
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

  const acceptedQuerystring = [
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

  const snakeCase = {
    _sourceExcludes: '_source_excludes',
    _sourceIncludes: '_source_includes',
    versionType: 'version_type',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function getSource (params, options, callback) {
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
        getSource(params, options, (err, body) => {
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
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, id, index, type } = params
    var querystring = semicopy(params, ['method', 'body', 'id', 'index', 'type'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_source'

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
      headers: options.headers || null,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
}

module.exports = buildGetSource
