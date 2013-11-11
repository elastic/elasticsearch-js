var Log = require('../../src/lib/log');

exports['Log::parseLevels'] = {

  'parses a string': function (test) {
    test.deepEqual(Log.parseLevels('warning'), ['error', 'warning']);
    test.done();
  },

  'filters an array': function (test) {
    test.deepEqual(Log.parseLevels(['trace', 'not a level']), ['trace']);
    test.done();
  },

  'returns nothing as a defauls': function (test) {
    test.ok(!Log.parseLevels());
    test.done();
  }

};

exports['Log::join'] = {

  'joins strings': function (test) {
    test.equal(Log.join(['one', 'two']), 'one two');
    test.done();
  },

  'flattens nested arrays': function (test) {
    test.equal(Log.join(['one', ['three', 'four']]), 'one three,four');
    test.done();
  },

  'flattens arguments': function (test) {
    (function() {
      test.equal(Log.join(arguments), 'one two');
    }('one', 'two'));
    test.done();
  }

};

/**
 * Empty log bridge (no outputs)
 * @type {Log}
 */
var log;

exports['Log instance with no outputs'] = {

  setUp: function (done) {
    log = new Log([]);
    done();
  },

  tearDown: function (done) {
    done();
  },

  'should not emit any events': function (test) {
    log.emit = function () {
      test.ok(false, 'Emit should not have been called');
    };

    log.error('Error Message');

    test.done();
  }

};