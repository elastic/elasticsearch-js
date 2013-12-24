/* jshint browser:true */
/* global angular */

var expect = require('expect.js');
var Client = require('../../src/lib/client');

describe('Angular esFactory', function () {
  before(function () {
    require('../../src/elasticsearch.angular.js');
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
        expect(esFactory({ log: null })).to.be.a(Client);
        done();
      };
    });
  });
});