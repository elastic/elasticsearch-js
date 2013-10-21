module.exports = ConnectionAbstract;

var _ = require('./utils'),
    EventEmitter = require('events').EventEmitter;

/**
 * Abstract class used for Connection classes
 * @param client {Client} - The client that this connection belongs to
 * @param config {Object} - a map of configuration details for this connection
 * @param [config.hostname=localhost] {String} - The hostname for the node this connection connects to
 * @param [config.port=9200] {Integer} - The port on the server that ES is listening to
 * @class ConnectionAbstract
 * @constructor
 */
function ConnectionAbstract(config, nodeInfo) {
  EventEmitter.call(this);
  this.config = config;
  this.hostname = nodeInfo.hostname || 'localhost';
  this.port = nodeInfo.port || 9200;

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
 * @param params.timeout {Integer} - The amount of time in milliseconds that this request should be allowed to run for.
 * @param cb {Function} - A callback to be called once with `cb(err, responseBody, responseStatus)`
 */
ConnectionAbstract.prototype.request = function () {
  throw new Error('Connection#request must be overwritten by the Connector');
};

ConnectionAbstract.prototype.ping = function (params, cb) {
  if (typeof params === 'function') {
    cb = params;
  } else if (typeof cb !== 'function') {
    throw new TypeError('Callback must be a function');
  }
  return this.request({
    path: '/',
    method: 'HEAD',
    timeout: '100'
  }, cb);
};

ConnectionAbstract.prototype.setStatus = function (status) {
  var origStatus = this.status;

  this.status = status;

  if (status === 'dead') {
    if (this.__deadTimeout) {
      clearTimeout(this.__deadTimeout);
    }
    this.__deadTimeout = setTimeout(this.bound.resuscitate, this.config.deadTimeout);
  }

  this.emit('status changed', status, origStatus, this);
};

ConnectionAbstract.prototype.resuscitate = _.scheduled(function () {
  var self = this;

  if (self.status === 'dead') {
    self.ping(function (err) {
      if (!err) {
        self.setStatus('alive');
      } else {
        self.emit('dead');
      }
    });
  }
});
