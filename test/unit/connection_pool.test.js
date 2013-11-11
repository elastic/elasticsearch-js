var es = require('../../src/elasticsearch');

describe('Connection Pool', function () {
  var client, pool;
  beforeEach(function () {
    client = new es.Client();
    pool = client.config.connectionPool;
  });

  describe('default settings', function () {
    it('by default has one living connection and no dead connections', function () {
      pool.connections.alive.should.have.lengthOf(1);
      pool.connections.dead.should.have.lengthOf(0);
    });
  });
});
