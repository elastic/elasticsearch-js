'use strict'

function buildIndicesDeleteAlias (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [indices.delete_alias](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-aliases.html) request
   *
   * @param {list} index - A comma-separated list of index names (supports wildcards); use `_all` for all indices
   * @param {list} name - A comma-separated list of aliases to delete (supports wildcards); use `_all` to delete all aliases for the specified indices.
   * @param {time} timeout - Explicit timestamp for the document
   * @param {time} master_timeout - Specify timeout for connection to master
   */
  return function indicesDeleteAlias (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesDeleteAlias(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
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
    if (params['name'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'timeout',
      'master_timeout',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'timeout',
      'masterTimeout',
      'pretty',
      'human',
      'errorTrace',
      'source',
      'filterPath'
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
      method = 'DELETE'
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
    const parts = [params['index'], '_aliases', params['name']]
    const request = {
      method,
      path: params['index'] != null && params['name'] != null
        ? '/' + parts.filter(Boolean).map(encodeURIComponent).join('/')
        : '/{index}/_alias/{name}',
      querystring,
      body: '',
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildIndicesDeleteAlias
