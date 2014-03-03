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
var ForeverAgent = require('forever-agent');
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
    keepAlive: true,
    minSockets: 10,
    // 10 makes sense but 11 actually keeps 10 sockets around
    // https://github.com/mikeal/forever-agent/issues/8
    maxSockets: 11
  });

  var Agent = this.hand.Agent; // the class
  if (config.forever) {
    config.keepAlive = config.forever;
  }

  if (config.keepAlive) {
    Agent = this.host.protocol === 'https' ? ForeverAgent.SSL : ForeverAgent;
    this.on('status set', this.bound.onStatusSet);
  }

  this.agent = new Agent({
    maxSockets: config.maxSockets,
    minSockets: config.minSockets
  });
}
_.inherits(HttpConnector, ConnectionAbstract);

HttpConnector.prototype.onStatusSet = _.handler(function (status) {
  if (status === 'closed') {
    var agent = this.agent;
    var toRemove = [];
    var collectSockets = function (sockets, host) {
      _.each(sockets, function (s) {
        s && toRemove.push([host, s]);
      });
    };

    agent.minSockets = agent.maxSockets = 0;
    agent.requests = {};

    _.each(agent.sockets, collectSockets);
    _.each(agent.freeSockets, collectSockets);
    _.each(toRemove, function (args) {
      var host = args[0], socket = args[1];
      agent.removeSocket(socket, host);
      socket.destroy();
    });
  }
});

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
