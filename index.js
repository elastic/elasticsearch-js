'use strict'

const { EventEmitter } = require('events')
const debug = require('debug')('elasticsearch')
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
    if (opts.cloud) {
      const { id, username, password } = opts.cloud
      // the cloud id is `cluster-name:base64encodedurl`
      // the url is a string divided by two '$', the first is the cloud url
      // the second the elasticsearch instance, the third the kibana instance
      const cloudUrls = Buffer.from(id.split(':')[1], 'base64').toString().split('$')
      opts.node = `https://${username}:${password}@${cloudUrls[1]}.${cloudUrls[0]}`
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
      nodeWeighter: null,
      nodeSelector: 'round-robin'
    }, opts)

    this.serializer = new options.Serializer()
    this.connectionPool = new options.ConnectionPool({
      pingTimeout: options.pingTimeout,
      resurrectStrategy: options.resurrectStrategy,
      ssl: options.ssl,
      agent: options.agent,
      nodeFilter: options.nodeFilter,
      nodeWeighter: options.nodeWeighter,
      nodeSelector: options.nodeSelector,
      Connection: options.Connection,
      emit: this.emit.bind(this),
      sniffEnabled: options.sniffInterval !== false ||
                    options.sniffOnStart !== false ||
                    options.sniffOnConnectionFault !== false
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
      suggestCompression: options.suggestCompression,
      compression: options.compression,
      headers: options.headers
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
