
var es = require('../../src/elasticsearch');
var Log = require('../../src/lib/log');
var StdioLogger = require('../../src/lib/loggers/stdio');
var _ = require('../../src/lib/utils');
var expect = require('expect.js');
var EventEmitter = require('events').EventEmitter;

describe('Stdio Logger', function () {
  var log, logger;

  // pulled from chalk's stripColor function.
  var hasColorRE = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/;

  function listenerCount(emitter, event) {
    if (EventEmitter.listenerCount) {
      return EventEmitter.listenerCount(emitter, event);
    } else {
      return emitter.listeners(event).length;
    }
  }

  describe('pays attention to the level setting', function () {

    beforeEach(function () {
      log = new Log();

      log.emit = function (name/*, ...args */) {
        log._emission = {
          name: name,
          args: Array.prototype.slice(arguments, 1)
        };
      };

      // new logger in warning mode
      logger = new StdioLogger(log, {
        levels: Log.parseLevels('trace')
      });
    });

    afterEach(function () {
      log.close();
    });

    it('listenes for all the events', function () {
      listenerCount(log, 'error').should.eql(1);
      listenerCount(log, 'warning').should.eql(1);
      listenerCount(log, 'info').should.eql(1);
      listenerCount(log, 'debug').should.eql(1);
      listenerCount(log, 'trace').should.eql(1);
    });

    it('emits events because something is listening', function () {
      log.error(new Error('error message'));
      log._emission.name.should.eql('error');

      log.warning('warning');
      log._emission.name.should.eql('warning');

      log.info('info');
      log._emission.name.should.eql('info');

      log.debug('debug');
      log._emission.name.should.eql('debug');

      log.trace('GET', {}, '', '', 200);
      log._emission.name.should.eql('trace');
    });

  });
});
