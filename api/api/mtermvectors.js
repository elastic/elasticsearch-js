'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMtermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [mtermvectors](http://www.elastic.co/guide/en/elasticsearch/reference/master/docs-multi-termvectors.html) request
   *
   * @param {string} index - The index in which the document resides.
   * @param {string} type - The type of the document.
   * @param {list} ids - A comma-separated list of documents ids. You must define ids as parameter or set "ids" or "docs" in the request body
   * @param {boolean} term_statistics - Specifies if total term frequency and document frequency should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} field_statistics - Specifies if document count, sum of document frequencies and sum of total term frequencies should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {list} fields - A comma-separated list of fields to return. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} offsets - Specifies if term offsets should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} positions - Specifies if term positions should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} payloads - Specifies if term payloads should be returned. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random) .Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} routing - Specific routing value. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {string} parent - Parent id of documents. Applies to all returned documents unless otherwise specified in body "params" or "docs".
   * @param {boolean} realtime - Specifies if requests are real-time as opposed to near-real-time (default: true).
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - Define ids, documents, parameters or a list of parameters per document here. You must at least provide a list of document ids. See documentation.
   */

  const acceptedQuerystring = [
    'ids',
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

  return function mtermvectors (params, options, callback) {
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
        mtermvectors(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
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
    var { method, body, index, type } = params
    var querystring = semicopy(params, ['method', 'body', 'index', 'type'])

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_mtermvectors'
    } else if ((index) != null) {
      path = '/' + encodeURIComponent(index) + '/' + '_mtermvectors'
    } else {
      path = '/' + '_mtermvectors'
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

module.exports = buildMtermvectors
