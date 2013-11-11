var es = require('../../src/elasticsearch'),
    api = require('../../src/lib/api'),
    expect = require('expect.js');

describe('Client instances creation', function () {
  var client;

  beforeEach(function () {
    client = new es.Client();
  });

  it('inherits the api', function () {
    client.bulk.should.eql(api.bulk);
    client.cluster.nodeStats.should.eql(api.cluster.prototype.nodeStats);
  });
});
