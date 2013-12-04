var Log = require('../../src/lib/log');
var TracerLogger = require('../../src/lib/loggers/tracer');
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
  return new TracerLogger(parent, config);
}

var stub = require('./auto_release_stub').make();

describe('Tracer Logger', function () {

  require('./generic_logger_tests')(makeLogger);

  describe('#write', function () {
    it('comments out everything accept the curlCall', function () {
      var logger = makeLogger();

      stub(logger.stream, 'write', function (string) {
        string.replace(/(^#.*$|^curlcall$)/mg, '').trim().should.be.exactly('');
      });

      logger.onTrace('message', 'curlcall');

      logger.stream.write.callCount.should.eql(1);
    });
  });
});
