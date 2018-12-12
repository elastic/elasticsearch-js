'use strict'

function buildReindex (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [reindex](https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-reindex.html) request
   *
   * @param {boolean} refresh - Should the effected indexes be refreshed?
   * @param {time} timeout - Time each individual bulk request should wait for shards that are unavailable.
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the reindex operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {boolean} wait_for_completion - Should the request should block until the reindex is complete.
   * @param {number} requests_per_second - The throttle to set on this request in sub-requests per second. -1 means no throttle.
   * @param {number} slices - The number of slices this task should be divided into. Defaults to 1 meaning the task isn't sliced into subtasks.
   * @param {object} body - The search definition using the Query DSL and the prototype for the index request.
   */
  return function reindex (params, options, callback) {
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
        reindex(params, options, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'refresh',
      'timeout',
      'wait_for_active_shards',
      'wait_for_completion',
      'requests_per_second',
      'slices',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'refresh',
      'timeout',
      'waitForActiveShards',
      'waitForCompletion',
      'requestsPerSecond',
      'slices',
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

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_reindex']
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

module.exports = buildReindex
