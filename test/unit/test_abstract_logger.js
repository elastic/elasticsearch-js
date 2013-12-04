describe('Logger Abstract', function () {

  var sinon = require('sinon');
  var Log = require('../../src/lib/log');
  var LoggerAbstract = require('../../src/lib/logger');

  var parentLog;
  var stub = require('./auto_release_stub').make();

  function makeLogger(parent, levels) {
    return new LoggerAbstract(parent || parentLog, {
      levels: Log.parseLevels(levels || [])
    });
  }

  beforeEach(function () {
    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();
  });

  describe('#write', function () {
    it('requires that it is overwritten', function () {
      (function () {
        var logger = makeLogger();
        logger.write();
      }).should.throw(/overwritten/);
    });
  });

  require('./generic_logger_tests')(makeLogger);

});