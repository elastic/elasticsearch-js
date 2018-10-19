'use strict'

const assert = require('assert')
const { Agent: HttpAgent } = require('http')
const { Agent: HttpsAgent } = require('https')
const { resolve } = require('url')
const debug = require('debug')('elasticsearch')
const makeRequest = require('simple-get')

class Connection {
  constructor (opts = {}) {
    assert(opts.host, 'Missing host data')

    this.host = opts.host
    this.ssl = opts.host.ssl || opts.ssl || null
    this.id = opts.id || opts.host.href
    this.deadCount = 0
    this.resurrectTimeout = 0

    this._status = opts.status || Connection.statuses.ALIVE
    this.roles = opts.roles || defaultRoles

    const agentOptions = Object.assign({}, {
      keepAlive: true,
      keepAliveMsecs: 1000,
      maxSockets: Infinity,
      maxFreeSockets: 256,
      timeout: 60000
    }, opts.host.agent || opts.agent)
    this._agent = this.host.protocol === 'http:'
      ? new HttpAgent(agentOptions)
      : new HttpsAgent(Object.assign({}, agentOptions, this.ssl))
  }

  request (params, callback) {
    params.url = resolve(this.host.href, params.path)
    params.agent = this._agent
    debug('Starting a new request', params)
    return makeRequest(params, callback)
  }

  close () {
    debug('Closing connection', this.id)
    this._agent.destroy()
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

module.exports = Connection
