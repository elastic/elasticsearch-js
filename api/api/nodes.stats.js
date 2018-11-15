'use strict'

function buildNodesStats (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [nodes.stats](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-stats.html) request
   *
   * @param {list} metric - Limit the information returned to the specified metrics
   * @param {list} index_metric - Limit the information returned for `indices` metric to the specific index metrics. Isn't used if `indices` (or `all`) metric isn't specified.
   * @param {list} node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {list} completion_fields - A comma-separated list of fields for `fielddata` and `suggest` index metric (supports wildcards)
   * @param {list} fielddata_fields - A comma-separated list of fields for `fielddata` index metric (supports wildcards)
   * @param {list} fields - A comma-separated list of fields for `fielddata` and `completion` index metric (supports wildcards)
   * @param {boolean} groups - A comma-separated list of search groups for `search` index metric
   * @param {enum} level - Return indices stats aggregated at index, node or shard level
   * @param {list} types - A comma-separated list of document types for the `indexing` index metric
   * @param {time} timeout - Explicit operation timeout
   * @param {boolean} include_segment_file_sizes - Whether to report the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested)
   */
  return function nodesStats (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        nodesStats(params, (err, body) => {
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
      'completion_fields',
      'fielddata_fields',
      'fields',
      'groups',
      'level',
      'types',
      'timeout',
      'include_segment_file_sizes',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'completionFields',
      'fielddataFields',
      'fields',
      'groups',
      'level',
      'types',
      'timeout',
      'includeSegmentFileSizes',
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
    const parts = ['_nodes', params['node_id'] || params['nodeId'], 'stats', params['metric'], params['index_metric'] || params['indexMetric']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: null,
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildNodesStats
