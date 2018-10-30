'use strict'

function buildIndicesCreate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError } = opts
  /**
   * Perform a [indices.create](http://www.elastic.co/guide/en/elasticsearch/reference/master/indices-create-index.html) request
   *
   * @param {string} index - The name of the index
   * @param {string} wait_for_active_shards - Set the number of active shards to wait for before the operation returns.
   * @param {time} timeout - Explicit operation timeout
   * @param {time} master_timeout - Specify timeout for connection to master
   * @param {boolean} update_all_types - Whether to update the mapping for all fields with the same name across all types or not
   * @param {object} body - The configuration for the index (`settings` and `mappings`)
   */
  return function indicesCreate (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        indicesCreate(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['index'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: index'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'wait_for_active_shards',
      'timeout',
      'master_timeout',
      'update_all_types',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'waitForActiveShards',
      'timeout',
      'masterTimeout',
      'updateAllTypes',
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
      method = 'PUT'
    }

    // validate headers object
    if (params.headers != null && typeof params.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof params.headers}`),
        { body: null, headers: null, statusCode: null }
      )
    }

    var ignore = params.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    // build request object
    const parts = [params['index']]
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

module.exports = buildIndicesCreate
