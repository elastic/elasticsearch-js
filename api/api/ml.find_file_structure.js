// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlFindFileStructure (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'lines_to_sample',
    'line_merge_size_limit',
    'timeout',
    'charset',
    'format',
    'has_header_row',
    'column_names',
    'delimiter',
    'quote',
    'should_trim_fields',
    'grok_pattern',
    'timestamp_field',
    'timestamp_format',
    'explain'
  ]

  const snakeCase = {
    linesToSample: 'lines_to_sample',
    lineMergeSizeLimit: 'line_merge_size_limit',
    hasHeaderRow: 'has_header_row',
    columnNames: 'column_names',
    shouldTrimFields: 'should_trim_fields',
    grokPattern: 'grok_pattern',
    timestampField: 'timestamp_field',
    timestampFormat: 'timestamp_format'

  }

  /**
   * Perform a ml.find_file_structure request
   * http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-find-file-structure.html
   */
  return function mlFindFileStructure (params, options, callback) {
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
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if (method == null) method = 'POST'
    path = '/' + '_ml' + '/' + 'find_file_structure'

    // build request object
    const request = {
      method,
      path,
      bulkBody: body,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMlFindFileStructure
