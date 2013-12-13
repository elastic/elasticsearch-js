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
  var self = this;

  Readable.call(self);

  self.setEncoding = sinon.stub();
  self._read = function () {};
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