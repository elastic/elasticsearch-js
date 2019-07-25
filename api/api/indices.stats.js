// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesStats (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.stats](https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-stats.html) request
   *
   * @param {list} index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
   * @param {list} metric - Limit the information returned the specific metrics.
   * @param {list} completion_fields - A comma-separated list of fields for `fielddata` and `suggest` index metric (supports wildcards)
   * @param {list} fielddata_fields - A comma-separated list of fields for `fielddata` index metric (supports wildcards)
   * @param {list} fields - A comma-separated list of fields for `fielddata` and `completion` index metric (supports wildcards)
   * @param {list} groups - A comma-separated list of search groups for `search` index metric
   * @param {enum} level - Return stats aggregated at cluster, index or shard level
   * @param {list} types - A comma-separated list of document types for the `indexing` index metric
   * @param {boolean} include_segment_file_sizes - Whether to report the aggregated disk usage of each one of the Lucene index files (only applies if segment stats are requested)
   * @param {boolean} include_unloaded_segments - If set to true segment stats will include stats for segments that are not currently loaded into memory
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} forbid_closed_indices - If set to false stats will also collected from closed indices if explicitly specified or if expand_wildcards expands to closed indices
   */

  const acceptedQuerystring = [
    'completion_fields',
    'fielddata_fields',
    'fields',
    'groups',
    'level',
    'types',
    'include_segment_file_sizes',
    'include_unloaded_segments',
    'expand_wildcards',
    'forbid_closed_indices',
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
    includeUnloadedSegments: 'include_unloaded_segments',
    expandWildcards: 'expand_wildcards',
    forbidClosedIndices: 'forbid_closed_indices',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesStats (params, options, callback) {
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

    // check required parameters
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, metric, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (metric) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_stats' + '/' + encodeURIComponent(metric)
    } else if ((metric) != null) {
      path = '/' + '_stats' + '/' + encodeURIComponent(metric)
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_stats'
    } else {
      path = '/' + '_stats'
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

module.exports = buildIndicesStats
