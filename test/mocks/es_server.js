/**
 * A mock elasticsearch server used to test network libraries quickly and easily.
 *
 * It is actually a server created using node's http.createServer method and
 * listens on a random port by default. The server emits an "online" event once
 * it is listening and ready for requests.
 *
 * @type {}
 * @class EsServer
 * @param {Object} config - An object containing config options
 */
module.exports = EsServer;

var _ = require('../../src/lib/utils');
var url = require('url');
var http = require('http');
var EventEmitter = require('events').EventEmitter;

var pingResp = JSON.stringify({
  'ok': true,
  'status': 200,
  'name': 'Commando',
  'version': {
    'number': '0.90.5',
    'build_hash': 'c8714e8e0620b62638f660f6144831792b9dedee',
    'build_timestamp': '2013-09-17T12:50:20Z',
    'build_snapshot': false,
    'lucene_version': '4.4'
  },
  'tagline': 'You Know, for Search'
});

function EsServer(config) {
  this.config = _.defaults(config || {}, {
    port: 0,
    data: '/'
  });

  var self = this;
  var server = http.createServer();

  server.on('request', function (request, response) {
    request.parsedUrl = url.parse(request.url, true);

    var routes = self.routes[request.method.toLowerCase()];
    var route = routes && routes[request.parsedUrl.pathname];

    if (route) {
      route.call(self, request, response);
    } else {
      response.writeHead(400);
      response.end('No handler found for uri [/] and method [' + request.method + ']');
    }
  });

  self.shutdown = function (cb) {
    server.close(function () {
      self.emit('offline');
      cb();
    });
  };

  self.routes = {
    get: {
      '/' : function (request, response) {
        response.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Length': pingResp.length
        });
        response.end(pingResp, 'utf8');
      }
    },
    post: {},
    put: {},
    delete: {},
    head: {}
  };

  process.nextTick(function () {
    server.listen(self.config.port, function () {
      self.emit('online', server.address().port);
    });
  });
}
_.inherits(EsServer, EventEmitter);
