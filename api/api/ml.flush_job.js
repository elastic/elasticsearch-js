'use strict'

function buildMlFlushJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.flush_job](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-flush-job.html) request
   *
   * @param {string} job_id - The name of the job to flush
   * @param {boolean} calc_interim - Calculates interim results for the most recent bucket or all buckets within the latency period
   * @param {string} start - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} end - When used in conjunction with calc_interim, specifies the range of buckets on which to calculate interim results
   * @param {string} advance_time - Advances time to the given value generating results and updating the model for the advanced interval
   * @param {string} skip_time - Skips time to the given value without generating results or updating the model for the skipped interval
   * @param {object} body - Flush parameters
   */
  return function mlFlushJob (params, options, callback) {
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
        mlFlushJob(params, options, (err, body) => {
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

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'calc_interim',
      'start',
      'end',
      'advance_time',
      'skip_time'
    ]
    const acceptedQuerystringCamelCased = [
      'calcInterim',
      'start',
      'end',
      'advanceTime',
      'skipTime'
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

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(params['job_id'] || params['jobId']) + '/' + '_flush'

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

module.exports = buildMlFlushJob
