/**
 * A Connection that operates using Node's http module
 *
 * @param client {Client} - The Client that this class belongs to
 * @param config {Object} - Configuration options
 * @param [config.protocol=http:] {String} - The HTTP protocol that this connection will use, can be set to https:
 * @class HttpConnection
 */
module.exports = HttpConnection;

var http = require('http'),
  _ = require('../utils'),
  q = require('q'),
  errors = require('../errors'),
  ConnectionAbstract = require('../connection'),
  defaultHeaders = {
    'connection': 'keep-alive'
  };


function HttpConnection(config, nodeInfo) {
  ConnectionAbstract.call(this, config, nodeInfo);

  this.protocol = nodeInfo.protocol || 'http:';
  if (this.protocol[this.protocol.length - 1] !== ':') {
    this.protocol = this.protocol + ':';
  }

  this.agent = new http.Agent({
    keepAlive: true,
    // delay between the last data packet received and the first keepalive probe
    keepAliveMsecs: 1000,
    maxSockets: 1,
    maxFreeSockets: this.config.maxFreeSockets
  });

  this.on('closed', this.bound.onClosed);
  this.once('alive', this.bound.onAlive);
  this.requestCount = 0;
}
_.inherits(HttpConnection, ConnectionAbstract);

HttpConnection.prototype.onClosed = _.handler(function () {
  this.agent.destroy();
  this.removeAllListeners();
});

HttpConnection.prototype.onAlive = _.handler(function () {
  // only set the agents max agents config once the connection is verified to be alive
  this.agent.maxSockets = this.config.maxSockets;
});

HttpConnection.prototype.request = function (params, cb) {
  var incoming;
  var timeoutId;
  var log = this.config.log;
  var request;
  var requestId = this.requestCount;
  var response;
  var responseStarted = false;
  var status = 0;
  var timeout = params.timeout || this.config.timeout;

  var reqParams = _.defaults({
    protocol: this.protocol,
    hostname: this.hostname,
    port: this.port,
    path: params.path,
    method: _.toUpperString(params.method) || (params.body ? 'POST' : 'GET'),
    headers: _.defaults(params.headers || {}, defaultHeaders)
  });

  log.debug('starting request', requestId);

  // general clean-up procedure to run after the request, can only run once
  var cleanUp = function (err) {
    clearTimeout(timeoutId);

    request && request.removeAllListeners();
    incoming && incoming.removeAllListeners();

    log.debug('calling back request', requestId, err ? 'with error "' + err.message + '"' : '');
    _.nextTick(cb, err, reqParams, response, status);

    // override so this doesn't get called again
    cleanUp = _.noop;
  };

  reqParams.agent = this.agent;

  request = http.request(reqParams);

  request.on('response', function (_incoming) {
    incoming = _incoming;
    status = incoming.statusCode;
    incoming.setEncoding('utf8');
    response = '';

    incoming.on('data', function (d) {
      response += d;
    });

    incoming.on('end', function requestComplete() {
      cleanUp();
    });
  });

  request.on('error', function (err) {
    request.abort();
    cleanUp(err);
  });

  // timeout for the entire request, req.setTimeout only set the socket level timeout
  timeoutId = setTimeout(function () {
    request.emit('error', new errors.RequestTimeout('Request timed out at ' + timeout + 'ms'));
  }, timeout);

  request.setNoDelay(true);
  request.setSocketKeepAlive(true);

  request.end(params.body);
  this.requestCount++;
};
