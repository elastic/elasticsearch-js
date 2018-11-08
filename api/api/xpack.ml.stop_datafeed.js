'use strict'

function buildXpackMlStopDatafeed (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.stop_datafeed](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-stop-datafeed.html) request
   *
   * @param {string} datafeed_id - The ID of the datafeed to stop
   * @param {boolean} allow_no_datafeeds - Whether to ignore if a wildcard expression matches no datafeeds. (This includes `_all` string or when no datafeeds have been specified)
   * @param {boolean} force - True if the datafeed should be forcefully stopped.
   * @param {time} timeout - Controls the time to wait until a datafeed has stopped. Default to 20 seconds
   */
  return function xpackMlStopDatafeed (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackMlStopDatafeed(params, (err, body) => {
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
      'allow_no_datafeeds',
      'force',
      'timeout'
    ]
    const acceptedQuerystringCamelCased = [
      'allowNoDatafeeds',
      'force',
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

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_xpack', 'ml', 'datafeeds', params['datafeed_id'] || params['datafeedId'], '_stop']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackMlStopDatafeed
