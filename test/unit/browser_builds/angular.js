/* global angular */
const _ = require('lodash');
const expect = require('expect.js');
const Promise = require('bluebird');

describe('Angular esFactory', function () {
  before(function () {
    require('../../../src/elasticsearch.angular.js');
  });

  let esFactory;
  let $rootScope;

  function bootstrap(env) {
    beforeEach(function () {
      let promiseProvider = _.noop;
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
      esFactory = $injector.get('esFactory');
      $rootScope = $injector.get('$rootScope');
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
      const client = esFactory({
        hosts: null
      });

      expect(client).to.have.keys('transport');
      expect(client.transport).to.be.a(esFactory.Transport);
      client.close();
    });

    it('returns an error created by calling a method incorrectly', function () {
      const client = esFactory({ hosts: null });

      const prom = client.get().then(function () {
        throw new Error('expected request to fail');
      }, function (err) {
        expect(err).to.have.property('message');
        expect(err.message).to.match(/unable/i);
      });

      $rootScope.$apply();
      return prom;
    });
  });
});
