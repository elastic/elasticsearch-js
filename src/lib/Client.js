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
var api = _.reKey(_.requireDir(module, '../api'), _.camelCase);
var q = require('q');
var errors = require('./errors');

// Many API commands are namespaced, like cluster.nodeStats. The names of these namespaces will be
// tracked here and the namespace objects will be instantiated by reading the values from this
// array
var namespaces = [];

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

  for (var i = 0; i < namespaces.length; i++) {
    this[namespaces[i]] = new this[namespaces[i]](this);
  }
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
  var serializer = this.config.serializer;

  // in cb isn't a function make it one
  cb = typeof cb === 'function' ? cb : _.noop;

  // get ignore and ensure that it's an array
  var ignore = params.ignore;
  if (ignore && !_.isArray(ignore)) {
    ignore = [ignore];
  }

  // serialize the body
  if (params.body) {
    params.body = serializer.serialize(params.body);
  }

  this.config.transport.request(params, function (err, reqParams, body, status) {

    var parsedBody = null;
    if (!err) {
      if (body) {
        parsedBody = serializer.unserialize(body);
        if (!parsedBody) {
          err = new errors.ParseError();
        }
      } else if (reqParams.method === 'HEAD') {
        parsedBody = (status === 200);
      }
    }

    if (err) {
      return cb(err, parsedBody, status);
    } else if ((status >= 200 && status < 300) || ignore && _.contains(ignore, status)) {
      return cb(void 0, parsedBody, status);
    } else {
      if (errors[status]) {
        return cb(new errors[status](parsedBody.error), parsedBody, status);
      } else {
        return cb(new errors.Generic('unknown error'), parsedBody, status);
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
  this.config.transport.request({
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
