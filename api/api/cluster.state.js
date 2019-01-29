'use strict'

function buildClusterState (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [cluster.state](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-state.html) request
   *
   * @param {list} index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
   * @param {list} metric - Limit the information returned to the specified metrics
   * @param {boolean} local - Return local information, do not retrieve the state from master node (default: false)
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} flat_settings - Return settings in flat format (default: false)
   * @param {number} wait_for_metadata_version - Wait for the metadata version to be equal or greater than the specified metadata version
   * @param {time} wait_for_timeout - The maximum time to wait for wait_for_metadata_version before timing out
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   */
  return function clusterState (params, options, callback) {
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
        clusterState(params, options, (err, body) => {
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

    // check required url components
    if (params['index'] != null && (params['metric'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: metric'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'local',
      'master_timeout',
      'flat_settings',
      'wait_for_metadata_version',
      'wait_for_timeout',
      'ignore_unavailable',
      'allow_no_indices',
      'expand_wildcards',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'local',
      'masterTimeout',
      'flatSettings',
      'waitForMetadataVersion',
      'waitForTimeout',
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
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
      method = 'GET'
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

    if ((params['metric']) != null && (params['index']) != null) {
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(params['metric']) + '/' + encodeURIComponent(params['index'])
    } else if ((params['metric']) != null) {
      path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(params['metric'])
    } else {
      path = '/' + '_cluster' + '/' + 'state'
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

module.exports = buildClusterState
