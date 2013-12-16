var ConnectionAbstract = require('../../src/lib/connection');
var Host = require('../../src/lib/host');
var sinon = require('sinon');
var _ = require('lodash');

var stub = require('./auto_release_stub').make();

describe('Connection Abstract', function () {
  var host = new Host('localhost:9200');

  it('constructs with defaults for host, and bound', function () {
    var conn = new ConnectionAbstract(host);
    conn.host.should.be.exactly(host);
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
    it('accpets just a callback', function () {
      var conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      var cb = function () {};
      conn.ping(cb);
      conn.request.callCount.should.eql(1);
      conn.request.lastCall.args[0].should.have.type('object');
      conn.request.lastCall.args[1].should.have.type('function');
    });

    it('accpets just params', function () {
      var conn = new ConnectionAbstract(host);
      stub(conn, 'request');
      conn.ping({});
      conn.request.callCount.should.eql(1);
      conn.request.lastCall.args[0].should.have.type('object');
      conn.request.lastCall.args[1].should.have.type('function');
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
      conn.request.callCount.should.eql(1);
      conn.request.lastCall.args[0].should.include(params);
      conn.request.lastCall.args[1].should.have.type('function');
    });

    it('calls it\'s own request method', function () {
      var conn = new ConnectionAbstract(host);
      var football = {};
      stub(conn, 'request');
      conn.ping();
      conn.request.callCount.should.eql(1);
    });

    it('sets a timer for the request');
    it('aborts the request if it takes too long');
    it('ignores the response from the request if it already aborted');
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

    // it('sets a timeout when set to dead, and removed when alive', function () {
    //   var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
    //   stub.autoRelease(clock);
    //   var conn = new ConnectionAbstract(host);

    //   var start = _.size(clock.timeouts);
    //   conn.setStatus('dead');
    //   _.size(clock.timeouts).should.be.eql(start + 1);

    //   conn.setStatus('alive');
    //   _.size(clock.timeouts).should.eql(start);
    //   clock.restore();
    // });

  });

  // describe('#resuscitate', function () {
  //   it('should not ping the connection unless it is still dead', function () {
  //     var conn = new ConnectionAbstract(host);

  //     conn.setStatus('alive');
  //     stub(conn, 'ping', function () {
  //       throw new Error('ping should not have been called');
  //     });

  //     conn.resuscitate();
  //   });

  //   it('should ping the connection after the deadTimeout, and set the status to "alive" on pong', function (done) {
  //     var conn = new ConnectionAbstract(host);
  //     var clock;
  //     stub.autoRelease(clock = sinon.useFakeTimers('setTimeout', 'clearTimeout'));

  //     // schedules the resuscitate
  //     conn.setStatus('dead');

  //     // override the ping method to just callback without an error
  //     stub(conn, 'ping', function (cb) {
  //       cb();
  //     });

  //     // will be called after the ping calls back
  //     stub(conn, 'setStatus', function (status) {
  //       status.should.eql('alive');
  //       done();
  //     });

  //     // fast forward the clock
  //     clock.tick(conn.deadTimeout);
  //   });

  //   it('should ping the connection after the deadTimeout, and set the status to "dead" on error', function (done) {
  //     var conn = new ConnectionAbstract(host);
  //     var clock;
  //     stub.autoRelease(clock = sinon.useFakeTimers('setTimeout', 'clearTimeout'));

  //     // schedules the resuscitate
  //     conn.setStatus('dead');

  //     // override the ping method to just callback without an error
  //     stub(conn, 'ping', function (cb) {
  //       cb(new Error('server still down'));
  //     });

  //     // will be called after the ping calls back
  //     stub(conn, 'setStatus', function (status) {
  //       status.should.eql('dead');
  //       done();
  //     });

  //     // fast forward the clock
  //     clock.tick(conn.deadTimeout);
  //   });
  // });

});
