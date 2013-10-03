var clc = require('cli-color')
  , LogAbstract = require('./log_abstract')
  , _ = require('../toolbelt');

/**
 * Special version of the Stream logger, which logs errors and warnings to stderr and all other
 * levels to stdout.
 *
 * @class Loggers.Stdio
 * @constructor
 * @param {Object} config - The configuration for the Logger
 * @param {string} config.level - The highest log level for this logger to output.
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */
function Stdio(config, bridge) {
  this._constructSuper(arguments);

  // config/state
  this.color = _.has(config, 'color') ? !!config.color : true;
}

_.inherits(Stdio, LogAbstract);

/**
 * Sends output to a stream, does some formatting first
 *
 * @method write
 * @private
 * @param  {WriteableStream} to - The stream that should receive this message
 * @param  {String} label - The text that should be used at the begining of the message
 * @param  {function} colorize - A function that recieves a string and returned a colored version of it
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
Stdio.prototype.onError = function (e) {
  this.write(process.stderr, e.name === 'Error' ? 'ERROR' : e.name, clc.red.bold,  [e.message, '\n\nStack Trace:\n' + e.stack]);
};

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onWarning = function (msg) {
  this.write(process.stderr, 'WARNING', clc.yellow.bold, msg);
};

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onInfo = function (msg) {
  this.write(process.stdout, 'INFO', clc.cyan.bold, msg);
};

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onDebug = function (msg) {
  this.write(process.stdout, 'DEBUG', clc.magentaBright.bold, msg);
};

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onTrace = function (method, url, body, responseStatus, responseBody) {
  var message = '\nHTTP ' + method + ' ' + url + ' -> ';
  if (this.color) {
    if (responseStatus === 200) {
      message += clc.green.bold(responseStatus);
    } else {
      message += clc.red.bold(responseStatus);
    }
  } else {
    message += responseStatus;
  }
  message += '\n' + responseBody + '\n\n';
  message += 'curl "' + url.replace('"', '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d ' + JSON.stringify(JSON.stringify(body));
  }
  this.write(process.stdout, 'TRACE', clc.cyanBright.bold, message + '\n\n');
};

module.exports = Stdio;
