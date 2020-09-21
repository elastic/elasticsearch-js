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
const acceptedQuerystring = ['nodes', 'actions', 'parent_task_id', 'wait_for_completion', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'timeout', 'detailed', 'group_by']
const snakeCase = { parentTaskId: 'parent_task_id', waitForCompletion: 'wait_for_completion', errorTrace: 'error_trace', filterPath: 'filter_path', groupBy: 'group_by' }

function TasksApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

TasksApi.prototype.cancel = function tasksCancelApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, taskId, task_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((task_id || taskId) != null) {
    if (method == null) method = 'POST'
    path = '/' + '_tasks' + '/' + encodeURIComponent(task_id || taskId) + '/' + '_cancel'
  } else {
    if (method == null) method = 'POST'
    path = '/' + '_tasks' + '/' + '_cancel'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

TasksApi.prototype.get = function tasksGetApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['task_id'] == null && params['taskId'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: task_id or taskId')
    return handleError(err, callback)
  }

  var { method, body, taskId, task_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_tasks' + '/' + encodeURIComponent(task_id || taskId)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

TasksApi.prototype.list = function tasksListApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_tasks'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = TasksApi
