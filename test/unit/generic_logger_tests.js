var Log = require('../../src/lib/log');
var LoggerAbstract = require('../../src/lib/logger');
var TracerLogger = require('../../src/lib/loggers/tracer');
var now = new Date('2013-03-01T00:00:00Z');
var sinon = require('sinon');

module.exports = function (makeLogger) {
  var stub = require('./auto_release_stub').make();
  var parent = new Log();

  afterEach(function () {
    parent.close();
  });

  describe('Constuctor', function () {
    it('calls setupListeners, passes its new levels', function () {
      var logger = makeLogger(parent);
      stub(logger.constructor.prototype, 'setupListeners');
      parent.close();

      logger = makeLogger(parent);
      logger.setupListeners.callCount.should.eql(1);
    });

    it('listens for the loggers\' "closing" event', function () {
      var logger = makeLogger(parent);
      parent.listenerCount('closing').should.eql(1);
    });
  });

  describe('listening levels', function () {
    it('calls cleanUpListeners when the listeners are being setup', function () {
      var logger = makeLogger();
      stub(logger, 'cleanUpListeners');
      logger.setupListeners([]);
      logger.cleanUpListeners.callCount.should.eql(1);
    });

    it('listens to just error when log is explicitly error', function () {
      var logger = makeLogger(parent, 'error');
      parent.listenerCount('error').should.eql(1);
      parent.listenerCount('warning').should.eql(0);
      parent.listenerCount('info').should.eql(0);
      parent.listenerCount('debug').should.eql(0);
      parent.listenerCount('trace').should.eql(0);
    });

    it('listens for all the events when level is "trace"', function () {
      var logger = makeLogger(parent, 'trace');
      parent.listenerCount('error').should.eql(1);
      parent.listenerCount('warning').should.eql(1);
      parent.listenerCount('info').should.eql(1);
      parent.listenerCount('debug').should.eql(1);
      parent.listenerCount('trace').should.eql(1);
    });

    it('listens for specific events when level is an array', function () {
      var logger = makeLogger(parent, ['error', 'trace']);
      parent.listenerCount('error').should.eql(1);
      parent.listenerCount('warning').should.eql(0);
      parent.listenerCount('info').should.eql(0);
      parent.listenerCount('debug').should.eql(0);
      parent.listenerCount('trace').should.eql(1);
    });

    it('sets the logLevel property to the new levels', function () {
      var logger = makeLogger();
      var levels = ['error'];
      logger.setupListeners(levels);
      logger.listeningLevels.should.eql(levels).and.not.be.exactly(levels);

      levels = ['warning', 'trace'];
      logger.setupListeners(levels);
      logger.listeningLevels.should.eql(levels).and.not.be.exactly(levels);

      levels = ['debug', 'debug'];
      logger.setupListeners(levels);
      logger.listeningLevels.should.eql(levels).and.not.be.exactly(levels);
    });

    it('rejects listening levels it can not listen to', function () {
      var logger = makeLogger();
      (function () {
        logger.setupListeners(['scream']);
      }).should.throw(/unable to listen/i);
    });

    it('emits events because something is listening', function () {
      var logger = makeLogger(parent, 'trace');
      stub(parent, 'emit');

      parent.error(new Error('error message'));
      parent.emit.lastCall.args[0].should.eql('error');

      parent.warning('warning');
      parent.emit.lastCall.args[0].should.eql('warning');

      parent.info('info');
      parent.emit.lastCall.args[0].should.eql('info');

      parent.debug('debug');
      parent.emit.lastCall.args[0].should.eql('debug');

      parent.trace('GET', {}, '', '', 200);
      parent.emit.lastCall.args[0].should.eql('trace');
    });
  });

  describe('#timestamp', function () {
    it('returns in the right format', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      var logger = makeLogger();
      logger.timestamp().should.eql('2013-03-01T00:00:00Z');
    });
  });

  describe('#format', function () {
    it('returns a single string with the message indented', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      var logger = makeLogger();
      logger.format('LABEL', 'MSG').should.eql(
        'LABEL: 2013-03-01T00:00:00Z\n' +
        '  MSG\n' +
        '\n'
      );
    });

    it('properly indents multi-line messages', function () {
      stub.autoRelease(sinon.useFakeTimers(now.getTime()));
      var logger = makeLogger();
      logger.format('LABEL', 'MSG\nwith\nseveral lines').should.eql(
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
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('TypeError');
      });

      logger.onError(new TypeError('Typerr'));
      logger.write.callCount.should.eql(1);
    });

    it('uses "ERROR" when the error name is "Error"', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('ERROR');
      });

      logger.onError(new Error('thing'));
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onWarning', function () {
    it('uses the "WARNING" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('WARNING');
      });
      logger.onWarning('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        msg.should.eql('message');
      });

      logger.onWarning('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onInfo', function () {
    it('uses the "INFO" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('INFO');
      });
      logger.onInfo('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        msg.should.eql('message');
      });

      logger.onInfo('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onDebug', function () {
    it('uses the "DEBUG" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('DEBUG');
      });
      logger.onDebug('message');
      logger.write.callCount.should.eql(1);
    });

    it('echos the message', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        msg.should.eql('message');
      });

      logger.onDebug('message');
      logger.write.callCount.should.eql(1);
    });
  });

  describe('#onTrace', function () {
    it('uses the "TRACE" label', function () {
      var logger = makeLogger();
      stub(logger, 'write', function (label, msg) {
        label.should.eql('TRACE');
      });
      logger.onTrace('message');
      logger.write.callCount.should.eql(1);
    });

    it('joins the message and curl call with a newline', function () {
      var logger = makeLogger();

      // tracer logger has custom trace logic...
      if (!(logger instanceof TracerLogger)) {
        stub(logger, 'write', function (label, msg) {
          msg.should.eql('curlcall\nmessage');
        });

        logger.onTrace('message', 'curlcall');
        logger.write.callCount.should.eql(1);
      }
    });
  });
};