'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildTermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [termvectors](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-termvectors.html) request
   *
   * @param {string} index - The index in which the document resides.
   * @param {string} type - The type of the document.
   * @param {string} id - The id of the document, when not specified a doc param should be supplied.
   * @param {boolean} term_statistics - Specifies if total term frequency and document frequency should be returned.
   * @param {boolean} field_statistics - Specifies if document count, sum of document frequencies and sum of total term frequencies should be returned.
   * @param {list} fields - A comma-separated list of fields to return.
   * @param {boolean} offsets - Specifies if term offsets should be returned.
   * @param {boolean} positions - Specifies if term positions should be returned.
   * @param {boolean} payloads - Specifies if term payloads should be returned.
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random).
   * @param {string} routing - Specific routing value.
   * @param {string} parent - Parent id of documents.
   * @param {boolean} realtime - Specifies if request is real-time as opposed to near-real-time (default: true).
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - Define parameters and or supply a document to get termvectors for. See documentation.
   */

  const acceptedQuerystring = [
    'term_statistics',
    'field_statistics',
    'fields',
    'offsets',
    'positions',
    'payloads',
    'preference',
    'routing',
    'parent',
    'realtime',
    'version',
    'version_type',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    termStatistics: 'term_statistics',
    fieldStatistics: 'field_statistics',
    versionType: 'version_type',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function termvectors (params, options, callback) {
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
        termvectors(params, options, (err, body) => {
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

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, index, type, id } = params
    var querystring = semicopy(params, ['method', 'body', 'index', 'type', 'id'])

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_termvectors'
    } else if ((index) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_termvectors' + '/' + encodeURIComponent(id)
    } else if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_termvectors'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + '_termvectors'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      compression: options.compression || false,
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

module.exports = buildTermvectors
