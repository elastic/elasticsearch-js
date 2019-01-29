'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlDeleteForecast (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.delete_forecast](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-forecast.html) request
   *
   * @param {string} job_id - The ID of the job from which to delete forecasts
   * @param {string} forecast_id - The ID of the forecast to delete, can be comma delimited list. Leaving blank implies `_all`
   * @param {boolean} allow_no_forecasts - Whether to ignore if `_all` matches no forecasts
   * @param {time} timeout - Controls the time to wait until the forecast(s) are deleted. Default to 30 seconds
   */

  const acceptedQuerystring = [
    'allow_no_forecasts',
    'timeout'
  ]

  const snakeCase = {
    allowNoForecasts: 'allow_no_forecasts'

  }

  return function mlDeleteForecast (params, options, callback) {
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
        mlDeleteForecast(params, options, (err, body) => {
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
    if (params.body != null) {
      return callback(
        new ConfigurationError('This API does not require a body'),
        result
      )
    }

    // check required url components
    if ((params['forecast_id'] != null || params['forecastId'] != null) && ((params['job_id'] == null || params['jobId']))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: job_id'),
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
    var { method, body, jobId, job_id, forecastId, forecast_id } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id', 'forecastId', 'forecast_id'])

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null && (forecast_id || forecastId) != null) {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast' + '/' + encodeURIComponent(forecast_id || forecastId)
    } else {
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast'
    }

    // build request object
    const request = {
      method,
      path,
      body: '',
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

module.exports = buildMlDeleteForecast
