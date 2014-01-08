var BROWSER = process.env.browser;
var VERBOSE = process.env.VERBOSE;

if (BROWSER) {
  /* jshint browser: true */
  var es = window.elasticsearch;
} else {
  var es = require('../../../src/elasticsearch');
}
var argv = require('./argv');
var server = require('./server');
// var path = require('path');
// var fs = require('fs');
var _ = require('../../../src/lib/utils');

// current client
var client = null;

// when set to a boolean, hold the test of a ping
var externalExists;

// a reference to a personal instance of ES Server
var esServer = null;

module.exports = {
  create: function create(cb) {
    // create a client and ping the server for up to 15 seconds
    doCreateClient({
      logConfig: null
    }, function () {
      var attemptsRemaining = 30;
      var timeout = 500;

      (function ping() {
        client.ping({
          maxRetries: 0,
          requestTimeout: 100
        }, function (err) {
          if (err && --attemptsRemaining) {
            setTimeout(ping, timeout);
          } else if (err) {
            cb(new Error('unable to establish contact with ES'));
          } else {
            // create a new client
            doCreateClient(function () {
              cb(void 0, client);
            });
          }
        });
      }());
    });

    function doCreateClient(options, cb) {
      if (typeof options === 'function') {
        cb = options, options = {};
      }

      var logConfig = _.has(options, 'logConfig')
        ? options.logConfig
        : {
          type: BROWSER
            ? 'console'
            : VERBOSE
              ? 'tracer'
              : 'stdio',
          level: VERBOSE
            ? 'trace'
            : 'warning',
          path: VERBOSE ? undefined : false
        };

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
        log: logConfig
      });

      _.nextTick(cb);
    }
  },
  get: function () {
    return client;
  }
};
