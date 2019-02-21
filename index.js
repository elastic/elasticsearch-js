'use strict'

const { EventEmitter } = require('events')
const debug = require('debug')('elasticsearch')
const Transport = require('./lib/Transport')
const Connection = require('./lib/Connection')
const ConnectionPool = require('./lib/ConnectionPool')
const Serializer = require('./lib/Serializer')
const errors = require('./lib/errors')
const { ConfigurationError } = errors

const kInitialOptions = Symbol('elasticsearchjs-initial-options')
const kChild = Symbol('elasticsearchjs-child')
const kExtensions = Symbol('elasticsearchjs-extensions')

const buildApi = require('./api')

class Client extends EventEmitter {
  constructor (opts = {}) {
    super()
    if (opts.cloud) {
      const { id, username, password } = opts.cloud
      // the cloud id is `cluster-name:base64encodedurl`
      // the url is a string divided by two '$', the first is the cloud url
      // the second the elasticsearch instance, the third the kibana instance
      const cloudUrls = Buffer.from(id.split(':')[1], 'base64').toString().split('$')
      opts.node = `https://${username}:${password}@${cloudUrls[1]}.${cloudUrls[0]}`

      // Cloud has better performances with compression enabled
      // see https://github.com/elastic/elasticsearch-py/pull/704.
      // So unless the user specifies otherwise, we enable compression.
      if (opts.compression == null) opts.compression = 'gzip'
      if (opts.suggestCompression == null) opts.suggestCompression = true
    }

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
      suggestCompression: false,
      compression: false,
      ssl: null,
      agent: null,
      headers: {},
      nodeFilter: null,
      nodeSelector: 'round-robin'
    }, opts)

    this[kInitialOptions] = options
    this[kExtensions] = []

    this.serializer = new options.Serializer()
    this.connectionPool = new options.ConnectionPool({
      pingTimeout: options.pingTimeout,
      resurrectStrategy: options.resurrectStrategy,
      ssl: options.ssl,
      agent: options.agent,
      Connection: options.Connection,
      emit: this.emit.bind(this),
      sniffEnabled: options.sniffInterval !== false ||
                    options.sniffOnStart !== false ||
                    options.sniffOnConnectionFault !== false
    })

    // Add the connections before initialize the Transport
    if (opts[kChild] !== true) {
      this.connectionPool.addConnection(options.node || options.nodes)
    }

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
      suggestCompression: options.suggestCompression,
      compression: options.compression,
      headers: options.headers,
      nodeFilter: options.nodeFilter,
      nodeSelector: options.nodeSelector
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

  extend (name, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = {}
    }

    var [namespace, method] = name.split('.')
    if (method == null) {
      method = namespace
      namespace = null
    }

    if (namespace != null) {
      if (this[namespace] != null && this[namespace][method] != null && opts.force !== true) {
        throw new Error(`The method "${method}" already exists on namespace "${namespace}"`)
      }

      this[namespace] = this[namespace] || {}
      this[namespace][method] = fn({
        makeRequest: this.transport.request.bind(this.transport),
        result: { body: null, statusCode: null, headers: null, warnings: null },
        ConfigurationError
      })
    } else {
      if (this[method] != null && opts.force !== true) {
        throw new Error(`The method "${method}" already exists`)
      }

      this[method] = fn({
        makeRequest: this.transport.request.bind(this.transport),
        result: { body: null, statusCode: null, headers: null, warnings: null },
        ConfigurationError
      })
    }

    this[kExtensions].push({ name, opts, fn })
  }

  child (opts) {
    // Merge the new options with the initial ones
    const initialOptions = Object.assign({}, this[kInitialOptions], opts)
    // Tell to the client that we are creating a child client
    initialOptions[kChild] = true

    const client = new Client(initialOptions)
    // Reuse the same connection pool
    client.connectionPool = this.connectionPool
    client.transport.connectionPool = this.connectionPool
    // Share event listener
    const emitter = this.emit.bind(this)
    client.emit = emitter
    client.connectionPool.emit = emitter
    client.transport.emit = emitter
    client.on = this.on.bind(this)
    // Add parent extensions
    this[kExtensions].forEach(({ name, opts, fn }) => {
      client.extend(name, opts, fn)
    })
    return client
  }

  close (callback) {
    if (callback == null) {
      return new Promise((resolve, reject) => {
        this.close(resolve)
      })
    }
    debug('Closing the client')
    this.connectionPool.empty(callback)
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
