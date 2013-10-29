/**
 * A Connection that operates using Node's http module
 *
 * @param client {Client} - The Client that this class belongs to
 * @param config {Object} - Configuration options
 * @param [config.protocol=http:] {String} - The HTTP protocol that this connection will use, can be set to https:
 * @class HttpConnection
 */
module.exports = HttpConnection;

var http = require('http');
var https = require('https');
var _ = require('../utils');
var errors = require('../errors');
var qs = require('querystring');
var ConnectionAbstract = require('../connection');
var defaultHeaders = {
  'connection': 'keep-alive'
};


function HttpConnection(host, config) {
  ConnectionAbstract.call(this, host, config);

  this.agent = new http.Agent({
    keepAlive: true,
    // delay between the last data packet received and the first keepalive probe
    keepAliveMsecs: 1000,
    maxSockets: 1,
    maxFreeSockets: this.config.maxFreeSockets
  });

  this.on('closed', this.bound.onClosed);
  this.once('alive', this.bound.onAlive);
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

HttpConnection.prototype.makeReqParams = function (params) {
  var reqParams = {
    method: params.method,
    protocol: this.host.protocol + ':',
    auth: this.host.auth,
    hostname: this.host.host,
    port: this.host.port,
    path: this.host.path + params.path,
    headers: this.host.headers,
    agent: this.agent
  };

  var query = qs.stringify(this.host.query ? _.defaults(params.query, this.host.query) : params.query);
  reqParams.path += query ? '?' + query : '';

  return reqParams;
};

HttpConnection.prototype.request = function (params, cb) {
  var incoming;
  var timeoutId;
  var request;
  var requestId = this.requestCount;
  var response;
  var responseStarted = false;
  var status = 0;
  var timeout = params.timeout || this.config.timeout;
  var log = this.config.log;

  var reqParams = this.makeReqParams(params);

  // general clean-up procedure to run after the request
  // completes, has an error, or is aborted.
  var cleanUp = function (err) {
    clearTimeout(timeoutId);

    request && request.removeAllListeners();
    incoming && incoming.removeAllListeners();

    if ((err instanceof Error) === false) {
      err = void 0;
    } else {
      log.error(err);

      if (err instanceof errors.RequestTimeout) {
        request.on('error', function catchAbortError() {
          request.removeListener('error', catchAbortError);
        });
      } else {
        this.setStatus('dead');
      }
    }

    log.trace(params.method, reqParams, params.body, response, status);
    cb(err, response, status);
  };


  request = http.request(reqParams, function (_incoming) {
    incoming = _incoming;
    status = incoming.statusCode;
    incoming.setEncoding('utf8');
    response = '';

    incoming.on('data', function (d) {
      response += d;
    });

    incoming.on('error', cleanUp);
    incoming.on('end', cleanUp);
  });

  request.on('error', cleanUp);

  if (timeout !== Infinity) {
    // timeout for the entire request.
    timeoutId = setTimeout(function () {
      request.abort();
      request.emit('error', new errors.RequestTimeout('Request timed out at ' + timeout + 'ms'));
    }, timeout);
  }

  request.setNoDelay(true);
  request.setSocketKeepAlive(true);

  request.end(params.body);
  this.requestCount++;
};
