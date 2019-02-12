'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

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

  const snakeCase = {
    completionFields: 'completion_fields',
    fielddataFields: 'fielddata_fields',
    includeSegmentFileSizes: 'include_segment_file_sizes',
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
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesStats(params, options, (err, body) => {
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
    var { method, body, index, metric } = params
    var querystring = semicopy(params, ['method', 'body', 'index', 'metric'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
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

module.exports = buildIndicesStats
