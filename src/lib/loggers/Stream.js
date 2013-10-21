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

var LoggerAbstract = require('../Logger'),
  nodeStreams = require('stream'),
  _ = require('../utils'),
  fs = require('fs');

function Stream(config, bridge) {
  Stream.callSuper(this, arguments);
  _.makeBoundMethods(this);

  if (config.stream instanceof nodeStreams.Writable) {
    this.stream = config.stream;
  } else {
    throw new TypeError('Invalid stream, use an instance of stream.Writeable');
  }

  process.on('exit', this.bound.onProcessExit);
}
_.inherits(Stream, LoggerAbstract);

// flush the write buffer to stderr synchronously
Stream.prototype.onProcessExit = _.handler(function () {
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
