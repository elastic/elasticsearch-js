'use strict'

const { EventEmitter } = require('events')
const Transport = require('./lib/Transport')
const Connection = require('./lib/Connection')
const ConnectionPool = require('./lib/ConnectionPool')
const Serializer = require('./lib/Serializer')
const selectors = require('./lib/Selectors')
const symbols = require('./lib/symbols')
const { BadConfigurationError } = require('./lib/errors')

// const buildApi = require('../monorepo/packages/es-api-6')

const {
  kTransport,
  kConnectionPool,
  kSerializer,
  kSelector
} = symbols

class Client extends EventEmitter {
  constructor (opts = {}) {
    super()
    if (!opts.host) {
      throw new BadConfigurationError('Missing host option')
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

    const Selector = selectors.RoundRobinSelector
    const options = Object.assign({}, {
      Connection,
      ConnectionPool,
      Transport,
      Serializer,
      Selector,
      maxRetries: 3,
      requestTimeout: 30000,
      pingTimeout: 3000,
      sniffInterval: false,
      sniffOnStart: false,
      sniffEndpoint: '_nodes/_all/http',
      sniffOnConnectionFault: false,
      resurrectStrategy: 'ping',
      ssl: null,
      agent: null
    }, opts)

    this[kSelector] = new options.Selector()
    this[kSerializer] = new options.Serializer()
    this[kConnectionPool] = new options.ConnectionPool({
      pingTimeout: opts.pingTimeout,
      resurrectStrategy: opts.resurrectStrategy,
      selector: this[kSelector],
      ssl: options.ssl,
      agent: null
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
      sniffEndpoint: options.sniffEndpoint
    })

    this.request = this[kTransport].request.bind(this[kTransport])

    // const apis = buildApi({
    //   makeRequest: this[kTransport].request.bind(this[kTransport])
    // })

    // Object.keys(apis).forEach(api => {
    //   this[api] = apis[api]
    // })

  }
}

module.exports = {
  Client,
  Transport,
  ConnectionPool,
  Serializer,
  selectors,
  symbols
}
