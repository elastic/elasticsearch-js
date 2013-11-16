/**
 * A client that makes requests to Elasticsearch via a {{#crossLink "Transport"}}Transport{{/crossLink}}
 *
 * Initializing a client might look something like:
 *
 * ```
 * var client = new es.Client({
 *   hosts: [
 *     'es1.net:9200',
 *     {
 *       host: 'es2.net',
 *       port: 9200
 *     }
 *   ],
 *   sniffOnStart: true,
 *   log: {
 *     type: 'file',
 *     level: 'warning'
 *   }
 * });
 * ```
 *
 * @class Client
 * @constructor
 * @param {Object} [config={}] - Configuration for the transport
 * @param {Object} [config.transport] - Transport settings passed to {{#crossLink "Transport"}}Transport Constructor{{/crossLink}}
 * @param {String|Array<String>} [config.log] - Log output settings {{#crossLink "Log"}}Log Constructor{{/crossLink}}
 * @param {Object} [config.trace=false] - Create a log output to stdio that only tracks trace logs
 */

module.exports = Client;

var _ = require('./utils');
var ClientConfig = require('./client_config');
var api = require('./api.js');

function Client(config) {
  this.client = this;

  // setup the config.. this config will be passed EVERYWHERE so for good measure it is locked down
  Object.defineProperty(this, 'config', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: !config || _.isPlainObject(config) ? new ClientConfig(config) : config,
  });
  this.config.client = this;

  // instansiate the api's namespaces
  for (var i = 0; i < this._namespaces.length; i++) {
    this[this._namespaces[i]] = new this[this._namespaces[i]](this);
  }
}

Client.prototype = api;

/**
 * Ping some node to ensure that the cluster is available in some respect
 *
 * @param {Object} params - Currently just a placeholder, no params used at this time
 * @param {Function} cb - callback
 */
Client.prototype.ping = function (params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  this.config.transport.request({
    method: 'HEAD',
    path: '/',
    timeout: 100,
  }, cb);
};

Client.prototype.close = function () {
  this.config.close();
};
