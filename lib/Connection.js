'use strict'

const assert = require('assert')
const http = require('http')
const https = require('https')
const debug = require('debug')('elasticsearch')
const decompressResponse = require('decompress-response')
const { TimeoutError } = require('./errors')

class Connection {
  constructor (opts = {}) {
    this.url = opts.url
    this.ssl = opts.ssl || null
    this.id = opts.id || opts.url.href
    this.headers = opts.headers || null
    this.deadCount = 0
    this.resurrectTimeout = 0

    this._openRequests = 0
    this._status = opts.status || Connection.statuses.ALIVE
    this.roles = opts.roles || defaultRoles

    const agentOptions = Object.assign({}, {
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: Infinity,
      maxFreeSockets: 256
    }, opts.agent || opts.agent)
    this._agent = this.url.protocol === 'http:'
      ? new http.Agent(agentOptions)
      : new https.Agent(Object.assign({}, agentOptions, this.ssl))

    this.makeRequest = this.url.protocol === 'http:'
      ? http.request
      : https.request
  }

  request (params, callback) {
    this._openRequests++
    var ended = false
    params.agent = this._agent

    debug('Starting a new request', params)
    const request = this.makeRequest(this.buildRequestObject(params))

    // listen for the response event
    // TODO: handle redirects?
    request.on('response', response => {
      if (ended === false) {
        ended = true
        this._openRequests--
        callback(null, decompressResponse(response))
      }
    })

    // handles request timeout
    request.on('timeout', () => {
      if (ended === false) {
        ended = true
        this._openRequests--
        request.abort()
        callback(new TimeoutError('Request timed out', params))
      }
    })

    // handles request error
    request.on('error', err => {
      if (ended === false) {
        ended = true
        this._openRequests--
        callback(err)
      }
    })

    // Disables the Nagle algorithm
    request.setNoDelay(true)

    // starts the request
    request.end(params.body)

    return request
  }

  close () {
    debug('Closing connection', this.id)
    if (this._openRequests > 0) {
      setTimeout(() => this.close(), 1000)
    } else {
      this._agent.destroy()
    }
  }

  setRole (role, enabled) {
    assert(
      ~validRoles.indexOf(role),
      `Unsupported role: '${role}'`
    )
    assert(
      typeof enabled === 'boolean',
      'enabled should be a boolean'
    )
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
      port: url.port,
      headers: this.headers,
      auth: !!url.username === true || !!url.password === true
        ? `${url.username}:${url.password}`
        : undefined
    }

    const paramsKeys = Object.keys(params)
    for (var i = 0, len = paramsKeys.length; i < len; i++) {
      var key = paramsKeys[i]
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
}

Connection.statuses = {
  ALIVE: 'alive',
  DEAD: 'dead'
}

Connection.roles = {
  MASTER: 'master',
  DATA: 'data',
  INGEST: 'ingest',
  COORDINATING: 'coordinating',
  MACHINE_LEARNING: 'machine_learning'
}

const defaultRoles = {
  [Connection.roles.MASTER]: true,
  [Connection.roles.DATA]: true,
  [Connection.roles.INGEST]: true,
  [Connection.roles.COORDINATING]: true,
  [Connection.roles.MACHINE_LEARNING]: true
}

const validStatuses = Object.keys(Connection.statuses)
  .map(k => Connection.statuses[k])
const validRoles = Object.keys(Connection.roles)
  .map(k => Connection.roles[k])

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

module.exports = Connection
