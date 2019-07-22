// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlDeleteCalendarJob (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
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

    // check required parameters
    if (params['calendar_id'] == null && params['calendarId'] == null) {
      const err = new ConfigurationError('Missing required parameter: calendar_id or calendarId')
      return handleError(err, callback)
    }
    if (params['job_id'] == null && params['jobId'] == null) {
      const err = new ConfigurationError('Missing required parameter: job_id or jobId')
      return handleError(err, callback)
    }
    if (params.body != null) {
      const err = new ConfigurationError('This API does not require a body')
      return handleError(err, callback)
    }

    // check required url components
    if ((params['job_id'] != null || params['jobId'] != null) && ((params['calendar_id'] == null && params['calendarId'] == null))) {
      const err = new ConfigurationError('Missing required parameter of the url: calendar_id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, calendarId, calendar_id, jobId, job_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
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

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMlDeleteCalendarJob
