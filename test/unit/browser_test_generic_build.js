/* jshint browser:true */
/* global angular */

var should = require('should');
var Client = require('../../src/lib/client');

describe('Angular esFactory', function () {
  before(function (done) {
    // inject angular
    var scr = document.createElement('script');
    scr.src = '/test/unit/angular-1.2.5.js';
    scr.async = true;
    scr.onload = function () {
      require('../../src/elasticsearch.angular.js');
      done();
    };
    scr.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(scr);
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
        esFactory.should.have.type('function');
        done();
      };
    });
  });
  it('has Transport and ConnectionPool properties', function (done) {
    directive(function (esFactory) {
      return function () {
        esFactory.should.have.property('Transport');
        esFactory.should.have.property('ConnectionPool');
        done();
      };
    });
  });
  it('returns a new client when it is called', function (done) {
    directive(function (esFactory) {
      return function () {
        esFactory({ log: null }).should.be.an.instanceOf(Client);
        done();
      };
    });
  });
});