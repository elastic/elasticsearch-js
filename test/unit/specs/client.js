describe('Client instances creation', function () {
  var path = require('path');
  var fromRoot = path.join.bind(path, require('find-root')(__dirname));
  var rootRequire = function (path) {
    return require(fromRoot(path));
  };
  var es = rootRequire('src/elasticsearch');
  var apis = rootRequire('src/lib/apis');
  var expect = require('expect.js');
  var client;

  beforeEach(function () {
    client = new es.Client();
  });

  afterEach(function () {
    client.close();
  });

  it('throws an error linking to the es module when you try to instanciate the exports', function () {
    var Es = es;
    expect(function () {
      var c = new Es();
    }).to.throwError(/previous "elasticsearch" module/);
  });

  it('inherits the 0.90 API by default', function () {
    expect(client.bulk).to.eql(apis['0.90'].bulk);
    expect(client.cluster.nodeStats).to.eql(apis['0.90'].cluster.prototype.nodeStats);
  });

  it('inherits the master API when specified', function () {
    client.close();
    client = es.Client({
      apiVersion: 'master'
    });
    expect(client.bulk).to.eql(apis.master.bulk);
    expect(client.nodes.stats).to.eql(apis.master.nodes.prototype.stats);
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
