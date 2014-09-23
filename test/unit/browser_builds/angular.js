var _ = require('lodash-node');
var expect = require('expect.js');
var Promise = require('bluebird');
var sinon = require('sinon');

describe('Angular esFactory', function () {
  before(function () {
    require('../../../src/elasticsearch.angular.js');
  });

  var uuid = (function () { var i = 0; return function () { return ++i; }; }());
  var esFactory;
  var $http;
  var $rootScope;
  var $httpBackend;

  function bootstrap(env) {
    beforeEach(function () {
      var promiseProvider = _.noop;
      if (env.bluebirdPromises) {
        promiseProvider = function ($provide) {
          $provide.service('$q', function () {
            return {
              defer: function () {
                return _.bindAll(Promise.defer(), ['resolve', 'reject']);
              },
              reject: Promise.reject,
              when: Promise.resolve,
              all: Promise.all
            };
          });
        };
      }

      angular.mock.module(promiseProvider, 'elasticsearch');
    });

    beforeEach(angular.mock.inject(function ($injector) {
      $http = $injector.get('$http');
      esFactory = $injector.get('esFactory');
      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
    }));
  }

  describe('basic', function () {
    bootstrap({
      bluebirdPromises: true
    });

    it('is available in the elasticsearch module', function () {
      expect(esFactory).to.be.a('function');
    });

    it('has Transport and ConnectionPool properties', function () {
      expect(esFactory).to.have.property('Transport');
      expect(esFactory).to.have.property('ConnectionPool');
    });

    it('returns a new client when it is called', function () {
      var client = esFactory({
        hosts: null
      });

      expect(client).to.have.keys('transport');
      expect(client.transport).to.be.a(esFactory.Transport);
      client.close();
    });

    it('returns an error created by calling a method incorrectly', function () {
      var client = esFactory({ hosts: null });
      var err;

      var prom = client.get().then(function () {
        throw new Error('expected request to fail');
      }, function (err) {
        expect(err).to.have.property('message');
        expect(err.message).to.match(/unable/i);
      });

      $rootScope.$apply();
      return prom;
    });
  });

  describe('ping', function () {
    bootstrap({
      bluebirdPromises: true
    });

    it('works', function () {
      $httpBackend.expect('HEAD', 'http://some-es-host.com/').respond(200);

      var client = esFactory({
        host: 'http://some-es-host.com/'
      });

      var connection = client.transport.connectionPool.getConnections().pop();
      var stub = sinon.stub(connection, '$http', function (config) {
        process.nextTick($httpBackend.flush);
        return $http(config);
      });

      return client.ping({
        requestTimeout: 1000
      });
    });
  });

  describe('$http', function () {
    bootstrap({
      bluebirdPromises: true
    });

    it('uses the auth header provided', function () {
      var authString = 'user:password';
      var authHeader = 'Basic ' + (new Buffer(authString, 'utf8')).toString('base64');
      var $httpParams = null;
      var client = esFactory({
        host: {
          host: 'some-other-es-host.com',
          auth: authString
        }
      });

      // once the client calls the $http method, flush the requests and trigger an
      // error if the expected request was not made
      var connection = client.transport.connectionPool.getConnections().pop();
      var stub = sinon.stub(connection, '$http', function (params) {
        $httpParams = params;
        return Promise.resolve({
          data: null,
          status: 200,
          headers: function () {
            return {};
          }
        });
      });

      var prom = client.ping({
        requestTimeout: 1000
      });
      return prom.then(function () {
        expect($httpParams).to.have.property('headers');
        expect($httpParams.headers).to.have.property('Authorization', authHeader);
      });
    });
  });
});