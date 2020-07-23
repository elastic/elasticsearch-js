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

function buildSearch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [search](http://www.elastic.co/guide/en/elasticsearch/reference/master/search-search.html) request
   *
   * @param {list} index - A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices
   * @param {list} type - A comma-separated list of document types to search; leave empty to perform the operation on all types
   * @param {string} analyzer - The analyzer to use for the query string
   * @param {boolean} analyze_wildcard - Specify whether wildcard and prefix queries should be analyzed (default: false)
   * @param {enum} default_operator - The default operator for query string query (AND or OR)
   * @param {string} df - The field to use as default where no field prefix is given in the query string
   * @param {boolean} explain - Specify whether to return detailed information about score computation as part of a hit
   * @param {list} stored_fields - A comma-separated list of stored fields to return as part of a hit
   * @param {list} docvalue_fields - A comma-separated list of fields to return as the docvalue representation of a field for each hit
   * @param {number} from - Starting offset (default: 0)
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} ignore_throttled - Whether specified concrete, expanded or aliased indices should be ignored when throttled
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {string} q - Query in the Lucene query string syntax
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {time} scroll - Specify how long a consistent view of the index should be maintained for scrolled search
   * @param {enum} search_type - Search operation type
   * @param {number} size - Number of hits to return (default: 10)
   * @param {list} sort - A comma-separated list of <field>:<direction> pairs
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_excludes - A list of fields to exclude from the returned _source field
   * @param {list} _source_includes - A list of fields to extract and return from the _source field
   * @param {number} terminate_after - The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early.
   * @param {list} stats - Specific 'tag' of the request for logging and statistical purposes
   * @param {string} suggest_field - Specify which field to use for suggestions
   * @param {enum} suggest_mode - Specify suggest mode
   * @param {number} suggest_size - How many suggestions to return in response
   * @param {string} suggest_text - The source text for which the suggestions should be returned
   * @param {time} timeout - Explicit operation timeout
   * @param {boolean} track_scores - Whether to calculate and return scores even if they are not used for sorting
   * @param {boolean} track_total_hits - Indicate if the number of documents that match the query should be tracked
   * @param {boolean} allow_partial_search_results - Indicate if an error should be returned if there is a partial search failure or timeout
   * @param {boolean} typed_keys - Specify whether aggregation and suggester names should be prefixed by their respective types in the response
   * @param {boolean} version - Specify whether to return document version as part of a hit
   * @param {boolean} seq_no_primary_term - Specify whether to return sequence number and primary term of the last modification of each hit
   * @param {boolean} request_cache - Specify if request cache should be used for this request or not, defaults to index level setting
   * @param {number} batched_reduce_size - The number of shard results that should be reduced at once on the coordinating node. This value should be used as a protection mechanism to reduce the memory overhead per search request if the potential number of shards in the request can be large.
   * @param {number} max_concurrent_shard_requests - The number of concurrent shard requests this search executes concurrently. This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests
   * @param {number} pre_filter_shard_size - A threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on it's rewrite method ie. if date filters are mandatory to match but the shard bounds and the query are disjoint.
   * @param {boolean} rest_total_hits_as_int - This parameter is ignored in this version. It is used in the next major version to control whether the rest response should render the total.hits as an object or a number
   * @param {object} body - The search definition using the Query DSL
   */

  const acceptedQuerystring = [
    'analyzer',
    'analyze_wildcard',
    'default_operator',
    'df',
    'explain',
    'stored_fields',
    'docvalue_fields',
    'from',
    'ignore_unavailable',
    'ignore_throttled',
    'allow_no_indices',
    'expand_wildcards',
    'lenient',
    'preference',
    'q',
    'routing',
    'scroll',
    'search_type',
    'size',
    'sort',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'terminate_after',
    'stats',
    'suggest_field',
    'suggest_mode',
    'suggest_size',
    'suggest_text',
    'timeout',
    'track_scores',
    'track_total_hits',
    'allow_partial_search_results',
    'typed_keys',
    'version',
    'seq_no_primary_term',
    'request_cache',
    'batched_reduce_size',
    'max_concurrent_shard_requests',
    'pre_filter_shard_size',
    'rest_total_hits_as_int',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    analyzeWildcard: 'analyze_wildcard',
    defaultOperator: 'default_operator',
    storedFields: 'stored_fields',
    docvalueFields: 'docvalue_fields',
    ignoreUnavailable: 'ignore_unavailable',
    ignoreThrottled: 'ignore_throttled',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    searchType: 'search_type',
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    terminateAfter: 'terminate_after',
    suggestField: 'suggest_field',
    suggestMode: 'suggest_mode',
    suggestSize: 'suggest_size',
    suggestText: 'suggest_text',
    trackScores: 'track_scores',
    trackTotalHits: 'track_total_hits',
    allowPartialSearchResults: 'allow_partial_search_results',
    typedKeys: 'typed_keys',
    seqNoPrimaryTerm: 'seq_no_primary_term',
    requestCache: 'request_cache',
    batchedReduceSize: 'batched_reduce_size',
    maxConcurrentShardRequests: 'max_concurrent_shard_requests',
    preFilterShardSize: 'pre_filter_shard_size',
    restTotalHitsAsInt: 'rest_total_hits_as_int',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function search (params, options, callback) {
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
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_search'
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_search'
    } else {
      path = '/' + '_search'
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

module.exports = buildSearch
