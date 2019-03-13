/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

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

  const snakeCase = {
    completionFields: 'completion_fields',
    fielddataFields: 'fielddata_fields',
    includeSegmentFileSizes: 'include_segment_file_sizes',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function nodesStats (params, options, callback) {
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
        nodesStats(params, options, (err, body) => {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, metric, indexMetric, index_metric, nodeId, node_id } = params
    var querystring = semicopy(params, ['method', 'body', 'metric', 'indexMetric', 'index_metric', 'nodeId', 'node_id'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((node_id || nodeId) != null && (metric) != null && (index_metric || indexMetric) != null) {
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index_metric || indexMetric)
    } else if ((node_id || nodeId) != null && (metric) != null) {
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats' + '/' + encodeURIComponent(metric)
    } else if ((metric) != null && (index_metric || indexMetric) != null) {
      path = '/' + '_nodes' + '/' + 'stats' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index_metric || indexMetric)
    } else if ((node_id || nodeId) != null) {
      path = '/' + '_nodes' + '/' + encodeURIComponent(node_id || nodeId) + '/' + 'stats'
    } else if ((metric) != null) {
      path = '/' + '_nodes' + '/' + 'stats' + '/' + encodeURIComponent(metric)
    } else {
      path = '/' + '_nodes' + '/' + 'stats'
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

module.exports = buildNodesStats
