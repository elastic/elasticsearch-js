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

// location that the logger will write to
var logFile = path.resolve(__dirname, './log');

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
          externalExists = !err;
          create(cb);
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

      if (!process.browser) {
        // delete existing log file
        try {
          fs.unlinkSync(logFile);
        } catch (e) {
          if (!~e.message.indexOf('ENOENT')) {
            return _.nextTick(cb, e);
          }
        }
      }

      client = new es.Client({
        hosts: [
          {
            host: esServer ? esServer.__hostname : argv.host,
            port: esServer ? esServer.__port : argv.port
          }
        ],
        log: {
          type: process.browser ? 'console' : 'file',
          level: 'trace',
          path: logFile
        }
      });

      _.nextTick(cb);
    }
  },
  get: function () {
    return client;
  }
};
