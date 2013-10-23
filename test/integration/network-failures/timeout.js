
var EsServer = require('../../mocks/es_server');
var HttpConnection = require('../../../src/lib/connections/http');
var errors = require('../../../src/lib/errors');

describe('overall timeout for the network connections', function () {

  var server;
  var connection;

  before(function (done) {

    server = new EsServer();

    server.routes.get['/timeout'] = function (req, res) {
      // wait for 10 seconds before responding, or the value in the timeout param
      var timeout = parseInt(req.parsedUrl.query.timeout, 10);
      if (isNaN(timeout)) {
        timeout = 10000;
      }

      res.writeHead(200);

      res.on('close', function () {
        clearInterval(dataInterval);
        clearTimeout(finTimeout);
      });

      var dataInterval = setInterval(function () {
        res.write('.');
      }, 100);

      var finTimeout = setTimeout(function () {
        clearInterval(dataInterval);
        res.end('good bye');
      }, timeout);
    };

    server.on('online', function (port) {
      connection = new HttpConnection({
        hostname: 'localhost',
        port: port
      });

      done();
    });

  });

  it('should bail quickly', function (done) {
    this.timeout(1000);
    connection.request({
      path: '/timeout?timeout=1000',
      timeout: 100
    }, function (err, resp, status) {
      err.should.be.an.instanceof(errors.RequestTimeout);
      done();
    });
  });

});
