describe('Stdio Logger', function () {

  const Log = require('../../../src/lib/log');
  const StdioLogger = require('../../../src/lib/loggers/stdio');
  const expect = require('expect.js');
  const sinon = require('sinon');
  let parentLog;

  beforeEach(function () {
    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();
  });

  function makeLogger(parent, levels) {
    parent = parent || parentLog;
    const config = {
      levels: Log.parseLevels(levels || 'trace')
    };
    return new StdioLogger(parent, config);
  }

  const stub = require('../../utils/auto_release_stub').make();

  require('../generic_logger_tests')(makeLogger);

  describe('colorizing', function () {
    const chalk = require('chalk');
    const now = '2013-01-01T00:00:00Z';
    const nowDate = new Date(now);
    const nowTime = nowDate.getTime();
    let clock;

    beforeEach(function () {
      stub.autoRelease(sinon.useFakeTimers(nowTime));
    });

    it('uses colors when it\'s supported', function () {
      const logger = makeLogger();
      const hasColor = require('chalk').supportsColor;
      expect(logger.color).to.be(hasColor);
    });

    it('obeys the logger.color === false', function () {
      const logger = makeLogger();
      stub(process.stdout, 'write');
      const withoutColor = 'Elasticsearch INFO: ' + now + '\n  something\n\n';

      logger.color = false;
      logger.onInfo('something');
      expect(process.stdout.write.lastCall.args[0]).to.eql(withoutColor);
    });

    it('obeys the logger.color === true', function () {
      const logger = makeLogger();

      stub(process.stdout, 'write');
      const withoutColor = 'Elasticsearch DEBUG: ' + now + '\n  be weary\n\n';

      logger.color = true;
      logger.onDebug('be weary');
      expect(process.stdout.write.lastCall.args[0]).to.not.eql(withoutColor);
      expect(chalk.stripColor(process.stdout.write.lastCall.args[0])).to.eql(withoutColor);
    });
  });

});
