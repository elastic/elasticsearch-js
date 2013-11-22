if (process.browser) {
  /* jshint browser: true */
  var es = window.elasticsearch;
} else {
  var es = require('../../../src/elasticsearch');
}
var argv = require('./argv');
var server = require('./server');
var path = require('path');
var fs = require('fs');
var _ = require('../../../src/lib/utils');

// current client
var client = null;

// when set to a boolean, hold the test of a ping
var externalExists;

// a reference to a personal instance of ES Server
var esServer = null;

module.exports = {
  create: function create(cb) {
    if (argv.createServer || externalExists === false) {
      if (!esServer) {
        server.start(function (err, _server) {
          esServer = _server;
          if (err) {
            done(err);
          } else {
            doCreateClient(done);
          }
        });
      } else {
        doCreateClient(done);
      }
    } else if (externalExists === void 0) {
      doCreateClient(function () {
        client.ping(function (err) {
          if (err instanceof es.errors.ConnectionFault) {
            externalExists = !err;
            create(done);
          } else {
            done(err);
          }
        });
      });
    } else {
      doCreateClient(done);
    }

    function done(err) {
      cb(err, client);
    }

    function doCreateClient(cb) {
      // close existing client
      if (client) {
        client.close();
      }

      client = new es.Client({
        hosts: [
          {
            host: esServer ? esServer.__hostname : argv.host,
            port: esServer ? esServer.__port : argv.port
          }
        ],
        log: {
          type: process.browser ? 'console' : 'stdio',
          level: 'trace',
          color: false
        }
      });

      _.nextTick(cb);
    }
  },
  get: function () {
    return client;
  }
};
