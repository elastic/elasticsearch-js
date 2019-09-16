// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSecurityGetPrivileges (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts

  const acceptedQuerystring = [

  ]

  const snakeCase = {

  }

  /**
   * Perform a security.get_privileges request
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-get-privileges.html
   */
  return function securityGetPrivileges (params, options, callback) {
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

    // check required url components
    if (params['name'] != null && (params['application'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: application')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, application, name, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((application) != null && (name) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application) + '/' + encodeURIComponent(name)
    } else if ((application) != null) {
      if (method == null) method = 'GET'
      path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application)
    } else {
      if (method == null) method = 'GET'
      path = '/' + '_security' + '/' + 'privilege'
    }

    // build request object
    const request = {
      method,
      path,
      body: null,
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildSecurityGetPrivileges
