'use strict'

function buildXpackMlPostData (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.ml.post_data](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-post-data.html) request
   *
   * @param {string} job_id - The name of the job receiving the data
   * @param {string} reset_start - Optional parameter to specify the start of the bucket resetting range
   * @param {string} reset_end - Optional parameter to specify the end of the bucket resetting range
   * @param {object} body - The data to process
   */
  return function xpackMlPostData (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackMlPostData(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['job_id'] == null && params['jobId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: job_id or jobId'),
        result
      )
    }
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
      'reset_start',
      'reset_end'
    ]
    const acceptedQuerystringCamelCased = [
      'resetStart',
      'resetEnd'
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
    const parts = ['_xpack', 'ml', 'anomaly_detectors', params['job_id'] || params['jobId'], '_data']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackMlPostData
