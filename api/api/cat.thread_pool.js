'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatThreadPool (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [cat.thread_pool](http://www.elastic.co/guide/en/elasticsearch/reference/master/cat-thread-pool.html) request
   *
   * @param {list} thread_pool_patterns - A comma-separated list of regular-expressions to filter the thread pools in the output
   * @param {string} format - a short version of the Accept header, e.g. json, yaml
   * @param {enum} size - The multiplier in which to display values
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {list} h - Comma-separated list of column names to display
   * @param {boolean} help - Return help information
   * @param {list} s - Comma-separated list of column names or column aliases to sort by
   * @param {boolean} v - Verbose mode. Display column headers
   */

  const acceptedQuerystring = [
    'format',
    'size',
    'local',
    'master_timeout',
    'h',
    'help',
    's',
    'v',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function catThreadPool (params, options, callback) {
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
        catThreadPool(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
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
    var { method, body, threadPoolPatterns, thread_pool_patterns } = params
    var querystring = semicopy(params, ['method', 'body', 'threadPoolPatterns', 'thread_pool_patterns'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((thread_pool_patterns || threadPoolPatterns) != null) {
      path = '/' + '_cat' + '/' + 'thread_pool' + '/' + encodeURIComponent(thread_pool_patterns || threadPoolPatterns)
    } else {
      path = '/' + '_cat' + '/' + 'thread_pool'
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
      headers: options.headers || null,
      compression: options.compression || false,
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

module.exports = buildCatThreadPool
