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

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['lines_to_sample', 'line_merge_size_limit', 'timeout', 'charset', 'format', 'has_header_row', 'column_names', 'delimiter', 'quote', 'should_trim_fields', 'grok_pattern', 'timestamp_field', 'timestamp_format', 'explain', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { linesToSample: 'lines_to_sample', lineMergeSizeLimit: 'line_merge_size_limit', hasHeaderRow: 'has_header_row', columnNames: 'column_names', shouldTrimFields: 'should_trim_fields', grokPattern: 'grok_pattern', timestampField: 'timestamp_field', timestampFormat: 'timestamp_format', errorTrace: 'error_trace', filterPath: 'filter_path' }

function TextStructureApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

TextStructureApi.prototype.findStructure = function textStructureFindStructureApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params.body == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  let { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  let path = ''
  if (method == null) method = 'POST'
  path = '/' + '_text_structure' + '/' + 'find_structure'

  // build request object
  const request = {
    method,
    path,
    bulkBody: body,
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(TextStructureApi.prototype, {
  find_structure: { get () { return this.findStructure } }
})

module.exports = TextStructureApi
