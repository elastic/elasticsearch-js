
var es = require('../../src/elasticsearch'),
    Stdio = require('../../src/lib/loggers/stdio'),
    _ = require('../../src/lib/utils'),
    expect = require('expect.js');

describe('Stdio Logger listening to levels warning and error', function () {
  var client, logger;

  before(function () {
    client = new es.Client({
      log: []
    });
  });

  beforeEach(function () {
    if (logger) {
      logger.cleanUpListeners();
    }

    // new logger in warning mode
    logger = new Stdio({
      levels: ['error', 'warning']
    }, client.log);
  });

  it('logs error messages', function (done) {
    logger.write = function (to, label, colorize, what) {
      label.should.eql('ERROR');
      what.should.have.type('string');
      what.should.match(/^Error: Test Error Message/);
      done();
    };

    client.log.error('Test Error Message');
  });

  it('logs warning messages', function (done) {
    logger.write = function (to, label, colorize, what) {
      expect(label).to.be('WARNING');
      expect(what).to.be('Test Warning Message');
      done();
    };

    client.log.warning('Test Warning', 'Message');
  });

  it('does not log info messages', function () {
    if (client.log.info('Info')) {
      throw new Error('There shouldn\'t be listeners for info logs');
    }
  });

  it('does not log debug messages', function () {
    if (client.log.debug('Debug')) {
      throw new Error('There shouldn\'t be listeners for debug logs');
    }
  });

  it('does not log trace messages', function () {
    if (client.log.trace('curl "http://localhost:9200" -d "{ \"query\": ... }"')) {
      throw new Error('There shouldn\'t be listeners for trace logs');
    }
  });

});
