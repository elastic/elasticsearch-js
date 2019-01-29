'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildCatSnapshots (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [cat.snapshots](http://www.elastic.co/guide/en/elasticsearch/reference/master/cat-snapshots.html) request
   *
   * @param {list} repository - Name of repository from which to fetch the snapshot information
   * @param {string} format - a short version of the Accept header, e.g. json, yaml
   * @param {boolean} ignore_unavailable - Set to true to ignore unavailable snapshots
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   * @param {list} h - Comma-separated list of column names to display
   * @param {boolean} help - Return help information
   * @param {list} s - Comma-separated list of column names or column aliases to sort by
   * @param {boolean} v - Verbose mode. Display column headers
   */

  const acceptedQuerystring = [
    'format',
    'ignore_unavailable',
    'master_timeout',
    'h',
    'help',
    's',
    'v',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    ignoreUnavailable: 'ignore_unavailable',
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function catSnapshots (params, options, callback) {
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
        catSnapshots(params, options, (err, body) => {
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
    var { method, body, repository } = params
    var querystring = semicopy(params, ['method', 'body', 'repository'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((repository) != null) {
      path = '/' + '_cat' + '/' + 'snapshots' + '/' + encodeURIComponent(repository)
    } else {
      path = '/' + '_cat' + '/' + 'snapshots'
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

module.exports = buildCatSnapshots
