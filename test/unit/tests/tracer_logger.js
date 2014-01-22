describe('Tracer Logger', function () {

  var Log = require('../../../src/lib/log');
  var TracerLogger = require('../../../src/lib/loggers/tracer');
  var sinon = require('sinon');
  var expect = require('expect.js');
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

  var stub = require('../../utils/auto_release_stub').make();


  require('../generic_logger_tests')(makeLogger);

  describe('#write', function () {
    it('comments out everything accept the curlCall', function () {
      var logger = makeLogger();

      stub(logger.stream, 'write', function (string) {
        expect(string.replace(/(^#.*$|^curlcall$)/mg, '').trim()).to.be('');
      });

      logger.onTrace('message', 'curlcall');

      expect(logger.stream.write.callCount).to.eql(1);
    });
  });
});
