'use strict'

function buildReindexRethrottle (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [reindex_rethrottle](https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-reindex.html) request
   *
   * @param {string} task_id - The task id to rethrottle
   * @param {number} requests_per_second - The throttle to set on this request in floating sub-requests per second. -1 means set no throttle.
   */
  return function reindexRethrottle (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        reindexRethrottle(params, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'requests_per_second',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'requestsPerSecond',
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
      method = 'POST'
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
    const parts = ['_delete_by_query', params['task_id'] || params['taskId'], '_rethrottle']
    const request = {
      method,
      path: (params['task_id'] || params['taskId']) != null
        ? '/' + parts.filter(Boolean).map(encodeURIComponent).join('/')
        : '/_reindex/{task_id}/_rethrottle',
      querystring,
      body: '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildReindexRethrottle
