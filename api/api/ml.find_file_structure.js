// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlFindFileStructure (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.find_file_structure](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-find-file-structure.html) request
   *
   * @param {int} lines_to_sample - How many lines of the file should be included in the analysis
   * @param {int} line_merge_size_limit - Maximum number of characters permitted in a single message when lines are merged to create messages.
   * @param {time} timeout - Timeout after which the analysis will be aborted
   * @param {string} charset - Optional parameter to specify the character set of the file
   * @param {enum} format - Optional parameter to specify the high level file format
   * @param {boolean} has_header_row - Optional parameter to specify whether a delimited file includes the column names in its first row
   * @param {list} column_names - Optional parameter containing a comma separated list of the column names for a delimited file
   * @param {string} delimiter - Optional parameter to specify the delimiter character for a delimited file - must be a single character
   * @param {string} quote - Optional parameter to specify the quote character for a delimited file - must be a single character
   * @param {boolean} should_trim_fields - Optional parameter to specify whether the values between delimiters in a delimited file should have whitespace trimmed from them
   * @param {string} grok_pattern - Optional parameter to specify the Grok pattern that should be used to extract fields from messages in a semi-structured text file
   * @param {string} timestamp_field - Optional parameter to specify the timestamp field in the file
   * @param {string} timestamp_format - Optional parameter to specify the timestamp format in the file - may be either a Joda or Java time format
   * @param {boolean} explain - Whether to include a commentary on how the structure was derived
   * @param {object} body - The contents of the file to be analyzed
   */

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

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

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
