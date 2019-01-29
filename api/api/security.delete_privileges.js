'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildSecurityDeletePrivileges (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [security.delete_privileges](TODO) request
   *
   * @param {string} application - Application name
   * @param {string} name - Privilege name
   * @param {enum} refresh - If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.
   */

  const acceptedQuerystring = [
    'refresh'
  ]

  const snakeCase = {

  }

  return function securityDeletePrivileges (params, options, callback) {
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
        securityDeletePrivileges(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['application'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: application'),
        result
      )
    }
    if (params['name'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: name'),
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
    if (params['name'] != null && (params['application'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: application'),
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
    var { method, body, application, name } = params
    var querystring = semicopy(params, ['method', 'body', 'application', 'name'])

    if (method == null) {
      method = 'DELETE'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application) + '/' + encodeURIComponent(name)

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

module.exports = buildSecurityDeletePrivileges
