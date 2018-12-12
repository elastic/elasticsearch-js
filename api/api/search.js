'use strict'

function buildSearch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
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
   * @param {list} _source_exclude - A list of fields to exclude from the returned _source field
   * @param {list} _source_include - A list of fields to extract and return from the _source field
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
   * @param {boolean} request_cache - Specify if request cache should be used for this request or not, defaults to index level setting
   * @param {number} batched_reduce_size - The number of shard results that should be reduced at once on the coordinating node. This value should be used as a protection mechanism to reduce the memory overhead per search request if the potential number of shards in the request can be large.
   * @param {number} max_concurrent_shard_requests - The number of concurrent shard requests this search executes concurrently. This value should be used to limit the impact of the search on the cluster in order to limit the number of concurrent shard requests
   * @param {number} pre_filter_shard_size - A threshold that enforces a pre-filter roundtrip to prefilter search shards based on query rewriting if the number of shards the search request expands to exceeds the threshold. This filter roundtrip can limit the number of shards significantly if for instance a shard can not match any documents based on it's rewrite method ie. if date filters are mandatory to match but the shard bounds and the query are disjoint.
   * @param {object} body - The search definition using the Query DSL
   */
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
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        search(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
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
      '_source_exclude',
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
      'request_cache',
      'batched_reduce_size',
      'max_concurrent_shard_requests',
      'pre_filter_shard_size',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'analyzer',
      'analyzeWildcard',
      'defaultOperator',
      'df',
      'explain',
      'storedFields',
      'docvalueFields',
      'from',
      'ignoreUnavailable',
      'allowNoIndices',
      'expandWildcards',
      'lenient',
      'preference',
      'q',
      'routing',
      'scroll',
      'searchType',
      'size',
      'sort',
      '_source',
      '_sourceExclude',
      '_sourceInclude',
      'terminateAfter',
      'stats',
      'suggestField',
      'suggestMode',
      'suggestSize',
      'suggestText',
      'timeout',
      'trackScores',
      'trackTotalHits',
      'allowPartialSearchResults',
      'typedKeys',
      'version',
      'requestCache',
      'batchedReduceSize',
      'maxConcurrentShardRequests',
      'preFilterShardSize',
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

    // build request object
    const parts = [params['index'], params['type'], '_search']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildSearch
