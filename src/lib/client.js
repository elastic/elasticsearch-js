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
 */

module.exports = Client;

var api = require('./api.js');
var ca = require('./client_action');
var Transport = require('./transport');

function Client(config) {
  if (!(this instanceof Client)) {
    return new Client(config);
  }
  config = config || {};

  // our client will log minimally by default
  if (!config.hasOwnProperty('log')) {
    config.log = 'warning';
  }

  if (!config.hosts && !config.host) {
    config.host = 'http://localhost:9200';
  }

  this.transport = new Transport(config);

  // instantiate the api's namespaces
  for (var i = 0; i < this._namespaces.length; i++) {
    this[this._namespaces[i]] = new this[this._namespaces[i]](this.transport);
  }
}

Client.prototype = api;

/**
 * Ping some node to ensure that the cluster is available in some respect
 *
 * @param {Object} params - Currently just a placeholder, no params used at this time
 * @param {Function} cb - callback
 */
Client.prototype.ping = ca({
  method: 'HEAD',
  url: {
    fmt: '/'
  },
  castExists: true,
  requestTimeout: 100
});

Client.prototype.close = function () {
  this.transport.close();
};
