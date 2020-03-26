/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

'use strict'

const debug = require('debug')('elasticsearch')
const os = require('os')
const once = require('once')
const { createGzip } = require('zlib')
const intoStream = require('into-stream')
const ms = require('ms')
const {
  ConnectionError,
  TimeoutError,
  NoLivingConnectionsError,
  ResponseError,
  ConfigurationError
} = require('./errors')

const noop = () => {}

const clientVersion = require('../package.json').version
const userAgent = `elasticsearch-js/${clientVersion} (${os.platform()} ${os.release()}-${os.arch()}; Node.js ${process.version})`

class Transport {
  constructor (opts = {}) {
    if (typeof opts.compression === 'string' && opts.compression !== 'gzip') {
      throw new ConfigurationError(`Invalid compression: '${opts.compression}'`)
    }
    this.emit = opts.emit
    this.connectionPool = opts.connectionPool
    this.serializer = opts.serializer
    this.maxRetries = opts.maxRetries
    this.requestTimeout = toMs(opts.requestTimeout)
    this.suggestCompression = opts.suggestCompression === true
    this.compression = opts.compression || false
    this.headers = Object.assign({}, { 'User-Agent': userAgent }, opts.headers)
    this.sniffInterval = opts.sniffInterval
    this.sniffOnConnectionFault = opts.sniffOnConnectionFault
    this.sniffEndpoint = opts.sniffEndpoint
    this.generateRequestId = opts.generateRequestId || generateRequestId()
    this.name = opts.name
    this.opaqueIdPrefix = opts.opaqueIdPrefix

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

    this._sniffEnabled = typeof this.sniffInterval === 'number'
    this._nextSniff = this._sniffEnabled ? (Date.now() + this.sniffInterval) : 0
    this._isSniffing = false

    if (opts.sniffOnStart === true) {
      this.sniff({ reason: Transport.sniffReasons.SNIFF_ON_START })
    }
  }

  request (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        this.request(params, options, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    }

    callback = once(callback)
    const meta = {
      context: options.context || null,
      request: {
        params: null,
        options: null,
        id: options.id || this.generateRequestId(params, options)
      },
      name: this.name,
      connection: null,
      attempts: 0,
      aborted: false
    }

    const result = {
      body: null,
      statusCode: null,
      headers: null,
      warnings: options.warnings || null,
      meta
    }

    const maxRetries = options.maxRetries || this.maxRetries
    const compression = options.compression || this.compression
    var request = { abort: noop }

    const makeRequest = () => {
      if (meta.aborted === true) return
      meta.connection = this.getConnection({ requestId: meta.request.id })
      if (meta.connection == null) {
        return callback(new NoLivingConnectionsError(), result)
      }
      // TODO: make this assignment FAST
      const headers = Object.assign({}, this.headers, options.headers)

      if (options.opaqueId !== undefined) {
        headers['X-Opaque-Id'] = this.opaqueIdPrefix !== null
          ? this.opaqueIdPrefix + options.opaqueId
          : options.opaqueId
      }

      // handle json body
      if (params.body != null) {
        if (shouldSerialize(params.body) === true) {
          try {
            params.body = this.serializer.serialize(params.body)
          } catch (err) {
            return callback(err, result)
          }
        }

        if (params.body !== '') {
          headers['Content-Type'] = headers['Content-Type'] || 'application/json'
          if (compression === 'gzip') {
            if (isStream(params.body) === false) {
              params.body = intoStream(params.body).pipe(createGzip())
            } else {
              params.body = params.body.pipe(createGzip())
            }
            headers['Content-Encoding'] = compression
          }
        }

        if (isStream(params.body) === false) {
          headers['Content-Length'] = '' + Buffer.byteLength(params.body)
        }
      // handle ndjson body
      } else if (params.bulkBody != null) {
        if (shouldSerialize(params.bulkBody) === true) {
          try {
            params.body = this.serializer.ndserialize(params.bulkBody)
          } catch (err) {
            return callback(err, result)
          }
        } else {
          params.body = params.bulkBody
        }
        headers['Content-Type'] = headers['Content-Type'] || 'application/x-ndjson'
        if (isStream(params.body) === false) {
          headers['Content-Length'] = '' + Buffer.byteLength(params.body)
        }
      }

      if (this.suggestCompression === true) {
        headers['Accept-Encoding'] = 'gzip,deflate'
      }

      params.headers = headers
      // serializes the querystring
      if (options.querystring == null) {
        params.querystring = this.serializer.qserialize(params.querystring)
      } else {
        params.querystring = this.serializer.qserialize(
          Object.assign({}, params.querystring, options.querystring)
        )
      }

      meta.request.params = params
      meta.request.options = options
      this.emit('request', null, result)

      // handles request timeout
      params.timeout = toMs(options.requestTimeout || this.requestTimeout)
      if (options.asStream === true) params.asStream = true
      // perform the actual http request
      return meta.connection.request(params, onResponse)
    }

    const onResponse = (err, response) => {
      if (err !== null) {
        // if there is an error in the connection
        // let's mark the connection as dead
        this.connectionPool.markDead(meta.connection)

        if (this.sniffOnConnectionFault === true) {
          this.sniff({
            reason: Transport.sniffReasons.SNIFF_ON_CONNECTION_FAULT,
            requestId: meta.request.id
          })
        }

        // retry logic
        if (meta.attempts < maxRetries) {
          meta.attempts++
          debug(`Retrying request, there are still ${maxRetries - meta.attempts} attempts`, params)
          request = makeRequest(params, callback)
          return
        }

        const error = err instanceof TimeoutError
          ? err
          : new ConnectionError(err.message, result)

        if (err.name === 'TimeoutError') {
          err.meta = result
        }

        this.emit('response', error, result)
        return callback(error, result)
      }

      const { statusCode, headers } = response
      result.statusCode = statusCode
      result.headers = headers
      if (headers['warning'] != null) {
        result.warnings = result.warnings || []
        // split the string over the commas not inside quotes
        result.warnings.push.apply(result.warnings, headers['warning'].split(/(?!\B"[^"]*),(?![^"]*"\B)/))
      }

      if (options.asStream === true) {
        result.body = response
        this.emit('response', null, result)
        callback(null, result)
        return
      }

      var payload = ''
      // collect the payload
      response.setEncoding('utf8')
      response.on('data', chunk => { payload += chunk })
      /* istanbul ignore next */
      response.on('error', err => {
        const error = new ConnectionError(err.message, result)
        this.emit('response', error, result)
        callback(error, result)
      })
      response.on('end', () => {
        const isHead = params.method === 'HEAD'
        // we should attempt the payload deserialization only if:
        //    - a `content-type` is defined and is equal to `application/json`
        //    - the request is not a HEAD request
        //    - the payload is not an empty string
        if (headers['content-type'] != null &&
            headers['content-type'].indexOf('application/json') > -1 &&
            isHead === false &&
            payload !== ''
        ) {
          try {
            result.body = this.serializer.deserialize(payload)
          } catch (err) {
            this.emit('response', err, result)
            return callback(err, result)
          }
        } else {
          // cast to boolean if the request method was HEAD
          result.body = isHead === true ? true : payload
        }

        // we should ignore the statusCode if the user has configured the `ignore` field with
        // the statusCode we just got or if the request method is HEAD and the statusCode is 404
        const ignoreStatusCode = (Array.isArray(options.ignore) && options.ignore.indexOf(statusCode) > -1) ||
          (isHead === true && statusCode === 404)

        if (ignoreStatusCode === false &&
           (statusCode === 502 || statusCode === 503 || statusCode === 504)) {
          // if the statusCode is 502/3/4 we should run our retry strategy
          // and mark the connection as dead
          this.connectionPool.markDead(meta.connection)
          // retry logic (we shoukd not retry on "429 - Too Many Requests")
          if (meta.attempts < maxRetries && statusCode !== 429) {
            meta.attempts++
            debug(`Retrying request, there are still ${maxRetries - meta.attempts} attempts`, params)
            request = makeRequest(params, callback)
            return
          }
        } else {
          // everything has worked as expected, let's mark
          // the connection as alive (or confirm it)
          this.connectionPool.markAlive(meta.connection)
        }

        if (ignoreStatusCode === false && statusCode >= 400) {
          const error = new ResponseError(result)
          this.emit('response', error, result)
          callback(error, result)
        } else {
          // cast to boolean if the request method was HEAD
          if (isHead === true && statusCode === 404) {
            result.body = false
          }
          this.emit('response', null, result)
          callback(null, result)
        }
      })
    }

    request = makeRequest()

    return {
      abort: () => {
        meta.aborted = true
        request.abort()
        debug('Aborting request', params)
      }
    }
  }

  getConnection (opts) {
    const now = Date.now()
    if (this._sniffEnabled === true && now > this._nextSniff) {
      this.sniff({ reason: Transport.sniffReasons.SNIFF_INTERVAL, requestId: opts.requestId })
    }
    return this.connectionPool.getConnection({
      filter: this.nodeFilter,
      selector: this.nodeSelector,
      requestId: opts.requestId,
      name: this.name,
      now
    })
  }

  sniff (opts, callback = noop) {
    if (this._isSniffing === true) return
    this._isSniffing = true
    debug('Started sniffing request')

    if (typeof opts === 'function') {
      callback = opts
      opts = { reason: Transport.sniffReasons.DEFAULT }
    }

    const { reason } = opts

    const request = {
      method: 'GET',
      path: this.sniffEndpoint
    }

    this.request(request, { id: opts.requestId }, (err, result) => {
      this._isSniffing = false
      if (this._sniffEnabled === true) {
        this._nextSniff = Date.now() + this.sniffInterval
      }

      if (err != null) {
        debug('Sniffing errored', err)
        result.meta.sniff = { hosts: [], reason }
        this.emit('sniff', err, result)
        return callback(err)
      }

      debug('Sniffing ended successfully', result.body)
      const protocol = result.meta.connection.url.protocol || 'http:'
      const hosts = this.connectionPool.nodesToHost(result.body.nodes, protocol)
      this.connectionPool.update(hosts)

      result.meta.sniff = { hosts, reason }
      this.emit('sniff', null, result)
      callback(null, hosts)
    })
  }
}

Transport.sniffReasons = {
  SNIFF_ON_START: 'sniff-on-start',
  SNIFF_INTERVAL: 'sniff-interval',
  SNIFF_ON_CONNECTION_FAULT: 'sniff-on-connection-fault',
  // TODO: find a better name
  DEFAULT: 'default'
}

function toMs (time) {
  if (typeof time === 'string') {
    return ms(time)
  }
  return time
}

function shouldSerialize (obj) {
  return typeof obj !== 'string' &&
         typeof obj.pipe !== 'function' &&
         Buffer.isBuffer(obj) === false
}

function isStream (obj) {
  return typeof obj.pipe === 'function'
}

function defaultNodeFilter (node) {
  // avoid master only nodes
  if (node.roles.master === true &&
      node.roles.data === false &&
      node.roles.ingest === false) {
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

function generateRequestId () {
  var maxInt = 2147483647
  var nextReqId = 0
  return function genReqId (params, options) {
    return (nextReqId = (nextReqId + 1) & maxInt)
  }
}
module.exports = Transport
module.exports.internals = { defaultNodeFilter, roundRobinSelector, randomSelector, generateRequestId }
