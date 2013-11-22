var es = require('../../src/elasticsearch');
var api = require('../../src/lib/api');

describe('Client instances creation', function () {
  var client;

  beforeEach(function () {
    if (client) {
      client.close();
    }
    client = new es.Client();
  });

  it('inherits the api', function () {
    client.bulk.should.eql(api.bulk);
    client.cluster.nodeStats.should.eql(api.cluster.prototype.nodeStats);
  });

  it('closing the client causes it\'s transport to be closed', function () {
    var called = false;
    client.transport.close = function () {
      called = true;
    };
    client.close();
    called.should.be.exactly(true);
  });

  it('creates a warning level logger by default', function () {
    client.transport.log.listenerCount('error').should.eql(1);
    client.transport.log.listenerCount('warning').should.eql(1);
    client.transport.log.listenerCount('info').should.eql(0);
    client.transport.log.listenerCount('debug').should.eql(0);
    client.transport.log.listenerCount('trace').should.eql(0);
  });
});
