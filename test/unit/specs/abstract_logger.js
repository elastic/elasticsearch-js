describe('Logger Abstract', function () {
  var expect = require('expect.js');
  var sinon = require('sinon');
  var Log = require('../../../src/lib/log');
  var LoggerAbstract = require('../../../src/lib/logger');

  var parentLog;
  var stub = require('../../utils/auto_release_stub').make();

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
      expect(function () {
        var logger = makeLogger();
        logger.write();
      }).to.throwError(/overwritten/);
    });
  });

  require('../generic_logger_tests')(makeLogger);

});