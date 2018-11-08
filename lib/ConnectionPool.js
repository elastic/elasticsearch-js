'use strict'

const assert = require('assert')
const { URL } = require('url')
const debug = require('debug')('elasticsearch')
const Connection = require('./Connection')
const noop = () => {}

class ConnectionPool {
  constructor (opts = {}) {
    this.connections = new Map()
    this.dead = []
    this.selector = opts.selector
    this._ssl = opts.ssl
    this._agent = opts.agent
    // the resurrect timeout is 60s
    // we multiply it by 2 because the resurrect formula is
    // `Math.pow(resurrectTimeout * 2, deadCount -1)`
    // and we don't need to multiply by 2
    // the resurrectTimeout every time
    this.resurrectTimeout = 1000 * 60 * 2
    // number of consecutive failures after which
    // the timeout doesn't increase
    this.resurrectTimeoutCutoff = 5
    this.pingTimeout = opts.pingTimeout
    this.randomizeHost = opts.randomizeHost === true
    this.nodeFilter = opts.nodeFilter || defaultNodeFilter

    if (typeof opts.nodeSelector === 'function') {
      this.nodeSelector = opts.nodeSelector
    } else if (opts.nodeSelector === 'round-robin') {
      this.nodeSelector = roundRobinSelector()
    } else if (opts.nodeSelector === 'random') {
      this.nodeSelector = randomSelector
    } else {
      this.nodeSelector = roundRobinSelector()
    }

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
   *
   * @param {object} connection
   */
  markAlive (connection) {
    const { id } = connection
    debug(`Marking as 'alive' connection '${id}'`)
    const index = this.dead.indexOf(id)
    if (index > -1) this.dead.splice(index, 1)
    connection.status = Connection.statuses.ALIVE
    connection.deadCount = 0
    connection.resurrectTimeout = 0
  }

  /**
   * Marks a connection as 'dead'.
   * If needed adds the connection to the dead list
   * and then increments the `deadCount`.
   *
   * @param {object} connection
   */
  markDead (connection) {
    const { id } = connection
    debug(`Marking as 'dead' connection '${id}'`)
    if (this.dead.indexOf(id) === -1) {
      this.dead.push(id)
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

    // sort the dead list in ascending order
    // based on the resurrectTimeout
    this.dead.sort((a, b) => {
      const conn1 = this.connections.get(a)
      const conn2 = this.connections.get(b)
      return conn1.resurrectTimeout - conn2.resurrectTimeout
    })
  }

  /**
   * If enabled, tries to resurrect a connection with the given
   * resurrect strategy ('ping', 'optimistic', 'none').
   *
   * @param {number} epoch
   * @param {function} callback (isAlive, connection)
   */
  resurrect (now = Date.now(), callback = noop) {
    if (this.resurrectStrategy === 0 || this.dead.length === 0) {
      callback(null, null)
      return
    }

    // the dead list is sorted in ascending order based on the timeout
    // so the first element will always be the one with the smaller timeout
    const connection = this.connections.get(this.dead[0])
    if (now < connection.resurrectTimeout) {
      debug('Nothing to resurrect')
      return
    }

    const { id } = connection

    // ping strategy
    if (this.resurrectStrategy === 1) {
      connection.request({
        method: 'HEAD',
        path: '/',
        timeout: this.pingTimeout
      }, (err, res) => {
        var isAlive = true
        if (err != null) {
          debug(`Resurrect: connection '${id}' is still dead`)
          this.markDead(connection)
          isAlive = false
        } else {
          debug(`Resurrect: connection '${id}' is now alive`)
          this.markAlive(connection)
        }
        callback(isAlive, connection)
      })
    // optimistic strategy
    } else {
      debug(`Resurrect: optimistic resurrection for connection '${id}'`)
      this.dead.splice(this.dead.indexOf(id), 1)
      connection.status = Connection.statuses.ALIVE
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
    const filter = opts.filter || this.nodeFilter
    const selector = opts.selector || this.nodeSelector

    // TODO: can we cache this?
    const connections = []
    for (var connection of this.connections.values()) {
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
    if (opts.ssl == null) opts.ssl = this._ssl
    if (opts.agent == null) opts.agent = this._agent

    const connection = new Connection(opts)
    debug('Adding a new connection', connection)
    if (this.connections.has(connection.id)) {
      throw new Error(`Connection with id '${connection.id}' is already present`)
    }
    this.connections.set(connection.id, connection)
    return connection
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
    this.dead = []
    return this
  }

  /**
   * Update the ConnectionPool with new connections.
   *
   * @param {array} array of connections
   * @returns {ConnectionPool}
   */
  update (connections) {
    debug('Updating the connection pool')
    for (var i = 0; i < connections.length; i++) {
      const connection = connections[i]
      // if we already have a given connection in the pool
      // we check its status, if is 'alive', we do nothing,
      // if 'dead' we mark it as alive, we do not close the old
      // one to avoid socket issues
      if (this.connections.has(connection.id) === true) {
        debug(`The connection with id '${connection.id}' is already present`)
        const oldConnection = this.connections.get(connection.id)
        if (oldConnection.status === Connection.statuses.DEAD) {
          this.markAlive(oldConnection)
        }
      } else {
        this.addConnection(connection)
      }
    }

    const ids = connections.map(c => c.id)
    // remove all the dead connections and old connections
    for (const connection of this.connections.values()) {
      if (ids.indexOf(connection.id) === -1) {
        this.removeConnection(connection)
      }
    }

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

ConnectionPool.resurrectStrategies = {
  none: 0,
  ping: 1,
  optimistic: 2
}

// https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
// const shuffleArray = arr => arr
//   .map(a => [Math.random(), a])
//   .sort((a, b) => a[0] - b[0])
//   .map(a => a[1])

function defaultNodeFilter (node) {
  // avoid master only nodes
  if (!!node.master === true &&
      !!node.data === false &&
      !!node.ingest === false) {
    return false
  }
  return true
}

function roundRobinSelector () {
  var current = -1
  return function _roundRobinSelector (connections) {
    if (++current >= connections.length) {
      current = 0
    }
    return connections[current]
  }
}

function randomSelector (connections) {
  const index = Math.floor(Math.random() * connections.length)
  return connections[index]
}

module.exports = ConnectionPool
module.exports.internals = { defaultNodeFilter, roundRobinSelector, randomSelector }
