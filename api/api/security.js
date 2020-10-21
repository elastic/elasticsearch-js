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
const acceptedQuerystring = ['pretty', 'human', 'error_trace', 'source', 'filter_path', 'refresh', 'usernames', 'id', 'name', 'username', 'realm_name', 'owner']
const snakeCase = { errorTrace: 'error_trace', filterPath: 'filter_path', realmName: 'realm_name' }

function SecurityApi (transport, ConfigurationError) {
  this.transport = transport
  this[kConfigurationError] = ConfigurationError
}

SecurityApi.prototype.authenticate = function securityAuthenticateApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_security' + '/' + '_authenticate'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.changePassword = function securityChangePasswordApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((username) != null) {
    if (method == null) method = 'PUT'
    path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username) + '/' + '_password'
  } else {
    if (method == null) method = 'PUT'
    path = '/' + '_security' + '/' + 'user' + '/' + '_password'
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

SecurityApi.prototype.clearApiKeyCache = function securityClearApiKeyCacheApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['ids'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: ids')
    return handleError(err, callback)
  }

  var { method, body, ids, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'api_key' + '/' + encodeURIComponent(ids) + '/' + '_clear_cache'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.clearCachedPrivileges = function securityClearCachedPrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['application'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: application')
    return handleError(err, callback)
  }

  var { method, body, application, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application) + '/' + '_clear_cache'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.clearCachedRealms = function securityClearCachedRealmsApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['realms'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: realms')
    return handleError(err, callback)
  }

  var { method, body, realms, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'realm' + '/' + encodeURIComponent(realms) + '/' + '_clear_cache'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.clearCachedRoles = function securityClearCachedRolesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['name'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'role' + '/' + encodeURIComponent(name) + '/' + '_clear_cache'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.createApiKey = function securityCreateApiKeyApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'api_key'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.deletePrivileges = function securityDeletePrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['application'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: application')
    return handleError(err, callback)
  }
  if (params['name'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: name')
    return handleError(err, callback)
  }

  // check required url components
  if (params['name'] != null && (params['application'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: application')
    return handleError(err, callback)
  }

  var { method, body, application, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application) + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.deleteRole = function securityDeleteRoleApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'role' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.deleteRoleMapping = function securityDeleteRoleMappingApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'role_mapping' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.deleteUser = function securityDeleteUserApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['username'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: username')
    return handleError(err, callback)
  }

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.disableUser = function securityDisableUserApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['username'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: username')
    return handleError(err, callback)
  }

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username) + '/' + '_disable'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.enableUser = function securityEnableUserApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['username'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: username')
    return handleError(err, callback)
  }

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username) + '/' + '_enable'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.getApiKey = function securityGetApiKeyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_security' + '/' + 'api_key'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.getBuiltinPrivileges = function securityGetBuiltinPrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_security' + '/' + 'privilege' + '/' + '_builtin'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.getPrivileges = function securityGetPrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required url components
  if (params['name'] != null && (params['application'] == null)) {
    const err = new this[kConfigurationError]('Missing required parameter of the url: application')
    return handleError(err, callback)
  }

  var { method, body, application, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((application) != null && (name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application) + '/' + encodeURIComponent(name)
  } else if ((application) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'privilege' + '/' + encodeURIComponent(application)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'privilege'
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

SecurityApi.prototype.getRole = function securityGetRoleApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'role' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'role'
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

SecurityApi.prototype.getRoleMapping = function securityGetRoleMappingApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, name, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((name) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'role_mapping' + '/' + encodeURIComponent(name)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'role_mapping'
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

SecurityApi.prototype.getToken = function securityGetTokenApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'oauth2' + '/' + 'token'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.getUser = function securityGetUserApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((username) != null) {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username)
  } else {
    if (method == null) method = 'GET'
    path = '/' + '_security' + '/' + 'user'
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

SecurityApi.prototype.getUserPrivileges = function securityGetUserPrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'GET'
  path = '/' + '_security' + '/' + 'user' + '/' + '_privileges'

  // build request object
  const request = {
    method,
    path,
    body: null,
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.grantApiKey = function securityGrantApiKeyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'POST'
  path = '/' + '_security' + '/' + 'api_key' + '/' + 'grant'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.hasPrivileges = function securityHasPrivilegesApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, user, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((user) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(user) + '/' + '_has_privileges'
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_security' + '/' + 'user' + '/' + '_has_privileges'
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

SecurityApi.prototype.invalidateApiKey = function securityInvalidateApiKeyApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_security' + '/' + 'api_key'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.invalidateToken = function securityInvalidateTokenApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'DELETE'
  path = '/' + '_security' + '/' + 'oauth2' + '/' + 'token'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.putPrivileges = function securityPutPrivilegesApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'privilege'

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.putRole = function securityPutRoleApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'role' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.putRoleMapping = function securityPutRoleMappingApi (params, options, callback) {
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
  path = '/' + '_security' + '/' + 'role_mapping' + '/' + encodeURIComponent(name)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

SecurityApi.prototype.putUser = function securityPutUserApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  // check required parameters
  if (params['username'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: username')
    return handleError(err, callback)
  }
  if (params['body'] == null) {
    const err = new this[kConfigurationError]('Missing required parameter: body')
    return handleError(err, callback)
  }

  var { method, body, username, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if (method == null) method = 'PUT'
  path = '/' + '_security' + '/' + 'user' + '/' + encodeURIComponent(username)

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

Object.defineProperties(SecurityApi.prototype, {
  change_password: { get () { return this.changePassword } },
  clear_api_key_cache: { get () { return this.clearApiKeyCache } },
  clear_cached_privileges: { get () { return this.clearCachedPrivileges } },
  clear_cached_realms: { get () { return this.clearCachedRealms } },
  clear_cached_roles: { get () { return this.clearCachedRoles } },
  create_api_key: { get () { return this.createApiKey } },
  delete_privileges: { get () { return this.deletePrivileges } },
  delete_role: { get () { return this.deleteRole } },
  delete_role_mapping: { get () { return this.deleteRoleMapping } },
  delete_user: { get () { return this.deleteUser } },
  disable_user: { get () { return this.disableUser } },
  enable_user: { get () { return this.enableUser } },
  get_api_key: { get () { return this.getApiKey } },
  get_builtin_privileges: { get () { return this.getBuiltinPrivileges } },
  get_privileges: { get () { return this.getPrivileges } },
  get_role: { get () { return this.getRole } },
  get_role_mapping: { get () { return this.getRoleMapping } },
  get_token: { get () { return this.getToken } },
  get_user: { get () { return this.getUser } },
  get_user_privileges: { get () { return this.getUserPrivileges } },
  grant_api_key: { get () { return this.grantApiKey } },
  has_privileges: { get () { return this.hasPrivileges } },
  invalidate_api_key: { get () { return this.invalidateApiKey } },
  invalidate_token: { get () { return this.invalidateToken } },
  put_privileges: { get () { return this.putPrivileges } },
  put_role: { get () { return this.putRole } },
  put_role_mapping: { get () { return this.putRoleMapping } },
  put_user: { get () { return this.putUser } }
})

module.exports = SecurityApi
