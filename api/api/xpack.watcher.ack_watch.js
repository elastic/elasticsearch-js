'use strict'

function buildXpackWatcherAckWatch (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.watcher.ack_watch](http://www.elastic.co/guide/en/elasticsearch/reference/current/watcher-api-ack-watch.html) request
   *
   * @param {string} watch_id - Watch ID
   * @param {list} action_id - A comma-separated list of the action ids to be acked
   * @param {time} master_timeout - Explicit operation timeout for connection to master node
   */
  return function xpackWatcherAckWatch (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackWatcherAckWatch(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['watch_id'] == null && params['watchId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: watch_id or watchId'),
        result
      )
    }
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // check required url components
    if ((params['action_id'] != null || params['actionId'] != null) && ((params['watch_id'] == null || params['watchId']))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: watch_id'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'master_timeout'
    ]
    const acceptedQuerystringCamelCased = [
      'masterTimeout'
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
      method = 'PUT'
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
    const parts = ['_xpack', 'watcher', 'watch', params['watch_id'] || params['watchId'], '_ack', params['action_id'] || params['actionId']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackWatcherAckWatch
