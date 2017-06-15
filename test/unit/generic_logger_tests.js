const expect = require('expect.js');
const Log = require('../../src/lib/log');
const LoggerAbstract = require('../../src/lib/logger');
const TracerLogger = require('../../src/lib/loggers/tracer');
const now = new Date('2013-03-01T00:00:00Z');
const sinon = require('sinon');

module.exports = function (makeLogger) {
  const stub = require('../utils/auto_release_stub').make();
  const parent = new Log();

  afterEach(function () {
    parent.close();
  });

  describe('Constuctor', function () {
    it('calls setupListeners, passes its new levels', function () {
      let logger = makeLogger(parent);
      stub(logger.constructor.prototype, 'setupListeners');
      parent.close();

      logger = makeLogger(parent);
      expect(logger.setupListeners).to.have.property('callCount', 1);
    });

    it('listens for the loggers\' "closing" event', function () {
      const logger = makeLogger(parent);
      expect(parent.listenerCount('closing')).to.eql(1);
    });
  });

  describe('listening levels', function () {
    it('calls cleanUpListeners when the listeners are being setup', function () {
      const logger = makeLogger();
      stub(logger, 'cleanUpListeners');
      logger.setupListeners([]);
      expect(logger.cleanUpListeners).to.have.property('callCount', 1);
    });

    it('listens to just error when log is explicitly error', function () {
      const logger = makeLogger(parent, 'error');
      expect(parent.listenerCount('error')).to.eql(1);
      expect(parent.listenerCount('warning')).to.eql(0);
      expect(parent.listenerCount('info')).to.eql(0);
      expect(parent.listenerCount('debug')).to.eql(0);
      expect(parent.listenerCount('trace')).to.eql(0);
    });

    it('listens for all the events when level is "trace"', function () {
      const logger = makeLogger(parent, 'trace');
      expect(parent.listenerCount('error')).to.eql(1);
      expect(parent.listenerCount('warning')).to.eql(1);
      expect(parent.listenerCount('info')).to.eql(1);
      expect(parent.listenerCount('debug')).to.eql(1);
      expect(parent.listenerCount('trace')).to.eql(1);
    });

    it('listens for specific events when level is an array', function () {
      const logger = makeLogger(parent, ['error', 'trace']);
      expect(parent.listenerCount('error')).to.eql(1);
      expect(parent.listenerCount('warning')).to.eql(0);
      expect(parent.listenerCount('info')).to.eql(0);
      expect(parent.listenerCount('debug')).to.eql(0);
      expect(parent.listenerCount('trace')).to.eql(1);
    });

    it('sets the logLevel property to the new levels', function () {
      const logger = makeLogger();
      let levels = ['error'];
      logger.setupListeners(levels);
      expect(logger.listeningLevels).to.eql(levels).and.not.be(levels);

      levels = ['warning', 'trace'];
      logger.setupListeners(levels);
      expect(logger.listeningLevels).to.eql(levels).and.not.be(levels);

      levels = ['debug', 'debug'];
      logger.setupListeners(levels);
      expect(logger.listeningLevels).to.eql(levels).and.not.be(levels);
    });

    it('rejects listening levels it can not listen to', function () {
      const logger = makeLogger();
      expect(function () {
        logger.setupListeners(['scream']);
      }).to.throwError(/unable to listen/i);
    });

    it('emits events because something is listening', function () {
      const logger = makeLogger(parent, 'trace');
      stub(parent, 'emit');

      parent.error(new Error('error message'));
      expect(parent.emit.lastCall.args[0]).to.eql('error');

      parent.warning('warning');
      expect(parent.emit.lastCall.args[0]).to.eql('warning');

      parent.info('info');
      expect(parent.emit.lastCall.args[0]).to.eql('info');

      parent.debug('debug');
      expect(parent.emit.lastCall.args[0]).to.eql('debug');

      parent.trace('GET', {}, '', '', 200);
      expect(parent.emit.lastCall.args[0]).to.eql('trace');
    });
  });

  describe('#timestamp', function () {
    it('returns in the right format', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      const logger = makeLogger();
      expect(logger.timestamp()).to.eql('2013-03-01T00:00:00Z');
    });
  });

  describe('#format', function () {
    it('returns a single string with the message indented', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      const logger = makeLogger();
      expect(logger.format('LABEL', 'MSG')).to.eql(
        'LABEL: 2013-03-01T00:00:00Z\n' +
        '  MSG\n' +
        '\n'
      );
    });

    it('properly indents multi-line messages', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      const logger = makeLogger();
      expect(logger.format('LABEL', 'MSG\nwith\nseveral lines')).to.eql(
        'LABEL: 2013-03-01T00:00:00Z\n' +
        '  MSG\n' +
        '  with\n' +
        '  several lines\n' +
        '\n'
      );
    });
  });

  describe('#onError', function () {
    it('uses the Error name when it is not just "Error"', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('TypeError');
      });

      logger.onError(new TypeError('Typerr'));
      expect(logger.write.callCount).to.eql(1);
    });

    it('uses "ERROR" when the error name is "Error"', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('ERROR');
      });

      logger.onError(new Error('thing'));
      expect(logger.write.callCount).to.eql(1);
    });
  });

  describe('#onWarning', function () {
    it('uses the "WARNING" label', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('WARNING');
      });
      logger.onWarning('message');
      expect(logger.write.callCount).to.eql(1);
    });

    it('echos the message', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(msg).to.eql('message');
      });

      logger.onWarning('message');
      expect(logger.write.callCount).to.eql(1);
    });
  });

  describe('#onInfo', function () {
    it('uses the "INFO" label', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('INFO');
      });
      logger.onInfo('message');
      expect(logger.write.callCount).to.eql(1);
    });

    it('echos the message', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(msg).to.eql('message');
      });

      logger.onInfo('message');
      expect(logger.write.callCount).to.eql(1);
    });
  });

  describe('#onDebug', function () {
    it('uses the "DEBUG" label', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('DEBUG');
      });
      logger.onDebug('message');
      expect(logger.write.callCount).to.eql(1);
    });

    it('echos the message', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(msg).to.eql('message');
      });

      logger.onDebug('message');
      expect(logger.write.callCount).to.eql(1);
    });
  });

  describe('#onTrace', function () {
    it('uses the "TRACE" label', function () {
      const logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        expect(label).to.eql('TRACE');
      });
      logger.onTrace(Log.normalizeTraceArgs('GET', 'http://place/thing?me=true', '{}', '{"ok": true}', 200));
      expect(logger.write.callCount).to.eql(1);
    });
  });
};
