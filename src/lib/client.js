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

var Transport = require('./transport');
var ca = require('./client_action');
var _ = require('./utils');
var defaultApi = 'master';
var apis = {
  '0.90': require('./api_0_90'),
  'master': require('./api')
};

function Client(config) {
  config = config || {};

  function EsApiClient(config) {
    // our client will log minimally by default
    if (!config.hasOwnProperty('log')) {
      config.log = 'warning';
    }

    if (!config.hosts && !config.host) {
      config.host = 'http://localhost:9200';
    }

    this.ping = ca({
      method: 'HEAD',
      url: {
        fmt: '/'
      },
      castExists: true,
      requestTimeout: 100
    });

    this.close = function () {
      this.transport.close();
    };

    this.transport = new Transport(config);

    // instantiate the api's namespaces
    for (var i = 0; i < this._namespaces.length; i++) {
      this[this._namespaces[i]] = new this[this._namespaces[i]](this.transport);
    }

    delete this._namespaces;
  }

  var apiVersion = config.apiVersion || defaultApi;
  if (apis.hasOwnProperty(apiVersion)) {
    EsApiClient.prototype = apis[apiVersion];
  } else {
    throw new Error('Invalid apiVersion "' + apiVersion + '", expected one of ' + _.keys(apis).join(', '));
  }

  return new EsApiClient(config);
}
