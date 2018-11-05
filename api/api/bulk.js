'use strict'

function buildBulk (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [bulk](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-bulk.html) request
   *
   * @param {string} index - Default index for items which don't provide one
   * @param {string} type - Default document type for items which don't provide one
   * @param {string} wait_for_active_shards - Sets the number of shard copies that must be active before proceeding with the bulk operation. Defaults to 1, meaning the primary shard only. Set to `all` for all shard copies, otherwise set to any non-negative value less than or equal to the total number of copies for the shard (number of replicas + 1)
   * @param {enum} refresh - If `true` then refresh the effected shards to make this operation visible to search, if `wait_for` then wait for a refresh to make this operation visible to search, if `false` (the default) then do nothing with refreshes.
   * @param {string} routing - Specific routing value
   * @param {time} timeout - Explicit operation timeout
   * @param {string} type - Default document type for items which don't provide one
   * @param {list} fields - Default comma-separated list of fields to return in the response for updates, can be overridden on each sub-request
   * @param {list} _source - True or false to return the _source field or not, or default list of fields to return, can be overridden on each sub-request
   * @param {list} _source_exclude - Default list of fields to exclude from the returned _source field, can be overridden on each sub-request
   * @param {list} _source_include - Default list of fields to extract and return from the _source field, can be overridden on each sub-request
   * @param {string} pipeline - The pipeline id to preprocess incoming documents with
   * @param {object} body - The operation definition and data (action-data pairs), separated by newlines
   */
  return function bulk (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        bulk(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['body'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: body'),
        result
      )
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        result
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
    const acceptedQuerystring = [
      'wait_for_active_shards',
      'refresh',
      'routing',
      'timeout',
      'type',
      'fields',
      '_source',
      '_source_exclude',
      '_source_include',
      'pipeline',
      'pretty',
      'human',
      'error_trace',
      'source',
      'filter_path'
    ]
    const acceptedQuerystringCamelCased = [
      'waitForActiveShards',
      'refresh',
      'routing',
      'timeout',
      'type',
      'fields',
      '_source',
      '_sourceExclude',
      '_sourceInclude',
      'pipeline',
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
      method = 'POST'
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
    const parts = [params['index'], params['type'], '_bulk']
    const request = {
      method,
      path: '/' + parts.filter(Boolean).map(encodeURIComponent).join('/'),
      querystring,
      bulkBody: params.body,
      headers: params.headers || null,
      ignore,
      requestTimeout: params.requestTimeout || null,
      agent: null,
      url: ''
    }

    return makeRequest(request, callback)
  }
}

module.exports = buildBulk
