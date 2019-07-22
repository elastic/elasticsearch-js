// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesAnalyze (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [indices.analyze](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/indices-analyze.html) request
   *
   * @param {string} index - The name of the index to scope the operation
   * @param {string} analyzer - The name of the analyzer to use
   * @param {list} char_filter - A comma-separated list of character filters to use for the analysis
   * @param {string} field - Use the analyzer configured for this field (instead of passing the analyzer name)
   * @param {list} filter - A comma-separated list of filters to use for the analysis
   * @param {string} index - The name of the index to scope the operation
   * @param {boolean} prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
   * @param {list} text - The text on which the analysis should be performed (when request body is not used)
   * @param {string} tokenizer - The name of the tokenizer to use for the analysis
   * @param {boolean} explain - With `true`, outputs more advanced details. (default: false)
   * @param {list} attributes - A comma-separated list of token attributes to output, this parameter works only with `explain=true`
   * @param {enum} format - Format of the output
   * @param {object} body - The text on which the analysis should be performed
   */

  const acceptedQuerystring = [
    'analyzer',
    'char_filter',
    'field',
    'filter',
    'index',
    'prefer_local',
    'text',
    'tokenizer',
    'explain',
    'attributes',
    'format',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    charFilter: 'char_filter',
    preferLocal: 'prefer_local',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesAnalyze (params, options, callback) {
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
    var { method, body, index, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_analyze'
    } else {
      path = '/' + '_analyze'
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

module.exports = buildIndicesAnalyze
