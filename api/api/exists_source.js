// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['preference', 'realtime', 'refresh', 'routing', '_source', '_source_excludes', '_source_exclude', '_source_includes', '_source_include', 'version', 'version_type', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { _sourceExcludes: '_source_excludes', _sourceExclude: '_source_exclude', _sourceIncludes: '_source_includes', _sourceInclude: '_source_include', versionType: 'version_type', errorTrace: 'error_trace', filterPath: 'filter_path' }

<<<<<<< HEAD
  const acceptedQuerystring = [
    'preference',
    'realtime',
    'refresh',
    'routing',
    '_source',
    '_source_excludes',
    '_source_exclude',
    '_source_includes',
    '_source_include',
    'version',
    'version_type',
    'pretty',
    'human',
    'error_trace',
    'source',
    'filter_path'
  ]

  const snakeCase = {
    _sourceExcludes: '_source_excludes',
    _sourceExclude: '_source_exclude',
    _sourceIncludes: '_source_includes',
    _sourceInclude: '_source_include',
    versionType: 'version_type',
    errorTrace: 'error_trace',
    filterPath: 'filter_path'
=======
function existsSourceApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['id'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: id')
    return handleError(err, callback)
  }
  if (params['index'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: index')
    return handleError(err, callback)
>>>>>>> a064f0f3... Improve child performances (#1314)
  }

  // check required url components
  if (params['id'] != null && (params['type'] == null || params['index'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: type, index')
    return handleError(err, callback)
  } else if (params['type'] != null && (params['index'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  var { method, body, id, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null && (type) != null && (id) != null) {
    if (method == null) method = 'HEAD'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + encodeURIComponent(id) + '/' + '_source'
  } else {
    if (method == null) method = 'HEAD'
    path = '/' + encodeURIComponent(index) + '/' + '_source' + '/' + encodeURIComponent(id)
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = existsSourceApi
