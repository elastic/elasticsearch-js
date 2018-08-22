'use strict'

const { EventEmitter } = require('events')
const sts = require('string-to-stream')
const kPayload = Symbol('payload')

function IncomingMessage (opts) {
  this.statusCode = opts.statusCode || 200
  this.statusMessage = opts.statusMessage || ''
  this.headers = fixHeaderCase(opts.headers || {})
  this.rawHeaders = getRawHeaders(this.headers)
  this.trailers = {}
  this.rawTrailers = []
  this.httpVersion = '1.1'
  this[kPayload] = opts.body
    ? sts(opts.body)
    : new EventEmitter()
  this.socket = null
}

IncomingMessage.prototype.on = function (event, callback) {
  this[kPayload].on(event, callback)
}

IncomingMessage.prototype.emit = function (event, payload) {
  this[kPayload].emit(event, payload)
}

IncomingMessage.prototype.removeAllListeners = function (event, payload) {
  this[kPayload].removeAllListeners(event, payload)
}

IncomingMessage.prototype.setEncoding = function (encoding) {
  if (this[kPayload].setEncoding) {
    this[kPayload].setEncoding(encoding)
  }
}

function fixHeaderCase (headers) {
  const headersCased = {}
  for (var key in headers) {
    headersCased[key.toLowerCase()] = headers[key]
  }
  return headersCased
}

function getRawHeaders (headers) {
  const rawHeaders = []
  for (var key in headers) {
    rawHeaders.push(key)
    rawHeaders.push(headers[key])
  }
  return rawHeaders
}

module.exports = IncomingMessage
