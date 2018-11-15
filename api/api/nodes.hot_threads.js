'use strict'

function buildNodesHotThreads (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [nodes.hot_threads](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-hot-threads.html) request
   *
   * @param {list} node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {time} interval - The interval for the second sampling of threads
   * @param {number} snapshots - Number of samples of thread stacktrace (default: 10)
   * @param {number} threads - Specify the number of threads to provide information for (default: 3)
   * @param {boolean} ignore_idle_threads - Don't show threads that are in known-idle places, such as waiting on a socket select or pulling from an empty task queue (default: true)
   * @param {enum} type - The type to sample (default: cpu)
   * @param {time} timeout - Explicit operation timeout
   */
  return function nodesHotThreads (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        nodesHotThreads(params, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'interval',
      'snapshots',
      'threads',
      'ignore_idle_threads',
      'type',
      'timeout',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'interval',
      'snapshots',
      'threads',
      'ignoreIdleThreads',
      'type',
      'timeout',
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_cluster', 'nodes', params['node_id'] || params['nodeId'], 'hot_threads']
    const request = {
      method,
      path: (params['node_id'] || params['nodeId']) != null
        ? '/' + parts.filter(Boolean).map(encodeURIComponent).join('/')
        : '/_nodes/hot_threads',
      querystring,
      body: null,
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildNodesHotThreads
