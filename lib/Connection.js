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

const assert = require('assert')
const { inspect } = require('util')
const hpagent = require('hpagent')
const http = require('http')
const https = require('https')
const debug = require('debug')('elasticsearch')
const { pipeline } = require('stream')
const INVALID_PATH_REGEX = /[^\u0021-\u00ff]/
const {
  ConnectionError,
  RequestAbortedError,
  TimeoutError,
  ConfigurationError
} = require('./errors')

class Connection {
  constructor (opts) {
    this.url = opts.url
    this.ssl = opts.ssl || null
    this.id = opts.id || stripAuth(opts.url.href)
    this.headers = prepareHeaders(opts.headers, opts.auth)
    this.deadCount = 0
    this.resurrectTimeout = 0
    this.caFingerprint = opts.caFingerprint

    this._openRequests = 0
    this._status = opts.status || Connection.statuses.ALIVE
    this.roles = Object.assign({}, defaultRoles, opts.roles)

    if (!['http:', 'https:'].includes(this.url.protocol)) {
      throw new ConfigurationError(`Invalid protocol: '${this.url.protocol}'`)
    }

    if (typeof opts.agent === 'function') {
      this.agent = opts.agent(opts)
    } else if (opts.agent === false) {
      this.agent = undefined
    } else {
      const agentOptions = Object.assign({}, {
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 256,
        maxFreeSockets: 256,
        scheduling: 'lifo'
      }, opts.agent)
      if (opts.proxy) {
        agentOptions.proxy = opts.proxy
        this.agent = this.url.protocol === 'http:'
          ? new hpagent.HttpProxyAgent(agentOptions)
          : new hpagent.HttpsProxyAgent(Object.assign({}, agentOptions, this.ssl))
      } else {
        this.agent = this.url.protocol === 'http:'
          ? new http.Agent(agentOptions)
          : new https.Agent(Object.assign({}, agentOptions, this.ssl))
      }
    }

    this.makeRequest = this.url.protocol === 'http:'
      ? http.request
      : https.request
  }

  request (params, callback) {
    this._openRequests++
    let cleanedListeners = false

    const requestParams = this.buildRequestObject(params)
    // https://github.com/nodejs/node/commit/b961d9fd83
    if (INVALID_PATH_REGEX.test(requestParams.path) === true) {
      callback(new TypeError(`ERR_UNESCAPED_CHARACTERS: ${requestParams.path}`), null)
      /* istanbul ignore next */
      return { abort: () => {} }
    }

    debug('Starting a new request', params)
    const request = this.makeRequest(requestParams)

    const onResponse = response => {
      cleanListeners()
      this._openRequests--
      callback(null, response)
    }

    const onTimeout = () => {
      cleanListeners()
      this._openRequests--
      request.once('error', () => {}) // we need to catch the request aborted error
      request.abort()
      callback(new TimeoutError('Request timed out', params), null)
    }

    const onError = err => {
      cleanListeners()
      this._openRequests--
      let message = err.message
      if (err.code === 'ECONNRESET') {
        /* istanbul ignore next */
        const socket = request.socket || {}
        /* istanbul ignore next */
        message += ` - Local: ${socket.localAddress || 'unknown'}:${socket.localPort || 'unknown'}, Remote: ${socket.remoteAddress || 'unknown'}:${socket.remotePort || 'unknown'}`
      }
      callback(new ConnectionError(message), null)
    }

    const onAbort = () => {
      cleanListeners()
      request.once('error', () => {}) // we need to catch the request aborted error
      debug('Request aborted', params)
      this._openRequests--
      callback(new RequestAbortedError(), null)
    }

    const onSocket = socket => {
      /* istanbul ignore else */
      if (!socket.isSessionReused()) {
        socket.once('secureConnect', () => {
          const issuerCertificate = getIssuerCertificate(socket)
          /* istanbul ignore next */
          if (issuerCertificate == null) {
            onError(new Error('Invalid or malformed certificate'))
            request.once('error', () => {}) // we need to catch the request aborted error
            return request.abort()
          }

          // Check if fingerprint matches
          /* istanbul ignore else */
          if (this.caFingerprint !== issuerCertificate.fingerprint256) {
            onError(new Error('Server certificate CA fingerprint does not match the value configured in caFingerprint'))
            request.once('error', () => {}) // we need to catch the request aborted error
            return request.abort()
          }
        })
      }
    }

    request.on('response', onResponse)
    request.on('timeout', onTimeout)
    request.on('error', onError)
    request.on('abort', onAbort)
    if (this.caFingerprint != null) {
      request.on('socket', onSocket)
    }

    // Disables the Nagle algorithm
    request.setNoDelay(true)

    // starts the request
    if (isStream(params.body) === true) {
      pipeline(params.body, request, err => {
        /* istanbul ignore if  */
        if (err != null && cleanedListeners === false) {
          cleanListeners()
          this._openRequests--
          callback(err, null)
        }
      })
    } else {
      request.end(params.body)
    }

    return request

    function cleanListeners () {
      request.removeListener('response', onResponse)
      request.removeListener('timeout', onTimeout)
      request.removeListener('error', onError)
      request.removeListener('abort', onAbort)
      request.removeListener('socket', onSocket)
      cleanedListeners = true
    }
  }

  // TODO: write a better closing logic
  close (callback = () => {}) {
    debug('Closing connection', this.id)
    if (this._openRequests > 0) {
      setTimeout(() => this.close(callback), 1000)
    } else {
      if (this.agent !== undefined) {
        this.agent.destroy()
      }
      callback()
    }
  }

  setRole (role, enabled) {
    if (validRoles.indexOf(role) === -1) {
      throw new ConfigurationError(`Unsupported role: '${role}'`)
    }
    if (typeof enabled !== 'boolean') {
      throw new ConfigurationError('enabled should be a boolean')
    }

    this.roles[role] = enabled
    return this
  }

  get status () {
    return this._status
  }

  set status (status) {
    assert(
      ~validStatuses.indexOf(status),
      `Unsupported status: '${status}'`
    )
    this._status = status
  }

  buildRequestObject (params) {
    const url = this.url
    const request = {
      protocol: url.protocol,
      hostname: url.hostname[0] === '['
        ? url.hostname.slice(1, -1)
        : url.hostname,
      hash: url.hash,
      search: url.search,
      pathname: url.pathname,
      path: '',
      href: url.href,
      origin: url.origin,
      // https://github.com/elastic/elasticsearch-js/issues/843
      port: url.port !== '' ? url.port : undefined,
      headers: this.headers,
      agent: this.agent
    }

    const paramsKeys = Object.keys(params)
    for (let i = 0, len = paramsKeys.length; i < len; i++) {
      const key = paramsKeys[i]
      if (key === 'path') {
        request.pathname = resolve(request.pathname, params[key])
      } else if (key === 'querystring' && !!params[key] === true) {
        if (request.search === '') {
          request.search = '?' + params[key]
        } else {
          request.search += '&' + params[key]
        }
      } else if (key === 'headers') {
        request.headers = Object.assign({}, request.headers, params.headers)
      } else {
        request[key] = params[key]
      }
    }

    request.path = request.pathname + request.search

    return request
  }

  // Handles console.log and utils.inspect invocations.
  // We want to hide `auth`, `agent` and `ssl` since they made
  // the logs very hard to read. The user can still
  // access them with `instance.agent` and `instance.ssl`.
  [inspect.custom] (depth, options) {
    const {
      authorization,
      ...headers
    } = this.headers

    return {
      url: stripAuth(this.url.toString()),
      id: this.id,
      headers,
      deadCount: this.deadCount,
      resurrectTimeout: this.resurrectTimeout,
      _openRequests: this._openRequests,
      status: this.status,
      roles: this.roles
    }
  }

  toJSON () {
    const {
      authorization,
      ...headers
    } = this.headers

    return {
      url: stripAuth(this.url.toString()),
      id: this.id,
      headers,
      deadCount: this.deadCount,
      resurrectTimeout: this.resurrectTimeout,
      _openRequests: this._openRequests,
      status: this.status,
      roles: this.roles
    }
  }
}

Connection.statuses = {
  ALIVE: 'alive',
  DEAD: 'dead'
}

Connection.roles = {
  MASTER: 'master',
  DATA: 'data',
  INGEST: 'ingest',
  ML: 'ml'
}

const defaultRoles = {
  [Connection.roles.MASTER]: true,
  [Connection.roles.DATA]: true,
  [Connection.roles.INGEST]: true,
  [Connection.roles.ML]: false
}

const validStatuses = Object.keys(Connection.statuses)
  .map(k => Connection.statuses[k])
const validRoles = Object.keys(Connection.roles)
  .map(k => Connection.roles[k])

function stripAuth (url) {
  if (url.indexOf('@') === -1) return url
  return url.slice(0, url.indexOf('//') + 2) + url.slice(url.indexOf('@') + 1)
}

function isStream (obj) {
  return obj != null && typeof obj.pipe === 'function'
}

function resolve (host, path) {
  const hostEndWithSlash = host[host.length - 1] === '/'
  const pathStartsWithSlash = path[0] === '/'

  if (hostEndWithSlash === true && pathStartsWithSlash === true) {
    return host + path.slice(1)
  } else if (hostEndWithSlash !== pathStartsWithSlash) {
    return host + path
  } else {
    return host + '/' + path
  }
}

function prepareHeaders (headers = {}, auth) {
  if (auth != null && headers.authorization == null) {
    /* istanbul ignore else */
    if (auth.apiKey) {
      if (typeof auth.apiKey === 'object') {
        headers.authorization = 'ApiKey ' + Buffer.from(`${auth.apiKey.id}:${auth.apiKey.api_key}`).toString('base64')
      } else {
        headers.authorization = `ApiKey ${auth.apiKey}`
      }
    } else if (auth.bearer) {
      headers.authorization = `Bearer ${auth.bearer}`
    } else if (auth.username && auth.password) {
      headers.authorization = 'Basic ' + Buffer.from(`${auth.username}:${auth.password}`).toString('base64')
    }
  }
  return headers
}

function getIssuerCertificate (socket) {
  let certificate = socket.getPeerCertificate(true)
  while (certificate && Object.keys(certificate).length > 0) {
    // invalid certificate
    if (certificate.issuerCertificate == null) {
      return null
    }

    // We have reached the root certificate.
    // In case of self-signed certificates, `issuerCertificate` may be a circular reference.
    if (certificate.fingerprint256 === certificate.issuerCertificate.fingerprint256) {
      break
    }

    // continue the loop
    certificate = certificate.issuerCertificate
  }
  return certificate
}

module.exports = Connection
module.exports.internals = { prepareHeaders, getIssuerCertificate }
