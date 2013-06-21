/* Serializer tests */

'use strict';

var esj = require('../dist/elasticsearch-node.js');
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

exports.serializer = {
  setUp: function(done) {
    // setup here
    done();
  },
  'json': function(test) {
    test.expect(2);
    // Create serializer object
    var _s = new esj.Serializer.json();
    test.equal(_s.dump({foo:true}), '{"foo":true}', 'should be \'{"foo":true}\'');
    test.deepEqual(_s.load('{"foo":true}'), {foo:true}, 'should be {foo:true}');
    test.done();
  },
};