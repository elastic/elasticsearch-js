describe('StdIo Logger', function () {

  var Log = require('../src/lib/Log')
    , log = new Log([])
    , StdIo = require('../src/lib/loggers/StdIo')
    , warningLogger;

  beforeEach(function () {
    if (warningLogger) {
      warningLogger.cleanUpListeners();
    }

    // new logger in warning mode
    warningLogger = new StdIo({
      level: 2,
      type: 'StdIo'
    }, log);
  });

  it('should log error messages', function (done) {
    warningLogger.write = function (to, label, colorize, what) {
      label.should.equal('ERROR');
      what.should.be.an.instanceof(Array);
      what[0].should.equal('Test Error Message');
      done();
    };
    log.error('Test Error Message');
  });



  it('should log warnings', function (done) {
    warningLogger.write = function (to, label, colorize, what) {
      label.should.equal('WARNING');
      what.should.equal('Test Warning Message');
      done();
    };
    log.warn('Test Warning', 'Message');
  });



  it('should NOT log info messages', function (done) {
    if (log.info('Info')) {
      done(new Error('There shouldn\'t be listeners for info logs'));
    } else {
      done();
    }
  });



  it('should NOT log debug messages', function (done) {
    if (log.debug('Debug')) {
      done(new Error('There shouldn\'t be listeners for debug logs'));
    } else {
      done();
    }
  });



  it('should NOT log trace messages', function (done) {
    if (log.trace('curl "http://localhost:9200" -d "{ \"query\": ... }"')) {
      done(new Error('There shouldn\'t be listeners for trace logs'));
    } else {
      done();
    }
  });


});