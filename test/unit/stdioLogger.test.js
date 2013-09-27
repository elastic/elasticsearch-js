
var Log = require('../../src/lib/log')
  , log = new Log([])
  , Stdio = require('../../src/lib/loggers/stdio')
  , _ = require('../../src/lib/utils')
  , warningLogger;

exports['Stdio Logger'] = {

  setUp: function (done) {
    if (warningLogger) {
      warningLogger.cleanUpListeners();
    }

    // new logger in warning mode
    warningLogger = new Stdio({
      levels: ['error', 'warning']
    }, log);

    done();
  },

  'logs error messages': function (test) {
    test.expect(3);

    warningLogger.write = function (to, label, colorize, what) {
      test.equal(label, 'ERROR');
      test.ok(_.isArray(what), 'Messages logged from calls to error should be an array');
      test.equal(what[0], 'Test Error Message');
      test.done();
    };

    log.error('Test Error Message');
  },

  'should log warnings': function (test) {
    test.expect(2);

    warningLogger.write = function (to, label, colorize, what) {
      test.equal(label, 'WARNING');
      test.equal(what, 'Test Warning Message');
      test.done();
    };

    log.warning('Test Warning', 'Message');
  },

  'should NOT log info messages': function (test) {
    if (log.info('Info')) {
      test.ok(false, 'There shouldn\'t be listeners for info logs');
    } else {
      test.done();
    }
  },

  'should NOT log debug messages': function (test) {
    if (log.debug('Debug')) {
      test.ok(false, 'There shouldn\'t be listeners for debug logs');
    } else {
      test.done();
    }
  },

  'should NOT log trace messages': function (test) {
    if (log.trace('curl "http://localhost:9200" -d "{ \"query\": ... }"')) {
      test.ok(false, 'There shouldn\'t be listeners for trace logs');
    } else {
      test.done();
    }
  }

};