'use strict'

function buildXpackSecurityPutRole (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [xpack.security.put_role](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-put-role.html) request
   *
   * @param {string} name - Role name
   * @param {enum} refresh - If `true` (the default) then refresh the affected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` then do nothing with refreshes.
   * @param {object} body - The role to add
   */
  return function xpackSecurityPutRole (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        xpackSecurityPutRole(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['name'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: name'),
        result
      )
    }
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'refresh'
    ]
    const acceptedQuerystringCamelCased = [
      'refresh'
    ]

    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      if (acceptedQuerystring.indexOf(key) !== -1) {
        querystring[key] = params[key]
      } else {
        var camelIndex = acceptedQuerystringCamelCased.indexOf(key)
        if (camelIndex !== -1) {
          querystring[acceptedQuerystring[camelIndex]] = params[key]
        }
      }
    }

    // configure http method
    var method = params.method
    if (method == null) {
      method = 'PUT'
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof params.headers}`),
        result
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = ['_xpack', 'security', 'role', params['name']]
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      body: params.body || '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildXpackSecurityPutRole
