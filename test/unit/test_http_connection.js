describe('Http Connector', function () {

  var Host = require('../../src/lib/host');
  var HttpConnection = require('../../src/lib/connectors/http');

  describe('#makeReqParams', function () {

    it('properly reads the host object', function () {
      var host = new Host('john:dude@pizza.com:9200/pizza/cheese?shrooms=true');
      var con = new HttpConnection(host, {});
      var reqParams = con.makeReqParams();

      reqParams.should.eql({
        method: 'GET',
        protocol: 'http:',
        auth: 'john:dude',
        hostname: 'pizza.com',
        port: 9200,
        path: '/pizza/cheese?shrooms=true',
        headers: host.headers,
        agent: con.agent
      });
    });

    it('accepts merges a query object with the hosts\'', function () {
      var con = new HttpConnection(new Host({
        query: {
          user_id: 123
        }
      }));

      var reqParams = con.makeReqParams({
        query: {
          jvm: 'yes'
        }
      });

      reqParams.should.include({
        path: '/?jvm=yes&user_id=123'
      });
    });

    // it('works with an empty query', function () {
    //   var reqParams = con.makeReqParams();

    //   reqParams.should.include({
    //     method: 'GET',
    //     path: '/'
    //   });

    //   Object.keys(reqParams).should.not.include([
    //     'host', 'pathname', 'query'
    //   ]);
    // });

  });

});
