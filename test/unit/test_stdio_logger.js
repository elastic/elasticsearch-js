var Log = require('../../src/lib/log');
var StdioLogger = require('../../src/lib/loggers/stdio');
var sinon = require('sinon');
var stubs = [];
var parentLog;

beforeEach(function () {
  parentLog = new Log();
});

afterEach(function () {
  var stub;
  while (stub = stubs.pop()) {
    stub.restore();
  }
  parentLog.close();
});

function stub() {
  stubs.push(sinon.stub.apply(sinon, arguments));
}

function makeLogger(colors) {
  var config = {
    levels: Log.parseLevels('trace')
  };
  if (colors !== void 0) {
    config.colors = colors;
  }
  return new StdioLogger(parentLog, config);
}

describe('Stdio Logger', function () {
  describe('pays attention to the level setting', function () {

    beforeEach(function () {
      var logger = makeLogger();
      stub(parentLog, 'emit');
    });

    it('listens for all the events', function () {
      parentLog.listenerCount('error').should.eql(1);
      parentLog.listenerCount('warning').should.eql(1);
      parentLog.listenerCount('info').should.eql(1);
      parentLog.listenerCount('debug').should.eql(1);
      parentLog.listenerCount('trace').should.eql(1);
    });

    it('emits events because something is listening', function () {
      parentLog.error(new Error('error message'));
      parentLog.emit.lastCall.args[0].should.eql('error');

      parentLog.warning('warning');
      parentLog.emit.lastCall.args[0].should.eql('warning');

      parentLog.info('info');
      parentLog.emit.lastCall.args[0].should.eql('info');

      parentLog.debug('debug');
      parentLog.emit.lastCall.args[0].should.eql('debug');

      parentLog.trace('GET', {}, '', '', 200);
      parentLog.emit.lastCall.args[0].should.eql('trace');
    });
  });

  describe('colorizing', function () {
    var chalk = require('chalk');
    var now = '2013-01-01T00:00:00Z';
    var nowDate = new Date(now);
    var nowTime = nowDate.getTime();
    var clock;

    beforeEach(function () {
      stubs.push(sinon.useFakeTimers(nowTime));
    });

    it('uses colors when it\'s supported', function () {
      var logger = makeLogger();
      var hasColor = require('chalk').supportsColor;
      logger.color.should.be.exactly(hasColor);
    });

    it('obeys the logger.color === false', function () {
      var logger = makeLogger();
      stub(process.stdout, 'write');
      var withoutColor = 'INFO: ' + now + '\n  something\n\n';

      logger.color = false;
      logger.onInfo('something');
      process.stdout.write.lastCall.args[0].should.eql(withoutColor);
    });

    it('obeys the logger.color === true', function () {
      var logger = makeLogger(false);
      stub(process.stdout, 'write');
      var withoutColor = 'TRACE: ' + now + '\n  curl\n  msg\n\n';

      logger.color = true;
      logger.onTrace('msg', 'curl');
      process.stdout.write.lastCall.args[0].should.not.eql(withoutColor);
      chalk.stripColor(process.stdout.write.lastCall.args[0]).should.eql(withoutColor);
    });
  });


  describe('#onError', function () {
    it('uses the Error name when it is not just "Error"', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('TypeError');
      });

      logger.onError(new TypeError('Typerr'));
      logger.write.callCount.should.eql(1);
    });

    it('uses "ERROR" when the error name is "Error"', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('ERROR');
      });

      logger.onError(new Error('thing'));
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onWarning', function () {
    it('uses the "WARNING" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('WARNING');
      });
      logger.onWarning('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        msg.should.eql('message');
      });

      logger.onWarning('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onInfo', function () {
    it('uses the "INFO" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('INFO');
      });
      logger.onInfo('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        msg.should.eql('message');
      });

      logger.onInfo('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onDebug', function () {
    it('uses the "DEBUG" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('DEBUG');
      });
      logger.onDebug('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        msg.should.eql('message');
      });

      logger.onDebug('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onTrace', function () {
    it('uses the "TRACE" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        label.should.eql('TRACE');
      });
      logger.onTrace('message');
      logger.write.callCount.should.eql(1);
    });

    it('joins the message and curl call with a newline', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (to, label, colorize, msg) {
        msg.should.eql('curlcall\nmessage');
      });

      logger.onTrace('message', 'curlcall');
      logger.write.callCount.should.eql(1);
    });
  });
});
