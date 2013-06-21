/* node transport function tests */
// TODO: add check to see if any data in ES, fail if so.
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

exports.logger = {
  setUp: function(done) {
    // Suppress console messages (this, sadly, applies globally)
    //console.error = console.warn = console.info = console.log = function() {}
    done();
  },
  'log': function(test) {
    test.expect(5);

    // Test defaults
    test.equal(_c.logger.error('error'),'error','Error should be logged');
    test.equal(_c.logger.warn('warn'),'warn','Warn should be logged');
    test.equal(_c.logger.info('info'),false,'Info should not be logged');
    test.equal(_c.logger.debug('debug'),false,'Debug should not be logged');
    
    // Turn on info logging in first client
    _c.logger.options.info =  true;
    test.equal(_c.logger.info('info'),'info','Info should be logged');


    test.done();
  },
  'trace': function(test) {
    test.expect(2);

    // Test defaults
    test.equal(_c.tracer.info('info'),false,'Info should not be logged');
    test.equal(_c.tracer.trace('trace'),false,'Trace should not be logged');
    test.done();
  }
};