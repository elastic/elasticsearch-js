'use strict'

const assert = require('assert')
const http = require('http')
const https = require('https')
const debug = require('debug')('elasticsearch')
const decompressResponse = require('decompress-response')
const { TimeoutError } = require('./errors')

class Connection {
  constructor (opts = {}) {
    assert(opts.host, 'Missing host data')

    this.host = urlToOptions(opts.host)
    this.ssl = opts.host.ssl || opts.ssl || null
    this.id = opts.id || opts.host.href
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
    }, opts.host.agent || opts.agent)
    this._agent = this.host.protocol === 'http:'
      ? new http.Agent(agentOptions)
      : new https.Agent(Object.assign({}, agentOptions, this.ssl))

    this.makeRequest = this.host.protocol === 'http:'
      ? http.request
      : https.request
  }

  request (params, callback) {
    this._openRequests++
    var ended = false
    params.agent = this._agent

    debug('Starting a new request', params)
    const request = this.makeRequest(buildRequestObject(this.host, params))

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

function buildRequestObject (host, request) {
  var merged = {}
  var hostKeys = Object.keys(host)
  var requestKeys = Object.keys(request)

  for (var i = 0, len = hostKeys.length; i < len; i++) {
    var key = hostKeys[i]
    merged[key] = host[key]
  }

  for (i = 0, len = requestKeys.length; i < len; i++) {
    key = requestKeys[i]
    if (key === 'path') {
      merged.pathname = resolve(merged.pathname, request[key])
    } else if (key === 'querystring' && !!request[key] === true) {
      if (merged.search === '') {
        merged.search = '?' + request[key]
      } else {
        merged.search += '&' + request[key]
      }
    } else {
      merged[key] = request[key]
    }
  }

  merged.path = merged.pathname + merged.search

  return merged
}

// Utility function that converts a URL object into an ordinary
// options object as expected by the http.request and https.request APIs.
// https://github.com/nodejs/node/blob/v11.0.0/lib/internal/url.js#L1324
function urlToOptions (url) {
  var options = {
    protocol: url.protocol,
    hostname: url.hostname.startsWith('[')
      ? url.hostname.slice(1, -1)
      : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: `${url.pathname}${url.search}`,
    href: url.href
  }
  if (url.port !== '') {
    options.port = Number(url.port)
  }
  if (url.username || url.password) {
    options.auth = `${url.username}:${url.password}`
  }
  return options
}

module.exports = Connection
