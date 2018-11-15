'use strict'

function buildIndicesStats (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.stats](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-stats.html) request
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
   */
  return function indicesStats (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesStats(params, (err, body) => {
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
    const parts = [params['index'], '_stats', params['metric']]
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

module.exports = buildIndicesStats
