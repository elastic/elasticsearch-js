var Log = require('../../src/lib/log');
var StdioLogger = require('../../src/lib/loggers/stdio');
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

var stub = require('./auto_release_stub').make();

describe('Stdio Logger', function () {

  require('./generic_logger_tests')(makeLogger);

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
      logger.color.should.be.exactly(hasColor);
    });

    it('obeys the logger.color === false', function () {
      var logger = makeLogger();
      stub(process.stdout, 'write');
      var withoutColor = 'Elasticsearch INFO: ' + now + '\n  something\n\n';

      logger.color = false;
      logger.onInfo('something');
      process.stdout.write.lastCall.args[0].should.eql(withoutColor);
    });

    it('obeys the logger.color === true', function () {
      var logger = makeLogger();

      stub(process.stdout, 'write');
      var withoutColor = 'Elasticsearch TRACE: ' + now + '\n  curl\n  msg\n\n';

      logger.color = true;
      logger.onTrace('msg', 'curl');
      process.stdout.write.lastCall.args[0].should.not.eql(withoutColor);
      chalk.stripColor(process.stdout.write.lastCall.args[0]).should.eql(withoutColor);
    });
  });

});
