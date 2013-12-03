describe('Http Connector', function () {

  var should = require('should');
  var Host = require('../../src/lib/host');
  var HttpConnection = require('../../src/lib/connectors/http');
  var ConnectionAbstract = require('../../src/lib/connection');

  describe('Constructor', function () {
    it('creates an object that extends ConnectionAbstract', function () {
      var con = new HttpConnection(new Host());
      con.should.be.an.instanceOf(ConnectionAbstract);
    });

    it('sets certain defaults', function () {
      var con = new HttpConnection(new Host());

      con.hand.should.be.exactly(require('http'));
      // con.requestTimeout
      // maxSockets
      // maxFreeSockets
      // maxKeepAliveTime
      // requestTimeout
    });

    it('expects one the host to have a protocol of http or https', function () {
      (function () {
        var con = new HttpConnection(new Host('thrifty://es.com/stuff'));
      }).should.throw(/invalid protocol/i);
    });
  });

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

    it('merges a query object with the hosts\'', function () {
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
        path: '?user_id=123&jvm=yes'
      });
    });

    it('merges the path prefex', function () {
      var con = new HttpConnection(new Host('https://google.com/path/prefix/for/user/1'));
      var reqParams = con.makeReqParams({
        method: 'GET',
        path: '/items',
        query: {
          q: 'pizza'
        }
      });

      reqParams.should.eql({
        method: 'GET',
        protocol: 'https:',
        auth: null,
        hostname: 'google.com',
        port: 443,
        path: '/path/prefix/for/user/1/items?q=pizza',
        headers: undefined,
        agent: con.agent
      });
    });

    it('merges the query', function () {
      var con = new HttpConnection(new Host('http://google.com/pref-x?userId=12345&token=42069'));

      var reqParams = con.makeReqParams({
        method: 'PUT',
        path: '/stuff',
        query: {
          q: 'pizza'
        }
      });

      reqParams.should.eql({
        method: 'PUT',
        protocol: 'http:',
        auth: null,
        hostname: 'google.com',
        port: 80,
        path: '/pref-x/stuff?userId=12345&token=42069&q=pizza',
        headers: undefined,
        agent: con.agent
      });
    });

    it('Works well with minimum params', function () {
      var con = new HttpConnection(new Host('http://google.com'));

      var reqParams = con.makeReqParams({
        method: 'PUT',
        path: '/stuff'
      });

      reqParams.should.eql({
        method: 'PUT',
        protocol: 'http:',
        auth: null,
        hostname: 'google.com',
        port: 80,
        path: '/stuff',
        headers: undefined,
        agent: con.agent
      });
    });
  });

  describe('#request', function () {
    var http = require('http');
    var https = require('https');
    var sinon = require('sinon');
    var util = require('util');

    function FakeRequest() {
      sinon.stub(this, 'end');
      sinon.stub(this, 'write');
      this.log = sinon.stub(this.log);
    }
    util.inherits(FakeRequest, http.ClientRequest);

    function reqMethodStub(params, cb) {
      var req = new FakeRequest();
      process.nextTick(function () {
        // causes the request to quit and callback
        req.emit('error');
      });
      return req;
    }

    beforeEach(function () {
      sinon.stub(http, 'request', reqMethodStub);
      sinon.stub(https, 'request', reqMethodStub);
    });

    afterEach(function () {
      http.request.restore();
      https.request.restore();
    });

    it('calls http based on the host', function (done) {
      var con = new HttpConnection(new Host('http://google.com'));
      con.request({}, function () {
        http.request.callCount.should.eql(1);
        https.request.callCount.should.eql(0);
        done();
      });
    });

    it('calls https based on the host', function (done) {
      var con = new HttpConnection(new Host('https://google.com'));
      con.request({}, function () {
        http.request.callCount.should.eql(0);
        https.request.callCount.should.eql(1);
        done();
      });
    });

    it('logs error events, and sets the connection to dead when an error occurs', function (done) {
      var con = new HttpConnection(new Host('http://google.com'));

      sinon.stub(con.log);

      http.request.restore();
      sinon.stub(http, 'request', function (params, cb) {
        var req = new FakeRequest();
        process.nextTick(function () {
          // causes the request to quit and callback
          req.emit('error', new Error('actual error'));
        });
        return req;
      });

      con.request({}, function (err) {
        // error should have been sent to the
        err.message.should.eql('actual error');

        // logged the error and the trace log
        con.log.error.callCount.should.eql(1);
        con.log.trace.callCount.should.eql(1);
        con.log.info.callCount.should.eql(0);
        con.log.warning.callCount.should.eql(0);
        con.log.debug.callCount.should.eql(0);

        // set status to dead
        con.status.should.eql('dead');

        done();
      });
    });

    it('logs error events, and sets the connection to dead', function (done) {
      var con = new HttpConnection(new Host('http://google.com'));

      sinon.stub(con.log);

      http.request.restore();
      sinon.stub(http, 'request', function (params, cb) {
        var req = new FakeRequest();
        process.nextTick(function () {
          // causes the request to quit and callback
          req.emit('error', new Error('actual error'));
        });
        return req;
      });

      con.request({}, function (err) {
        // error should have been sent to the
        err.message.should.eql('actual error');

        // logged the error
        con.log.error.callCount.should.eql(1);
        con.log.error.lastCall.args[0].message.should.eql('actual error');

        // set status to dead
        con.status.should.eql('dead');

        done();
      });
    });
  });

  describe('Request Implementation', function () {
    var server;
    var nock = require('nock');
    nock.disableNetConnect();
    var host = new Host('http://esjs.com:9200');

    beforeEach(function () {
      server = nock('http://esjs.com:9200');
    });

    afterEach(function () {
      server.done();
      nock.restore();
    });

    it('collects the whole request body', function (done) {
      var con = new HttpConnection(host);

      var body = '{ "USER": "doc" }';
      server
        .get('/users/1')
        .reply(200, body);

      con.request({
        method: 'GET',
        path: '/users/1'
      }, function (err, resp, status) {
        should(err).not.exist;
        resp.should.eql(body);
        status.should.eql(200);
        done();
      });
    });

    it('Catches network errors and passes back the error', function () {
      var con = new HttpConnection(host);

      var body = '{ "USER": "doc" }';
      server
        .get('/users/1')
        .reply(200, {

        });

      con.request({
        method: 'GET',
        path: '/users/1'
      }, function (err, resp, status) {
        should(err).not.exist;
        resp.should.eql(body);
        status.should.eql(200);
        done();
      });
    });

  });

});
