/**
 * Just a buffer really, but one that implements the Writable class
 * @type {Constuctor}
 */

var util = require('util');
var MockWritableStream; // defined simply for 0.10+, in detail for older versions
var Writable = require('stream').Writable;


if (Writable) {
  // nice and simple for streams 2
  MockWritableStream = module.exports = function (opts) {
    Writable.call(this, opts);

    this._write = function (chunk, encoding, cb) {};
  };
  util.inherits(MockWritableStream, Writable);
} else {
  // Node < 0.10 did not provide a usefull stream abstract
  var Stream = require('stream').Stream;
  module.exports = MockWritableStream = function (opts) {
    Stream.call(this);
    this.writable = true;
  };
  util.inherits(MockWritableStream, Stream);

  MockWritableStream.prototype.write = function (data) {
    if (!this.writable) {
      this.emit('error', new Error('stream not writable'));
      return false;
    }

    var cb;
    if (typeof(arguments[arguments.length - 1]) === 'function') {
      cb = arguments[arguments.length - 1];
    }

    if (cb) {
      process.nextTick(cb);
    }
  };

  MockWritableStream.prototype.end = function (data, encoding, cb) {
    if (typeof(data) === 'function') {
      cb = data;
    } else if (typeof(encoding) === 'function') {
      cb = encoding;
      this.write(data);
    } else if (arguments.length > 0) {
      this.write(data, encoding);
    }
    this.writable = false;
  };

  MockWritableStream.prototype.destroy = function (cb) {
    var self = this;

    if (!this.writable) {
      if (cb) {
        process.nextTick(function () { cb(null); });
      }
      return;
    }
    this.writable = false;

    process.nextTick(function () {
      if (cb) {
        cb(null);
      }
      self.emit('close');
    });
  };

  // There is no shutdown() for files.
  MockWritableStream.prototype.destroySoon = MockWritableStream.prototype.end;

}