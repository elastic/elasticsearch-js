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
function ConnectionAbstract(client, config, id) {
  EventEmitter.call(this);
  this.client = client;
  this.id = id;
  this.hostname = config.hostname || 'localhost';
  this.port = config.port || 9200;
  this.timeout = config.timeout || 10000;
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

ConnectionAbstract.prototype.ping = function () {
  return this.request({
    path: '/',
    method: 'HEAD',
    timeout: '100'
  });
};
