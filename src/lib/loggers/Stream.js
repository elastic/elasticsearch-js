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

  if (config.stream instanceof nodeStreams.Writable) {
    this.stream = config.stream;
  } else {
    throw new TypeError('Invalid stream, use an instance of stream.Writeable');
  }
}
_.inherits(Stream, LoggerAbstract);

Stream.prototype.write = function (label, message) {
  this.stream.write(this.format(label, message), 'utf8');
};

Stream.prototype.close = function () {
  this.stream.end();
};
