'use strict'

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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
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
    const acceptedQuerystringCamelCased = [
      'linesToSample',
      'timeout',
      'charset',
      'format',
      'hasHeaderRow',
      'columnNames',
      'delimiter',
      'quote',
      'shouldTrimFields',
      'grokPattern',
      'timestampField',
      'timestampFormat',
      'explain'
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

    var path = ''

    path = '/' + '_ml' + '/' + 'find_file_structure'

    // build request object
    const request = {
      method,
      path,
      body: params.body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null
    }

    return makeRequest(request, requestOptions, callback)
  }
}

module.exports = buildMlFindFileStructure
