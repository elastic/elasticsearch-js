'use strict'

function buildClusterAllocationExplain (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [cluster.allocation_explain](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-allocation-explain.html) request
   *
   * @param {boolean} include_yes_decisions - Return 'YES' decisions in explanation (default: false)
   * @param {boolean} include_disk_info - Return information about disk usage and shard sizes (default: false)
   * @param {object} body - The index, shard, and primary flag to explain. Empty means 'explain the first unassigned shard'
   */
  return function clusterAllocationExplain (params, options, callback) {
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
        clusterAllocationExplain(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'include_yes_decisions',
      'include_disk_info',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'includeYesDecisions',
      'includeDiskInfo',
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
        result
      )
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_cluster' + '/' + 'allocation' + '/' + 'explain'

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

module.exports = buildClusterAllocationExplain
