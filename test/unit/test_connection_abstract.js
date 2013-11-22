var ConnectionAbstract = require('../../src/lib/connection');
var Host = require('../../src/lib/host');
var sinon = require('sinon');
var _ = require('lodash');

describe('Connection Abstract', function () {
  var host = new Host('localhost:9200');

  it('constructs with defaults for deadTimeout, requestCount, host, and bound', function () {
    var conn = new ConnectionAbstract(host);
    conn.deadTimeout.should.eql(30000);
    conn.requestCount.should.eql(0);
    conn.host.should.be.exactly(host);
    conn.bound.should.have.properties('resuscitate');
  });

  it('requires a valid host', function () {
    (function () {
      new ConnectionAbstract();
    }).should.throw(TypeError);

    (function () {
      new ConnectionAbstract({});
    }).should.throw(TypeError);
  });

  it('required that the request method is overridden', function () {
    (function () {
      var conn = new ConnectionAbstract(host);
      conn.request();
    }).should.throw(/overwrit/);
  });

  describe('#ping', function () {
    it('requires a callback', function () {
      (function () {
        (new ConnectionAbstract(host)).ping();
      }).should.throw(TypeError);
    });

    it('calls it\'s own request method', function () {
      var conn = new ConnectionAbstract(host);
      var football = {};
      conn.request = function () {
        return football;
      };

      conn.ping(function () {}).should.be.exactly(football);
    });
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
      emitted.name.should.eql('status set');
      emitted.args.should.eql(['closed', null, conn]);
    });

    it('stores the status in this.status', function () {
      var conn = new ConnectionAbstract(host);

      conn.setStatus('closed');
      conn.status.should.eql('closed');
    });

    it('sets a timeout when set to dead, and removed when alive', function () {
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      var conn = new ConnectionAbstract(host);

      var start = _.size(clock.timeouts);
      conn.setStatus('dead');
      _.size(clock.timeouts).should.be.eql(start + 1);

      conn.setStatus('alive');
      _.size(clock.timeouts).should.eql(start);
      clock.restore();
    });

  });

  describe('#resuscitate', function () {
    it('should not ping the connection unless it is still dead', function () {
      var conn = new ConnectionAbstract(host);

      conn.setStatus('alive');
      conn.ping = function () {
        throw new Error('ping should not have been called');
      };

      conn.resuscitate();
    });

    it('should ping the connection after the deadTimeout, and set the status to "alive" on pong', function (done) {
      var conn = new ConnectionAbstract(host);
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');

      // schedules the resuscitate
      conn.setStatus('dead');

      // override the ping method to just callback without an error
      conn.ping = function (cb) {
        process.nextTick(function () {
          cb();
        });
      };

      // will be called after the ping calls back
      conn.setStatus = function (status) {
        status.should.eql('alive');
        clock.restore();
        done();
      };

      // fast forward the clock
      clock.tick(conn.deadTimeout);
    });

    it('should ping the connection after the deadTimeout, and set the status to "dead" on error', function (done) {
      var conn = new ConnectionAbstract(host);
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');

      // schedules the resuscitate
      conn.setStatus('dead');

      // override the ping method to just callback without an error
      conn.ping = function (cb) {
        process.nextTick(function () {
          cb(new Error('server still down'));
        });
      };

      // will be called after the ping calls back
      conn.setStatus = function (status) {
        status.should.eql('dead');
        clock.restore();
        done();
      };

      // fast forward the clock
      clock.tick(conn.deadTimeout);
    });
  });

});
