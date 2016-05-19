/**
 * Simple Mock of the http.IncommingMessage. Just implmenents the methods the methods
 * we use
 *
 * @type {Constuctor}
 */
module.exports = MockIncommingMessage;

var sinon = require('sinon');
var util = require('util');
var Readable = require('stream').Readable;

if (!Readable) {
  Readable = require('events').EventEmitter;
}

function MockIncommingMessage() {
  Readable.call(this);

  this.setEncoding = sinon.stub();
  this.headers = {};
  this._read = function () {};
}
util.inherits(MockIncommingMessage, Readable);

/**
 * To make the message "talk" do something like this:
 *
 * process.nextTick(function () {
 *   if (resp) {
 *     incom.push(chunk);
 *   }
 *   incom.push(null);
 * });
 */
