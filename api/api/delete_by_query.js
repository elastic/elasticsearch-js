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

function buildDeleteByQuery (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [delete_by_query](https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-delete-by-query.html) request
   *
   * @param {list} index - A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices
   * @param {list} type - A comma-separated list of document types to search; leave empty to perform the operation on all types
   * @param {string} analyzer - The analyzer to use for the query string
   * @param {boolean} analyze_wildcard - Specify whether wildcard and prefix queries should be analyzed (default: false)
   * @param {enum} default_operator - The default operator for query string query (AND or OR)
   * @param {string} df - The field to use as default where no field prefix is given in the query string
   * @param {number} from - Starting offset (default: 0)
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} conflicts - What to do when the delete by query hits version conflicts?
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {string} q - Query in the Lucene query string syntax
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {time} scroll - Specify how long a consistent view of the index should be maintained for scrolled search
   * @param {enum} search_type - Search operation type
   * @param {time} search_timeout - Explicit timeout for each search request. Defaults to no timeout.
   * @param {number} size - Number of hits to return (default: 10)
   * @param {list} sort - A comma-separated list of <field>:<direction> pairs
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {number} terminate_after - The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early.
   * @param {list} stats - Specific 'tag' of the request for logging and statistical purposes
   * @param {boolean} version - Specify whether to return document version as part of a hit
   * @param {boolean} request_cache - Specify if request cache should be used for this request or not, defaults to index level setting
   * @param {boolean} refresh - Should the effected indexes be refreshed?
   * @param {time} timeout - Time each individual bulk request should wait for shards that are unavailable.
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the delete by query operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {number} scroll_size - Size on the scroll request powering the delete by query
   * @param {boolean} wait_for_completion - Should the request should block until the delete by query is complete.
   * @param {number} requests_per_second - The throttle for this request in sub-requests per second. -1 means no throttle.
   * @param {number} slices - The number of slices this task should be divided into. Defaults to 1 meaning the task isn't sliced into subtasks.
   * @param {object} body - The search definition using the Query DSL
   */

  const acceptedQuerystring = [
    'analyzer',
    'analyze_wildcard',
    'default_operator',
    'df',
    'from',
    'ignore_unavailable',
    'allow_no_indices',
    'conflicts',
    'expand_wildcards',
    'lenient',
    'preference',
    'q',
    'routing',
    'scroll',
    'search_type',
    'search_timeout',
    'size',
    'sort',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'terminate_after',
    'stats',
    'version',
    'request_cache',
    'refresh',
    'timeout',
    'wait_for_active_shards',
    'scroll_size',
    'wait_for_completion',
    'requests_per_second',
    'slices',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    analyzeWildcard: 'analyze_wildcard',
    defaultOperator: 'default_operator',
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    searchType: 'search_type',
    searchTimeout: 'search_timeout',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    terminateAfter: 'terminate_after',
    requestCache: 'request_cache',
    waitForActiveShards: 'wait_for_active_shards',
    scrollSize: 'scroll_size',
    waitForCompletion: 'wait_for_completion',
    requestsPerSecond: 'requests_per_second',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function deleteByQuery (params, options, callback) {
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
    if (params['index'] == null) {
      const err = new ConfigurationError('Missing required parameter: index')
      return handleError(err, callback)
    }
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_delete_by_query'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_delete_by_query'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildDeleteByQuery
