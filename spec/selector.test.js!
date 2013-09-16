/* selector function tests */
'use strict';

var esj = require('../dist/elasticsearch-node.js');
var _c = new esj.Client();

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.selector = {
  setUp: function(done) {
    done();
  },
  'exists': function(test) {
    test.expect(3);
    test.ok(esj.Selector,'Should exist');
    test.ok(esj.Selector.roundRobin,'Should exist');
    test.ok(esj.Selector.random,'Should exist');
    test.done();
  },
  'roundRobin' : function(test) {
    test.expect(4);
    var hosts = ['foo','bar','baz'];
    test.equal(esj.Selector.roundRobin(hosts),'baz','Should be baz');
    test.equal(esj.Selector.roundRobin(hosts),'bar','Should be bar');
    test.equal(esj.Selector.roundRobin(hosts),'foo','Should be foo');

    hosts = ['foo'];
    test.equal(esj.Selector.roundRobin(hosts),'foo','Should be foo');

    test.done();

  },
  'random' : function(test) {
    test.expect(2);
    var hosts = ['bar','baz','foo'];
    test.ok(esj.Selector.roundRobin(hosts),'Should return something');
    // This is how underscore.js tests its shuffle, will have to suffice
    test.deepEqual(hosts.sort(),['bar','baz','foo'],'Should contain the same elements');
    test.done();
  }
};