describe('Http Connector', function () {

  const _ = require('lodash');
  const expect = require('expect.js');
  const nock = require('nock');
  const parseUrl = require('url').parse;
  const http = require('http');
  const https = require('https');
  const AgentKeepAlive = require('agentkeepalive');

  const Host = require('../../../src/lib/host');
  const HttpConnection = require('../../../src/lib/connectors/http');
  const ConnectionAbstract = require('../../../src/lib/connection');

  const expectSubObject = require('../../utils/expect_sub_object');
  const MockRequest = require('../../mocks/request');
  const MockIncommingMessage = require('../../mocks/incomming_message');
  const zlib = require('zlib');

  nock.disableNetConnect();

  const stub = require('../../utils/auto_release_stub').make();

  function makeStubReqMethod(prep) {
    return function (params, cb) {
      const req = new MockRequest();
      if (prep) {
        prep(req, params, cb);
      }
      return req;
    };
  }

  function whereReqDies(withErr) {
    return function (req) {
      process.nextTick(function () {
        // causes the request to quit and callback
        req.emit('error', withErr || void 0);
      });
    };
  }

  describe('Constructor', function () {
    it('creates an object that extends ConnectionAbstract', function () {
      const con = new HttpConnection(new Host());
      expect(con).to.be.a(ConnectionAbstract);
    });

    it('sets certain defaults', function () {
      const con = new HttpConnection(new Host());

      expect(con.hand).to.be(require('http'));
      // con.requestTimeout
      // maxSockets
      // maxFreeSockets
      // maxKeepAliveTime
      // requestTimeout
    });

    it('expects the host to have a protocol of http or https', function () {
      expect(function () {
        new HttpConnection(new Host('thrifty://es.com/stuff'));
      }).to.throwError(/invalid protocol/i);
    });

    it('allows defining a custom agent', function () {
      const football = {};
      const con = new HttpConnection(new Host(), { createNodeAgent: _.constant(football) });
      expect(con.agent).to.be(football);
    });

    it('allows setting agent to false', function () {
      const con = new HttpConnection(new Host(), { createNodeAgent: _.constant(false) });
      expect(con.agent).to.be(false);
    });
  });

  describe('#makeReqParams', function () {
    it('properly reads the host object', function () {
      const host = new Host('john:dude@pizza.com:9200/pizza/cheese?shrooms=true');
      const con = new HttpConnection(host, {});
      const reqParams = con.makeReqParams();

      expect(reqParams).to.not.have.property('auth');
      expect(reqParams).to.eql({
        method: 'GET',
        protocol: 'http:',
        hostname: 'pizza.com',
        port: 9200,
        path: '/pizza/cheese?shrooms=true',
        headers: host.headers,
        agent: con.agent
      });
    });

    it('merges a query object with the hosts\'', function () {
      const con = new HttpConnection(new Host({
        query: {
          user_id: 123
        }
      }));

      const reqParams = con.makeReqParams({
        query: {
          jvm: 'yes'
        }
      });

      expect(reqParams.path).to.eql('/?user_id=123&jvm=yes');
    });

    it('merges the path prefix', function () {
      const con = new HttpConnection(new Host('https://google.com/path/prefix/for/user/1'));
      const reqParams = con.makeReqParams({
        method: 'GET',
        path: '/items',
        query: {
          q: 'pizza'
        }
      });

      expectSubObject(reqParams, {
        path: '/path/prefix/for/user/1/items?q=pizza',
      });
    });

    it('merges the query', function () {
      const con = new HttpConnection(new Host('http://google.com/pref-x?userId=12345&token=42069'));

      const reqParams = con.makeReqParams({
        method: 'PUT',
        path: '/stuff',
        query: {
          q: 'pizza'
        }
      });

      expectSubObject(reqParams, {
        path: '/pref-x/stuff?userId=12345&token=42069&q=pizza',
      });
    });

    it('Works well with minimum params', function () {
      const con = new HttpConnection(new Host('http://google.com'));

      const reqParams = con.makeReqParams({
        method: 'PUT',
        path: '/stuff'
      });

      expect(reqParams).to.eql({
        method: 'PUT',
        protocol: 'http:',
        hostname: 'google.com',
        port: 80,
        path: '/stuff',
        headers: null,
        agent: con.agent
      });
    });
  });

  describe('#request', function () {
    beforeEach(function () {
      stub(http, 'request', makeStubReqMethod(whereReqDies()));
      stub(https, 'request', makeStubReqMethod(whereReqDies()));
    });

    it('calls http based on the host', function (done) {
      const con = new HttpConnection(new Host('http://google.com'));
      con.request({}, function () {
        expect(http.request.callCount).to.be(1);
        expect(https.request.callCount).to.be(0);
        expect(http.request.lastCall.args[0].agent).to.be.a(AgentKeepAlive);
        done();
      });
    });

    it('calls https based on the host', function (done) {
      const con = new HttpConnection(new Host('https://google.com'));
      con.request({}, function () {
        expect(http.request.callCount).to.be(0);
        expect(https.request.callCount).to.be(1);
        expect(https.request.lastCall.args[0].agent).to.be.a(AgentKeepAlive.HttpsAgent);
        done();
      });
    });

    it('does not log error events', function (done) {
      const con = new HttpConnection(new Host('http://google.com'));

      stub(con.log, 'error');
      stub(con.log, 'trace');
      stub(con.log, 'info');
      stub(con.log, 'warning');
      stub(con.log, 'debug');

      http.request.restore();
      stub(http, 'request', makeStubReqMethod(whereReqDies(new Error('actual error'))));

      con.request({}, function (err) {
        // error should have been sent to the
        expect(err.message).to.eql('actual error');

        // logged the error and the trace log
        expect(con.log.trace.callCount).to.eql(1);
        expect(con.log.error.callCount).to.eql(0);
        expect(con.log.info.callCount).to.eql(0);
        expect(con.log.warning.callCount).to.eql(0);
        expect(con.log.debug.callCount).to.eql(0);

        done();
      });
    });

    it('logs error events', function (done) {
      const con = new HttpConnection(new Host('http://google.com'));

      stub(con.log, 'error');

      http.request.func = makeStubReqMethod(whereReqDies(new Error('actual error')));

      con.request({}, function (err) {
        // error should have been sent to the
        expect(err.message).to.eql('actual error');

        // logged the error
        expect(con.log.error.callCount).to.eql(0);
        done();
      });
    });
  });

  describe('#request with incomming message error', function () {
    function makeStubReqWithMsgWhichErrorsMidBody(err) {
      return makeStubReqMethod(function (req, params, cb) {
        process.nextTick(function () {
          const incom = new MockIncommingMessage();
          incom.statusCode = 200;
          setTimeout(function () {
            incom.emit('data', '{ "not json"');
            incom.emit('error', err || new Error('Socket is dead now...'));
          }, 20);
          cb(incom);
        });
      });
    }

    it('does not log errors', function (done) {
      const con = new HttpConnection(new Host('https://google.com'));
      stub(con.log, 'error');
      stub(https, 'request', makeStubReqWithMsgWhichErrorsMidBody());

      con.request({}, function () {
        expect(con.log.error.callCount).to.eql(0);
        done();
      });
    });

    it('passes the original error on', function (done) {
      const con = new HttpConnection(new Host('https://google.com'));
      stub(https, 'request', makeStubReqWithMsgWhichErrorsMidBody(new Error('no more message :(')));

      con.request({}, function (err) {
        expect(err).to.be.an(Error);
        expect(err.message).to.eql('no more message :(');
        done();
      });
    });

    it('does not pass the partial body along', function (done) {
      const con = new HttpConnection(new Host('https://google.com'));
      stub(https, 'request', makeStubReqWithMsgWhichErrorsMidBody());

      con.request({}, function (err, resp) {
        expect(resp).to.be(undefined);
        done();
      });
    });

    it('does not pass the status code along', function (done) {
      const con = new HttpConnection(new Host('https://google.com'));
      stub(https, 'request', makeStubReqWithMsgWhichErrorsMidBody());

      con.request({}, function (err, resp, status) {
        expect(status).to.be(undefined);
        done();
      });
    });
  });

  describe('#request\'s responder', function () {
    it('collects the whole request body', function (done) {
      const server = nock('http://esjs.com:9200');
      const con = new HttpConnection(new Host('http://esjs.com:9200'));
      const body = '{ "USER": "doc" }';

      server
        .get('/users/1')
        .reply(200, body);

      con.request({
        method: 'GET',
        path: '/users/1'
      }, function (err, resp, status) {
        expect(err).to.be(undefined);
        expect(resp).to.eql(body);
        expect(status).to.eql(200);
        server.done();
        done();
      });
    });

    it('collects the whole request body (gzip compressed)', function (done) {
      const server = nock('http://esjs.com:9200');
      const con = new HttpConnection(new Host('http://esjs.com:9200'));
      const elements = [];
      for (let i = 0; i < 500; i++) {
        elements.push({ USER: 'doc' });
      }
      const body = JSON.stringify(elements);
      zlib.gzip(body, function (err, compressedBody) {
        server
          .get('/users/1')
          .reply(200, compressedBody, { 'Content-Encoding': 'gzip' });

        con.request({
          method: 'GET',
          path: '/users/1'
        }, function (err, resp, status) {
          expect(err).to.be(undefined);
          expect(resp).to.eql(body);
          expect(status).to.eql(200);
          server.done();
          done();
        });
      });
    });

    it('collects the whole request body (deflate compressed)', function (done) {
      const server = nock('http://esjs.com:9200');
      const con = new HttpConnection(new Host('http://esjs.com:9200'));
      const elements = [];
      for (let i = 0; i < 500; i++) {
        elements.push({ USER: 'doc' });
      }
      const body = JSON.stringify(elements);
      zlib.deflate(body, function (err, compressedBody) {
        server
          .get('/users/1')
          .reply(200, compressedBody, { 'Content-Encoding': 'deflate' });

        con.request({
          method: 'GET',
          path: '/users/1'
        }, function (err, resp, status) {
          expect(err).to.be(undefined);
          expect(resp).to.eql(body);
          expect(status).to.eql(200);
          server.done();
          done();
        });
      });
    });

    it('Can handle decompression errors', function (done) {
      const server = nock('http://esjs.com:9200');
      const con = new HttpConnection(new Host('http://esjs.com:9200'));
      const body = 'blah';
      server
        .get('/users/1')
        .reply(200, body, { 'Content-Encoding': 'gzip' });

      con.request({
        method: 'GET',
        path: '/users/1'
      }, function (err, resp, status) {
        expect(err).to.be.an(Error);
        expect(resp).to.eql(undefined);
        expect(status).to.eql(undefined);
        server.done();
        done();
      });
    });

    it('Ignores serialization errors', function (done) {
      const server = nock('http://esjs.com:9200');
      const con = new HttpConnection(new Host('http://esjs.com:9200'));
      const body = '{ "USER":';

      // partial body
      server
        .get('/users/1')
        .reply(200, body);

      con.request({
        method: 'GET',
        path: '/users/1'
      }, function (err, resp, status) {
        expect(err).to.be(undefined);
        expect(resp).to.eql(body);
        expect(status).to.eql(200);
        done();
      });
    });
  });

  describe('HTTP specifics', function () {
    it('uses TCP no delay', function (done) {
      const con = new HttpConnection(new Host('localhost'));
      stub(http.ClientRequest.prototype, 'setNoDelay');
      const server = nock('http://localhost').get('/').reply(200);

      con.request({}, function () {
        expect(http.ClientRequest.prototype.setNoDelay.callCount).to.eql(1);
        expect(http.ClientRequest.prototype.setNoDelay.lastCall.args[0]).to.eql(true);
        server.done();
        done();
      });
    });

    it('sets the Content-Length header properly', function (done) {
      const con = new HttpConnection(new Host('localhost'));
      stub(http.ClientRequest.prototype, 'setHeader');
      const server = nock('http://localhost').get('/').reply(200);

      const body = 'pasta and 𝄞';
      expect(body.length).to.eql(12); // nope
      expect(Buffer.byteLength(body, 'utf8')).to.eql(14); // yep

      con.request({
        body: body
      }, function () {
        expect(http.ClientRequest.prototype.setHeader.lastCall.args).to.eql(['Content-Length', 14]);
        server.done();
        done();
      });
    });

    it('does not set the Accept-Encoding header by default', function (done) {
      const con = new HttpConnection(new Host());
      const respBody = 'i should not be encoded';
      const server = nock('http://localhost:9200')
      .matchHeader('accept-encoding', undefined)
      .get('/')
      .once()
      .reply(200, respBody);

      con.request({}, function (err, resp) {
        expect(resp).to.be(respBody);
        server.done();
        done();
      });
    });

    it('sets the Accept-Encoding header when specified', function (done) {
      const con = new HttpConnection(new Host({ suggestCompression: true }));
      const respBody = 'i should be encoded';
      const server = nock('http://localhost:9200')
      .matchHeader('accept-encoding', 'gzip,deflate')
      .get('/')
      .once()
      .reply(200, respBody);

      con.request({}, function (err, resp) {
        expect(resp).to.be(respBody);
        server.done();
        done();
      });
    });
  });

  describe('Connection cleanup', function () {
    it('destroys any connections created', function (done) {
      this.timeout(5 * 60 * 1000);
      const cp = require('child_process');
      const path = require('path');
      const fixture = _.partial(path.join, __dirname, '../../fixtures');
      let timeout; // start the timeout once we hear back from the client

      let client; // eslint-disable-line prefer-const
      const server = cp.fork(fixture('keepalive_server.js'))
        .on('message', function (port) {
          client.send(port);
        });

      client = cp.fork(fixture('keepalive.js'))
        .on('message', function (output) {
          expect(output).to.have.property('remaining', 0);
          expect(output).to.have.property('timeouts', 0);
          server.kill('SIGKILL');
          if (client.connected) {
            client.disconnect();
          }

          timeout = setTimeout(function () {
            client.removeListener('exit');
            done(new Error('process should have closed by now'));
          }, 2000);
        })
        .on('exit', function () {
          clearTimeout(timeout);
          done();
        });
    });

    it('properly removes all elements from the socket', function () {
      const con = new HttpConnection(new Host('localhost'));
      const sockets = [
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} },
        { destroy: function () {} }
      ];
      const name = con.agent.getName(parseUrl('http://localhost/'));
      con.agent.sockets[name] = sockets;
      con.setStatus('closed');
      expect(sockets).to.eql([]);
    });
  });

});
