/**
 * A Connection that operates using Node's http module
 *
 * @param client {Client} - The Client that this class belongs to
 * @param config {Object} - Configuration options
 * @param [config.protocol=http:] {String} - The HTTP protocol that this connection will use, can be set to https:
 * @class HttpConnector
 */
module.exports = HttpConnector;

var handles = {
  http: require('http'),
  https: require('https')
};
var _ = require('../utils');
var qs = require('querystring');
var KeepAliveAgent = require('agentkeepalive');
var ConnectionAbstract = require('../connection');

/**
 * Connector used to talk to an elasticsearch node via HTTP
 *
 * @param {Host} host - The host object representing the elasticsearch node we will be talking to
 * @param {Object} [config] - Configuration options (extends the configuration options for ConnectionAbstract)
 * @param {Number} [config.concurrency=10] - the maximum number of sockets that will be opened to this node
 */
function HttpConnector(host, config) {
  ConnectionAbstract.call(this, host, config);

  this.hand = handles[this.host.protocol];
  if (!this.hand) {
    throw new TypeError('Invalid protocol "' + this.host.protocol +
      '", expected one of ' + _.keys(handles).join(', '));
  }

  config = _.defaults(config || {}, {
    maxSockets: 10,
    maxKeepAliveRequests: 0,
    maxKeepAliveTime: 3e5 // 5 minutes
  });

  var KeepAliveAgent_ = this.host.protocol === 'https' ? KeepAliveAgent : KeepAliveAgent.HttpsAgent;

  this.agent = new KeepAliveAgent_({
    maxSockets: config.maxSockets,
    maxKeepAliveRequests: config.maxKeepAliveRequests,
    maxKeepAliveTime: config.maxKeepAliveTime
  });
}
_.inherits(HttpConnector, ConnectionAbstract);

HttpConnector.prototype.makeReqParams = function (params) {
  params = params || {};
  var host = this.host;

  var reqParams = {
    method: params.method || 'GET',
    protocol: host.protocol + ':',
    auth: host.auth,
    hostname: host.host,
    port: host.port,
    path: (host.path || '') + (params.path || ''),
    headers: host.headers,
    agent: this.agent
  };

  if (!reqParams.path) {
    reqParams.path = '/';
  }

  var query = this.host.query ? _.clone(this.host.query) : {};

  if (params.query) {
    _.extend(query, typeof params.query === 'string' ? qs.parse(params.query) : params.query);
  }

  if (_.size(query)) {
    reqParams.path = reqParams.path + '?' + qs.stringify(query);
  }

  return reqParams;
};

HttpConnector.prototype.request = function (params, cb) {
  var incoming;
  var timeoutId;
  var request;
  var response;
  var status = 0;
  var headers;
  var log = this.log;

  var reqParams = this.makeReqParams(params);

  // general clean-up procedure to run after the request
  // completes, has an error, or is aborted.
  var cleanUp = _.bind(function (err) {
    clearTimeout(timeoutId);

    request && request.removeAllListeners();
    incoming && incoming.removeAllListeners();

    if ((err instanceof Error) === false) {
      err = void 0;
    }

    log.trace(params.method, reqParams, params.body, response, status);
    if (err) {
      cb(err);
    } else {
      cb(err, response, status, headers);
    }
  }, this);

  request = this.hand.request(reqParams, function (_incoming) {
    incoming = _incoming;
    status = incoming.statusCode;
    headers = incoming.headers;
    incoming.setEncoding('utf8');
    response = '';

    incoming.on('data', function (d) {
      response += d;
    });

    incoming.on('error', cleanUp);
    incoming.on('end', cleanUp);
  });

  request.on('error', cleanUp);

  request.setNoDelay(true);
  request.setSocketKeepAlive(true);
  request.chunkedEncoding = false;

  if (params.body) {
    request.setHeader('Content-Length', Buffer.byteLength(params.body, 'utf8'));
    request.end(params.body);
  } else {
    request.end();
  }

  return function () {
    request.abort();
  };
};
