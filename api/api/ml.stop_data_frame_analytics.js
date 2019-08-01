// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlStopDataFrameAnalytics (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [ml.stop_data_frame_analytics](http://www.elastic.co/guide/en/elasticsearch/reference/current/stop-dfanalytics.html) request
   *
   * @param {string} id - The ID of the data frame analytics to stop
   * @param {boolean} allow_no_match - Whether to ignore if a wildcard expression matches no data frame analytics. (This includes `_all` string or when no data frame analytics have been specified)
   * @param {boolean} force - True if the data frame analytics should be forcefully stopped
   * @param {time} timeout - Controls the time to wait until the task has stopped. Defaults to 20 seconds
   * @param {object} body - The stop data frame analytics parameters
   */

  const acceptedQuerystring = [
    'allow_no_match',
    'force',
    'timeout'
  ]

  const snakeCase = {
    allowNoMatch: 'allow_no_match'

  }

  return function mlStopDataFrameAnalytics (params, options, callback) {
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
    if (params['id'] == null) {
      const err = new ConfigurationError('Missing required parameter: id')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'data_frame' + '/' + 'analytics' + '/' + encodeURIComponent(id) + '/' + '_stop'

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

module.exports = buildMlStopDataFrameAnalytics
