// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const BaseConnectionPool = require('./BaseConnectionPool')
const assert = require('assert')
const debug = require('debug')('elasticsearch')
const Connection = require('../Connection')
const noop = () => {}

class ConnectionPool extends BaseConnectionPool {
  constructor (opts = {}) {
    super(opts)

    this.dead = []
    // the resurrect timeout is 60s
    this.resurrectTimeout = 1000 * 60
    // number of consecutive failures after which
    // the timeout doesn't increase
    this.resurrectTimeoutCutoff = 5
    this.pingTimeout = opts.pingTimeout
    this._sniffEnabled = opts.sniffEnabled || false

    const resurrectStrategy = opts.resurrectStrategy || 'ping'
    this.resurrectStrategy = ConnectionPool.resurrectStrategies[resurrectStrategy]
    assert(
      this.resurrectStrategy != null,
      `Invalid resurrection strategy: '${resurrectStrategy}'`
    )
  }

  /**
   * Marks a connection as 'alive'.
   * If needed removes the connection from the dead list
   * and then resets the `deadCount`.
   * If sniffing is not enabled and there is only
   * one node, this method is a noop.
   *
   * @param {object} connection
   */
  markAlive (connection) {
    if (this._sniffEnabled === false && this.size === 1) return this
    const { id } = connection
    debug(`Marking as 'alive' connection '${id}'`)
    const index = this.dead.indexOf(id)
    if (index > -1) this.dead.splice(index, 1)
    connection.status = Connection.statuses.ALIVE
    connection.deadCount = 0
    connection.resurrectTimeout = 0
    return this
  }

  /**
   * Marks a connection as 'dead'.
   * If needed adds the connection to the dead list
   * and then increments the `deadCount`.
   * If sniffing is not enabled and there is only
   * one node, this method is a noop.
   *
   * @param {object} connection
   */
  markDead (connection) {
    if (this._sniffEnabled === false && this.size === 1) return this
    const { id } = connection
    debug(`Marking as 'dead' connection '${id}'`)
    if (this.dead.indexOf(id) === -1) {
      this.dead.push(id)
    }
    connection.status = Connection.statuses.DEAD
    connection.deadCount++
    // resurrectTimeout formula:
    // `resurrectTimeout * 2 ** min(deadCount - 1, resurrectTimeoutCutoff)`
    connection.resurrectTimeout = Date.now() + this.resurrectTimeout * Math.pow(
      2, Math.min(connection.deadCount - 1, this.resurrectTimeoutCutoff)
    )

    // sort the dead list in ascending order
    // based on the resurrectTimeout
    this.dead.sort((a, b) => {
      const conn1 = this.connections.find(c => c.id === a)
      const conn2 = this.connections.find(c => c.id === b)
      return conn1.resurrectTimeout - conn2.resurrectTimeout
    })

    return this
  }

  /**
   * If enabled, tries to resurrect a connection with the given
   * resurrect strategy ('ping', 'optimistic', 'none').
   *
   * @param {object} { now, requestId }
   * @param {function} callback (isAlive, connection)
   */
  resurrect (opts, callback = noop) {
    if (this.resurrectStrategy === 0 || this.dead.length === 0) {
      debug('Nothing to resurrect')
      callback(null, null)
      return
    }

    // the dead list is sorted in ascending order based on the timeout
    // so the first element will always be the one with the smaller timeout
    const connection = this.connections.find(c => c.id === this.dead[0])
    if ((opts.now || Date.now()) < connection.resurrectTimeout) {
      debug('Nothing to resurrect')
      callback(null, null)
      return
    }

    const { id } = connection

    // ping strategy
    if (this.resurrectStrategy === 1) {
      connection.request({
        method: 'HEAD',
        path: '/',
        timeout: this.pingTimeout
      }, (err, response) => {
        var isAlive = true
        const statusCode = response !== null ? response.statusCode : 0
        if (err != null ||
           (statusCode === 502 || statusCode === 503 || statusCode === 504)) {
          debug(`Resurrect: connection '${id}' is still dead`)
          this.markDead(connection)
          isAlive = false
        } else {
          debug(`Resurrect: connection '${id}' is now alive`)
          this.markAlive(connection)
        }
        this.emit('resurrect', null, {
          strategy: 'ping',
          name: opts.name,
          request: { id: opts.requestId },
          isAlive,
          connection
        })
        callback(isAlive, connection)
      })
    // optimistic strategy
    } else {
      debug(`Resurrect: optimistic resurrection for connection '${id}'`)
      this.dead.splice(this.dead.indexOf(id), 1)
      connection.status = Connection.statuses.ALIVE
      this.emit('resurrect', null, {
        strategy: 'optimistic',
        name: opts.name,
        request: { id: opts.requestId },
        isAlive: true,
        connection
      })
      // eslint-disable-next-line standard/no-callback-literal
      callback(true, connection)
    }
  }

  /**
   * Returns an alive connection if present,
   * otherwise returns null.
   * By default it filters the `master` only nodes.
   * It uses the selector to choose which
   * connection return.
   *
   * @param {object} options (filter and selector)
   * @returns {object|null} connection
   */
  getConnection (opts = {}) {
    const filter = opts.filter || (() => true)
    const selector = opts.selector || (c => c[0])

    this.resurrect({
      now: opts.now,
      requestId: opts.requestId,
      name: opts.name
    })

    // TODO: can we cache this?
    const connections = []
    for (var i = 0; i < this.size; i++) {
      const connection = this.connections[i]
      if (connection.status === Connection.statuses.ALIVE) {
        if (filter(connection) === true) {
          connections.push(connection)
        }
      }
    }

    if (connections.length === 0) return null

    return selector(connections)
  }

  /**
   * Empties the connection pool.
   *
   * @returns {ConnectionPool}
   */
  empty (callback) {
    super.empty(() => {
      this.dead = []
      callback()
    })
  }

  /**
   * Update the ConnectionPool with new connections.
   *
   * @param {array} array of connections
   * @returns {ConnectionPool}
   */
  update (connections) {
    super.update(connections)

    for (var i = 0; i < this.dead.length; i++) {
      if (this.connections.find(c => c.id === this.dead[i]) === undefined) {
        this.dead.splice(i, 1)
      }
    }

    return this
  }
}

ConnectionPool.resurrectStrategies = {
  none: 0,
  ping: 1,
  optimistic: 2
}

module.exports = ConnectionPool
