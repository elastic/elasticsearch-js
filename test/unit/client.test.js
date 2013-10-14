var es = require('../../src/elasticsearch'),
    api = require('../../src/lib/utils').requireDir(module, '../../src/api'),
    expect = require('expect.js');

describe('Client instances creation', function () {
  var client;

  beforeEach(function () {
    client = new es.Client();
  });

  it('inherits the api', function () {
    client.bulk.should.be.exactly(api.bulk);
    client.cluster.nodeStats.should.be.exactly(api.cluster.node_stats);
  });
});
