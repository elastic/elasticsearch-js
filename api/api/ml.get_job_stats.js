'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetJobStats (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.get_job_stats](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-job-stats.html) request
   *
   * @param {string} job_id - The ID of the jobs stats to fetch
   * @param {boolean} allow_no_jobs - Whether to ignore if a wildcard expression matches no jobs. (This includes `_all` string or when no jobs have been specified)
   */

  const acceptedQuerystring = [
    'allow_no_jobs'
  ]

  const snakeCase = {
    allowNoJobs: 'allow_no_jobs'
  }

  return function mlGetJobStats (params, options, callback) {
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
        mlGetJobStats(params, options, (err, body) => {
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
    var { method, body, jobId, job_id } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id'])

    if (method == null) {
      method = 'GET'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null) {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_stats'
    } else {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + '_stats'
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

module.exports = buildMlGetJobStats
