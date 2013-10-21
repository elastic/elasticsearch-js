/**
 * Manages connection pools, sniffs for nodes, and runs requests
 *
 * @main Transport
 * @class Transport
 * @constructor
 * @param {Object} [config={}] - An object with configuration parameters
 * @param {String|ArrayOfStrings} [config.hosts='localhost:9200'] - Host(s) that this client should communicate with.
 * @param {Boolean} [config.connectionConstructor=false] - A constructor to use for connections to ES nodes
 * @param {Function} [config.nodesToHostCallback=parseNodeList] - convert the value returned from _cluster/nodes into
 *   a host list
 * @param {Boolean} [config.sniffOnStart=false] - inspect the cluster for a list of nodes upon startup
 * @param {Number} [config.sniffAfterRequests=null] - Sniff after completing a certain number of request
 * @param {Boolean} [config.sniffOnConnectionFail=false] - Sniff after a connection fails
 * @param {Number} [config.max_retries=3] - The maximum number of times the client should retry connecting to a node
 */

module.exports = Transport;

var _ = require('./utils'),
  q = require('q'),
  ConnectionPool = require('./connection_pool'),
  errors = require('./errors');

function Transport(config) {
  this.config = config;
}


Transport.prototype.sniff = function (cb) {
  var self = this;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  self.request({
    path: '/_cluster/nodes',
    method: 'GET'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      self.createConnections(self.config.nodesToHostCallback(resp.nodes));
    }
    cb(err, resp);
  });
};

Transport.prototype.createConnections = function (hosts) {
  for (var i = 0; i < hosts.length; i++) {
    this.config.connectionPool.add(new this.config.connectionConstructor(
      this.config,
      hosts[i]
    ));
  }
};

Transport.prototype.request = function (params, cb) {
  cb = typeof cb === 'function' ? cb : _.noop;

  var connectionPool = this.config.connectionPool;
  var log = this.config.log;
  var remainingRetries = this.config.maxRetries;
  var connection;

  function sendRequestWithConnection(err, _connection) {
    if (err) {
      log.error(err);
      cb(err);
    } else if (_connection) {
      connection = _connection;
      log.info('Selected', _connection.status, 'Connection, making request');
      connection.request(params, checkRespForFailure);
    } else {
      log.warning('No living connections');
      cb(new errors.ConnectionFault('No living connections.'));
    }
  }

  function checkRespForFailure(err, reqParams, body, status) {
    connection.setStatus(err ? 'dead' : 'alive');

    if (err) {
      log.error(err);
    }

    if (err && remainingRetries) {
      remainingRetries--;
      log.info('connection error, retrying');
      connectionPool.select(sendRequestWithConnection);
    } else {
      log.info('Request complete');
      cb(err, reqParams, body, status);
    }
  }

  connectionPool.select(sendRequestWithConnection);
};
