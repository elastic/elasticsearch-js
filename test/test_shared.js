/* Shared tests */
/*
'use strict';

//var esj = require('../dist/elasticsearch-node.js');
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

exports.shared = {
  setUp: function(done) {
    // setup here
    done();
  },
  'defaults': function(test) {
    test.expect(1);
    test.deepEqual(defaults({foo:1,bar:2},{bar:3,baz:4}),{foo:1,bar:2,baz:4},'should be foo:1,bar:2,baz:4')
    test.done();
  },
  'extend': function(test) {
    test.expect(1);
    test.deepEqual(extend({foo:1},{bar:2}),{foo:1,bar:2},'should be foo:1,bar:2')
    test.done();
  },
  'indexOf': function(test) {
    test.expect(1);
    test.equal(indexOf([1,2,3],3), 2, 'should be 2')
    test.done();
  },
  'queryString': function(test) {
    test.expect(1);
    test.equal(queryString({foo:'bar'}),'foo=bar','should be foo=bar')
    test.done();
  },
  'has': function(test) {
    test.expect(1);
    test.equal(has({foo:1},'foo'),true,'should be true')
    test.done();
  },
  'each': function(test) {
    test.expect(1);
    var str = '';
    each([1,2,3],function(v){str+=v;})
    test.equal(str,'123','should be 123')
    test.done();
  },
  'isUndefined': function (test) {
    test.expect(1);
    test.ok(isUndefined(undefined),'should be undefined')
    test.done();
  }
};
*/