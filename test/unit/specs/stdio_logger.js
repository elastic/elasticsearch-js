describe('Stdio Logger', function () {

  var Log = require('../../../src/lib/log');
  var StdioLogger = require('../../../src/lib/loggers/stdio');
  var expect = require('expect.js');
  var sinon = require('sinon');
  var parentLog;

  beforeEach(function () {
    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();
  });

  function makeLogger(parent, levels) {
    parent = parent || parentLog;
    var config = {
      levels: Log.parseLevels(levels || 'trace')
    };
    return new StdioLogger(parent, config);
  }

  var stub = require('../../utils/auto_release_stub').make();

  require('../generic_logger_tests')(makeLogger);

  describe('colorizing', function () {
    var chalk = require('chalk');
    var now = '2013-01-01T00:00:00Z';
    var nowDate = new Date(now);
    var nowTime = nowDate.getTime();
    var clock;

    beforeEach(function () {
      stub.autoRelease(sinon.useFakeTimers(nowTime));
    });

    it('uses colors when it\'s supported', function () {
      var logger = makeLogger();
      var hasColor = require('chalk').supportsColor;
      expect(logger.color).to.be(hasColor);
    });

    it('obeys the logger.color === false', function () {
      var logger = makeLogger();
      stub(process.stdout, 'write');
      var withoutColor = 'Elasticsearch INFO: ' + now + '\n  something\n\n';

      logger.color = false;
      logger.onInfo('something');
      expect(process.stdout.write.lastCall.args[0]).to.eql(withoutColor);
    });

    it('obeys the logger.color === true', function () {
      var logger = makeLogger();

      stub(process.stdout, 'write');
      var withoutColor = 'Elasticsearch DEBUG: ' + now + '\n  be weary\n\n';

      logger.color = true;
      logger.onDebug('be weary');
      expect(process.stdout.write.lastCall.args[0]).to.not.eql(withoutColor);
      expect(chalk.stripColor(process.stdout.write.lastCall.args[0])).to.eql(withoutColor);
    });
  });

});
