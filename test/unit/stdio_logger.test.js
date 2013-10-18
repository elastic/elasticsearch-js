
var es = require('../../src/elasticsearch'),
    Stdio = require('../../src/lib/loggers/stdio'),
    _ = require('../../src/lib/utils'),
    expect = require('expect.js');

describe('Stdio Logger listening to levels warning and error', function () {
  var client, log, logger;

  before(function () {
    client = new es.Client({
      log: []
    });
    log = client.config.log;
  });

  beforeEach(function () {
    if (logger) {
      logger.cleanUpListeners();
    }

    // new logger in warning mode
    logger = new Stdio({
      levels: ['error', 'warning']
    }, log);
  });

  it('logs error messages', function (done) {
    logger.write = function (to, label, colorize, what) {
      label.should.eql('ERROR');
      what.should.have.type('string');
      what.should.match(/^Error: Test Error Message/);
      done();
    };

    log.error('Test Error Message');
  });

  it('logs warning messages', function (done) {
    logger.write = function (to, label, colorize, what) {
      expect(label).to.be('WARNING');
      expect(what).to.be('Test Warning Message');
      done();
    };

    log.warning('Test Warning', 'Message');
  });

  it('does not log info messages', function () {
    if (log.info('Info')) {
      throw new Error('There shouldn\'t be listeners for info logs');
    }
  });

  it('does not log debug messages', function () {
    if (log.debug('Debug')) {
      throw new Error('There shouldn\'t be listeners for debug logs');
    }
  });

  it('does not log trace messages', function () {
    if (log.trace('curl "http://localhost:9200" -d "{ \"query\": ... }"')) {
      throw new Error('There shouldn\'t be listeners for trace logs');
    }
  });

});
