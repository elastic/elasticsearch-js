var es = require('../../src/elasticsearch');

describe('Connection Pool', function () {
  var client, pool;
  beforeEach(function () {
    client = new es.Client();
    pool = client.connectionPool;
  });

  describe('default settings', function () {
    it('by default has one living connection and no dead connections', function () {
      pool.connections.alive.should.have.lengthOf(1);
      pool.connections.dead.should.have.lengthOf(0);
    });
  });

  describe('#setNodes', function () {
    it('rejects anything accept an array of objects', function () {

      (function () {
        pool.setNodes([
          'string'
        ]);
      }).should.throw(TypeError);

      (function () {
        pool.setNodes('string');
      }).should.throw(TypeError);

    });

    it('will clear out old nodes', function () {
      // set an empty set of nodes
      pool.setNodes([]);

      pool.connections.alive.should.have.lengthOf(0);
      pool.connections.dead.should.have.lengthOf(0);
    });

    it('will accept a new node list', function () {
      var conns = pool.connections;

      // set a list of 3 nodes
      pool.setNodes([
        {
          hostname: 'es-cluster.us',
          port: '9200'
        },
        {
          hostname: 'es-cluster-1.us',
          port: '9200'
        },
        {
          hostname: 'es-cluster-2.us',
          port: '9200'
        }
      ]);

      conns.alive.should.have.lengthOf(3);
      conns.dead.should.have.lengthOf(0);
    });

  });
});
