module.exports = ConnectionAbstract;

var _ = require('./utils');
var EventEmitter = require('events').EventEmitter;
var Log = require('./log');
var Host = require('./host');

var defaults = {
  deadTimeout: 30000,
  requestTimeout: 10000
};

/**
 * Abstract class used for Connection classes
 * @class ConnectionAbstract
 * @constructor
 */
function ConnectionAbstract(host, config) {
  EventEmitter.call(this);

  config = _.defaults(config || {}, defaults);

  this.deadTimeout = config.deadTimeout;
  this.requestTimeout = config.requestTimeout;
  this.requestCount = 0;

  this.log = config.log || new Log();

  if (!host) {
    throw new TypeError('Missing host');
  } else if (host instanceof Host) {
    this.host = host;
  } else {
    throw new TypeError('Invalid host');
  }

  _.makeBoundMethods(this);
}
_.inherits(ConnectionAbstract, EventEmitter);

/**
 * Make a request using this connection. Must be overridden by Connection classes, which can add whatever keys to
 * params that they like. These are just the basics.
 *
 * @param [params] {Object} - The parameters for the request
 * @param params.path {String} - The path for which you are requesting
 * @param params.method {String} - The HTTP method for the request (GET, HEAD, etc.)
 * @param params.requestTimeout {Integer} - The amount of time in milliseconds that this request should be allowed to run for.
 * @param cb {Function} - A callback to be called once with `cb(err, responseBody, responseStatus)`
 */
ConnectionAbstract.prototype.request = function () {
  throw new Error('Connection#request must be overwritten by the Connector');
};

ConnectionAbstract.prototype.ping = function (cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('Callback must be a function');
  }

  return this.request({
    path: '/',
    method: 'HEAD',
    requestTimeout: 100
  }, cb);
};

ConnectionAbstract.prototype.setStatus = function (status) {
  var origStatus = this.status;

  this.status = status;

  if (this._deadTimeoutId) {
    clearTimeout(this._deadTimeoutId);
    this._deadTimeoutId = null;
  }

  if (status === 'dead') {
    this._deadTimeoutId = setTimeout(this.bound.resuscitate, this.deadTimeout);
  }

  this.emit('status set', status, origStatus, this);

  if (status === 'closed') {
    this.removeAllListeners();
  }
};

ConnectionAbstract.prototype.resuscitate = _.scheduled(function () {
  var self = this;

  if (self.status === 'dead') {
    self.ping(function (err) {
      if (!err) {
        self.setStatus('alive');
      } else {
        self.setStatus('dead');
      }
    });
  }
});
