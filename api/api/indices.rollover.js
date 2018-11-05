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
  return function indicesRollover (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesRollover(params, (err, body) => {
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['alias'], '_rollover', params['new_index'] || params['newIndex']]
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

module.exports = buildIndicesRollover
