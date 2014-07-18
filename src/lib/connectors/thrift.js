/**
 * A Connection that operates using the Apache Thrift protocol
 *
 * @param client {Client} - The Client that this class belongs to
 * @param config {Object} - Configuration options
 * @param [config.protocol=thrift:] {String} - The Thrift protocol that this connection will use, can be set to thrift:
 * @class ThriftConnector
 */
module.exports = ThriftConnector;

var thrift = require('thrift');
var elasticsearch_thrift_rest = require('../../thrift/Rest');
var elasticsearch_thrift_types = require('../../thrift/elasticsearch_types');

var handles = {
  thrift: false
};
var _ = require('../utils');
var qs = require('querystring');
var ConnectionAbstract = require('../connection');

/**
 * Connector used to talk to an elasticsearch node via Thrift
 *
 * @param {Host} host - The host object representing the elasticsearch node we will be talking to
 * @param {Object} [config] - Configuration options (extends the configuration options for ConnectionAbstract)
 */
function ThriftConnector(host, config) {
  ConnectionAbstract.call(this, host, config);

  if (!this.host.protocol in handles) {
    throw new TypeError('Invalid protocol "' + this.host.protocol +
      '", expected one of ' + _.keys(handles).join(', '));
  }

  var connection = thrift.createConnection(this.host.host, this.host.port, {
    transport : thrift.TBufferedTransport(),
    protocol : thrift.TBinaryProtocol()
  });

  if(config) {
    config['onThriftError'] && connection.on('error', config['onThriftError']);
    config['onThriftConnect'] && connection.on('connect', config['onThriftConnect']);
  }

  handles[this.host.protocol] = thrift.createClient(elasticsearch_thrift_rest, connection);

  this.hand = handles[this.host.protocol];
}
_.inherits(ThriftConnector, ConnectionAbstract);

ThriftConnector.prototype.makeReqParams = function (params) {
  params = params || {};
  var host = this.host;

  var reqParams = {
    method: params.method || 'GET',
    auth: host.auth,
    uri: (host.path || '') + (params.path || ''),
    headers: host.getHeaders(params.headers) || {},
  };

  if (!reqParams.uri) {
    reqParams.uri = '/';
  }

  var query = host.getQuery(params.query);
  if (query) {
    reqParams.uri = reqParams.uri + '?' + qs.stringify(query);
  }

  return reqParams;
};

ThriftConnector.prototype.request = function (params, cb) {
  var log = this.log;

  var reqParams = this.makeReqParams(params);

  var ThriftRestRequest = new elasticsearch_thrift_types.RestRequest(reqParams);

  request = this.hand.execute(ThriftRestRequest, function(err, incoming) {
    log.trace(params.method, reqParams, params.body, incoming.response, incoming.status);

    if (err) {
      cb(err);
    } else {
      var parsed_body;
      try {
        parsed_body = JSON.parse(incoming.body);
      } catch(ex) {
        return cb("Could not parse response body.");
      }

      cb(err, parsed_body, incoming.status, incoming.headers);
    }
  });
};
