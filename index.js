'use strict'

const { EventEmitter } = require('events')
const Transport = require('./lib/Transport')
const Connection = require('./lib/Connection')
const ConnectionPool = require('./lib/ConnectionPool')
const Serializer = require('./lib/Serializer')
const symbols = require('./lib/symbols')
const { ConfigurationError } = require('./lib/errors')

const buildApi = require('./api')

const {
  kTransport,
  kConnectionPool,
  kSerializer
} = symbols

class Client extends EventEmitter {
  constructor (opts = {}) {
    super()
    if (!opts.host) {
      throw new ConfigurationError('Missing host option')
    }

    if (opts.log === true) {
      this.on('request', console.log)
      this.on('response', console.log)
      this.on('error', console.log)
    }

    // The logging is exposed via events, which the user can
    // listen to and log the message its preferred way
    // we add a fake listener to the error event to avoid
    // the "unhandled error event" error.
    this.on('error', () => {})

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

    this[kSerializer] = new options.Serializer()
    this[kConnectionPool] = new options.ConnectionPool({
      pingTimeout: opts.pingTimeout,
      resurrectStrategy: opts.resurrectStrategy,
      randomizeHost: opts.randomizeHost,
      ssl: options.ssl,
      agent: null,
      nodeFilter: opts.nodeFilter,
      nodeWeighter: opts.nodeWeighter,
      nodeSelector: opts.nodeSelector
    })

    // Add the connections before initialize the Transport
    this[kConnectionPool].addConnection(options.host)

    this[kTransport] = new options.Transport({
      emit: this.emit.bind(this),
      connectionPool: this[kConnectionPool],
      serializer: this[kSerializer],
      maxRetries: options.maxRetries,
      requestTimeout: options.requestTimeout,
      sniffInterval: options.sniffInterval,
      sniffOnStart: options.sniffOnStart,
      sniffOnConnectionFault: options.sniffOnConnectionFault,
      sniffEndpoint: options.sniffEndpoint,
      suggestCompression: options.suggestCompression
    })

    this.request = this[kTransport].request.bind(this[kTransport])

    const apis = buildApi({
      makeRequest: this[kTransport].request.bind(this[kTransport]),
      result: { body: null, statusCode: null, headers: null, warnings: null },
      ConfigurationError
    })

    Object.keys(apis).forEach(api => {
      this[api] = apis[api]
    })
  }
}

Client.events = {
  RESPONSE: 'response',
  REQUEST: 'request',
  ERROR: 'error'
}

module.exports = {
  Client,
  Transport,
  ConnectionPool,
  Serializer,
  symbols
}
