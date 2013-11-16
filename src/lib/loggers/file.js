/**
 * Logger that writes to a file
 *
 * @class Loggers.File
 * @extends StreamLogger
 * @constructor
 * @param {Object} config - The configuration for the Logger (See LoggerAbstract for generic options)
 * @param {String} config.path - The location to write
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */

module.exports = File;

var StreamLogger = require('./stream');
var _ = require('../utils');
var fs = require('fs');

function File(config, bridge) {
  // setup the stream before calling the super
  this.path = config.path || 'elasticsearch.log';
  config.stream = fs.createWriteStream(this.path, {
    flags: 'a',
    encoding: 'utf8'
  });

  // call my super
  StreamLogger.call(this, config, bridge);
}
_.inherits(File, StreamLogger);

File.prototype.onProcessExit = _.handler(function () {
  // flush the write buffer to disk
  var writeBuffer = this.stream._writableState.buffer;
  var out = '';
  if (writeBuffer) {
    writeBuffer.forEach(function (buffered) {
      out += buffered.chunk.toString();
    });
    fs.appendFileSync(this.path, out);
  }
});
