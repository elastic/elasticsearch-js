const BROWSER = process.env.browser;
const VERBOSE = process.env.VERBOSE;
const JENKINS = !!process.env.JENKINS_HOME;

let es;
if (BROWSER) {
  es = window.elasticsearch;
} else {
  es = require('../../../src/elasticsearch');
}

const _ = require('../../../src/lib/utils');
const path = require('path');
const fs = require('fs');
const fromRoot = _.bindKey(path, 'join', require('find-root')(__dirname));
const Bluebird = require('bluebird');

// current client
let client = null;

module.exports = {
  create: function create(apiVersion, port, host, cb) {
    // create a client and ping the server for up to 15 seconds
    doCreateClient({
      logConfig: null
    }, function () {
      let attemptsRemaining = 60;
      const timeout = 500;

      (function ping() {
        client.info({
          maxRetries: 0,
          requestTimeout: 100
        }, function (err, resp) {
          if (err && --attemptsRemaining) {
            setTimeout(ping, timeout);
          } else if (err) {
            cb(new Error('unable to establish contact with ES at ' + JSON.stringify({
              host: host,
              port: port,
              err: err
            })));
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
        cb = options;
        options = {};
      }

      let logConfig = {};
      if (_.has(options, 'logConfig')) {
        logConfig = options.logConfig;
      } else {
        if (BROWSER) {
          logConfig.type = 'console';
        } else if (JENKINS || !VERBOSE) {
          logConfig.type = 'stdio';
        } else {
          logConfig.type = 'tracer';
        }

        logConfig.level = JENKINS || VERBOSE ? 'trace' : 'error';
      }

      if (logConfig && logConfig.type === 'tracer') {
        try {
          fs.unlinkSync(fromRoot('tmp/tracer.log'));
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
        }
      }

      // close existing client
      if (client) {
        client.close();
      }

      client = new es.Client({
        apiVersion: apiVersion,
        hosts: [
          {
            host: host,
            port: port
          }
        ],
        log: logConfig,
        defer: function () {
          return Bluebird.defer();
        }
      });

      client.clearEs = function () {
        return Bluebird.all([
          client.indices.delete({ index: '*', ignore: 404 }),
          client.indices.deleteTemplate({ name: '*', ignore: 404 }),
          client.snapshot.getRepository()
          .then(_.keys)
          .map(function (repo) {
            return client.snapshot.get({
              repository: repo,
              snapshot: '_all'
            })
            .then(function (resp) {
              return _.map(resp.snapshots, 'snapshot');
            }, function () {
              return [];
            })
            .map(function (snapshot) {
              return client.snapshot.delete({
                repository: repo,
                snapshot: snapshot
              });
            }, { concurrency: 1 })
            .then(function () {
              return client.snapshot.deleteRepository({
                repository: repo
              });
            });
          }, { concurrency: 1 })
        ]);
      };

      _.nextTick(cb);
    }
  },
  get: function () {
    return client;
  }
};
