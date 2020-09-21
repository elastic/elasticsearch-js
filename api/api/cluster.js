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
const acceptedQuerystring = ['include_yes_decisions', 'include_disk_info', 'pretty', 'human', 'error_trace', 'source', 'filter_path', 'timeout', 'master_timeout', 'wait_for_removal', 'local', 'flat_settings', 'include_defaults', 'expand_wildcards', 'level', 'wait_for_active_shards', 'wait_for_nodes', 'wait_for_events', 'wait_for_no_relocating_shards', 'wait_for_no_initializing_shards', 'wait_for_status', 'node_ids', 'node_names', 'create', 'dry_run', 'explain', 'retry_failed', 'metric', 'wait_for_metadata_version', 'wait_for_timeout', 'ignore_unavailable', 'allow_no_indices']
const snakeCase = { includeYesDecisions: 'include_yes_decisions', includeDiskInfo: 'include_disk_info', errorTrace: 'error_trace', filterPath: 'filter_path', masterTimeout: 'master_timeout', waitForRemoval: 'wait_for_removal', flatSettings: 'flat_settings', includeDefaults: 'include_defaults', expandWildcards: 'expand_wildcards', waitForActiveShards: 'wait_for_active_shards', waitForNodes: 'wait_for_nodes', waitForEvents: 'wait_for_events', waitForNoRelocatingShards: 'wait_for_no_relocating_shards', waitForNoInitializingShards: 'wait_for_no_initializing_shards', waitForStatus: 'wait_for_status', nodeIds: 'node_ids', nodeNames: 'node_names', dryRun: 'dry_run', retryFailed: 'retry_failed', waitForMetadataVersion: 'wait_for_metadata_version', waitForTimeout: 'wait_for_timeout', ignoreUnavailable: 'ignore_unavailable', allowNoIndices: 'allow_no_indices' }

function ClusterApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

ClusterApi.prototype.allocationExplain = function clusterAllocationExplainApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = body == null ? 'GET' : 'POST'
  path = '/' + '_cluster' + '/' + 'allocation' + '/' + 'explain'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.deleteComponentTemplate = function clusterDeleteComponentTemplateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['name'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_component_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.deleteVotingConfigExclusions = function clusterDeleteVotingConfigExclusionsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_cluster' + '/' + 'voting_config_exclusions'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.existsComponentTemplate = function clusterExistsComponentTemplateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['name'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'HEAD'
  path = '/' + '_component_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.getComponentTemplate = function clusterGetComponentTemplateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_component_template' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_component_template'
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

ClusterApi.prototype.getSettings = function clusterGetSettingsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_cluster' + '/' + 'settings'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.health = function clusterHealthApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((index) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'health' + '/' + encodeURIComponent(index)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'health'
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

ClusterApi.prototype.pendingTasks = function clusterPendingTasksApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_cluster' + '/' + 'pending_tasks'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.postVotingConfigExclusions = function clusterPostVotingConfigExclusionsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_cluster' + '/' + 'voting_config_exclusions'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.putComponentTemplate = function clusterPutComponentTemplateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['name'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_component_template' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.putSettings = function clusterPutSettingsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_cluster' + '/' + 'settings'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.remoteInfo = function clusterRemoteInfoApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_remote' + '/' + 'info'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.reroute = function clusterRerouteApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_cluster' + '/' + 'reroute'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

ClusterApi.prototype.state = function clusterStateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required url components
  if (params['index'] != null && (params['metric'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: metric')
    return handleError(err, callback)
  }

  var { method, body, metric, index, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((metric) != null && (index) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric) + '/' + encodeURIComponent(index)
  } else if ((metric) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'state' + '/' + encodeURIComponent(metric)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'state'
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

ClusterApi.prototype.stats = function clusterStatsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, nodeId, node_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((node_id || nodeId) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'stats' + '/' + 'nodes' + '/' + encodeURIComponent(node_id || nodeId)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_cluster' + '/' + 'stats'
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

Object.defineProperties(ClusterApi.prototype, {
  allocation_explain: { get () { return this.allocationExplain } },
  delete_component_template: { get () { return this.deleteComponentTemplate } },
  delete_voting_config_exclusions: { get () { return this.deleteVotingConfigExclusions } },
  exists_component_template: { get () { return this.existsComponentTemplate } },
  get_component_template: { get () { return this.getComponentTemplate } },
  get_settings: { get () { return this.getSettings } },
  pending_tasks: { get () { return this.pendingTasks } },
  post_voting_config_exclusions: { get () { return this.postVotingConfigExclusions } },
  put_component_template: { get () { return this.putComponentTemplate } },
  put_settings: { get () { return this.putSettings } },
  remote_info: { get () { return this.remoteInfo } }
})

module.exports = ClusterApi
