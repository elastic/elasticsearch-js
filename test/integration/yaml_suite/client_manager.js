var BROWSER = process.env.browser;
var VERBOSE = process.env.VERBOSE;

if (BROWSER) {
  /* jshint browser: true */
  var es = window.elasticsearch;
} else {
  var es = require('../../../src/elasticsearch');
}
var argv = require('./argv');
var fs = require('relative-fs').relativeTo(require('path').join(__dirname, '../../../'));
var _ = require('../../../src/lib/utils');

// current client
var client = null;

// when set to a boolean, hold the test of a ping
var externalExists;

module.exports = {
  create: function create(branch, cb) {
    // create a client and ping the server for up to 15 seconds
    doCreateClient({
      logConfig: null
    }, function () {
      var attemptsRemaining = 30;
      var timeout = 500;

      (function ping() {
        client.info({
          maxRetries: 0,
          requestTimeout: 100
        }, function (err, resp) {
          if (err && --attemptsRemaining) {
            setTimeout(ping, timeout);
          } else if (err) {
            cb(new Error('unable to establish contact with ES'));
          } else if (resp.name !== 'elasticsearch_js_test_runner') {
            console.log(resp);
            cb(new Error('Almosted wiped out another es node. Shut-down all instances of ES and try again.'));
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
            : 'warning'
        };

      if (logConfig && logConfig.type === 'tracer') {
        try {
          fs.unlinkSync('../../../elasticsearch-tracer.log');
        } catch (e) {}
      }

      // close existing client
      if (client) {
        client.close();
      }

      client = new es.Client({
        apiVersion: branch,
        hosts: [
          {
            host: argv.host,
            port: argv.port
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
