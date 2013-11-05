/**
 * Special version of the Stream logger, which logs errors and warnings to stderr and all other
 * levels to stdout.
 *
 * @class Loggers.Console
 * @extends LoggerAbstract
 * @constructor
 * @param {Object} config - The configuration for the Logger
 * @param {string} config.level - The highest log level for this logger to output.
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */

module.exports = Console;

var LoggerAbstract = require('../logger');
var _ = require('../utils');

function Console(config, bridge) {
  LoggerAbstract.call(this, config, bridge);

  // config/state
  this.color = _.has(config, 'color') ? !!config.color : true;
}
_.inherits(Console, LoggerAbstract);

/**
 * Override the LoggerAbstract's setup listeners to do a little extra setup
 *
 * @param  {Array} levels - The levels that we should be listeneing for
 */
Console.prototype.setupListeners = function (levels) {
  // since some of our functions are bound a bit differently (to the console)
  // create some of the bound properties manually
  this.bound.onWarning = this.onWarning;
  this.bound.onInfo = this.onInfo;
  this.bound.onDebug = this.onDebug;

  // call the super method
  LoggerAbstract.prototype.setupListeners.call(this, levels);
};

/**
 * Handler for the bridges "error" event
 *
 * @method onError
 * @private
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
Console.prototype.onError = _.handler(function (e) {
  if (console.error && console.trace) {
    console.error(e.name === 'Error' ? 'ERROR' : e.name, e.stack || e.message);
  } else {
    console.log(e.name === 'Error' ? 'ERROR' : e.name, e.stack || e.message);
  }
});

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Console.prototype.onWarning = _.bindKey(console, console.warn ? 'warn' : 'log', 'WARNING');

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Console.prototype.onInfo = _.bindKey(console, console.info ? 'info' : 'log', 'INFO');

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Console.prototype.onDebug = _.bindKey(console, console.debug ? 'debug' : 'log', 'DEBUG');

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @return {undefined}
 */
Console.prototype.onTrace = _.handler(function (method, url, body, responseBody, responseStatus) {
  var message = 'curl "' + url.replace(/"/g, '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d "' + body.replace(/"/g, '\\"') + '"';
  }
  message += '\n<- ' + responseStatus + '\n' + responseBody;
  console.log('TRACE:\n' + message + '\n\n');
});
