// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildPercolate (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, handleError, snakeCaseKeys } = opts
  /**
   * Perform a [percolate](https://www.elastic.co/guide/en/elasticsearch/reference/5.x/search-percolate.html) request
   *
   * @param {string} index - The index of the document being percolated.
   * @param {string} type - The type of the document being percolated.
   * @param {string} id - Substitute the document in the request body with a document that is known by the specified id. On top of the id, the index and type parameter will be used to retrieve the document from within the cluster.
   * @param {list} routing - A comma-separated list of specific routing values
   * @param {string} preference - Specify the node or shard the operation should be performed on (default: random)
   * @param {boolean} ignore_unavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
   * @param {boolean} allow_no_indices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
   * @param {enum} expand_wildcards - Whether to expand wildcard expression to concrete indices that are open, closed or both.
   * @param {string} percolate_index - The index to percolate the document into. Defaults to index.
   * @param {string} percolate_type - The type to percolate document into. Defaults to type.
   * @param {string} percolate_routing - The routing value to use when percolating the existing document.
   * @param {string} percolate_preference - Which shard to prefer when executing the percolate request.
   * @param {enum} percolate_format - Return an array of matching query IDs instead of objects
   * @param {number} version - Explicit version number for concurrency control
   * @param {enum} version_type - Specific version type
   * @param {object} body - The percolator request definition using the percolate DSL
   */

  const acceptedQuerystring = [
    'routing',
    'preference',
    'ignore_unavailable',
    'allow_no_indices',
    'expand_wildcards',
    'percolate_index',
    'percolate_type',
    'percolate_routing',
    'percolate_preference',
    'percolate_format',
    'version',
    'version_type',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    ignoreUnavailable: 'ignore_unavailable',
    allowNoIndices: 'allow_no_indices',
    expandWildcards: 'expand_wildcards',
    percolateIndex: 'percolate_index',
    percolateType: 'percolate_type',
    percolateRouting: 'percolate_routing',
    percolatePreference: 'percolate_preference',
    percolateFormat: 'percolate_format',
    versionType: 'version_type',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
  }

  return function percolate (params, options, callback) {
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
    if (params['index'] == null) {
      const err = new ConfigurationError('Missing required parameter: index')
      return handleError(err, callback)
    }
    if (params['type'] == null) {
      const err = new ConfigurationError('Missing required parameter: type')
      return handleError(err, callback)
    }

    // check required url components
    if (params['id'] != null && (params['type'] == null || params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: type, index')
      return handleError(err, callback)
    } else if (params['type'] != null && (params['index'] == null)) {
      const err = new ConfigurationError('Missing required parameter of the url: index')
      return handleError(err, callback)
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      const err = new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`)
      return handleError(err, callback)
    }

    var warnings = []
    var { method, body, index, type, id, ...querystring } = params
    querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore
    if (typeof ignore === 'number') {
      options.ignore = [ignore]
    }

    var path = ''

    if ((index) != null && (type) != null && (id) != null) {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_percolate'
    } else {
      path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_percolate'
    }

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    options.warnings = warnings.length === 0 ? null : warnings
    return makeRequest(request, options, callback)
  }
}

module.exports = buildPercolate
