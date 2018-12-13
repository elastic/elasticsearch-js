'use strict'

const debug = require('debug')('elasticsearch')
const once = require('once')
const ms = require('ms')
const {
  ConnectionError,
  TimeoutError,
  NoLivingConnectionsError,
  ResponseError
} = require('./errors')

const noop = () => {}

class Transport {
  constructor (opts = {}) {
    this.emit = opts.emit
    this.connectionPool = opts.connectionPool
    this.serializer = opts.serializer
    this.maxRetries = opts.maxRetries
    this.requestTimeout = toMs(opts.requestTimeout)
    this.suggestCompression = opts.suggestCompression === true
    this.sniffInterval = opts.sniffInterval
    this.sniffOnConnectionFault = opts.sniffOnConnectionFault
    this.sniffEndpoint = opts.sniffEndpoint

    this._sniffEnabled = typeof this.sniffInterval === 'number'
    this._nextSniff = this._sniffEnabled ? (Date.now() + this.sniffInterval) : 0
    this._isSniffing = false

    if (opts.sniffOnStart === true) {
      this.sniff(Transport.sniffReasons.SNIFF_ON_START)
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
    // TODO: return in the result the metadata
    const meta = {
      connection: null,
      request: null,
      response: null,
      attempts: 0,
      aborted: false
    }
    const result = {
      body: null,
      statusCode: null,
      headers: null,
      warnings: null
    }
    const maxRetries = options.maxRetries || this.maxRetries
    var request = { abort: noop }

    const makeRequest = () => {
      if (meta.aborted === true) return
      meta.connection = this.getConnection()
      if (meta.connection === null) {
        return callback(new NoLivingConnectionsError('There are not living connections'), result)
      }

      const headers = options.headers || {}
      // handle json body
      if (params.body != null) {
        if (shouldSerialize(params.body) === true) {
          try {
            params.body = this.serializer.serialize(params.body)
          } catch (err) {
            return callback(err, result)
          }
        }
        headers['Content-Type'] = 'application/json'
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
        headers['Content-Type'] = 'application/x-ndjson'
        if (isStream(params.body) === false) {
          headers['Content-Length'] = '' + Buffer.byteLength(params.body)
        }
      }

      if (this.suggestCompression === true) {
        headers['Accept-Encoding'] = 'gzip,deflate'
      }

      params.headers = headers
      // serializes the querystring
      params.querystring = this.serializer.qserialize(params.querystring)
      // handles request timeout
      params.timeout = toMs(options.requestTimeout || this.requestTimeout)

      meta.request = params
      this.emit('request', null, meta)

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
          this.sniff(Transport.sniffReasons.SNIFF_ON_CONNECTION_FAULT)
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
          : new ConnectionError(err.message, params)

        this.emit('response', error, meta)
        return callback(error, result)
      }

      const { statusCode, headers } = response
      result.statusCode = statusCode
      result.headers = headers
      if (headers['warning'] != null) {
        // split the string over the commas not inside quotes
        result.warnings = headers['warning'].split(/(?!\B"[^"]*),(?![^"]*"\B)/)
      }

      if (options.asStream === true) {
        result.body = response
        meta.response = result
        this.emit('response', null, meta)
        callback(null, result)
        return
      }

      var payload = ''
      // collect the payload
      response.setEncoding('utf8')
      response.on('data', chunk => { payload += chunk })
      response.on('error', err => {
        const error = new ConnectionError(err.message, params)
        this.emit('response', error, meta)
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
            this.emit('response', err, meta)
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
          // retry logic
          if (meta.attempts < maxRetries) {
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

        meta.response = result
        if (ignoreStatusCode === false && statusCode >= 400) {
          const error = new ResponseError(result)
          this.emit('response', error, meta)
          callback(error, result)
        } else {
          // cast to boolean if the request method was HEAD
          if (isHead === true && statusCode === 404) {
            result.body = false
          }
          this.emit('response', null, meta)
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

  getConnection () {
    const now = Date.now()
    if (this._sniffEnabled === true && now > this._nextSniff) {
      this.sniff(Transport.sniffReasons.SNIFF_INTERVAL)
    }
    this.connectionPool.resurrect(now)
    return this.connectionPool.getConnection()
  }

  sniff (reason = Transport.sniffReasons.DEFAULT, callback = noop) {
    if (this._isSniffing === true) return
    this._isSniffing = true
    debug('Started sniffing request')

    if (typeof reason === 'function') {
      callback = reason
      reason = Transport.sniffReasons.DEFAULT
    }

    const request = {
      method: 'GET',
      path: this.sniffEndpoint
    }

    this.request(request, (err, result) => {
      this._isSniffing = false
      if (this._sniffEnabled === true) {
        this._nextSniff = Date.now() + this.sniffInterval
      }

      if (err != null) {
        debug('Sniffing errored', err)
        this.emit('sniff', err, { hosts: [], reason })
        return callback(err)
      }

      debug('Sniffing ended successfully', result.body)
      const hosts = this.connectionPool.nodesToHost(result.body.nodes)
      this.connectionPool.update(hosts)

      this.emit('sniff', null, { hosts, reason })
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

module.exports = Transport
