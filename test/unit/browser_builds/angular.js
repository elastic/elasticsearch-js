/* jshint browser:true */
/* global angular */

var expect = require('expect.js');

describe('Angular esFactory', function () {
  before(function () {
    require('../../../src/elasticsearch.angular.js');
  });

  var uuid = (function () { var i = 0; return function () { return ++i; }; }());
  function directive(makeDirective) {
    var root = document.createElement('div');
    var id = uuid();
    root.setAttribute('test-directive-' + id, 'test-directive');
    document.body.appendChild(root);

    after(function () {
      document.body.removeChild(root);
      root = null;
    });

    angular.module('mod' + id, ['elasticsearch']).directive('testDirective' + id, makeDirective);
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
          var client = esFactory({ hosts: null });
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
        var client = esFactory({ hosts: null });
        client.get().then(function () {
          expect.fail('promise should have been rejected');
        }, function (err) {
          expect(err.message).to.match(/unable/);
          done();
        });
      };
    });
  });
});