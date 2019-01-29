'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMonitoringBulk (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [monitoring.bulk](http://www.elastic.co/guide/en/monitoring/current/appendix-api-bulk.html) request
   *
   * @param {string} type - Default document type for items which don't provide one
   * @param {string} system_id - Identifier of the monitored system
   * @param {string} system_api_version - API Version of the monitored system
   * @param {string} interval - Collection interval (e.g., '10s' or '10000ms') of the payload
   * @param {object} body - The operation definition and data (action-data pairs), separated by newlines
   */

  const acceptedQuerystring = [
    'system_id',
    'system_api_version',
    'interval'
  ]

  const snakeCase = {
    systemId: 'system_id',
    systemApiVersion: 'system_api_version'

  }

  return function monitoringBulk (params, options, callback) {
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
        monitoringBulk(params, options, (err, body) => {
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
    var { method, body, type } = params
    var querystring = semicopy(params, ['method', 'body', 'type'])

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((type) != null) {
      path = '/' + '_monitoring' + '/' + encodeURIComponent(type) + '/' + 'bulk'
    } else {
      path = '/' + '_monitoring' + '/' + 'bulk'
    }

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

module.exports = buildMonitoringBulk
