describe('Client instances creation', function () {
  var es = require('../../src/elasticsearch');
  var api = require('../../src/lib/api');
  var expect = require('expect.js');
  var client;

  beforeEach(function () {
    if (client) {
      client.close();
    }
    client = new es.Client();
  });

  it('throws an error linking to the es module when you try to instanciate the exports', function () {
    var Es = es;
    expect(function () {
      var client = new Es();
    }).to.throwError(/previous "elasticsearch" module/);
  });

  it('Succeeds even not called with new', function () {
    var client = es.Client();
    expect(client.bulk).to.eql(api.bulk);
    expect(client.cluster.nodeStats).to.eql(api.cluster.prototype.nodeStats);
  });

  it('inherits the api', function () {
    expect(client.bulk).to.eql(api.bulk);
    expect(client.cluster.nodeStats).to.eql(api.cluster.prototype.nodeStats);
  });

  it('closing the client causes it\'s transport to be closed', function () {
    var called = false;
    client.transport.close = function () {
      called = true;
    };
    client.close();
    expect(called).to.be(true);
  });

  it('creates a warning level logger by default', function () {
    expect(client.transport.log.listenerCount('error')).to.eql(1);
    expect(client.transport.log.listenerCount('warning')).to.eql(1);
    expect(client.transport.log.listenerCount('info')).to.eql(0);
    expect(client.transport.log.listenerCount('debug')).to.eql(0);
    expect(client.transport.log.listenerCount('trace')).to.eql(0);
  });
});
