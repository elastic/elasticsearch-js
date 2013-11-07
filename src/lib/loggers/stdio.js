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

var chalk = require('chalk');
// let the user define if they want color in the client config.
chalk.enabled = true;

var LoggerAbstract = require('../logger');
var _ = require('../utils');

var defaultColors = {
  error: function (txt) {
    return chalk.red.bold(txt);
  },
  warning: function (txt) {
    return chalk.yellow.bold(txt);
  },
  info: function (txt) {
    return chalk.cyan.bold(txt);
  },
  debug: function (txt) {
    return chalk.magenta.bold(txt);
  },
  trace: function (txt) {
    return chalk.white.bold(txt);
  },
  traceStatus: function (status) {
    return chalk[status >= 200 && status < 300 ? 'green' : 'red'].bold(status);
  }
};

function Stdio(config, bridge) {
  Stdio.callSuper(this, arguments);

  // config/state
  this.color = Boolean(_.has(config, 'color') ? config.color : chalk.supportsColor);

  this.colors = _.defaults(config.colors || {}, defaultColors);
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
  this.write(process.stderr, e.name === 'Error' ? 'ERROR' : e.name, this.colors.error, e.stack);
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
  this.write(process.stderr, 'WARNING', this.colors.warning, msg);
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
  this.write(process.stdout, 'INFO', this.colors.info, msg);
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
  this.write(process.stdout, 'DEBUG', this.colors.debug, msg);
});

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @return {undefined}
 */
Stdio.prototype.onTrace = _.handler(function (method, url, body, resp, status) {
  var message = 'curl "' + url.replace(/"/g, '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d "' + body.replace(/"/g, '\\"') + '"';
  }
  message += '\n<- ';
  if (this.color) {
    message += this.colors.traceStatus(status);
  } else {
    message += status;
  }
  message += '\n' + resp;

  this.write(process.stdout, 'TRACE', this.colors.trace, message);
});
