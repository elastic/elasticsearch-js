describe('Client instances creation', function () {
  const stream = require('stream');
  const util = require('util');

  const es = require('../../../src/elasticsearch');
  const apis = require('../../../src/lib/apis');
  const expect = require('expect.js');
  const stub = require('../../utils/auto_release_stub').make();
  let client;

  describe('', function () {
    beforeEach(function () {
      client = new es.Client();
    });

    afterEach(function () {
      client.close();
    });

    it('throws an error linking to the es module when you try to instanciate the exports', function () {
      const Es = es;
      expect(function () {
        const c = new Es();
        return c;
      }).to.throwError(/previous "elasticsearch" module/);
    });

    const pkg = require('../../../package.json');
    const def = pkg.config.default_api_branch;
    const prev = pkg.config.supported_es_branches[pkg.config.supported_es_branches.indexOf(def) + 1];

    it('inherits the ' + def + ' API by default', function () {
      expect(client.bulk).to.be(apis[def].bulk);
      expect(client.nodes.stats).to.be(apis[def].nodes.prototype.stats);
    });

    it('inherits the ' + prev + ' API when specified', function () {
      client.close();
      client = es.Client({
        apiVersion: prev
      });
      expect(client.bulk).to.be(apis[prev].bulk);
      expect(client.cluster.nodeStats).to.be(apis[prev].cluster.prototype.nodeStats);
    });

    it('closing the client causes it\'s transport to be closed', function () {
      let called = false;
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

  describe('config', function () {
    it('accepts a stream type logger', function (done) {
      function NullStream() {
        stream.Writable.call(this);
      }
      util.inherits(NullStream, stream.Writable);

      NullStream.prototype._write = function (/* chunk, encoding, next */) {
        done();
      };

      const client = new es.Client({
        log: [
          { type: 'stream', stream: new NullStream() }
        ]
      });

      client.transport.log.error(new Error());
    });
  });

  describe('#ping', function () {
    it('sets the default requestTimeout to 3000', function () {
      stub(client.transport, 'request');
      client.ping();
      expect(client.transport.request.callCount).to.be(1);
      expect(client.transport.request.lastCall.args[0].requestTimeout).to.be(3000);
    });
  });
});
