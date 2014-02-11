var Host = require('../../../src/lib/host');
var _ = require('lodash-node');
var expect = require('expect.js');
var url = require('url');

describe('Host class', function () {
  describe('construction', function () {
    it('properly sets the defaults', function () {
      var host = new Host();
      expect(host).to.eql({
        protocol: 'http',
        host: 'localhost',
        port: 9200,
        path: '',
        auth: null,
        query: {}
      });
    });

    it('accepts a string for query', function () {
      var host = new Host({ query: 'beep=boop'});

      expect(host.query).to.eql({
        beep: 'boop'
      });
    });

    it('accepts other generic params', function () {
      var headers = { 'X-Special-Routing-Header': 'pie' };
      var host = new Host({ headers: headers });

      expect(host.headers).to.be(headers);
    });

    describe('from a string', function () {
      it('accepts a string for the entire url', function () {
        var host = new Host('john:dude@pizza.com:420/pizza/cheese?shrooms=true');

        expect(host).to.eql({
          protocol: 'http',
          host: 'pizza.com',
          port: 420,
          path: '/pizza/cheese',
          auth: 'john:dude',
          query: {
            shrooms: 'true'
          }
        });
      });

      it('uses the default port based on the protocol', function () {
        var host;

        host = new Host('https://google.com');
        expect(host.port).to.be(443);

        host = new Host('http://google.com');
        expect(host.port).to.be(80);

        Host.defaultPorts.trift = 9300;
        host = new Host('thrift://google.com');
        expect(host.port).to.be(9200);
        delete Host.defaultPorts.trift;
      });
    });

    describe('based on the output from url.parse', function () {
      it('might cause weird things to happen', function () {
        var parsedUrl = url.parse('pizza.com:888');

        // I imagine most people don't expect
        expect(parsedUrl.protocol).to.eql('pizza.com:');
        expect(parsedUrl.host).to.eql('888');

        var host = new Host(parsedUrl);
        expect(host.protocol).to.eql('pizza.com');
        expect(host.host).to.eql('888');
      });

      it('will cause extra properties', function () {
        var host = new Host(url.parse('https://joe:diner@pizza.com:888/path?query=yes#section'));
        expect(host.protocol).to.eql('https');
        expect(host.host).to.eql('pizza.com');
        expect(host.port).to.eql(888);
        expect(host.path).to.eql('/path');
        expect(host.auth).to.eql('joe:diner');
        expect(host.query).to.eql({
          query: 'yes'
        });

        expect(host).to.include.keys('slashes', 'hash', 'href', 'search');
      });
    });

    it('ignores anything that\'s not a string or object-y', function () {
      var host = new Host(1234);

      expect(host).to.eql({
        protocol: 'http',
        host: 'localhost',
        port: 9200,
        path: '',
        auth: null,
        query: {}
      });
    });
  });

  describe('#makeUrl', function () {
    it('merges parameters', function () {
      var host = new Host({
        path: '/prefix',
        query: {
          user_id: 123
        }
      });

      expect(host.makeUrl({
        path: '/this and that',
        query: {
          param: 1
        },
        auth: 'user:pass'
      })).to.be('http://user:pass@localhost:9200/prefix/this and that?param=1&user_id=123');
    });

    it('ensures that path starts with a forward-slash', function () {
      var host = new Host();
      host.path = 'prefix';

      expect(host.makeUrl({ path: '/this and that'}))
        .to.be('http://localhost:9200/prefix/this and that');
    });

    it('does not try to prevent double forward-slashes', function () {
      var host = new Host({ path: 'prefix/' });

      expect(host.makeUrl({ path: '/this and that'}))
        .to.be('http://localhost:9200/prefix//this and that');
    });

    it('creates proper url without any params', function () {
      var host = new Host({});
      expect(host.makeUrl()).to.be('http://localhost:9200/');

      host = new Host({ host: 'john', port: 80 });
      expect(host.makeUrl()).to.be('http://john/');

      host = new Host({ host: 'italy', path: '/pie', auth: 'user:pass'});
      expect(host.makeUrl()).to.be('http://user:pass@italy:9200/pie');
    });

    it('outputs valid relative urls when the host is empty', function () {
      var host = new Host({
        host: false,
        path: '/path',
        query: { this: 'that' }
      });

      expect(host + '').to.be('/path?this=that');
    });
  });

  describe('#toString', function () {
    it('produces the same output as makeUrl when it is called without params', function () {
      var host = new Host({
        path: '/pasta',
        host: 'google.com'
      });

      expect(host.toString()).to.eql(host.makeUrl());
    });
  });

});
