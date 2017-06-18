describe('Tracer Logger', function () {

  const Log = require('../../../src/lib/log');
  const TracerLogger = require('../../../src/lib/loggers/tracer');
  const expect = require('expect.js');
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
    return new TracerLogger(parent, config);
  }

  const stub = require('../../utils/auto_release_stub').make();

  // require('../generic_logger_tests')(makeLogger);

  describe('#formatTraceMessage', function () {
    it('includes the original host', function () {
      const logger = makeLogger();

      const formatted = logger._formatTraceMessage({
        method: 'DELETE',
        url: 'https://originalHost.com:9522/path/to/thing?qs=100',
        body: '{ "yes": true }',
        status: 333,
        response: '{ "ok": false }'
      });

      expect(formatted.curl).to.match(/-XDELETE/);
      expect(formatted.curl).to.match(/https:\/\/originalHost\.com:9522\/?\s+/i);
      expect(formatted.curl).to.match(/https:\/\/localhost:9200\/path\/to\/thing\?(pretty=true|qs=100|&){3}/);
    });
  });

  describe('#write', function () {
    let logger;
    beforeEach(function () {
      logger = makeLogger();
      stub(logger.stream, 'write');
    });

    it('detects tracer logs by listening messages wrapped in objects', function () {
      logger.write('TRACE', { msg: 'msgtext', curl: 'curlcall' });
      expect(logger.stream.write.callCount).to.be(1);
      expect(logger.stream.write.lastCall.args[0]).to.contain('msgtext');
      expect(logger.stream.write.lastCall.args[0]).to.contain('curlcall');
    });

    it('comments everthing except the curl call', function () {
      logger.write('TRACE', { msg: 'comment me', curl: 'no comment' });
      expect(logger.stream.write.callCount).to.be(1);
      expect(logger.stream.write.lastCall.args[0]).to.match(/^# +comment me/m);
      expect(logger.stream.write.lastCall.args[0]).to.match(/^no comment/m);
    });

    it('just comments when it gets a string', function () {
      logger.write('TRACE', 'log me');
      expect(logger.stream.write.callCount).to.be(1);
      expect(logger.stream.write.lastCall.args[0]).to.match(/^# +log me/m);
    });
  });
});
