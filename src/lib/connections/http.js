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


function HttpConnection(client, config) {
  ConnectionAbstract.call(this, client, config);

  this.protocol = config.protocol || 'http:';
  if (this.protocol[this.protocol.length - 1] !== ':') {
    this.protocol = this.protocol + ':';
  }

  this.agent = new http.Agent({
    keepAlive: true,
    // delay between the last data packet received and the first keepalive probe
    keepAliveMsecs: 1000,
    maxSockets: this.client.config.maxSockets,
    maxFreeSockets: this.client.config.maxFreeSockets
  });

  this.on('closed', function () {
    this.agent.destroy();
    this.removeAllListeners();
  });
}
_.inherits(HttpConnection, ConnectionAbstract);

HttpConnection.prototype.request = function (params, cb) {
  var request,
    response,
    status = 0,
    timeout = params.timeout || this.timeout,
    timeoutId,
    log = this.client.log;

  var reqParams = _.defaults({
    protocol: this.protocol,
    hostname: this.hostname,
    port: this.port,
    path: params.path,
    method: _.toUpperString(params.method) || (params.body ? 'POST' : 'GET'),
    headers: _.defaults(params.headers || {}, defaultHeaders)
  });

  // general clean-up procedure to run after the request, can only run once
  var cleanUp = function (err) {
    cleanUp = _.noop;

    if (err) {
      log.error(err);
    }

    clearTimeout(timeoutId);
    if (request) {
      request.removeAllListeners();
    }
    _.nextTick(cb, err, response, status);
  };

  // ensure that "get" isn't being used with a request body
  if (params.body && reqParams.method === 'GET') {
    cleanUp(new TypeError('HTTP Method GET can not have a body'));
    return;
  }

  reqParams.agent = this.agent;

  request = http.request(reqParams);

  request.on('response', function (incoming) {
    status = incoming.statusCode;
    incoming.setEncoding('utf8');
    response = '';

    incoming.on('data', function (d) {
      response += d;
    });

    incoming.on('close', function (err) {
      console.log('closed');
      cleanUp(err);
    });

    incoming.on('end', function requestComplete() {
      incoming.removeAllListeners();
      log.trace(reqParams.method, reqParams, params.body, response, status);
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

  request.end(params.body);
};
