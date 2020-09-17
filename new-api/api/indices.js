/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */
const acceptedQuerystring = ['timeout', 'master_timeout', 'ignore_unavailable', 'allow_no_indices', 'expand_wildcards', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'index', 'fielddata', 'fields', 'query', 'request', 'wait_for_active_shards', 'local', 'flat_settings', 'include_defaults', 'force', 'wait_if_ongoing', 'flush', 'max_num_segments', 'only_expunge_deletes', 'create', 'cause', 'write_index_only', 'preserve_existing', 'order', 'detailed', 'active_only', 'dry_run', 'verbose', 'status', 'completion_fields', 'fielddata_fields', 'groups', 'level', 'types', 'include_segment_file_sizes', 'include_unloaded_segments', 'forbid_closed_indices', 'wait_for_completion', 'only_ancient_segments', 'explain', 'q', 'analyzer', 'analyze_wildcard', 'default_operator', 'df', 'lenient', 'rewrite', 'all_shards']

const snakeCase = { masterTimeout: 'master_timeout', ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices', expandWildcards: 'expand_wildcards', errorTrace: 'error_trace', filterPath: 'filter_path', waitForActiveShards: 'wait_for_active_shards', flatSettings: 'flat_settings', includeDefaults: 'include_defaults', waitIfOngoing: 'wait_if_ongoing', maxNumSegments: 'max_num_segments', onlyExpungeDeletes: 'only_expunge_deletes', writeIndexOnly: 'write_index_only', preserveExisting: 'preserve_existing', activeOnly: 'active_only', dryRun: 'dry_run', completionFields: 'completion_fields', fielddataFields: 'fielddata_fields', includeSegmentFileSizes: 'include_segment_file_sizes', includeUnloadedSegments: 'include_unloaded_segments', forbidClosedIndices: 'forbid_closed_indices', waitForCompletion: 'wait_for_completion', onlyAncientSegments: 'only_ancient_segments', analyzeWildcard: 'analyze_wildcard', defaultOperator: 'default_operator', allShards: 'all_shards' }

function handleError (err, callback) {
  if (callback) {
    process.nextTick(callback, err, { body: null, statusCode: null, headers: null, warnings: null })
    return { then: noop, catch: noop, abort: noop }
  }
  return Promise.reject(err)
}

function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
  var target = {}
  var keys = Object.keys(querystring)
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i]
    target[snakeCase[key] || key] = querystring[key]
    if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
      warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
    }
  }
  return target
}

function noop () {}

function Indices (transport) {
  this.transport = transport
}

Indices.prototype.addBlock = function indicesAddBlockApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['block'] == null) {
    const err = new Error('Missing required parameter: block')
    return handleError(err, callback)
  }

  // check required url components
  if (params['block'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, block, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_block' + '/' + encodeURIComponent(block)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.analyze = function indicesAnalyzeApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_analyze'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_analyze'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.clearCache = function indicesClearCacheApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_cache' + '/' + 'clear'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_cache' + '/' + 'clear'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.clone = function indicesCloneApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['target'] == null) {
    const err = new Error('Missing required parameter: target')
    return handleError(err, callback)
  }

  // check required url components
  if (params['target'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, target, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_clone' + '/' + encodeURIComponent(target)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.close = function indicesCloseApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_close'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.create = function indicesCreateApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.delete = function indicesDeleteApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + encodeURIComponent(index)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.deleteAlias = function indicesDeleteAliasApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // check required url components
  if (params['name'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (name) != null) {
    if (method == null) method = 'DELETE'
    path = '/' + encodeURIComponent(index) + '/' + '_alias' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'DELETE'
    path = '/' + encodeURIComponent(index) + '/' + '_aliases' + '/' + encodeURIComponent(name)
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.deleteIndexTemplate = function indicesDeleteIndexTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + '_index_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.deleteTemplate = function indicesDeleteTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + '_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.exists = function indicesExistsApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'HEAD'
  path = '/' + encodeURIComponent(index)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.existsAlias = function indicesExistsAliasApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (name) != null) {
    if (method == null) method = 'HEAD'
    path = '/' + encodeURIComponent(index) + '/' + '_alias' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'HEAD'
    path = '/' + '_alias' + '/' + encodeURIComponent(name)
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.existsIndexTemplate = function indicesExistsIndexTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'HEAD'
  path = '/' + '_index_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.existsTemplate = function indicesExistsTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'HEAD'
  path = '/' + '_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.existsType = function indicesExistsTypeApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['type'] == null) {
    const err = new Error('Missing required parameter: type')
    return handleError(err, callback)
  }

  // check required url components
  if (params['type'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'HEAD'
  path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + encodeURIComponent(type)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.flush = function indicesFlushApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_flush'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_flush'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.forcemerge = function indicesForcemergeApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_forcemerge'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_forcemerge'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.get = function indicesGetApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'GET'
  path = '/' + encodeURIComponent(index)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getAlias = function indicesGetAliasApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (name) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_alias' + '/' + encodeURIComponent(name)
  } else if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_alias' + '/' + encodeURIComponent(name)
  } else if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_alias'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_alias'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getFieldMapping = function indicesGetFieldMappingApi (params, options, callback) {
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
  if (params['fields'] == null) {
    const err = new Error('Missing required parameter: fields')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, fields, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (fields) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_mapping' + '/' + 'field' + '/' + encodeURIComponent(fields)
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getIndexTemplate = function indicesGetIndexTemplateApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_index_template' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_index_template'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getMapping = function indicesGetMappingApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_mapping'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_mapping'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getSettings = function indicesGetSettingsApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (name) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_settings' + '/' + encodeURIComponent(name)
  } else if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_settings'
  } else if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_settings' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_settings'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getTemplate = function indicesGetTemplateApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_template' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_template'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getUpgrade = function indicesGetUpgradeApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'GET'
  path = '/' + encodeURIComponent(index) + '/' + '_upgrade'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.open = function indicesOpenApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_open'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.putAlias = function indicesPutAliasApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // check required url components
  if (params['name'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (name) != null) {
    if (method == null) method = 'PUT'
    path = '/' + encodeURIComponent(index) + '/' + '_alias' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'PUT'
    path = '/' + encodeURIComponent(index) + '/' + '_aliases' + '/' + encodeURIComponent(name)
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.putIndexTemplate = function indicesPutIndexTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + '_index_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.putMapping = function indicesPutMappingApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_mapping'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.putSettings = function indicesPutSettingsApi (params, options, callback) {
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
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'PUT'
    path = '/' + encodeURIComponent(index) + '/' + '_settings'
  } else {
    if (method == null) method = 'PUT'
    path = '/' + '_settings'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.putTemplate = function indicesPutTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + '_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.recovery = function indicesRecoveryApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_recovery'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_recovery'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.refresh = function indicesRefreshApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_refresh'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_refresh'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.resolveIndex = function indicesResolveIndexApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'GET'
  path = '/' + '_resolve' + '/' + 'index' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.rollover = function indicesRolloverApi (params, options, callback) {
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
  if (params['alias'] == null) {
    const err = new Error('Missing required parameter: alias')
    return handleError(err, callback)
  }

  // check required url components
  if ((params['new_index'] != null || params['newIndex'] != null) && (params['alias'] == null)) {
    const err = new Error('Missing required parameter of the url: alias')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, alias, newIndex, new_index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((alias) != null && (new_index || newIndex) != null) {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(alias) + '/' + '_rollover' + '/' + encodeURIComponent(new_index || newIndex)
  } else {
    if (method == null) method = 'POST'
    path = '/' + encodeURIComponent(alias) + '/' + '_rollover'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.segments = function indicesSegmentsApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_segments'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_segments'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.shardStores = function indicesShardStoresApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_shard_stores'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_shard_stores'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.shrink = function indicesShrinkApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['target'] == null) {
    const err = new Error('Missing required parameter: target')
    return handleError(err, callback)
  }

  // check required url components
  if (params['target'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, target, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_shrink' + '/' + encodeURIComponent(target)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.simulateIndexTemplate = function indicesSimulateIndexTemplateApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + '_index_template' + '/' + '_simulate_index' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.simulateTemplate = function indicesSimulateTemplateApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'POST'
    path = '/' + '_index_template' + '/' + '_simulate' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_index_template' + '/' + '_simulate'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.split = function indicesSplitApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }
  if (params['target'] == null) {
    const err = new Error('Missing required parameter: target')
    return handleError(err, callback)
  }

  // check required url components
  if (params['target'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, target, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + encodeURIComponent(index) + '/' + '_split' + '/' + encodeURIComponent(target)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.stats = function indicesStatsApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, metric, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_stats' + '/' + encodeURIComponent(metric)
  } else if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_stats' + '/' + encodeURIComponent(metric)
  } else if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + encodeURIComponent(index) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.updateAliases = function indicesUpdateAliasesApi (params, options, callback) {
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
  if (params['body'] == null) {
    const err = new Error('Missing required parameter: body')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + '_aliases'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.upgrade = function indicesUpgradeApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_upgrade'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.validateQuery = function indicesValidateQueryApi (params, options, callback) {
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

  // check required url components
  if (params['type'] != null && (params['index'] == null)) {
    const err = new Error('Missing required parameter of the url: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, type, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((index) != null && (type) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + encodeURIComponent(type) + '/' + '_validate' + '/' + 'query'
  } else if ((index) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + encodeURIComponent(index) + '/' + '_validate' + '/' + 'query'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_validate' + '/' + 'query'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.createDataStream = function indicesCreateDataStreamApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'PUT'
  path = '/' + '_data_stream' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.dataStreamsStats = function indicesDataStreamsStatsApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_data_stream' + '/' + encodeURIComponent(name) + '/' + '_stats'
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_data_stream' + '/' + '_stats'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.deleteDataStream = function indicesDeleteDataStreamApi (params, options, callback) {
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
  if (params['name'] == null) {
    const err = new Error('Missing required parameter: name')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'DELETE'
  path = '/' + '_data_stream' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.freeze = function indicesFreezeApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_freeze'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.getDataStream = function indicesGetDataStreamApi (params, options, callback) {
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

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_data_stream' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_data_stream'
  }

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.reloadSearchAnalyzers = function indicesReloadSearchAnalyzersApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_reload_search_analyzers'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

Indices.prototype.unfreeze = function indicesUnfreezeApi (params, options, callback) {
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
    const err = new Error('Missing required parameter: index')
    return handleError(err, callback)
  }

  // validate headers object
  if (options.headers != null && typeof options.headers !== 'object') {
    const err = new Error(`Headers should be an object, instead got: ${typeof options.headers}`)
    return handleError(err, callback)
  }

  var warnings = []
  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring, warnings)

  var ignore = options.ignore
  if (typeof ignore === 'number') {
    options.ignore = [ignore]
  }

  var path = ''

  if (method == null) method = 'POST'
  path = '/' + encodeURIComponent(index) + '/' + '_unfreeze'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  options.warnings = warnings.length === 0 ? null : warnings
  return this.transport.request(request, options, callback)
}

module.exports = Indices
