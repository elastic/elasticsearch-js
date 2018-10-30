'use strict'

function buildMtermvectors (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError } = opts
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
  return function mtermvectors (params, callback) {
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        mtermvectors(params, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required url components
    if (params['type'] != null && (params['index'] == null)) {
      return callback(
        new ConfigurationError('Missing required parameter of the url: index'),
        { body: null, headers: null, statusCode: null }
      )
    }

    // build querystring object
    const querystring = {}
    const keys = Object.keys(params)
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
    const acceptedQuerystringCamelCased = [
      'ids',
      'termStatistics',
      'fieldStatistics',
      'fields',
      'offsets',
      'positions',
      'payloads',
      'preference',
      'routing',
      'parent',
      'realtime',
      'version',
      'versionType',
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
      method = params.body == null ? 'GET' : 'POST'
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
    const parts = [params['index'], params['type'], '_mtermvectors']
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

module.exports = buildMtermvectors
