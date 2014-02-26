/* jshint browser:true */
/* global angular */

var expect = require('expect.js');

describe('Angular esFactory', function () {
  before(function () {
    require('../../../src/elasticsearch.angular.js');
  });

  var uuid = (function () { var i = 0; return function () { return ++i; }; }());

  /**
   * Perform promise based async code in a way that mocha will understand
   * @param  {Function} cb   - node style callback
   * @param  {Function} body - function that executes async and returns a promise/value
   */
  var prom = function (cb, body) {
    expect(cb).to.be.a('function');
    expect(body).to.be.a('function');

    var promise = body();
    expect(promise.then).to.be.a('function');
    promise.then(function () { cb(); }, cb);
  };

  function directive(makeDirective) {
    var root = document.createElement('div');
    root.setAttribute('ng-controller', 'empty-controller');
    var id = uuid();
    root.setAttribute('test-directive-' + id, 'test-directive');
    document.body.appendChild(root);

    after(function () {
      document.body.removeChild(root);
      root = null;
    });

    angular
      .module('mod' + id, ['elasticsearch'])
      .controller('empty-controller', function () {})
      .directive('testDirective' + id, makeDirective);

    angular.bootstrap(root, ['mod' + id]);
  }

  it('is available in the elasticsearch module', function (done) {
    directive(function (esFactory) {
      return function () {
        expect(esFactory).to.be.a('function');
        done();
      };
    });
  });

  it('has Transport and ConnectionPool properties', function (done) {
    directive(function (esFactory) {
      return function () {
        expect(esFactory).to.have.property('Transport');
        expect(esFactory).to.have.property('ConnectionPool');
        done();
      };
    });
  });

  it('returns a new client when it is called', function (done) {
    directive(function (esFactory) {
      return function () {
        try {
          var client = esFactory({
            hosts: null
          });

          expect(client).to.have.keys('transport');
          expect(client.transport).to.be.a(esFactory.Transport);
          client.close();
        } catch (e) {
          return done(e);
        }
        done();
      };
    });
  });

  it('returns an error created by calling a method incorrectly', function (done) {
    directive(function (esFactory) {
      return function () {
        prom(done, function () {
          var client = esFactory({ hosts: null });
          return client.get().then(function () {
            expect.fail('promise should have been rejected');
          }, function (err) {
            expect(err.message).to.match(/unable/i);
          });
        });
      };
    });
  });

  it('ping\'s properly', function (done) {
    directive(function (esFactory) {
      return function () {
        prom(done, function () {
          var client = esFactory({
            hosts: 'not-a-valid-es-host.es'
          });

          return client.ping().then(function () {
            expect.fail('promise should have been rejected');
          }, function (err) {
            // this error should be "NoConnections", but in some browsers it will be a Timeout due to testing proxy or because it's IE
            expect(err).to.be.ok();
          });
        });
      };
    });
  });
});