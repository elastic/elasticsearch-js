'use strict'

const { inherits } = require('util')
const { Writable } = require('readable-stream')

function ClientRequest (opts) {
  Writable.call(this)
  this._write = () => {}
}

inherits(ClientRequest, Writable)

ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}
ClientRequest.prototype.setHeader = function () {}

module.exports = ClientRequest
