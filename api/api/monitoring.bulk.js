'use strict'

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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'system_id',
      'system_api_version',
      'interval'
    ]
    const acceptedQuerystringCamelCased = [
      'systemId',
      'systemApiVersion',
      'interval'
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

    if ((params['type']) != null) {
      path = '/' + '_monitoring' + '/' + encodeURIComponent(params['type']) + '/' + 'bulk'
    } else {
      path = '/' + '_monitoring' + '/' + 'bulk'
    }

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

module.exports = buildMonitoringBulk
