const Transport = require('../../../src/lib/transport');
const Host = require('../../../src/lib/host');
const errors = require('../../../src/lib/errors');

const sinon = require('sinon');
const expect = require('expect.js');
const _ = require('lodash');
const nodeList = require('../../fixtures/short_node_list.5.0.json');
const stub = require('../../utils/auto_release_stub').make();

/**
 * Allows the tests call #request() without it doing anything past trying to select
 * a connection.
 * @param  {Transport} tran - the transport to neuter
 */
function shortCircuitRequest(tran, delay) {
  stub(tran.connectionPool, 'select', function (cb) {
    setTimeout(cb, delay);
  });
}

function getConnection(transport, status) {
  return transport.connectionPool.getConnections(status || 'alive', 1).pop();
}

function CustomConnectionPool() {}
CustomConnectionPool.prototype = Object.create(Transport.connectionPools.main.prototype);

describe('Transport Class', function () {

  describe('Constructor', function () {
    it('Accepts a log class and intanciates it at this.log', function () {
      function CustomLogClass() {}
      const trans = new Transport({
        log: CustomLogClass
      });

      expect(trans.log).to.be.a(CustomLogClass);
    });

    it('Accepts a connection pool class and intanciates it at this.connectionPool', function () {
      const trans = new Transport({
        connectionPool: CustomConnectionPool
      });

      expect(trans.connectionPool).to.be.a(CustomConnectionPool);
    });

    it('Accepts the name of a connectionPool class that is defined on Transport.connectionPools', function () {
      Transport.connectionPools.custom = CustomConnectionPool;

      const trans = new Transport({
        connectionPool: 'custom'
      });

      expect(trans.connectionPool).to.be.a(Transport.connectionPools.custom);
      delete Transport.connectionPools.custom;
    });

    it('Throws an error when connectionPool config is set wrong', function () {
      expect(function () {
        new Transport({
          connectionPool: 'pasta'
        });
      }).to.throwError(/invalid connectionpool/i);
    });

    it('calls sniff immediately if sniffOnStart is true', function () {
      stub(Transport.prototype, 'sniff');
      const trans = new Transport({
        sniffOnStart: true
      });

      expect(trans.sniff.callCount).to.eql(1);
    });

    it('schedules a sniff when sniffInterval is set', function () {
      const clock = sinon.useFakeTimers('setTimeout');
      stub.autoRelease(clock);
      stub(Transport.prototype, 'sniff');

      const trans = new Transport({
        sniffInterval: 25000
      });

      expect(_.size(clock.timers)).to.eql(1);
      const id = _.keys(clock.timers).pop();
      clock.tick(25000);
      expect(trans.sniff.callCount).to.eql(1);
      expect(_.size(clock.timers)).to.eql(1);
      expect(clock.timers).to.not.have.key(id);

    });

    describe('config.sniffedNodesProtocol', function () {
      it('Assigns to itself', function () {
        const football = {};
        const trans = new Transport({
          sniffedNodesProtocol: football
        });
        expect(trans).to.have.property('sniffedNodesProtocol', football);
      });

      it('Defaults to null when no hosts given', function () {
        const trans = new Transport({
          hosts: []
        });

        expect(trans).to.have.property('sniffedNodesProtocol', null);
      });

      it('Defaults to "http" when a single http host given', function () {
        const trans = new Transport({
          hosts: [
            new Host({
              protocol: 'http'
            })
          ]
        });

        expect(trans).to.have.property('sniffedNodesProtocol', 'http');
      });

      it('Defaults to "http" when multiple http host given', function () {
        const trans = new Transport({
          hosts: [
            new Host(),
            'http://google.com',
            {
              host: 'foo',
              path: 'bar'
            }
          ]
        });

        expect(trans).to.have.property('sniffedNodesProtocol', 'http');
      });

      it('Defaults to "https" when a single https host given', function () {
        const trans = new Transport({
          host: {
            protocol: 'https'
          }
        });

        expect(trans).to.have.property('sniffedNodesProtocol', 'https');
      });

      it('Defaults to "https" when every seed host uses https', function () {
        const trans = new Transport({
          hosts: [
            'https://localhost:9200',
            new Host({
              protocol: 'https'
            }),
            {
              protocol: 'https'
            }
          ]
        });

        expect(trans).to.have.property('sniffedNodesProtocol', 'https');
      });
    });

    describe('host config', function () {
      it('rejects non-strings/objects', function () {
        expect(function () {
          new Transport({
            host: [
              'localhost',
              9393
            ]
          });
        }).to.throwError(TypeError);

        expect(function () {
          new Transport({
            host: [
              [9292]
            ]
          });
        }).to.throwError(TypeError);
      });

      it('accepts the config value on the host: key', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        const trans = new Transport({
          host: 'localhost'
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host('localhost')
        ]);
      });

      it('accepts the config value on the hosts: key', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        const trans = new Transport({
          hosts: 'localhost'
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host('localhost')
        ]);
      });

      it('accepts A host object as the config', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        const h = new Host('localhost');
        const trans = new Transport({
          host: h
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0][0]).to.be(h);
      });

      it('accepts strings as the config', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        const trans = new Transport({
          hosts: [
            'localhost:8888',
          ]
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host({
            host: 'localhost',
            port: 8888
          })
        ]);
      });

      it('accepts objects as the config', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        const trans = new Transport({
          hosts: [
            {
              protocol: 'https',
              host: 'myescluster.com',
              port: '777',
              path: '/bon/iver',
              query: {
                access: 'all'
              }
            }
          ]
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host('https://myescluster.com:777/bon/iver?access=all')
        ]);
      });

      it('passes the global config to the objects', function () {
        // since we can't mock out the Host constructor to see it's args, we will just
        // check that it's getting the suggestCompression setting
        stub(Transport.connectionPools.main.prototype, 'setHosts');

        let trans = new Transport({
          suggestCompression: true,
          hosts: ['localhost:9200']
        });

        expect(trans.connectionPool.setHosts).to.have.property('callCount', 1);
        let hosts = trans.connectionPool.setHosts.firstCall.args[0];
        expect(hosts).to.have.length(1);
        expect(hosts[0]).to.have.property('suggestCompression', true);

        trans = new Transport({
          hosts: ['localhost:9200']
        });

        expect(trans.connectionPool.setHosts).to.have.property('callCount', 2);
        hosts = trans.connectionPool.setHosts.lastCall.args[0];
        expect(hosts).to.have.length(1);
        expect(hosts[0]).to.have.property('suggestCompression', false);
      });
    });

    describe('randomizeHosts options', function () {
      it('calls _.shuffle be default', function () {
        const _ = require('../../../src/lib/utils');
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        stub(_, 'shuffle');
        new Transport({
          hosts: 'localhost'
        });

        expect(_.shuffle.callCount).to.eql(1);
      });
      it('skips the call to _.shuffle when false', function () {
        const _ = require('../../../src/lib/utils');
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        stub(_, 'shuffle');
        new Transport({
          hosts: 'localhost',
          randomizeHosts: false
        });

        expect(_.shuffle.callCount).to.eql(0);
      });
    });
  });

  describe('#defer', function () {
    it('returns a custom defer object', function () {
      const defer = Transport.prototype.defer();
      expect(defer).to.have.property('promise');
      expect(defer).to.have.property('resolve');
      expect(defer).to.have.property('reject');
    });
  });


  describe('#sniff', function () {
    let trans;

    beforeEach(function () {
      trans = new Transport({ suggestCompression: true });
      stub(trans, 'request', function (params, cb) {
        process.nextTick(function () {
          cb(void 0, {
            ok: true,
            cluster_name: 'clustername',
            nodes: nodeList
          }, 200);
        });
      });

      stub(trans.connectionPool, 'setHosts');
    });

    it('works without a callback', function (done) {
      trans.sniff();
      setTimeout(function () {
        expect(trans.request.callCount).to.eql(1);
        done();
      }, 5);
    });
    it('calls the nodesToHostCallback with the list of nodes', function (done) {
      trans.nodesToHostCallback = function (nodes) {
        expect(nodes).to.eql(nodeList);
        done();
        return [];
      };
      trans.sniff();
    });

    it('logs an error if nodes to host throws one', function (done) {
      trans.nodesToHostCallback = function () {
        throw new Error('I failed');
      };
      trans.log.error = function () {
        done();
      };
      trans.sniff();
    });

    it('takes the host configs, converts them into Host objects, and passes them to connectionPool.setHosts',
    function (done) {
      trans.sniff(function () {
        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        const hosts = trans.connectionPool.setHosts.lastCall.args[0];

        expect(hosts).to.have.length(2);

        expect(hosts[0]).to.be.a(Host);
        expect(hosts[0].host).to.eql('127.0.0.1');
        expect(hosts[0].port).to.eql(9400);

        expect(hosts[0]).to.be.a(Host);
        expect(hosts[1].host).to.eql('published.hostname');
        expect(hosts[1].port).to.eql(9440);
        done();
      });
    });

    it('passes the global config to the objects', function (done) {
      // since we can't mock out the Host constructor to see it's args, we will just
      // check that it's getting the suggestCompression setting
      trans.sniff(function () {
        expect(trans.connectionPool.setHosts).to.have.property('callCount', 1);
        const hosts = trans.connectionPool.setHosts.lastCall.args[0];
        expect(hosts).to.have.length(2);
        expect(hosts[0]).to.have.property('suggestCompression', true);
        expect(hosts[1]).to.have.property('suggestCompression', true);
        done();
      });
    });

    it('passed back errors caught from the request', function (done) {
      trans.request.func = function (params, cb) {
        process.nextTick(function () {
          cb(new Error('something funked up'));
        });
      };

      trans.sniff(function (err) {
        expect(err.message).to.eql('something funked up');
        done();
      });
    });
    it('passed back the full server response', function (done) {
      trans.sniff(function (err, resp) {
        expect(resp.ok).to.eql(true);
        expect(resp.cluster_name).to.eql('clustername');
        done();
      });
    });
    it('passed back the server response code', function (done) {
      trans.sniff(function (err, resp, status) {
        expect(status).to.eql(200);
        done();
      });
    });
  });

  describe('#request', function () {
    it('logs when it begins', function (done) {
      const trans = new Transport();
      stub(trans.log, 'debug');
      stub(trans.connectionPool, 'select', function (cb) {
        // simulate "no connections"
        process.nextTick(cb);
      });

      trans.request({}, function () {
        expect(trans.log.debug.callCount).to.eql(1);
        done();
      });
    });

    it('rejects GET requests with a body (callback)', function (done) {
      const trans = new Transport();
      stub(trans.log, 'debug');
      stub(trans.connectionPool, 'select', function (cb) {
        // simulate "no connections"
        process.nextTick(cb);
      });
      trans.request({
        body: 'JSON!!',
        method: 'GET'
      }, function (err) {
        expect(err).to.be.a(TypeError);
        expect(err.message).to.match(/body.*method.*get/i);
        done();
      });
    });

    it('rejects GET requests with a body (promise)', function (done) {
      const trans = new Transport();
      stub(trans.log, 'debug');
      stub(trans.connectionPool, 'select', function (cb) {
        // simulate "no connections"
        process.nextTick(cb);
      });
      trans.request({
        body: 'JSON!!',
        method: 'GET'
      })
      .then(function () {
        done(new Error('expected the request to fail!'));
      }, function (err) {
        expect(err).to.be.a(TypeError);
        expect(err.message).to.match(/body.*method.*get/i);
        done();
      });
    });

    describe('gets a body', function () {
      it('serializes it', function (done) {
        const trans = new Transport({
          hosts: 'localhost'
        });
        const conn = getConnection(trans);
        const body = {
          _id: 'simple body',
          name: 'ഢധയമബ'
        };

        stub(conn, 'request', function (params) {
          expect(params.headers).to.have.property('content-type', 'application/json');
          expect(JSON.parse(params.body)).to.eql(body);
          done();
        });

        trans.request({
          body: body
        });
      });
      it('serializes bulk bodies', function (done) {
        const trans = new Transport({
          hosts: 'localhost'
        });
        const conn = getConnection(trans);
        const body = [
          { _id: 'simple body' },
          { name: 'ഢധയമബ' }
        ];

        stub(conn, 'request', function (params) {
          expect(params.headers).to.have.property('content-type', 'application/x-ndjson');
          expect(params.body).to.eql(
            '{"_id":"simple body"}\n' +
            '{"name":"ഢധയമബ"}\n'
          );
          done();
        });

        trans.request({
          body: body,
          bulkBody: true
        });
      });
    });

    describe('gets a body it cant serialize', function () {
      it('throws an error', function () {
        const trans = new Transport({
          hosts: 'localhost'
        });
        getConnection(trans);
        const body = {
          _id: 'circular body'
        };
        body.body = body;

        expect(function () {
          trans.request({
            body: body
          });
        }).to.throwError(TypeError);
      });
    });

    describe('when selecting a connection', function () {
      it('logs a warning, and responds with NoConnection when it receives nothing', function (done) {
        const trans = new Transport();
        stub(trans.log, 'warning');
        trans.request({}, function (err, body, status) {
          expect(trans.log.warning.callCount).to.eql(1);
          expect(err).to.be.a(errors.NoConnections);
          expect(body).to.be(undefined);
          expect(status).to.be(undefined);
          done();
        });
      });
      it('quits if a sync selector throws an error', function () {
        const trans = new Transport({
          hosts: 'localhost',
          selector: function () {
            throw new Error('I am broken');
          }
        });

        trans.request({}, function (err) {
          expect(err.message).to.eql('I am broken');
        });
      });
      it('quits if gets an error from an async selector', function () {
        const trans = new Transport({
          hosts: 'localhost',
          selector: function (connections, cb) {
            process.nextTick(function () {
              cb(new Error('I am broken'));
            });
          }
        });

        trans.request({}, function (err) {
          expect(err.message).to.eql('I am broken');
        });
      });
      it('calls connection#request once it gets one', function (done) {
        const trans = new Transport({
          hosts: 'localhost'
        });
        const conn = getConnection(trans);

        stub(conn, 'request', function () {
          done();
        });

        trans.request({}, function () {});
      });
    });

    describe('gets a connection err', function () {
      // create a test that checks N retries
      function testRetries(retries) {
        return function (done) {
          const randomSelector = require('../../../src/lib/selectors/random');
          let connections;
          let attempts = 0;
          function failRequest(params, cb) {
            attempts++;
            process.nextTick(function () {
              cb(new Error('Unable to do that thing you wanted'));
            });
          }

          const trans = new Transport({
            hosts: _.map(new Array(retries + 1), function (val, i) {
              return 'localhost/' + i;
            }),
            maxRetries: retries,
            selector: function (_conns) {
              connections = _conns;
              return randomSelector(_conns);
            }
          });

          // trigger a select so that we can harvest the connection list
          trans.connectionPool.select(_.noop);
          _.each(connections, function (conn) {
            stub(conn, 'request', failRequest);
          });

          trans.request({}, function (err, resp, body) {
            expect(attempts).to.eql(retries + 1);
            expect(err).to.be.a(errors.ConnectionFault);
            expect(resp).to.be(undefined);
            expect(body).to.be(undefined);
            trans.close();
            done();
          });
        };
      }
      it('retries when there are retries remaining', testRetries(_.random(25, 40)));
      it('responds when there are no retries', testRetries(0));
    });


    describe('return value', function () {
      it('returns an object with an abort() method when a callback is sent', function () {
        const tran = new Transport();
        shortCircuitRequest(tran);
        const ret = tran.request({}, _.noop);
        expect(ret).to.be.a('object');
        expect(ret.abort).to.be.a('function');
      });
      it('the object is a promise when a callback is not suplied', function () {
        const tran = new Transport();
        shortCircuitRequest(tran);
        const ret = tran.request({});
        expect(ret.then).to.be.a('function');
        expect(ret.abort).to.be.a('function');
        ret.then(_.noop, _.noop); // prevent complaining from bluebird
      });
      it('promise is always pulled from the defer created by this.defer()', function () {
        const fakePromise = {};
        const origDefer = Transport.prototype.defer;
        const tran = new Transport({
          defer: function () {
            return {
              resolve: _.noop,
              reject: _.noop,
              promise: fakePromise
            };
          }
        });
        shortCircuitRequest(tran);
        const ret = tran.request({});
        Transport.prototype.defer = origDefer;
        expect(ret).to.be(fakePromise);
        expect(ret.abort).to.be.a('function');
      });
    });

    describe('handles process.domain', function () {
      if (process && process.hasOwnProperty('domain')) {
        it('works without a domain', function () {
          expect(process.domain).to.be(null);
          const tran = new Transport();
          shortCircuitRequest(tran);
          tran.request({}, function () {
            expect(process.domain).to.be(null);
          });
        });

        it('binds the callback to the correct domain', function () {
          expect(process.domain).to.be(null);
          const domain = require('domain').create();
          domain.run(function () {
            const tran = new Transport();
            shortCircuitRequest(tran);
            expect(process.domain).not.to.be(null);
            const startingDomain = process.domain;
            tran.request({}, function () {
              expect(process.domain).not.to.be(null);
              expect(process.domain).to.be(startingDomain);
              process.domain.exit();
            });
          });
        });
      }
    });

    describe('aborting', function () {
      it('prevents the request from starting if called in the same tick', function () {
        const tran = new Transport({
          host: 'localhost'
        });

        const con = getConnection(tran);
        stub(con, 'request', function () {
          throw new Error('Request should not have been called.');
        });

        const ret = tran.request({});
        ret.abort();
      });
      it('calls the function returned by the connector if it has been called', function (done) {
        const tran = new Transport({
          host: 'localhost'
        });

        const con = getConnection(tran);
        let ret; // eslint-disable-line prefer-const
        stub(con, 'request', function () {
          process.nextTick(function () {
            ret.abort();
          });
          return function () {
            done();
          };
        });

        ret = tran.request({});
      });
      it('ignores the response from the connection when the connector does not support aborting', function (done) {
        const tran = new Transport({
          host: 'localhost'
        });

        const con = getConnection(tran);
        stub(con, 'request', function (params, cb) {
          cb();
        });

        const ret = tran.request({}, function () {
          throw new Error('Callback should not have been called.');
        });
        ret.abort();
        setTimeout(done, 1);
      });
    });

    describe('timeout', function () {
      it('uses 30 seconds for the default', function () {
        const clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
        stub.autoRelease(clock);
        const tran = new Transport({});

        const prom = tran.request({});
        // disregard promise, prevent bluebird's warnings
        prom.then(_.noop, _.noop);

        expect(_.size(clock.timers)).to.eql(1);
        _.each(clock.timers, function (timer, id) {
          expect(timer.callAt).to.eql(30000);
          clearTimeout(id);
        });
      });
      it('inherits the requestTimeout from the transport', function () {
        const clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
        stub.autoRelease(clock);
        const tran = new Transport({
          requestTimeout: 5000
        });

        const prom = tran.request({});
        // disregard promise, prevent bluebird's warnings
        prom.then(_.noop, _.noop);

        expect(_.size(clock.timers)).to.eql(1);
        _.each(clock.timers, function (timer, id) {
          expect(timer.callAt).to.eql(5000);
          clearTimeout(id);
        });
      });


      _.each([false, 0, null], function (falsy) {
        it('skips the timeout when it is ' + falsy, function () {
          const clock = sinon.useFakeTimers();
          stub.autoRelease(clock);
          const tran = new Transport({});
          stub(tran.connectionPool, 'select', function () {});

          tran.request({
            requestTimeout: falsy
          }, function () {});

          expect(_.size(clock.timers)).to.eql(0);
        });
      });
    });
  });

  describe('#setHosts', function () {
    it('accepts strings, host objects, and host configs', function () {

      const trans = new Transport({ suggestCompression: true });
      stub(trans.connectionPool, 'setHosts');

      trans.setHosts([
        { host: 'first.server', port: 9200 },
        'http://second.server:9200',
        new Host('http://third.server:9200')
      ]);

      sinon.assert.calledOnce(trans.connectionPool.setHosts);
      let host;
      const hosts = trans.connectionPool.setHosts.firstCall.args[0];

      expect(hosts).to.have.length(3);

      host = hosts.shift();
      expect(host).to.be.a(Host);
      expect(host.host).to.eql('first.server');
      expect(host.port).to.eql(9200);
      expect(host.suggestCompression).to.be(true);

      host = hosts.shift();
      expect(host).to.be.a(Host);
      expect(host.host).to.eql('second.server');
      expect(host.port).to.eql(9200);
      expect(host.suggestCompression).to.be(true);

      host = hosts.shift();
      expect(host).to.be.a(Host);
      expect(host.host).to.eql('third.server');
      expect(host.port).to.eql(9200);
      expect(host.suggestCompression).to.be(false);
    });
  });

  describe('#close', function () {
    it('proxies the call to it\'s log and connection pool', function () {
      const tran = new Transport();
      stub(tran.connectionPool, 'close');
      stub(tran.log, 'close');

      tran.close();

      expect(tran.connectionPool.close.callCount).to.eql(1);
      expect(tran.log.close.callCount).to.eql(1);
    });
  });

});
