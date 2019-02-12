'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildDeleteByQueryRethrottle (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [delete_by_query_rethrottle](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html) request
   *
   * @param {string} task_id - The task id to rethrottle
   * @param {number} requests_per_second - The throttle to set on this request in floating sub-requests per second. -1 means set no throttle.
   */

  const acceptedQuerystring = [
    'requests_per_second',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    requestsPerSecond: 'requests_per_second',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function deleteByQueryRethrottle (params, options, callback) {
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
        deleteByQueryRethrottle(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['task_id'] == null && params['taskId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: task_id or taskId'),
        result
      )
    }
    if (params['requests_per_second'] == null && params['requestsPerSecond'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: requests_per_second or requestsPerSecond'),
        result
      )
    }
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
    var { method, body, taskId, task_id } = params
    var querystring = semicopy(params, ['method', 'body', 'taskId', 'task_id'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_delete_by_query' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_rethrottle'

    // build request object
    const request = {
      method,
      path,
      body: '',
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

module.exports = buildDeleteByQueryRethrottle
