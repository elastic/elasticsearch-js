// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetCalendars (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.get_calendars](undefined) request
   *
   * @param {string} calendar_id - The ID of the calendar to fetch
   * @param {int} from - skips a number of calendars
   * @param {int} size - specifies a max number of calendars to get
   * @param {object} body - The from and size parameters optionally sent in the body
   */

  const acceptedQuerystring = [
    'from',
    'size'
  ]

  const snakeCase = {

  }

  return function mlGetCalendars (params, options, callback) {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, calendarId, calendar_id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((calendar_id || calendarId) != null) {
      path = '/' + '_ml' + '/' + 'calendars' + '/' + encodeURIComponent(calendar_id || calendarId)
    } else {
      path = '/' + '_ml' + '/' + 'calendars'
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

module.exports = buildMlGetCalendars
