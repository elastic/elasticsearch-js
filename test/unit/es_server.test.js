
var EsServer = require('../mocks/es_server');
var _ = require('../../src/lib/utils');
var http = require('http');

describe('EsServer Mock', function () {

  it('should emit an online event when ready, passing it\'s port number', function (done) {
    var server = new EsServer();
    server.on('online', function (port) {
      port.should.have.type('number');
      server.shutdown(done);
    });
  });

  describe('when it\'s online', function () {
    var server;
    var port;

    function makeRequest(opts, respCb) {
      opts = _.defaults(opts || {}, {
        hostname: 'localhost',
        port: port
      });

      var response = null;
      var req = http.request(opts, function (incomming) {
        response = '';

        incomming.on('data', function (chunk) {
          response += chunk;
        });

        incomming.on('end', function () {
          if (incomming.headers['content-type'] === 'application/json') {
            try {
              respCb(null, JSON.parse(response), incomming.statusCode);
            } catch (e) {
              respCb(e, response, incomming.statusCode);
            }
          } else {
            respCb(null, response, incomming.statusCode);
          }
        });
      });

      req.on('error', respCb);

      req.end();
    }

    before(function (done) {
      server = new EsServer();
      server.on('online', function (_port) {
        port = _port;
        done();
      });
    });

    after(function (done) {
      server.shutdown(done);
    });

    it('should respond with json to a ping', function (done) {
      makeRequest({
        path: '/'
      }, function (err, resp, status) {
        if (err) {
          done(err);
        } else {
          status.should.be.exactly(200);
          resp.version.number.should.match(/^\d+\.\d+\.\d+/);
          done();
        }
      });
    });

  });

});
