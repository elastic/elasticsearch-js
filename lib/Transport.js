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
const kRemainingAttempts = Symbol('elasticsearch-remaining-attempts')

class Transport {
  constructor (opts = {}) {
    this.emit = opts.emit
    this.connectionPool = opts.connectionPool
    this.serializer = opts.serializer
    this.maxRetries = opts.maxRetries
    this.requestTimeout = toMs(opts.requestTimeout)
    this.sniffInterval = opts.sniffInterval
    this.sniffOnConnectionFault = opts.sniffOnConnectionFault
    this.sniffEndpoint = opts.sniffEndpoint

    this._sniffEnabled = typeof this.sniffInterval === 'number'
    this._nextSniff = this._sniffEnabled ? (Date.now() + this.sniffInterval) : 0
    this._isSniffing = false

    if (opts.sniffOnStart === true) {
      this.sniff()
    }
  }

  request (params, callback) {
    callback = once(callback)
    const result = { body: null, statusCode: null, headers: null }
    const attempts = params[kRemainingAttempts] || params.maxRetries || this.maxRetries
    const connection = this.getConnection()
    if (connection === null) {
      return callback(new NoLivingConnectionsError('There are not living connections'), result)
    }

    // handle json body
    if (params.body != null) {
      if (typeof params.body !== 'string') {
        try {
          params.body = this.serializer.serialize(params.body)
        } catch (err) {
          return callback(err, result)
        }
      }
      params.headers = params.headers || {}
      params.headers['Content-Type'] = 'application/json'
      params.headers['Content-Length'] = '' + Buffer.byteLength(params.body)
    // handle ndjson body
    } else if (params.bulkBody != null) {
      if (typeof params.bulkBody !== 'string') {
        try {
          params.body = this.serializer.ndserialize(params.bulkBody)
        } catch (err) {
          return callback(err, result)
        }
      } else {
        params.body = params.bulkBody
      }
      params.headers = params.headers || {}
      params.headers['Content-Type'] = 'application/x-ndjson'
      params.headers['Content-Length'] = '' + Buffer.byteLength(params.body)
    }

    // serializes the querystring
    params.querystring = this.serializer.qserialize(params.querystring)
    // handles request timeout
    params.timeout = toMs(params.requestTimeout || this.requestTimeout)

    this.emit('request', params)

    const request = connection.request(params, (err, response) => {
      if (err != null) {
        this.connectionPool.markDead(connection)
        if (this.sniffOnConnectionFault === true) {
          this.sniff()
        }

        if (attempts > 0) {
          debug(`Retrying request, there are still ${attempts} attempts`, params)
          params[kRemainingAttempts] = attempts - 1
          return this.request(params, callback)
        }

        const error = err.message === 'Request timed out'
          ? new TimeoutError(err.message, params)
          : new ConnectionError(err.message, params)

        this.emit('error', error, params)
        return callback(error, result)
      }

      const { statusCode, headers } = response
      result.statusCode = statusCode
      result.headers = headers

      var payload = ''
      response.setEncoding('utf8')
      response.on('data', chunk => { payload += chunk })
      response.on('error', err => callback(new ConnectionError(err.message, params), result))
      response.on('end', () => {
        const isHead = params.method === 'HEAD'
        const shouldDeserialize = headers['content-type'] != null && isHead === false && payload !== ''
        if (shouldDeserialize === true && headers['content-type'].indexOf('application/json') > -1) {
          try {
            result.body = this.serializer.deserialize(payload)
          } catch (err) {
            this.emit('error', err)
            return callback(err, result)
          }
        } else {
          result.body = isHead === true ? true : payload
        }

        const ignoreStatusCode = (Array.isArray(params.ignore) && params.ignore.indexOf(statusCode) > -1) ||
          (isHead === true && statusCode === 404)

        if (ignoreStatusCode === false &&
           (statusCode === 502 || statusCode === 503 || statusCode === 504)) {
          this.connectionPool.markDead(connection)
          if (attempts > 0) {
            debug(`Retrying request, there are still ${attempts} attempts`, params)
            params[kRemainingAttempts] = attempts - 1
            return this.request(params, callback)
          }
        } else {
          this.connectionPool.markAlive(connection)
        }

        this.emit('response', params, result)
        if (ignoreStatusCode === false && statusCode >= 400) {
          callback(new ResponseError(result), result)
        } else {
          if (isHead === true && statusCode === 404) {
            result.body = false
          }
          callback(null, result)
        }
      })
    })

    return {
      abort: () => {
        request.abort()
        debug('Request aborted', params)
      }
    }
  }

  getConnection () {
    const now = Date.now()
    if (this._sniffEnabled === true && now > this._nextSniff) {
      this.sniff()
    }
    this.connectionPool.resurrect(now)
    return this.connectionPool.getConnection()
  }

  sniff (callback = noop) {
    if (this._isSniffing === true) return
    this._isSniffing = true
    debug('Started sniffing request')

    this.request({
      method: 'GET',
      path: this.sniffEndpoint
    }, (err, body) => {
      this._isSniffing = false
      if (this._sniffEnabled === true) {
        this._nextSniff = Date.now() + this.sniffInterval
      }

      if (err != null) {
        debug('Sniffing errored', err)
        return callback(err)
      }

      debug('Sniffing ended successfully', body)
      const hosts = this.connectionPool.nodesToHost(body.nodes)
      this.connectionPool
        .empty()
        .addConnection(hosts)

      callback(null, hosts)
    })
  }
}

function toMs (time) {
  if (typeof time === 'string') {
    return ms(time)
  }
  return time
}

module.exports = Transport
