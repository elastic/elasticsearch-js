'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlDeleteCalendarJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.delete_calendar_job](undefined) request
   *
   * @param {string} calendar_id - The ID of the calendar to modify
   * @param {string} job_id - The ID of the job to remove from the calendar
   */

  const acceptedQuerystring = [

  ]

  const snakeCase = {

  }

  return function mlDeleteCalendarJob (params, options, callback) {
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
        mlDeleteCalendarJob(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['calendar_id'] == null && params['calendarId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: calendar_id or calendarId'),
        result
      )
    }
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
    if ((params['job_id'] != null || params['jobId'] != null) && ((params['calendar_id'] == null || params['calendarId']))) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: calendar_id'),
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
    var { method, body, calendarId, calendar_id, jobId, job_id } = params
    var querystring = semicopy(params, ['method', 'body', 'calendarId', 'calendar_id', 'jobId', 'job_id'])

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId) + '/' + 'jobs' + '/' + encodeURIComponent(job_id || jobId)

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

module.exports = buildMlDeleteCalendarJob
