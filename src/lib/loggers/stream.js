/**
 * Logger that writes to a file
 *
 * @class Loggers.File
 * @extends LoggerAbstract
 * @constructor
 * @see LoggerAbstract
 * @param {Object} config - The configuration for the Logger (See LoggerAbstract for generic options)
 * @param {String} config.path - The location to write
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */

module.exports = Stream;

var LoggerAbstract = require('../logger');
var _ = require('../utils');

function Stream(log, config) {
  // call my super
  LoggerAbstract.call(this, log, config);

  if (config.stream && config.stream.write && config.stream.end) {
    this.stream = config.stream;
  } else {
    throw new TypeError('Invalid stream, use an instance of stream.Writeable');
  }

  if (this.stream._writableState && this.stream._writableState.buffer) {
    process.on('exit', this.bound.onProcessExit);
  }
  // else you should probably flush your stream
}
_.inherits(Stream, LoggerAbstract);

// flush the write buffer to stderr synchronously
Stream.prototype.onProcessExit = _.handler(function () {
  // process is dying, lets manually flush the buffer synchronously to stderr.
  var writeBuffer = this.stream._writableState.buffer;
  if (writeBuffer && writeBuffer.length) {
    console.error('Log stream did not get to finish writing. Flushing to stderr');
    writeBuffer.forEach(function (buffered) {
      console.error(buffered.chunk.toString());
    });
  }
});

Stream.prototype.write = function (label, message) {
  this.stream.write(this.format(label, message), 'utf8');
};

Stream.prototype.close = function () {
  this.stream.end();
};
