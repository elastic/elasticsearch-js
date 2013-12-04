describe('Logger Abstract', function () {

  var sinon = require('sinon');
  var now = new Date('2013-03-01T00:00:00Z');
  var Log = require('../../src/lib/log');
  var LoggerAbstract = require('../../src/lib/logger');

  var parentLog;
  var stubs = [];

  function stub() {
    stubs.push(sinon.stub.apply(sinon, arguments));
  }

  function makeLogger(levels) {
    return new LoggerAbstract(parentLog, {
      levels: levels || []
    });
  }

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

  describe('Constuctor', function () {
    it('calls setupListeners', function () {
      stub(LoggerAbstract.prototype, 'setupListeners');
      var logger = makeLogger();
      logger.setupListeners.callCount.should.eql(1);
    });

    it('listens for the loggers\' "closing" event', function () {
      var logger = makeLogger();
      parentLog.listenerCount('closing').should.eql(1);
    });
  });

  describe('#setupListeners', function () {
    it('calls cleanUpListeners', function () {
      var logger = makeLogger();
      stub(logger, 'cleanUpListeners');
      logger.setupListeners([]);
      logger.cleanUpListeners.callCount.should.eql(1);
    });

    it('explicitly listens for the events specified', function () {
      var logger = makeLogger();
      logger.setupListeners(['error']);
      parentLog.listenerCount('error').should.eql(1);
      parentLog.listenerCount('warning').should.eql(0);
      parentLog.listenerCount('info').should.eql(0);
      parentLog.listenerCount('debug').should.eql(0);
      parentLog.listenerCount('trace').should.eql(0);

      logger.setupListeners(['warning', 'trace']);
      parentLog.listenerCount('error').should.eql(0);
      parentLog.listenerCount('warning').should.eql(1);
      parentLog.listenerCount('info').should.eql(0);
      parentLog.listenerCount('debug').should.eql(0);
      parentLog.listenerCount('trace').should.eql(1);

      logger.setupListeners(['debug', 'debug']);
      parentLog.listenerCount('error').should.eql(0);
      parentLog.listenerCount('warning').should.eql(0);
      parentLog.listenerCount('info').should.eql(0);
      parentLog.listenerCount('debug').should.eql(2);
      parentLog.listenerCount('trace').should.eql(0);
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
  });

  describe('#timestamp', function () {
    it('returns in the right format', function () {
      stubs.push(sinon.useFakeTimers(now.getTime()));
      var logger = makeLogger();
      logger.timestamp().should.eql('2013-03-01T00:00:00Z');
    });
  });

  describe('#formate', function () {
    it('returns a single string with the message indented', function () {
      stubs.push(sinon.useFakeTimers(now.getTime()));
      var logger = makeLogger();
      logger.format('LABEL', 'MSG').should.eql(
        'LABEL: 2013-03-01T00:00:00Z\n' +
        '  MSG\n' +
        '\n'
      );
    });

    it('properly indents multi-line messages', function () {
      stubs.push(sinon.useFakeTimers(now.getTime()));
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

  describe('#write', function () {
    it('requires that it is overwritten', function () {
      (function () {
        var logger = makeLogger();
        logger.write();
      }).should.throw(/overwritten/);
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
      stub(logger, 'write', function (label, msg) {
        msg.should.eql('curlcall\nmessage');
      });

      logger.onTrace('message', 'curlcall');
      logger.write.callCount.should.eql(1);
    });
  });

});