'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlFindFileStructure (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.find_file_structure](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-file-structure.html) request
   *
   * @param {int} lines_to_sample - How many lines of the file should be included in the analysis
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
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        mlFindFileStructure(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
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
    var { method, body } = params
    var querystring = semicopy(params, ['method', 'body'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'find_file_structure'

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
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

module.exports = buildMlFindFileStructure
