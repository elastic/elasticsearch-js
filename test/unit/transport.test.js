var es = require('../../src/elasticsearch'),
    sinon = require('sinon'),
    expect = require('expect.js');

describe('transport', function () {

  describe('#sniff', function () {
    it('does a head request to "/"', function (done) {
      var c = new es.Client();
      // stub the tranports request method, arg 1 is a callback
      sinon.stub(c.transport, 'request').callsArgAsync(1);

      c.transport.sniff(function (err, resp) {
        var spy = c.transport.request.getCall(0),
            params = spy.args[0];

        params.should.have.type('object');
        params.should.have.property('path', '/_cluster/nodes');
        if (params.method) {
          params.should.be('GET');
        }
        done();
      });
    });

    describe('when sniffOnStart === true', function () {

      describe('and the cluster is down', function () {
        before(function (done) {
          var c = new es.Client({
            sniffOnStart: true,
            hosts: [
              'intentionally-not-a-real-cluster.com:9200'
            ]
          });
          c.on('sniff complete', done);
        });

        it('should not have any connections in the connection pool', function () {

        });
      });
    });
  });
});
