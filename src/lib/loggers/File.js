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

var StreamLogger = require('./stream'),
  _ = require('../utils'),
  fs = require('fs');

function File(config, bridge) {
  config.stream = fs.createWriteStream(config.path, {
    flags: 'a',
    encoding: 'utf8'
  });

  File.callSuper(this, arguments);
}
_.inherits(File, StreamLogger);
