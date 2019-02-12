'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildIndicesCreate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.create](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-create-index.html) request
   *
   * @param {string} index - The name of the index
   * @param {string} include_type_name - Whether a type should be expected in the body of the mappings.
   * @param {string} wait_for_active_shards - Set the number of active shards to wait for before the operation returns.
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {object} body - The configuration for the index (`settings` and `mappings`)
   */

  const acceptedQuerystring = [
    'include_type_name',
    'wait_for_active_shards',
    'timeout',
    'master_timeout',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    includeTypeName: 'include_type_name',
    waitForActiveShards: 'wait_for_active_shards',
    masterTimeout: 'master_timeout',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function indicesCreate (params, options, callback) {
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
        indicesCreate(params, options, (err, body) => {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, index } = params
    var querystring = semicopy(params, ['method', 'body', 'index'])

    if (method == null) {
      method = 'PUT'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + encodeURIComponent(index)

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

module.exports = buildIndicesCreate
