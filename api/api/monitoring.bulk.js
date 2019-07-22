// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMonitoringBulk (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [monitoring.bulk](https://www.elastic.co/guide/en/elasticsearch/reference/master/es-monitoring.html) request
   *
   * @param {string} type - Default document type for items which don't provide one
   * @param {string} system_id - Identifier of the monitored system
   * @param {string} system_api_version - API Version of the monitored system
   * @param {string} interval - Collection interval (e.g., '10s' or '10000ms') of the payload
   * @param {object} body - The operation definition and data (action-data pairs), separated by newlines
   */

  const acceptedQuerystring = [
    'system_id',
    'system_api_version',
    'interval'
  ]

  const snakeCase = {
    systemId: 'system_id',
    systemApiVersion: 'system_api_version'

  }

  return function monitoringBulk (params, options, callback) {
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
    if (params['body'] == null) {
      const err = new ConfigurationError('Missing required parameter: body')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, type, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((type) != null) {
      path = '/' + '_monitoring' + '/' + encodeURIComponent(type) + '/' + 'bulk'
    } else {
      path = '/' + '_monitoring' + '/' + 'bulk'
    }

    // build request object
    const request = {
      method,
      path,
      bulkBody: body,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildMonitoringBulk
