'use strict'

function buildXpackMlStartDatafeed (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.start_datafeed](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-start-datafeed.html) request
   *
   * @param {string} datafeed_id - The ID of the datafeed to start
   * @param {string} start - The start time from where the datafeed should begin
   * @param {string} end - The end time when the datafeed should stop. When not set, the datafeed continues in real time
   * @param {time} timeout - Controls the time to wait until a datafeed has started. Default to 20 seconds
   * @param {object} body - The start datafeed parameters
   */
  return function xpackMlStartDatafeed (params, options, callback) {
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
        xpackMlStartDatafeed(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['datafeed_id'] == null && params['datafeedId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: datafeed_id or datafeedId'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'start',
      'end',
      'timeout'
    ]
    const acceptedQuerystringCamelCased = [
      'start',
      'end',
      'timeout'
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

    // build request object
    const parts = ['_xpack', 'ml', 'datafeeds', params['datafeed_id'] || params['datafeedId'], '_start']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
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

module.exports = buildXpackMlStartDatafeed
