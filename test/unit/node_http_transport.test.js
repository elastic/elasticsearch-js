require('mocha-as-promised')();

var NodeHttp = require('../../src/lib/transports/node_http')
  , expect = require('expect.js');

describe('NodeHttp Transport', function () {

  var transport = new NodeHttp(['localhost:9200']);

  describe('#send', function () {
    it('should ignore host in url', function (done) {
      transport.request({
        url: 'http://google.com/',
        method: 'get',
        body: null
      }).then(function (resp) {
        expect(resp.version.number).to.be.a('string');
        done();
      });
    });
  });

});
