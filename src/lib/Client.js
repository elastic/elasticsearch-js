var _ = require('./utils')
  , transports = _.requireDir(module, './transports')
  , api = _.requireDir(module, '../api')
  , Log = require('./log')
  , Q = require('q');

// Many API commands are namespaced, like cluster.node_stats. The names of these namespaces will be
// tracked here and the namespace objects will be instantiated by reading the values from this
// array
var namespaces = [];

/**
 * A client that makes requests to Elasticsearch via a {{#crossLink "Transport"}}Transport{{/crossLink}}
 *
 * Initializing a client might look something like:
 *
 * ```
 * var client = new Elasticsearch.Client({
 *   transport: {
 *     hosts: [
 *       'es1.net:9200',
 *       'es2.net:9200'
 *     ],
 *     sniff_on_start: true
 *   },
 *   log: {
 *     type: 'file',
 *     level: 'warning'
 *   }
 * })
 * ```
 *
 * @class Client
 * @constructor
 * @param {Object} [config={}] - Configuration for the transport
 * @param {Object} [config.transport] - Transport settings passed to {{#crossLink "Transport"}}Transport Constructor{{/crossLink}}
 * @param {String|ArrayOfStrings>} [config.log] - Log output settings {{#crossLink "Log"}}Log Constructor{{/crossLink}}
 * @param {Object} [config.trace=false] - Create a log output to stdio that only tracks trace logs
 */
function Client(config) {
  this.client = this;

  for (var i = 0; i < namespaces.length; i++) {
    this[namespaces[i]] = new this[namespaces[i]](this);
  }

  this.hosts = config.hosts || ['http://localhost:9200'];

  // this.transport = this.options.transport || new transports.NodeHttp(this.options);
  this.log = new Log(config && config.log);
  // this.serializer = this.options.serializer || new es.Serializer.json();
}

Client.prototype.sniff = function () {

};

Client.prototype.ping = function () {
  return this.request({
    url: '/',
    method: 'HEAD',
    timeout: '100'
  });
};

/**
 * Perform a request with the client's transport
 *
 * @method request
 * @param {object} params
 * @param {String} params.url - The url for the request
 * @param {String} params.method - The HTTP method for the request
 * @param {String} params.body - The body of the HTTP request
 * @return {Promise} - A promise that will be resolved with the response
 */
Client.prototype.request = function (params) {
  var deferred = Q.defer();
  setTimeout(_.bind(function () {
    var response = {
      status: 200,
      body: {
        not: 'a real response'
      }
    };

    this.log.trace(
      params.method,
      'http://' + this.hosts[Math.floor(Math.random() * this.hosts.length)] + params.url,
      params.body,
      response.status,
      JSON.stringify(response.body)
    );
    deferred.resolve();
  }, this), 3);
  return deferred.promise;
};

// creates a namespace, who's prototype offers the actions within that namespace and this context
// provides the API actions a link back to the client they were intended to operate on.
function makeNamespaceConstructor(actions) {

  function Namespace(client) {
    this.client = client;
  }

  Namespace.prototype = actions;

  return Namespace;
}

// Extend the Client prototype with the top level API actions and the namespaces for other API actions
_.extend(Client.prototype, _.map(api, function (action, name) {
  switch (typeof action) {
  case 'function':
    return action;
  case 'object':
    namespaces.push(name);
    return makeNamespaceConstructor(action);
  }
}));

module.exports = Client;