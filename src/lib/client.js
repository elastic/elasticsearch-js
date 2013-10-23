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
var ca = require('./client_action').create;
var q = require('q');
var errors = require('./errors');
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

  for (var i = 0; i < this._namespaces.length; i++) {
    this[this._namespaces[i]] = new this[this._namespaces[i]](this);
  }
}

Client.prototype = api;

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

  var connectionPool = this.config.connectionPool;
  var log = this.config.log;
  var remainingRetries = this.config.maxRetries;
  var connection;

  log.debug('starting request', params);

  // get ignore and ensure that it's an array
  var ignore = params.ignore;
  if (ignore && !_.isArray(ignore)) {
    ignore = [ignore];
  }

  // serialize the body
  if (params.body) {
    params.body = params.bulkBody ? serializer.bulkBody(params.body) : serializer.serialize(params.body);
  }

  if (params.body && params.method === 'GET') {
    respond(new TypeError('Body can not be sent with method "GET"'));
    return;
  }

  function sendRequestWithConnection(err, _connection) {
    if (err) {
      log.error(err);
      respond(err);
    } else if (_connection) {
      connection = _connection;
      log.info('Selected', _connection.status, 'Connection, making request');
      connection.request(params, checkRespForFailure);
    } else {
      log.warning('No living connections');
      respond(new errors.ConnectionFault('No living connections.'));
    }
  }

  function checkRespForFailure(err, reqParams, body, status) {
    connection.setStatus(err ? 'dead' : 'alive');

    if (err) {
      log.error(err);
    }

    if (err && remainingRetries) {
      remainingRetries--;
      log.info('Connection error, retrying');
      connectionPool.select(sendRequestWithConnection);
    } else {
      log.info('Request complete');
      respond(err, reqParams, body, status);
    }
  }

  function respond(err, reqParams, body, status) {
    var parsedBody = null;
    if (reqParams) {
      log.trace(reqParams.method, reqParams, params.body, body, status);
    }
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
      cb(err, parsedBody, status);
    } else if ((status >= 200 && status < 300) || ignore && _.contains(ignore, status)) {
      cb(void 0, parsedBody, status);
    } else {
      if (errors[status]) {
        cb(new errors[status](parsedBody.error), parsedBody, status);
      } else {
        cb(new errors.Generic('unknown error'), parsedBody, status);
      }
    }
  }

  connectionPool.select(sendRequestWithConnection);
};

/**
 * Ping some node to ensure that the cluster is available in some respect
 *
 * @param {Object} params - Currently just a placeholder, no params used at this time
 * @param {Function} cb - callback
 */
Client.prototype.ping = ca({
    methods: ['HEAD'],
    params: {},
    url: {
      fmt: '/'
    }
  });

/**
 * Ask an ES node for a list of all the nodes, add/remove nodes from the connection
 * pool as appropriate
 *
 * @param  {Function} cb - Function to call back once complete
 */
Client.prototype.sniff = function (cb) {
  var config = this.config;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  this.request({
    path: '/_cluster/nodes',
    method: 'GET'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      var nodes = config.nodesToHostCallback(resp.nodes);
      config.connectionPool.setNodes(nodes);
    }
    cb(err, resp);
  });
};


/**
 * Shutdown the connections, log outputs, and clear timers
 */
Client.prototype.close = function () {
  this.config.log.close();
  this.config.connectionPool.close();
};

