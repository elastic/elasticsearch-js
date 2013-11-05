describe('Http Connector', function () {

  var Host = require('../../src/lib/host');
  var HttpConnection = require('../../src/lib/connectors/http');
  var host = new Host('http://someesserver.com:9205/prefix');
  var con;

  describe('#makeReqParams', function () {

    before(function () {
      con = new HttpConnection(host, {});
    });

    it('creates the request params property', function () {
      var reqParams = con.makeReqParams({
        method: 'GET',
        path: '/_cluster/nodes/stats',
        query: {
          jvm: true
        }
      });

      reqParams.should.include({
        method: 'GET',
        protocol: 'http:',
        auth: '',
        hostname: 'someesserver.com',
        port: '9205',
        path: '/prefix/_cluster/nodes/stats?jvm=true'
      });

      Object.keys(reqParams).should.not.include([
        'host', 'pathname', 'query'
      ]);
    });

  });

});
