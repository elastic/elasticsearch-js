/**
 * Special version of the Stream logger, which logs errors and warnings to stderr and all other
 * levels to stdout.
 *
 * @class Loggers.Stdio
 * @extends LoggerAbstract
 * @constructor
 * @param {Object} config - The configuration for the Logger
 * @param {string} config.level - The highest log level for this logger to output.
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */

module.exports = Stdio;

var clc = require('cli-color'),
  LoggerAbstract = require('../logger'),
  _ = require('../utils');

function Stdio(config, bridge) {
  Stdio.callSuper(this, arguments);

  // config/state
  this.color = _.has(config, 'color') ? !!config.color : true;
}

_.inherits(Stdio, LoggerAbstract);

/**
 * Sends output to a stream, does some formatting first
 *
 * @method write
 * @private
 * @param  {WritableStream} to - The stream that should receive this message
 * @param  {String} label - The text that should be used at the beginning the message
 * @param  {function} colorize - A function that receives a string and returned a colored version of it
 * @param  {*} what - The message to log
 * @return {undefined}
 */
Stdio.prototype.write = function (to, label, colorize, message) {
  if (this.color) {
    label = colorize(label);
  }
  to.write(this.format(label, message));
};

/**
 * Handler for the bridges "error" event
 *
 * @method onError
 * @private
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
Stdio.prototype.onError = _.handler(function (e) {
  this.write(process.stderr, e.name === 'Error' ? 'ERROR' : e.name, clc.red.bold, e.stack);
});

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onWarning = _.handler(function (msg) {
  this.write(process.stderr, 'WARNING', clc.yellow.bold, msg);
});

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onInfo = _.handler(function (msg) {
  this.write(process.stdout, 'INFO', clc.cyan.bold, msg);
});

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onDebug = _.handler(function (msg) {
  this.write(process.stdout, 'DEBUG', clc.magentaBright.bold, msg);
});

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @return {undefined}
 */
Stdio.prototype.onTrace = _.handler(function (method, url, body, responseBody, responseStatus) {
  var message = 'curl "' + url.replace(/"/g, '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d "' + body.replace(/"/g, '\\"') + '"';
  }
  message += '\n<- ';
  if (this.color) {
    if (responseStatus === 200) {
      message += clc.green.bold(responseStatus);
    } else {
      message += clc.red.bold(responseStatus);
    }
  } else {
    message += responseStatus;
  }
  message += '\n' + responseBody;

  this.write(process.stdout, 'TRACE', clc.cyanBright.bold, message);
});
