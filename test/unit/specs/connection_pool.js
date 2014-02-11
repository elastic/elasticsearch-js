var ConnectionPool = require('../../../src/lib/connection_pool');
var Host = require('../../../src/lib/host');
var errors = require('../../../src/lib/errors');
var ConnectionAbstract = require('../../../src/lib/connection');
var _ = require('lodash-node');
var EventEmitter = require('events').EventEmitter;
var expect = require('expect.js');
var sinon = require('sinon');
var stub = require('../../utils/auto_release_stub').make();

function listenerCount(emitter, event) {
  if (EventEmitter.listenerCount) {
    // newer node
    return EventEmitter.listenerCount(emitter, event);
  } else {
    // older node
    return emitter.listeners(event).length;
  }
}

describe('Connection Pool', function () {
  describe('Adding/Removing/Syncing Connections', function () {
    var pool, host, connection, host2, connection2;

    beforeEach(function () {
      pool = new ConnectionPool({});

      host = new Host({
        port: 999
      });
      connection = new ConnectionAbstract(host);

      host2 = new Host({
        port: 2222
      });
      connection2 = new ConnectionAbstract(host2);
    });

    it('#addConnection only adds the connection if it doesn\'t already exist', function () {
      expect(_.keys(pool.index).length).to.eql(0);
      pool.addConnection(connection);

      expect(_.keys(pool.index)).to.eql([host.toString()]);

      expect(pool._conns.alive).to.eql([connection]);
      expect(pool._conns.dead).to.eql([]);
    });

    describe('#removeConnection', function () {
      it('removes the connection if it exist', function () {
        pool.addConnection(connection);
        pool.removeConnection(connection2);

        expect(pool._conns.alive).to.eql([connection]);
        expect(pool._conns.dead).to.eql([]);
        expect(_.keys(pool.index).length).to.eql(1);
      });

      it('closes the connection when it removes it', function () {
        pool.addConnection(connection);
        expect(connection.status).to.eql('alive');
        expect(listenerCount(connection, 'status set')).to.eql(1);

        pool.removeConnection(connection);

        expect(connection.status).to.eql('closed');
        expect(listenerCount(connection, 'status set')).to.eql(0);
      });
    });

    it('#setHosts syncs the list of Hosts with the connections in the index', function () {
      // there should now be two connections
      pool.setHosts([host, host2]);
      expect(pool._conns.alive.length).to.eql(2);
      expect(pool._conns.dead.length).to.eql(0);

      // get the new connections
      connection = pool.index[host.toString()];
      connection2 = pool.index[host2.toString()];

      // should remove the second connection
      pool.setHosts([host]);
      expect(pool._conns.alive).to.eql([connection]);
      expect(pool._conns.dead.length).to.eql(0);

      // should skip the first, but create a new for the second
      pool.setHosts([host, host2]);
      expect(pool._conns.alive.length).to.eql(2);
      expect(pool._conns.dead.length).to.eql(0);

      // a new connection should have been created
      expect(pool.index[host2.toString()]).to.not.be(connection2);
    });
  });

  describe('Connection selection', function () {
    var pool, host, host2;

    beforeEach(function () {
      pool = new ConnectionPool({});

      host = new Host('localhost:9200');
      host2 = new Host('localhost:9201');

      pool.setHosts([
        host,
        host2
      ]);
    });

    it('detects if the selector is async', function (done) {
      pool.selector = function (list, cb) {
        expect(cb).to.be.a('function');
        cb();
      };

      pool.select(function (err) {
        if (err) { throw err; }
        done();
      });
    });

    it('detects if the selector is not async', function (done) {
      pool.selector = function (list) {
        expect(arguments.length).to.be(1);
      };

      pool.select(function (err) {
        if (err) { throw err; }
        done();
      });
    });

    it('sync selectors should still return async', function (done) {
      pool.selector = function (list) {
        return list[0];
      };

      var selected = null;

      pool.select(function (err, selection) {
        if (err) { throw err; }
        expect(selection.host).to.be(host);
        selected = selection;
        done();
      });

      expect(selected).to.be(null);
    });

    it('should catch errors in sync selectors', function (done) {
      pool.selector = function (list) {
        return JSON.notAMethod();
      };

      pool.select(function (err, selection) {
        expect(err).be.an(Error);
        done();
      });
    });

  });

  describe('Connection selection with no living nodes', function () {
    it('should ping all of the dead nodes, in order of oldest timeout, and return the first that\'s okay',
    function (done) {
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');
      var pool = new ConnectionPool({
        deadTimeout: 10000
      });

      var connections = [
        new ConnectionAbstract(new Host('http://localhost:9200')),
        new ConnectionAbstract(new Host('http://localhost:9201')),
        new ConnectionAbstract(new Host('http://localhost:9202')),
        new ConnectionAbstract(new Host('http://localhost:9203'))
      ];
      var pingQueue = _.shuffle(connections);
      var expectedSelection = pingQueue[pingQueue.length - 1];

      _.each(pingQueue, function (conn) {
        pool.addConnection(conn);
        stub(conn, 'ping', function (params, cb) {
          if (typeof params === 'function') {
            cb = params;
          }
          var expectedConn = pingQueue.shift();
          expect(conn).to.be(expectedConn);
          if (pingQueue.length) {
            process.nextTick(function () {
              cb(new Error('keep trying'));
            });
          } else {
            process.nextTick(function () {
              cb(null, true);
            });
          }
        });
        conn.setStatus('dead');
        clock.tick(500);
      });

      pool.select(function (err, selection) {
        clock.restore();
        expect(selection).to.be(expectedSelection);
        expect(pingQueue.length).to.be(0);
        pool.setHosts([]);
        expect(err).to.be(undefined);
        done();
      });
    });
  });

  describe('Connection state management', function () {
    var pool, host, host2, connection, connection2;

    beforeEach(function () {
      pool = new ConnectionPool({});

      host = new Host('localhost:9200');
      host2 = new Host('localhost:9201');

      pool.setHosts([
        host,
        host2
      ]);

      connection = pool.index[host.toString()];
      connection2 = pool.index[host2.toString()];

      expect(pool._conns.alive.length).to.be(2);
      expect(pool._conns.dead.length).to.be(0);
    });

    afterEach(function () {
      pool.close();
    });

    it('moves an alive connection to dead', function () {
      connection.setStatus('dead');

      expect(pool._conns.alive.length).to.be(1);
      expect(pool._conns.dead.length).to.be(1);
    });

    it('clears and resets the timeout when a connection redies', function () {
      var clock = sinon.useFakeTimers('setTimeout', 'clearTimeout');

      connection.setStatus('dead');
      expect(_.size(clock.timeouts)).to.eql(1);
      var id = _(clock.timeouts).keys().first();

      // it re-dies
      connection.setStatus('dead');
      expect(_.size(clock.timeouts)).to.eql(1);
      expect(_(clock.timeouts).keys().first()).to.not.eql(id);
      clock.restore();
    });

    it('does nothing when a connection is re-alive', function () {
      var last = pool._conns.alive[pool._conns.alive.length - 1];
      var first = pool._conns.alive[0];

      expect(last).to.not.be(first);

      // first re-alives
      first.setStatus('alive');
      expect(pool._conns.alive[0]).to.be(first);
      expect(pool._conns.alive[pool._conns.alive.length - 1]).to.be(last);

      // last re-alives
      last.setStatus('alive');
      expect(pool._conns.alive[0]).to.be(first);
      expect(pool._conns.alive[pool._conns.alive.length - 1]).to.be(last);
    });

    it('removes all its connection when it closes, causing them to be closed', function () {
      pool.close();
      expect(pool._conns.alive.length).to.be(0);
      expect(pool._conns.dead.length).to.be(0);

      expect(connection.status).to.eql('closed');
      expect(connection2.status).to.eql('closed');
    });

  });

  describe('#getConnections', function () {
    it('will return all values from the alive list by default', function () {
      var pool = new ConnectionPool({});
      pool._conns.alive = new Array(1000);
      var length = pool._conns.alive.length;
      while (length--) {
        pool._conns.alive[length] = length;
      }

      var result = pool.getConnections();
      expect(result.length).to.be(1000);
      expect(_.reduce(result, function (sum, num) {
        return sum += num;
      }, 0)).to.eql(499500);
    });
  });

  describe('#calcDeadTimeout', function () {
    it('should be configurable via config.calcDeadTimeout', function () {
      var pool = new ConnectionPool({
        calcDeadTimeout: 'flat'
      });
      expect(pool.calcDeadTimeout).to.be(ConnectionPool.calcDeadTimeoutOptions.flat);
      pool.close();
    });
    it('"flat" always returns the base timeout', function () {
      var pool = new ConnectionPool({
        calcDeadTimeout: 'flat'
      });
      expect(pool.calcDeadTimeout(0, 1000)).to.eql(1000);
      expect(pool.calcDeadTimeout(10, 5000)).to.eql(5000);
      expect(pool.calcDeadTimeout(25, 10000)).to.eql(10000);
    });
    it('"exponential" always increases the timeout based on the attempts', function () {
      var pool = new ConnectionPool({
        calcDeadTimeout: 'exponential'
      });
      expect(pool.calcDeadTimeout(0, 1000)).to.eql(1000);
      expect(pool.calcDeadTimeout(10, 5000)).to.be.greaterThan(5000);
      expect(pool.calcDeadTimeout(25, 10000)).to.be.greaterThan(10000);
    });
    it('"exponential" produces predicatable results', function () {
      var pool = new ConnectionPool({
        calcDeadTimeout: 'exponential'
      });
      expect(pool.calcDeadTimeout(0, 1000)).to.eql(1000);
      expect(pool.calcDeadTimeout(4, 10000)).to.eql(40000);
      // maxes out at 30 minutes by default
      expect(pool.calcDeadTimeout(25, 30000)).to.eql(18e5);
    });
    it('"exponential" repects config.maxDeadtimeout', function () {
      var pool = new ConnectionPool({
        calcDeadTimeout: 'exponential',
        maxDeadTimeout: 10000
      });
      expect(pool.calcDeadTimeout(0, 1000)).to.eql(1000);
      expect(pool.calcDeadTimeout(10, 1000)).to.eql(10000);
      expect(pool.calcDeadTimeout(100, 1000)).to.eql(10000);
    });
  });
});
