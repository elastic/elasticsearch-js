const ConnectionAbstract = require('../../../src/lib/connection');
const Host = require('../../../src/lib/host');
const sinon = require('sinon');
const expect = require('expect.js');
const _ = require('lodash');
const errors = require('../../../src/lib/errors');

const stub = require('../../utils/auto_release_stub').make();

describe('Connection Abstract', function () {
  const host = new Host('localhost:9200');

  it('constructs with defaults for host, and bound', function () {
    const conn = new ConnectionAbstract(host);
    expect(conn.host).to.be(host);
  });

  it('requires a valid host', function () {
    expect(function () {
      const conn = new ConnectionAbstract();
    }).to.throwError(TypeError);

    expect(function () {
      const conn = new ConnectionAbstract({});
    }).to.throwError(TypeError);
  });

  it('required that the request method is overridden', function () {
    expect(function () {
      const conn = new ConnectionAbstract(host);
      conn.request();
    }).to.throwError(/overwrit/);
  });

  describe('#ping', function () {
    it('accpets just a callback', function () {
      const conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      const cb = function () {};
      conn.ping(cb);
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.be.a('object');
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('accpets just params', function () {
      const conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      conn.ping({});
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.be.a('object');
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('allows overriding the requestTimeout, method, and path', function () {
      const conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      const params = {
        method: 'HEAD',
        path: '/',
        requestTimeout: 10000
      };
      conn.ping(params);
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.eql(params);
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('defaults to the pingTimeout in the config', function () {
      const conn = new ConnectionAbstract(host, { pingTimeout: 5000 });
      const clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      stub.autoRelease(clock);

      stub(conn, 'request');

      expect(_.size(clock.timers)).to.eql(0);
      conn.ping();
      expect(_.size(clock.timers)).to.eql(1);
      expect(clock.timers[_.keys(clock.timers).shift()].delay).to.eql(5000);
    });

    it('calls it\'s own request method', function () {
      const conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      conn.ping();
      expect(conn.request.callCount).to.eql(1);
    });

    it('sets a timer for the request', function (done) {
      const conn = new ConnectionAbstract(host);
      const clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      stub.autoRelease(clock);
      let order = 0;

      stub(conn, 'request', function (params, cb) {
        setTimeout(function () {
          expect(++order).to.eql(2);
          cb();
        }, 10001);
      });

      conn.ping({
        requestTimeout: 100
      }, function (err) {
        expect(++order).to.eql(1);
        expect(err).to.be.an(errors.RequestTimeout);
      });

      process.nextTick(function () {
        clock.tick(1000);
        clock.tick(10000);
        done();
      });
    });
    it('calls the requestAborter if req takes too long', function (done) {
      const conn = new ConnectionAbstract(host);
      const clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      stub.autoRelease(clock);
      let order = 0;

      stub(conn, 'request', function (params, cb) {
        setTimeout(function () {
          expect(++order).to.eql(3);
          cb();
        }, 10001);

        return function () {
          expect(++order).to.eql(1);
        };
      });

      conn.ping({
        requestTimeout: 100
      }, function (err) {
        expect(++order).to.eql(2);
        expect(err).to.be.an(errors.RequestTimeout);
      });

      process.nextTick(function () {
        clock.tick(1000);
        clock.tick(10000);
        done();
      });
    });

    // it('ignores the response from the request if it already aborted');
  });

  describe('#setStatus', function () {
    it('emits the "status set" event with `new`, `old` & `conn` args', function () {
      const conn = new ConnectionAbstract(host);
      let emitted = false;

      conn.emit = function (eventName) {
        emitted = {
          name: eventName,
          args: Array.prototype.slice.call(arguments, 1)
        };
      };

      conn.setStatus('closed');
      expect(emitted.name).to.eql('status set');
      expect(emitted.args).to.eql(['closed', undefined, conn]);
    });

    it('stores the status in this.status', function () {
      const conn = new ConnectionAbstract(host);

      conn.setStatus('closed');
      expect(conn.status).to.eql('closed');
    });
  });
});
