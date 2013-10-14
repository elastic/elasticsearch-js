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

function Transport(client) {
  this.client = client;
}


Transport.prototype.sniff = function (cb) {
  cb = typeof cb === 'function' ? cb : _.noop;

  var connectionPool = this.client.connectionPool,
    nodesToHostCallback = _.bind(this.client.config.nodesToHostCallback, this);

  this.client.request({
    path: '/_cluster/nodes'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      connectionPool.setHosts(nodesToHostCallback(resp.nodes));
    }
    cb(err, resp);
  });
};


Transport.prototype.request = function (params, cb) {
  cb = typeof cb === 'function' ? cb : _.noop;

  var client = this.client,
    remainingRetries = client.config.maxRetries,
    connection;

  // serialize the body
  params.body = client.serializer.serialize(params.body);

  function sendRequestWithConnection(err, c) {
    if (err) {
      cb(err);
    } else if (c) {
      connection = c;
      connection.request(params, checkRespForFailure);
    } else {
      cb(new errors.ConnectionError('No active nodes at this time.'));
    }
  }

  function checkRespForFailure(err, body, status) {
    // check for posotive response
    if (err) {
      client.connectionPool.setStatus(connection, 'dead');
      checkForRetry(err, null, status);
    } else {
      client.connectionPool.setStatus(connection, 'alive');
      return cb(null, client.serializer.unserialize(body), status);
    }
  }

  function checkForRetry(err, resp) {
    client.connectionPool.setStatus(connection, 'dead');
    if (remainingRetries) {
      remainingRetries--;
      client.connectionPool.select(sendRequestWithConnection);
    } else {
      return cb(err, null);
    }
  }

  client.connectionPool.select(sendRequestWithConnection);
};
