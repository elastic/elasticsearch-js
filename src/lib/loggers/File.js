var LogAbstract = require('./log_abstract')
  , _ = require('../toolbelt')
  , fs = require('fs');

function prettyPrint(json) {
  try {
    json = JSON.stringify(JSON.parse(json), null, '  ');
  } catch (e) {}
  return json;
}


/**
 * Logger that writes to a file
 *
 * @class Loggers.File
 * @constructor
 * @see LoggerAbstract
 * @param {Object} config - The configuration for the Logger (See LoggerAbstract for generic options)
 * @param {String} config.path - The location to write
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */
function File(config, bridge) {
  this._constructSuper(arguments);

  this.outputPath = config.path;
}
_.inherits(File, LogAbstract);

File.prototype.write = function (label, message) {
  if (!this.file) {
    this.file = fs.createWriteStream(this.outputPath, {
      flags: 'a',
      encoding: 'utf8'
    });
  }

  this.file.write(this.format(label, message), 'utf8');
};

/**
 * Handler for the bridges "error" event
 *
 * @method onError
 * @private
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
File.prototype.onError = function (e) {
  this.write((e.name === 'Error' ? 'ERROR' : e.name), e.message + '\n\nStack Trace:\n' + e.stack);
};

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
File.prototype.onWarning = function (msg) {
  this.write('WARNING', msg);
};

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
File.prototype.onInfo = function (msg) {
  this.write('INFO', msg);
};

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
File.prototype.onDebug = function (msg) {
  this.write('DEBUG', msg);
};

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
File.prototype.onTrace = function (method, url, body, responseStatus, responseBody) {
  var message = 'curl "' + url.replace(/"/g, '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d "' + body.replace(/"/g, '\\"') + '"';
  }
  message += '\n<- ' + responseStatus + '\n' + prettyPrint(responseBody);
  this.write('TRACE', message);
};

module.exports = File;
