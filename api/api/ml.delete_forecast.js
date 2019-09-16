// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlDeleteForecast (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [
    'allow_no_forecasts',
    'timeout'
  ]

  const snakeCase = {
    allowNoForecasts: 'allow_no_forecasts'

  }

  /**
   * Perform a ml.delete_forecast request
   * http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-delete-forecast.html
   */
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

    // check required parameters
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }

    // check required url components
    if ((params['forecast_id'] != null || params['forecastId'] != null) && ((params['job_id'] == null && params['jobId'] == null))) {
      const err = new ConfigurationError('Missing required parameter of the url: job_id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, jobId, job_id, forecastId, forecast_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((job_id || jobId) != null && (forecast_id || forecastId) != null) {
      if (method == null) method = 'DELETE'
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast' + '/' + encodeURIComponent(forecast_id || forecastId)
    } else {
      if (method == null) method = 'DELETE'
      path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + '_forecast'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMlDeleteForecast
