/**
 * Logger that writes to a file, but the file can be executed as a shell script,
 * meaning everything but the curl commands are commented out
 *
 * @class Loggers.Tracer
 * @extends StreamLogger
 * @constructor
 * @param {Object} config - The configuration for the Logger (See LoggerAbstract for generic options)
 * @param {String} config.path - The location to write
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */

module.exports = Tracer;

var FileLogger = require('./file');
var _ = require('../utils');

function Tracer(config, bridge) {
  // call my super
  FileLogger.call(this, config, bridge);
}
_.inherits(Tracer, FileLogger);

Tracer.prototype.onTrace = _.handler(function (message, curlCall) {
  this.write('TRACE', message, curlCall);
});

function comment(str) {
  return _.map(str.split(/\r?\n/g), function (line) {
    return '# ' + line;
  }).join('\n');
}

Tracer.prototype.write = function (label, message, curlCall) {
  this.stream.write(
    comment(label + ': ' + this.timestamp()) + '\n' + (curlCall ? curlCall + '\n' : '') +
      comment(message) + '\n\n',
    'utf8'
  );
};
