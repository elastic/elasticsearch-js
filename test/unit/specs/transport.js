var Transport = require('../../../src/lib/transport');
var Host = require('../../../src/lib/host');
var errors = require('../../../src/lib/errors');
var Promise = require('bluebird');

var sinon = require('sinon');
var expect = require('expect.js');
var _ = require('lodash-node');
var nodeList = require('../../fixtures/short_node_list.json');
var stub = require('../../utils/auto_release_stub').make();

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

describe('Transport Class', function () {

  describe('Constructor', function () {
    it('Accepts a log class and intanciates it at this.log', function () {
      function CustomLogClass() {}
      var trans = new Transport({
        log: CustomLogClass
      });

      expect(trans.log).to.be.a(CustomLogClass);
    });

    it('Accepts a connection pool class and intanciates it at this.connectionPool', function () {
      function CustomConnectionPool() {}
      var trans = new Transport({
        connectionPool: CustomConnectionPool
      });

      expect(trans.connectionPool).to.be.a(CustomConnectionPool);
    });

    it('Accepts the name of a connectionPool class that is defined on Transport.connectionPools', function () {
      Transport.connectionPools.custom = function () {};

      var trans = new Transport({
        connectionPool: 'custom'
      });

      expect(trans.connectionPool).to.be.a(Transport.connectionPools.custom);
      delete Transport.connectionPools.custom;
    });

    it('Throws an error when connectionPool config is set wrong', function () {
      expect(function () {
        var trans = new Transport({
          connectionPool: 'pasta'
        });
      }).to.throwError(/invalid connectionpool/i);
    });

    it('calls sniff immediately if sniffOnStart is true', function () {
      stub(Transport.prototype, 'sniff');
      var trans = new Transport({
        sniffOnStart: true
      });

      expect(trans.sniff.callCount).to.eql(1);
    });

    it('schedules a sniff when sniffInterval is set', function () {
      var clock = sinon.useFakeTimers('setTimeout');
      stub(Transport.prototype, 'sniff');

      var trans = new Transport({
        sniffInterval: 25000
      });

      expect(_.size(clock.timeouts)).to.eql(1);
      var id = _.keys(clock.timeouts).pop();
      clock.tick(25000);
      expect(trans.sniff.callCount).to.eql(1);
      expect(_.size(clock.timeouts)).to.eql(1);
      expect(clock.timeouts).to.not.have.key(id);

      clock.restore();
    });

    describe('host config', function () {
      it('rejects non-strings/objects', function () {
        expect(function () {
          var trans = new Transport({
            host: [
              'localhost',
              9393
            ]
          });
        }).to.throwError(TypeError);

        expect(function () {
          var trans = new Transport({
            host: [
              [9292]
            ]
          });
        }).to.throwError(TypeError);
      });

      it('accepts the config value on the host: key', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        var trans = new Transport({
          host: 'localhost'
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host('localhost')
        ]);
      });

      it('accepts the config value on the hosts: key', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        var trans = new Transport({
          hosts: 'localhost'
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0]).to.eql([
          new Host('localhost')
        ]);
      });

      it('accepts A host object as the config', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        var h = new Host('localhost');
        var trans = new Transport({
          host: h
        });

        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        expect(trans.connectionPool.setHosts.lastCall.args[0][0]).to.be(h);
      });

      it('accepts strings as the config', function () {
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        var trans = new Transport({
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
        var trans = new Transport({
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
    });

    describe('randomizeHosts options', function () {
      it('calls _.shuffle be default', function () {
        var _ = require('../../../src/lib/utils');
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        stub(_, 'shuffle');
        var trans = new Transport({
          hosts: 'localhost'
        });

        expect(_.shuffle.callCount).to.eql(1);
      });
      it('skips the call to _.shuffle when false', function () {
        var _ = require('../../../src/lib/utils');
        stub(Transport.connectionPools.main.prototype, 'setHosts');
        stub(_, 'shuffle');
        var trans = new Transport({
          hosts: 'localhost',
          randomizeHosts: false
        });

        expect(_.shuffle.callCount).to.eql(0);
      });
    });
  });

  describe('#defer', function () {
    it('returns a when.js promise by default', function () {
      expect(Transport.prototype.defer().constructor).to.be(Promise.defer().constructor);
    });
  });


  describe('#sniff', function () {
    var trans;

    beforeEach(function () {
      trans = new Transport();
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
      trans.nodesToHostCallback = function (nodes) {
        throw new Error('I failed');
      };
      trans.log.error = function (err) {
        done();
      };
      trans.sniff();
    });

    it('takes the host configs, converts them into Host objects, and passes them to connectionPool.setHosts',
    function (done) {
      trans.sniff(function () {
        expect(trans.connectionPool.setHosts.callCount).to.eql(1);
        var hosts = trans.connectionPool.setHosts.lastCall.args[0];

        expect(hosts).to.have.length(2);

        expect(hosts[0]).to.be.a(Host);
        expect(hosts[0].host).to.eql('10.10.10.100');
        expect(hosts[0].port).to.eql(9205);

        expect(hosts[0]).to.be.a(Host);
        expect(hosts[1].host).to.eql('10.10.10.101');
        expect(hosts[1].port).to.eql(9205);
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
      trans.sniff(function (err, resp, status) {
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
      var trans = new Transport();
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
    it('rejects get requests with bodies', function (done) {
      var trans = new Transport();
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

    describe('gets a body', function () {
      it('serializes it', function (done) {
        var trans = new Transport({
          hosts: 'localhost'
        });
        var conn = getConnection(trans);
        var body = {
          _id: 'simple body',
          name: 'ഢധയമബ'
        };

        stub(conn, 'request', function (params) {
          expect(JSON.parse(params.body)).to.eql(body);
          done();
        });

        trans.request({
          body: body
        });
      });
      it('serializes bulk bodies', function (done) {
        var trans = new Transport({
          hosts: 'localhost'
        });
        var conn = getConnection(trans);
        var body = [
          { _id: 'simple body'},
          { name: 'ഢധയമബ' }
        ];

        stub(conn, 'request', function (params) {
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
        var trans = new Transport({
          hosts: 'localhost'
        });
        var conn = getConnection(trans);
        var body = {
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
        var trans = new Transport();
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
        var trans = new Transport({
          hosts: 'localhost',
          selector: function () {
            throw new Error('I am broken');
          }
        });

        trans.request({}, function (err, body, status) {
          expect(err.message).to.eql('I am broken');
        });
      });
      it('quits if gets an error from an async selector', function () {
        var trans = new Transport({
          hosts: 'localhost',
          selector: function (connections, cb) {
            process.nextTick(function () {
              cb(new Error('I am broken'));
            });
          }
        });

        trans.request({}, function (err, body, status) {
          expect(err.message).to.eql('I am broken');
        });
      });
      it('calls connection#request once it gets one', function (done) {
        var trans = new Transport({
          hosts: 'localhost'
        });
        var conn = getConnection(trans);

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
          var randomSelector = require('../../../src/lib/selectors/random');
          var connections;
          var attempts = 0;
          function failRequest(params, cb) {
            attempts++;
            process.nextTick(function () {
              cb(new Error('Unable to do that thing you wanted'));
            });
          }

          var trans = new Transport({
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
        var tran = new Transport();
        shortCircuitRequest(tran);
        var ret = tran.request({}, _.noop);
        expect(ret).to.be.a('object');
        expect(ret.abort).to.be.a('function');
      });
      it('the object is a promise when a callback is not suplied', function () {
        var tran = new Transport();
        shortCircuitRequest(tran);
        var ret = tran.request({});
        expect(Promise.is(ret)).to.be(true);
        expect(ret.abort).to.be.a('function');
        ret.then(_.noop, _.noop); // prevent complaining from bluebird
      });
      it('promise is always pulled from the defer created by this.defer()', function () {
        var fakePromise = {};
        var origDefer = Transport.prototype.defer;
        var tran = new Transport({
          defer: function () {
            return {
              resolve: _.noop,
              reject: _.noop,
              promise: fakePromise
            };
          }
        });
        shortCircuitRequest(tran);
        var ret = tran.request({});
        Transport.prototype.defer = origDefer;
        expect(ret).to.be(fakePromise);
        expect(ret.abort).to.be.a('function');
      });
    });

    describe('aborting', function () {
      it('prevents the request from starting if called in the same tick', function () {
        var tran = new Transport({
          host: 'localhost'
        });

        var con = getConnection(tran);
        stub(con, 'request', function () {
          throw new Error('Request should not have been called.');
        });

        var ret = tran.request({});
        ret.abort();
      });
      it('calls the function returned by the connector if it has been called', function (done) {
        var tran = new Transport({
          host: 'localhost'
        });

        var con = getConnection(tran);
        stub(con, 'request', function () {
          process.nextTick(function () {
            ret.abort();
          });
          return function () {
            done();
          };
        });

        var ret = tran.request({});
      });
      it('ignores the response from the connection when the connector does not support aborting', function (done) {
        var tran = new Transport({
          host: 'localhost'
        });

        var con = getConnection(tran);
        stub(con, 'request', function (params, cb) {
          cb();
        });

        var ret = tran.request({}, function () {
          throw new Error('Callback should not have been called.');
        });
        ret.abort();
        setTimeout(done, 1);
      });
    });

    describe('timeout', function () {
      it('uses 30 seconds for the default', function () {
        var clock = sinon.useFakeTimers();
        var tran = new Transport({});
        var err;

        var prom = tran.request({});
        // disregard promise, prevent bluebird's warnings
        prom.then(_.noop, _.noop);

        expect(_.size(clock.timeouts)).to.eql(1);
        _.each(clock.timeouts, function (timer, id) {
          expect(timer.callAt).to.eql(30000);
          clearTimeout(id);
        });
        clock.restore();
      });
      it('inherits the requestTimeout from the transport', function () {
        var clock = sinon.useFakeTimers();
        var tran = new Transport({
          requestTimeout: 5000
        });
        var err;

        var prom = tran.request({});
        // disregard promise, prevent bluebird's warnings
        prom.then(_.noop, _.noop);

        expect(_.size(clock.timeouts)).to.eql(1);
        _.each(clock.timeouts, function (timer, id) {
          expect(timer.callAt).to.eql(5000);
          clearTimeout(id);
        });
        clock.restore();
      });


      _.each([false, 0, null], function (falsy) {
        it('skips the timeout when it is ' + falsy, function () {
          var clock = sinon.useFakeTimers();
          var tran = new Transport({});
          stub(tran.connectionPool, 'select', function () {});

          tran.request({
            requestTimeout: falsy
          }, function (_err) {});

          expect(_.size(clock.timeouts)).to.eql(0);
          clock.restore();
        });
      });
    });
  });

  describe('#close', function () {
    it('proxies the call to it\'s log and connection pool', function () {
      var tran = new Transport();
      stub(tran.connectionPool, 'close');
      stub(tran.log, 'close');

      tran.close();

      expect(tran.connectionPool.close.callCount).to.eql(1);
      expect(tran.log.close.callCount).to.eql(1);
    });
  });

});
