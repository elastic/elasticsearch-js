var ConnectionAbstract = require('../../../src/lib/connection');
var Host = require('../../../src/lib/host');
var sinon = require('sinon');
var expect = require('expect.js');
var _ = require('lodash-node');
var errors = require('../../../src/lib/errors');

var stub = require('../../utils/auto_release_stub').make();

describe('Connection Abstract', function () {
  var host = new Host('localhost:9200');

  it('constructs with defaults for host, and bound', function () {
    var conn = new ConnectionAbstract(host);
    expect(conn.host).to.be(host);
  });

  it('requires a valid host', function () {
    expect(function () {
      new ConnectionAbstract();
    }).to.throwError(TypeError);

    expect(function () {
      new ConnectionAbstract({});
    }).to.throwError(TypeError);
  });

  it('required that the request method is overridden', function () {
    expect(function () {
      var conn = new ConnectionAbstract(host);
      conn.request();
    }).to.throwError(/overwrit/);
  });

  describe('#ping', function () {
    it('accpets just a callback', function () {
      var conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      var cb = function () {};
      conn.ping(cb);
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.be.a('object');
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('accpets just params', function () {
      var conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      conn.ping({});
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.be.a('object');
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('allows overriding the requestTimeout, method, and path', function () {
      var conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      var params = {
        method: 'HEAD',
        path: '/',
        requestTimeout: 10000
      };
      conn.ping(params);
      expect(conn.request.callCount).to.eql(1);
      expect(conn.request.lastCall.args[0]).to.eql(params);
      expect(conn.request.lastCall.args[1]).to.be.a('function');
    });

    it('calls it\'s own request method', function () {
      var conn = new ConnectionAbstract(host);
      var football = {};
      stub(conn, 'request');
      conn.ping();
      expect(conn.request.callCount).to.eql(1);
    });

    it('sets a timer for the request', function (done) {
      var conn = new ConnectionAbstract(host);
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      var order = 0;

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
        clock.restore();
        done();
      });
    });
    it('calls the requestAborter if req takes too long', function (done) {
      var conn = new ConnectionAbstract(host);
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      var order = 0;

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
        clock.restore();
        done();
      });
    });

    // it('ignores the response from the request if it already aborted');
  });

  describe('#setStatus', function () {
    it('emits the "status set" event with `new`, `old` & `conn` args', function () {
      var conn = new ConnectionAbstract(host);
      var emitted = false;

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
      var conn = new ConnectionAbstract(host);

      conn.setStatus('closed');
      expect(conn.status).to.eql('closed');
    });
  });
});
