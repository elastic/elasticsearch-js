var Host = require('../../src/lib/host');
var _ = require('lodash');
var url = require('url');

describe('Host class', function () {
  describe('construction', function () {
    it('properly sets the defaults', function () {
      var host = new Host();
      host.should.eql({
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

      host.query.should.eql({
        beep: 'boop'
      });
    });

    it('accepts other generic params', function () {
      var headers = { 'X-Special-Routing-Header': 'pie' };
      var host = new Host({ headers: headers });

      host.headers.should.be.exactly(headers);
    });

    describe('from a string', function () {
      it('accepts a string for the entire url', function () {
        var host = new Host('john:dude@pizza.com:420/pizza/cheese?shrooms=true');

        host.should.eql({
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
        host.port.should.eql(443);

        host = new Host('http://google.com');
        host.port.should.eql(80);

        Host.defaultPorts.trift = 9300;
        host = new Host('thrift://google.com');
        host.port.should.eql(9200);
        delete Host.defaultPorts.trift;
      });
    });

    describe('based on the output from url.parse', function () {
      it('might cause weird things to happen', function () {
        var parsedUrl = url.parse('pizza.com:888');

        // I imagine most people don't expect
        parsedUrl.should.include({
          protocol: 'pizza.com:',
          host: '888',
        });

        var host = new Host(parsedUrl);
        host.protocol.should.eql('pizza.com');
        host.host.should.eql('888');
      });

      it('will cause extra properties', function () {
        var host = new Host(url.parse('https://joe:diner@pizza.com:888/path?query=yes'));
        host.should.include({
          protocol: 'https',
          host: 'pizza.com',
          port: 888,
          path: '/path',
          auth: 'joe:diner',
          query: {
            query: 'yes'
          }
        });

        _.keys(host).should.include('slashes', 'hash', 'href', 'search');
      });
    });

    it('ignores anything that\'s not a string or object-y', function () {
      var host = new Host(1234);

      host.should.eql({
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

      host.makeUrl({
        path: '/this and that',
        query: {
          param: 1
        },
        auth: 'user:pass'
      }).should.eql('http://user:pass@localhost:9200/prefix/this and that?param=1&user_id=123');
    });

    it('ensures that path starts with a forward-slash', function () {
      var host = new Host();
      host.path = 'prefix';

      host.makeUrl({ path: '/this and that'})
        .should.eql('http://localhost:9200/prefix/this and that');
    });

    it('does not try to prevent double forward-slashes', function () {
      var host = new Host({ path: 'prefix/' });

      host.makeUrl({ path: '/this and that'})
        .should.eql('http://localhost:9200/prefix//this and that');
    });

    it('creates proper url without any params', function () {
      var host = new Host({});
      host.makeUrl().should.eql('http://localhost:9200/');

      host = new Host({ host: 'john', port: 80 });
      host.makeUrl().should.eql('http://john/');

      host = new Host({ host: 'italy', path: '/pie', auth: 'user:pass'});
      host.makeUrl().should.eql('http://user:pass@italy:9200/pie');
    });
  });

  describe('#toString', function () {
    it('produces the same output as makeUrl when it is called without params', function () {
      var host = new Host({
        path: '/pasta',
        host: 'google.com'
      });

      host.toString().should.eql(host.makeUrl());
    });
  });

});
