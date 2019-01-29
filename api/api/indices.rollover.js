'use strict'

function buildIndicesRollover (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.rollover](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-rollover-index.html) request
   *
   * @param {string} alias - The name of the alias to rollover
   * @param {string} new_index - The name of the rollover index
   * @param {time} timeout - Explicit operation timeout
   * @param {boolean} dry_run - If set to true the rollover action will only be validated but not actually performed even if a condition matches. The default is false
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {string} wait_for_active_shards - Set the number of active shards to wait for on the newly created rollover index before the operation returns.
   * @param {object} body - The conditions that needs to be met for executing rollover
   */
  return function indicesRollover (params, options, callback) {
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
        indicesRollover(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['alias'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: alias'),
        result
      )
    }

    // check required url components
    if ((params['new_index'] != null || params['newIndex'] != null) && (params['alias'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: alias'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'timeout',
      'dry_run',
      'master_timeout',
      'wait_for_active_shards',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'timeout',
      'dryRun',
      'masterTimeout',
      'waitForActiveShards',
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

    var path = ''

    if ((params['alias']) != null && (params['new_index'] || params['newIndex']) != null) {
      path = '/' + encodeURIComponent(params['alias']) + '/' + '_rollover' + '/' + encodeURIComponent(params['new_index'] || params['newIndex'])
    } else {
      path = '/' + encodeURIComponent(params['alias']) + '/' + '_rollover'
    }

    // build request object
    const request = {
      method,
      path,
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

module.exports = buildIndicesRollover
