// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const nodeMajor = Number(process.versions.node.split('.')[0])

const { EventEmitter } = require('events')
const { URL } = require('url')
const debug = require('debug')('elasticsearch')
const Transport = require('./lib/Transport')
const Connection = require('./lib/Connection')
const { ConnectionPool, CloudConnectionPool } = require('./lib/pool')
// Helpers works only in Node.js >= 10
const Helpers = nodeMajor < 10 ? /* istanbul ignore next */ null : require('./lib/Helpers')
const Serializer = require('./lib/Serializer')
const errors = require('./lib/errors')
const { ConfigurationError } = errors

const kInitialOptions = Symbol('elasticsearchjs-initial-options')
const kChild = Symbol('elasticsearchjs-child')
const kExtensions = Symbol('elasticsearchjs-extensions')
const kEventEmitter = Symbol('elasticsearchjs-event-emitter')

const buildApi = require('./api')

class Client {
  constructor (opts = {}) {
    if (opts.cloud) {
      const { id, username, password } = opts.cloud
      // the cloud id is `cluster-name:base64encodedurl`
      // the url is a string divided by two '$', the first is the cloud url
      // the second the elasticsearch instance, the third the kibana instance
      const cloudUrls = Buffer.from(id.split(':')[1], 'base64').toString().split('$')

      // TODO: remove username and password here in 8
      if (username && password) {
        opts.auth = Object.assign({}, opts.auth, { username, password })
      }
      opts.node = `https://${cloudUrls[1]}.${cloudUrls[0]}`

      // Cloud has better performances with compression enabled
      // see https://github.com/elastic/elasticsearch-py/pull/704.
      // So unless the user specifies otherwise, we enable compression.
      if (opts.compression == null) opts.compression = 'gzip'
      if (opts.suggestCompression == null) opts.suggestCompression = true
      if (opts.ssl == null ||
         (opts.ssl && opts.ssl.secureProtocol == null)) {
        opts.ssl = opts.ssl || {}
        opts.ssl.secureProtocol = 'TLSv1_2_method'
      }
    }

    if (!opts.node && !opts.nodes) {
      throw new ConfigurationError('Missing node(s) option')
    }

    const checkAuth = getAuth(opts.node || opts.nodes)
    if (checkAuth && checkAuth.username && checkAuth.password) {
      opts.auth = Object.assign({}, opts.auth, { username: checkAuth.username, password: checkAuth.password })
    }

    const options = Object.assign({}, {
      Connection,
      Transport,
      Serializer,
      ConnectionPool: opts.cloud ? CloudConnectionPool : ConnectionPool,
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
      nodeSelector: 'round-robin',
      generateRequestId: null,
      name: 'elasticsearch-js',
      auth: null,
      opaqueIdPrefix: null,
      context: null
    }, opts)

    this[kInitialOptions] = options
    this[kExtensions] = []
    this.name = options.name

    if (opts[kChild] !== undefined) {
      this.serializer = options[kChild].serializer
      this.connectionPool = options[kChild].connectionPool
      this[kEventEmitter] = options[kChild].eventEmitter
    } else {
      this[kEventEmitter] = new EventEmitter()
      this.serializer = new options.Serializer()
      this.connectionPool = new options.ConnectionPool({
        pingTimeout: options.pingTimeout,
        resurrectStrategy: options.resurrectStrategy,
        ssl: options.ssl,
        agent: options.agent,
        Connection: options.Connection,
        auth: options.auth,
        emit: this[kEventEmitter].emit.bind(this[kEventEmitter]),
        sniffEnabled: options.sniffInterval !== false ||
                      options.sniffOnStart !== false ||
                      options.sniffOnConnectionFault !== false
      })
      // Add the connections before initialize the Transport
      this.connectionPool.addConnection(options.node || options.nodes)
    }

    this.transport = new options.Transport({
      emit: this[kEventEmitter].emit.bind(this[kEventEmitter]),
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
      nodeSelector: options.nodeSelector,
      generateRequestId: options.generateRequestId,
      name: options.name,
      opaqueIdPrefix: options.opaqueIdPrefix,
      context: options.context
    })

    /* istanbul ignore else */
    if (Helpers !== null) {
      this.helpers = new Helpers({ client: this, maxRetries: options.maxRetries })
    }

    const apis = buildApi({
      makeRequest: this.transport.request.bind(this.transport),
      result: { body: null, statusCode: null, headers: null, warnings: null },
      ConfigurationError
    })

    const apiNames = Object.keys(apis)
    for (var i = 0, len = apiNames.length; i < len; i++) {
      this[apiNames[i]] = apis[apiNames[i]]
    }
  }

  get emit () {
    return this[kEventEmitter].emit.bind(this[kEventEmitter])
  }

  get on () {
    return this[kEventEmitter].on.bind(this[kEventEmitter])
  }

  get once () {
    return this[kEventEmitter].once.bind(this[kEventEmitter])
  }

  get off () {
    return this[kEventEmitter].off.bind(this[kEventEmitter])
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
    // Pass to the child client the parent instances that cannot be overriden
    initialOptions[kChild] = {
      connectionPool: this.connectionPool,
      serializer: this.serializer,
      eventEmitter: this[kEventEmitter]
    }

    const client = new Client(initialOptions)
    // Add parent extensions
    if (this[kExtensions].length > 0) {
      this[kExtensions].forEach(({ name, opts, fn }) => {
        client.extend(name, opts, fn)
      })
    }
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

function getAuth (node) {
  if (Array.isArray(node)) {
    for (const url of node) {
      const auth = getUsernameAndPassword(url)
      if (auth.username !== '' && auth.password !== '') {
        return auth
      }
    }

    return null
  }

  const auth = getUsernameAndPassword(node)
  if (auth.username !== '' && auth.password !== '') {
    return auth
  }

  return null

  function getUsernameAndPassword (node) {
    /* istanbul ignore else */
    if (typeof node === 'string') {
      const { username, password } = new URL(node)
      return {
        username: decodeURIComponent(username),
        password: decodeURIComponent(password)
      }
    } else if (node.url instanceof URL) {
      return {
        username: decodeURIComponent(node.url.username),
        password: decodeURIComponent(node.url.password)
      }
    }
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
