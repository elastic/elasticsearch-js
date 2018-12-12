'use strict'

function buildUpdateByQuery (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [update_by_query](https://www.elastic.co/guide/en/elasticsearch/reference/master/docs-update-by-query.html) request
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
   * @param {enum} conflicts - What to do when the update by query hits version conflicts?
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {boolean} lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
   * @param {string} pipeline - Ingest pipeline to set on index requests made by this action. (default: none)
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {string} q - Query in the Lucene query string syntax
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {time} scroll - Specify how long a consistent view of the index should be maintained for scrolled search
   * @param {enum} search_type - Search operation type
   * @param {time} search_timeout - Explicit timeout for each search request. Defaults to no timeout.
   * @param {number} size - Number of hits to return (default: 10)
   * @param {list} sort - A comma-separated list of <field>:<direction> pairs
   * @param {list} _source - True or false to return the _source field or not, or a list of fields to return
   * @param {list} _source_exclude - A list of fields to exclude from the returned _source field
   * @param {list} _source_include - A list of fields to extract and return from the _source field
   * @param {number} terminate_after - The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early.
   * @param {list} stats - Specific 'tag' of the request for logging and statistical purposes
   * @param {boolean} version - Specify whether to return document version as part of a hit
   * @param {boolean} version_type - Should the document increment the version number (internal) on hit or not (reindex)
   * @param {boolean} request_cache - Specify if request cache should be used for this request or not, defaults to index level setting
   * @param {boolean} refresh - Should the effected indexes be refreshed?
   * @param {time} timeout - Time each individual bulk request should wait for shards that are unavailable.
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the update by query operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {number} scroll_size - Size on the scroll request powering the update by query
   * @param {boolean} wait_for_completion - Should the request should block until the update by query operation is complete.
   * @param {number} requests_per_second - The throttle to set on this request in sub-requests per second. -1 means no throttle.
   * @param {number} slices - The number of slices this task should be divided into. Defaults to 1 meaning the task isn't sliced into subtasks.
   * @param {object} body - The search definition using the Query DSL
   */
  return function updateByQuery (params, options, callback) {
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
        updateByQuery(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
        result
      )
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
      'from',
      'ignore_unavailable',
      'allow_no_indices',
      'conflicts',
      'expand_wildcards',
      'lenient',
      'pipeline',
      'preference',
      'q',
      'routing',
      'scroll',
      'search_type',
      'search_timeout',
      'size',
      'sort',
      '_source',
      '_source_exclude',
      '_source_include',
      'terminate_after',
      'stats',
      'version',
      'version_type',
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
    const acceptedQuerystringCamelCased = [
      'analyzer',
      'analyzeWildcard',
      'defaultOperator',
      'df',
      'from',
      'ignoreUnavailable',
      'allowNoIndices',
      'conflicts',
      'expandWildcards',
      'lenient',
      'pipeline',
      'preference',
      'q',
      'routing',
      'scroll',
      'searchType',
      'searchTimeout',
      'size',
      'sort',
      '_source',
      '_sourceExclude',
      '_sourceInclude',
      'terminateAfter',
      'stats',
      'version',
      'versionType',
      'requestCache',
      'refresh',
      'timeout',
      'waitForActiveShards',
      'scrollSize',
      'waitForCompletion',
      'requestsPerSecond',
      'slices',
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
      method = 'POST'
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
    const parts = [params['index'], params['type'], '_update_by_query']
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

module.exports = buildUpdateByQuery
