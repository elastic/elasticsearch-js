'use strict'

const { EventEmitter } = require('events')
const Transport = require('./lib/Transport')
const Connection = require('./lib/Connection')
const ConnectionPool = require('./lib/ConnectionPool')
const Serializer = require('./lib/Serializer')
const errors = require('./lib/errors')
const { ConfigurationError } = errors

const buildApi = require('./api')

class Client extends EventEmitter {
  constructor (opts = {}) {
    super()
    if (!opts.node && !opts.nodes) {
      throw new ConfigurationError('Missing node(s) option')
    }

    if (opts.log === true) {
      this.on('request', console.log)
      this.on('response', console.log)
      this.on('error', console.log)
    }

    const options = Object.assign({}, {
      Connection,
      ConnectionPool,
      Transport,
      Serializer,
      maxRetries: 3,
      requestTimeout: 30000,
      pingTimeout: 3000,
      sniffInterval: false,
      sniffOnStart: false,
      sniffEndpoint: '_nodes/_all/http',
      sniffOnConnectionFault: false,
      resurrectStrategy: 'ping',
      randomizeHost: true,
      suggestCompression: false,
      ssl: null,
      agent: null,
      nodeFilter: null,
      nodeWeighter: null,
      nodeSelector: 'round-robin'
    }, opts)

    this.serializer = new options.Serializer()
    this.connectionPool = new options.ConnectionPool({
      pingTimeout: options.pingTimeout,
      resurrectStrategy: options.resurrectStrategy,
      randomizeHost: options.randomizeHost,
      ssl: options.ssl,
      agent: options.agent,
      nodeFilter: options.nodeFilter,
      nodeWeighter: options.nodeWeighter,
      nodeSelector: options.nodeSelector,
      Connection: options.Connection,
      emit: this.emit.bind(this)
    })

    // Add the connections before initialize the Transport
    this.connectionPool.addConnection(options.node || options.nodes)

    this.transport = new options.Transport({
      emit: this.emit.bind(this),
      connectionPool: this.connectionPool,
      serializer: this.serializer,
      maxRetries: options.maxRetries,
      requestTimeout: options.requestTimeout,
      sniffInterval: options.sniffInterval,
      sniffOnStart: options.sniffOnStart,
      sniffOnConnectionFault: options.sniffOnConnectionFault,
      sniffEndpoint: options.sniffEndpoint,
      suggestCompression: options.suggestCompression
    })

    const apis = buildApi({
      makeRequest: this.transport.request.bind(this.transport),
      result: { body: null, statusCode: null, headers: null, warnings: null },
      ConfigurationError
    })

    Object.keys(apis).forEach(api => {
      this[api] = apis[api]
    })
  }

  close (callback) {
    if (callback == null) {
      return new Promise((resolve, reject) => {
        this.close(resolve)
      })
    }
    this.connectionPool.empty()
    callback()
  }
}

const events = {
  RESPONSE: 'response',
  REQUEST: 'request',
  SNIFF: 'sniff',
  RESURRECT: 'resurrect'
}

module.exports = {
  Client,
  Transport,
  ConnectionPool,
  Connection,
  Serializer,
  events,
  errors
}
