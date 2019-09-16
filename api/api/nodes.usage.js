// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildNodesUsage (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
<<<<<<< HEAD
  /**
   * Perform a [nodes.usage](http://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-usage.html) request
   *
   * @param {list} metric - Limit the information returned to the specified metrics
   * @param {list} node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
   * @param {time} timeout - Explicit operation timeout
   */
=======
>>>>>>> 69247496... Update code generation (#969)

  const acceptedQuerystring = [
    'timeout',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  /**
   * Perform a nodes.usage request
   * Returns low-level information about REST actions usage on nodes.
   * https://www.elastic.co/guide/en/elasticsearch/reference/master/cluster-nodes-usage.html
   */
  return function nodesUsage (params, options, callback) {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, nodeId, node_id, metric, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((node_id || nodeId) != null && (metric) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'usage' + '/' + encodeURIComponent(metric)
    } else if ((node_id || nodeId) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'usage'
    } else if ((metric) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_nodes' + '/' + 'usage' + '/' + encodeURIComponent(metric)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_nodes' + '/' + 'usage'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildNodesUsage
