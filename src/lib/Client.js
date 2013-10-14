/**
 * A client that makes requests to Elasticsearch via a {{#crossLink "Transport"}}Transport{{/crossLink}}
 *
 * Initializing a client might look something like:
 *
 * ```
 * var client = new Elasticsearch.Client({
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

var _ = require('./utils'),
    ClientConfig = require('./client_config'),
    api = _.reKey(_.requireDir(module, '../api'), _.camelCase),
    q = require('q'),
    Transport = require('./transport'),
    ConnectionPool = require('./connection_pool'),
    Log = require('./log'),
    serializers = _.requireClasses(module, './serializers'),
    errors = require('./errors');

// Many API commands are namespaced, like cluster.node_stats. The names of these namespaces will be
// tracked here and the namespace objects will be instantiated by reading the values from this
// array
var namespaces = [];

function Client(config) {
  this.client = this;
  this.config = !config || _.isPlainObject(config) ? new ClientConfig(config) : config;

  for (var i = 0; i < namespaces.length; i++) {
    this[namespaces[i]] = new this[namespaces[i]](this);
  }

  this.log = new Log(this);
  this.transport = new Transport(this);
  this.serializer = new serializers.Json(this);
  this.connectionPool = new ConnectionPool(this);
}

/**
 * Perform a request with the client's transport
 *
 * @method request
 * @todo async body writing
 * @todo abort
 * @todo access to custom headers, modifying of request in general
 * @param {object} params
 * @param {String} params.url - The url for the request
 * @param {String} params.method - The HTTP method for the request
 * @param {String} params.body - The body of the HTTP request
 * @param {Function} cb - A function to call back with (error, responseBody, responseStatus)
 */
Client.prototype.request = function (params, cb) {
  if (typeof cb !== 'function') {
    cb = _.noop;
  }

  // get ignore and ensure that it's an array
  var ignore = params.ignore;
  if (ignore && !_.isArray(ignore)) {
    ignore = [ignore];
  }

  this.transport.request(params, function (err, body, status) {
    if (err) {
      return cb(err, body, status);
    } else if ((status >= 200 && status < 300) || ignore && _.contains(ignore, status)) {
      return cb(void 0, body, status);
    } else {
      if (errors[status]) {
        return cb(new errors[status](body.error), body, status);
      } else {
        console.log({
          status: status,
          body: body
        });
        return cb(new errors.Generic('unknown error'), body, status);
      }
    }
  });
};

/**
 * Ping some node to ensure that the cluster is available in some respect
 *
 * @param {Object} params - Currently just a placeholder, no params used at this time
 * @param {Function} cb - callback
 */
Client.prototype.ping = function (params, cb) {
  this.transport.request({
    method: 'HEAD',
    path: '/'
  }, cb);
};

/**
 * These names of the properties that hold namespace objects in the Client prototype
 * @type {Array}
 */
Client.namespaces = [];

/**
 * Creates a namespace, who's prototype offers the actions within that namespace and this context
 * provides the API actions and a link back to the client they were intended to operate on.
 * @param {Object} actions - An object to use as the prototype for the namespace
 */
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
