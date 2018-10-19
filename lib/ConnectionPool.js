'use strict'

const { URL } = require('url')
const debug = require('debug')('elasticsearch')
const Connection = require('./Connection')

class ConnectionPool {
  constructor (opts = {}) {
    this.connections = new Map()
    this.alive = []
    this.dead = []
    this.selector = opts.selector
    this.sll = opts.sll
    // the resurrect timeout is 60s
    // we multiply it by 2 because the resurrect formula is
    // `Math.pow(resurrectTimeout * 2, deadCount -1)`
    // and we don't need to multiply by 2
    // the resurrectTimeout every time
    this.resurrectTimeout = 1000 * 60 * 2
    // number of consecutive failures after which
    // the timeout doesn't increase
    this.resurrectTimeoutCutoff = 5
  }

  /**
   * Marks a connection as 'alive'.
   * If needed moves the connection from the dead list
   * to the alive list and then resets the `deadCount`.
   *
   * @param {object} connection
   */
  markAlive (connection) {
    const { id } = connection
    debug(`Marking as 'alive' connection '${id}'`)
    if (this.alive.indexOf(id) === -1) {
      this.alive.push(id)
      const index = this.dead.indexOf(id)
      if (index > -1) this.dead.splice(index, 1)
    }
    connection.status = Connection.statuses.ALIVE
    connection.deadCount = 0
    connection.resurrectTimeout = 0
    this.connections.set(id, connection)
  }

  /**
   * Marks a connection as 'dead'.
   * If needed moves the connection from the alive list
   * to the dead list and then increments the `deadCount`.
   *
   * @param {object} connection
   */
  markDead (connection) {
    const { id } = connection
    debug(`Marking as 'dead' connection '${id}'`)
    if (this.dead.indexOf(id) === -1) {
      this.dead.push(id)
      const index = this.alive.indexOf(id)
      if (index > -1) this.alive.splice(index, 1)
    }
    connection.status = Connection.statuses.DEAD
    connection.deadCount++
    // resurrectTimeout formula:
    // `Math.pow(resurrectTimeout * 2, deadCount -1)`
    // we don't need to multiply the resurrectTimeout by 2
    // every time, it is cached during the initialization
    connection.resurrectTimeout = Date.now() + Math.pow(
      this.resurrectTimeout,
      Math.min(
        connection.deadCount - 1,
        this.resurrectTimeoutCutoff
      )
    )
    this.connections.set(id, connection)

    // sort the dead list in ascending order
    // based on the resurrectTimeout
    this.dead.sort((a, b) => {
      const conn1 = this.connections.get(a)
      const conn2 = this.connections.get(b)
      return conn1.resurrectTimeout - conn2.resurrectTimeout
    })
  }

  /**
   * Tries to resurrect a connection if the `resurrectTimeout`
   * has been reached, if so, it moves the connection to the
   * alive list without resetting the `deadCount` or the `resurrectTimeout`
   *
   * @param {number} epoch
   * @returns {object} connection
   */
  resurrect (now = Date.now()) {
    if (this.dead.length === 0) return

    // the dead list is sorted in ascending order based on the timeout
    // so the first element will always be the one with the smalles timeout
    const connection = this.connections.get(this.dead[0])
    if (now < connection.resurrectTimeout) {
      debug('Nothing to resurrect')
      return
    }

    const { id } = connection
    debug(`Trying resurrect connection '${id}'`)
    this.alive.push(id)
    this.dead.splice(this.dead.indexOf(id), 1)

    connection.status = Connection.statuses.ALIVE
    this.connections.set(id, connection)
    return connection
  }

  /**
   * Returns an alive connection if present,
   * otherwise returns null.
   * It uses the selector to choose which
   * connection return.
   *
   * @returns {object|null} connection
   */
  getConnection () {
    if (this.alive.length === 0) {
      return null
    }

    const id = this.selector.select(this.alive)
    return this.connections.get(id)
  }

  /**
   * Adds a new connection to the pool.
   *
   * @param {object|string} host
   * @returns {ConnectionPool}
   */
  addConnection (opts) {
    if (Array.isArray(opts)) {
      opts.forEach(o => this.addConnection(o))
      return
    }

    if (typeof opts === 'string') {
      opts = this.urlToHost(opts)
    }
    Object.assign(opts, this.ssl)
    const connection = new Connection(opts)
    debug('Adding a new connection', connection)
    this.connections.set(connection.id, connection)
    this.alive.push(connection.id)
    return this
  }

  /**
   * Removes a new connection to the pool.
   *
   * @param {object} connection
   * @returns {ConnectionPool}
   */
  removeConnection (connection) {
    debug('Removing connection', connection)
    connection.close()
    const { id } = connection
    this.connections.delete(id)
    var index = this.dead.indexOf(id)
    if (index > -1) this.dead.splice(index, 1)
    index = this.alive.indexOf(id)
    if (index > -1) this.alive.splice(index, 1)
    return this
  }

  /**
   * Empties the connection pool.
   *
   * @returns {ConnectionPool}
   */
  empty () {
    debug('Emptying the connection pool')
    this.connections.forEach(connection => {
      connection.close()
    })
    this.connections = new Map()
    this.alive = []
    this.dead = []
    return this
  }

  /**
   * Transforms the nodes objects to a host object.
   *
   * @param {object} nodes
   * @returns {array} hosts
   */
  nodesToHost (nodes) {
    const ids = Object.keys(nodes)
    const hosts = []

    for (var i = 0, len = ids.length; i < len; i++) {
      const node = nodes[ids[i]]
      // If there is no protocol in
      // the `publish_address` new URL wil throw
      var address = node.http.publish_address
      address = address.slice(0, 4) === 'http'
        ? address
        : 'http://' + address
      hosts.push({
        host: new URL(address),
        id: ids[i],
        roles: node.roles.reduce((acc, role) => {
          acc[role] = true
          return acc
        }, {})
      })
    }

    return hosts
  }

  /**
   * Transforms an url string to a host object
   *
   * @param {string} url
   * @returns {object} host
   */
  urlToHost (url) {
    return {
      host: new URL(url)
    }
  }
}

module.exports = ConnectionPool
