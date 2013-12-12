var ConnectionPool = require('../../src/lib/connection_pool');
var Host = require('../../src/lib/host');
var ConnectionAbstract = require('../../src/lib/connection');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var should = require('should');

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
      _.keys(pool.index).length.should.eql(0);
      pool.addConnection(connection);

      _.keys(pool.index).should.eql([host.toString()]);

      pool._conns.alive.should.eql([connection]);
      pool._conns.dead.should.eql([]);
    });

    describe('#removeConnection', function () {
      it('removes the connection if it exist', function () {
        pool.addConnection(connection);
        pool.removeConnection(connection2);

        pool._conns.alive.should.eql([connection]);
        pool._conns.dead.should.eql([]);
        _.keys(pool.index).length.should.eql(1);
      });

      it('closes the connection when it removes it', function () {
        pool.addConnection(connection);
        connection.status.should.eql('alive');
        listenerCount(connection, 'status set').should.eql(1);

        pool.removeConnection(connection);

        connection.status.should.eql('closed');
        listenerCount(connection, 'status set').should.eql(0);
      });
    });

    it('#setHosts syncs the list of Hosts with the connections in the index', function () {
      // there should now be two connections
      pool.setHosts([host, host2]);
      pool._conns.alive.length.should.eql(2);
      pool._conns.dead.length.should.eql(0);

      // get the new connections
      connection = pool.index[host.toString()];
      connection2 = pool.index[host2.toString()];

      // should remove the second connection
      pool.setHosts([host]);
      pool._conns.alive.should.eql([connection]);
      pool._conns.dead.length.should.eql(0);

      // should skip the first, but create a new for the second
      pool.setHosts([host, host2]);
      pool._conns.alive.length.should.eql(2);
      pool._conns.dead.length.should.eql(0);

      // a new connection should have been created
      pool.index[host2.toString()].should.not.be.exactly(connection2);
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
        cb.should.have.type('function');
        cb();
      };

      pool.select(function (err) {
        if (err) { throw err; }
        done();
      });
    });

    it('detects if the selector is not async', function (done) {
      pool.selector = function (list) {
        arguments.should.have.length(1);
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
        selection.host.should.be.exactly(host);
        selected = selection;
        done();
      });

      should(selected).be.exactly(null);
    });

    it('should catch errors in sync selectors', function (done) {
      pool.selector = function (list) {
        return JSON.notAMethod();
      };

      pool.select(function (err, selection) {
        should(err).be.an.instanceOf(Error);
        done();
      });
    });

    it('should automatically select the first dead connection when there no living connections', function (done) {
      pool.setHosts([]);
      pool._conns.alive = [];
      pool._conns.dead = [1, 2, 3];

      pool.select(function (err, selection) {
        selection.should.be.exactly(1);
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

      connection = pool.index[host2.toString()];
      connection2 = pool.index[host2.toString()];

      pool._conns.alive.should.have.length(2);
      pool._conns.dead.should.have.length(0);
    });

    afterEach(function () {
      pool.close();
    });

    it('moves an alive connection to dead', function () {
      connection.setStatus('dead');

      pool._conns.alive.should.have.length(1);
      pool._conns.dead.should.have.length(1);
    });

    it('moves a dead connection to the end of the dead list when it re-dies', function () {
      connection.setStatus('dead');
      connection2.setStatus('dead');

      // connection is at the front of the line
      pool._conns.dead[0].should.be.exactly(connection);
      // it re-dies
      connection.setStatus('dead');
      // connection2 is now at the front of the list
      pool._conns.dead[0].should.be.exactly(connection2);
    });

    it('does nothing when a connection is re-alive', function () {
      var last = pool._conns.alive[pool._conns.alive.length - 1];
      var first = pool._conns.alive[0];

      last.should.not.be.exactly(first);

      // first re-alives
      first.setStatus('alive');
      pool._conns.alive[0].should.be.exactly(first);
      pool._conns.alive[pool._conns.alive.length - 1].should.be.exactly(last);

      // last re-alives
      last.setStatus('alive');
      pool._conns.alive[0].should.be.exactly(first);
      pool._conns.alive[pool._conns.alive.length - 1].should.be.exactly(last);
    });

    it('removes all its connection when it closes, causing them to be closed', function () {
      pool.close();
      pool._conns.alive.should.have.length(0);
      pool._conns.dead.should.have.length(0);

      connection.status.should.eql('closed');
      connection2.status.should.eql('closed');
    });

  });
});
