/**
 * Just a buffer really, but one that implements the Writable class
 * @type {Constuctor}
 */

const util = require('util');
let MockWritableStream; // defined simply for 0.10+, in detail for older versions
const Writable = require('stream').Writable;


if (Writable) {
  // nice and simple for streams 2
  MockWritableStream = module.exports = function (opts) {
    Writable.call(this, opts);
    this._write = function () {};
  };
  util.inherits(MockWritableStream, Writable);
} else {
  // Node < 0.10 did not provide a usefull stream abstract
  const Stream = require('stream').Stream;
  module.exports = MockWritableStream = function () {
    Stream.call(this);
    this.writable = true;
  };
  util.inherits(MockWritableStream, Stream);

  MockWritableStream.prototype.write = function () {
    if (!this.writable) {
      this.emit('error', new Error('stream not writable'));
      return false;
    }

    let cb;
    if (typeof (arguments[arguments.length - 1]) === 'function') {
      cb = arguments[arguments.length - 1];
    }

    if (cb) {
      process.nextTick(cb);
    }
  };

  MockWritableStream.prototype.end = function (data, encoding) {
    if (typeof (data) === 'function') {
      // data is a cb
    } else if (typeof (encoding) === 'function') {
      this.write(data);
    } else if (arguments.length > 0) {
      this.write(data, encoding);
    }

    this.writable = false;
  };

  MockWritableStream.prototype.destroy = function (cb) {
    const self = this;

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
