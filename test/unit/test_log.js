var Log = require('../../src/lib/log');
var _ = require('lodash');

describe('Log class', function () {
  describe('::parseLevels', function () {
    it('accepts a string and returns it and the other levels below it', function () {
      Log.parseLevels('trace').should.eql([
        'error',
        'warning',
        'info',
        'debug',
        'trace'
      ]);
    });

    it('accepts and validates an array of levels', function () {
      Log.parseLevels(['warning', 'info']).should.eql(['warning', 'info']);
    });

    it('throws an error when an invalid string is supplied', function () {
      (function () {
        Log.parseLevels('INVALID');
      }).should.throw(/invalid logging level/);
    });

    it('throws an error when an invalid string is supplied in side an array', function () {
      (function () {
        Log.parseLevels(['error', 'INVALID']);
      }).should.throw(/invalid logging level/);
    });
  });

  describe('#addOutput', function () {
    var log;

    Log.loggers.stub = function (log, config) {
      this.config = config;
    };

    beforeEach(function () {
      log = new Log();
    });

    it('returns the newly created logger', function () {
      log.addOutput({ type: 'stub' }).should.be.an.instanceOf(Log.loggers.stub);
    });

    it('Accepts a config object with `level: "{{level}}"`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: 'warning'
      });

      logger.config.should.include({
        levels: [
          'error', 'warning'
        ]
      });
    });

    it('Accepts a config object with `level: ["{{level}}"]`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: ['warning']
      });

      logger.config.should.include({
        levels: [
          'warning'
        ]
      });
    });


    it('Accepts a config object with `levels: "{{level}}"`', function () {
      var logger = log.addOutput({
        type: 'stub',
        levels: 'warning'
      });

      logger.config.should.include({
        levels: [
          'error', 'warning'
        ]
      });
    });

    it('Accepts a config object with `levels: ["{{level}}"]`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: ['warning']
      });

      logger.config.should.include({
        levels: [
          'warning'
        ]
      });
    });
  });

  describe('#join', function () {
    it('joins strings together with spaces', function () {
      Log.join(['foo', 'bar']).should.eql('foo bar');
    });
    it('stringifies objects', function () {
      Log.join([{ foo: 'bar' }]).should.eql('{ foo: \'bar\' }\n');
    });
  });

  describe('instance without any outputs', function () {
    var log;
    beforeEach(function () {
      log = new Log();
    });

    it('should not emit any events', function () {
      log.emit = function () {
        throw new Error('Emit should not be called');
      };

      log.error();
      log.info();
      log.warning();
      log.debug();
      log.trace();

    });
  });

  describe('instance without one output listening to all events', function () {
    var log, call;
    beforeEach(function () {
      call = void 0;
      log = new Log({
        log: [
          {
            type: function (log, config) {
              log.on('error', _.noop);
              log.on('warning', _.noop);
              log.on('info', _.noop);
              log.on('debug', _.noop);
              log.on('trace', _.noop);
            }
          }
        ]
      });

      log.emit = function (eventName) {
        call = {
          event : eventName,
          args: Array.prototype.slice.call(arguments, 1)
        };
      };
    });

    it('should emit an "error" event with an Error object arg', function () {
      var err = new Error('error');
      log.error(err);
      call.event.should.eql('error');
      call.args[0].should.be.exactly(err);

      call = void 0;

      log.error('error');
      call.event.should.eql('error');
      call.args[0].should.be.an.instanceOf(Error);
      call.args[0].message.should.eql('error');
    });

    it('should emit a "warning" event with a single message arg for #warning calls', function () {
      log.warning('shit!');
      call.event.should.eql('warning');
      call.args.should.have.length(1);
      call.args[0].should.eql('shit!');
    });

    it('should emit a "info" event with a single message arg for #info calls', function () {
      log.info('look out!');
      call.event.should.eql('info');
      call.args.should.have.length(1);
      call.args[0].should.eql('look out!');
    });

    it('should emit a "debug" event with a single message arg for #debug calls', function () {
      log.debug('here');
      call.event.should.eql('debug');
      call.args.should.have.length(1);
      call.args[0].should.eql('here');
    });

    it('should emit a trace event for trace events, with message and curlCall args', function () {
      log.trace('GET', 'http://localhost:9200/_cluster/nodes', '', '', 200);
      call.event.should.eql('trace');
      call.args.should.have.length(2);
      call.args[0].should.match(/^<- 200/);
      call.args[1].should.match(/^curl /);
    });
  });

  describe('constructor', function () {
    it('looks for output config options at config.log', function () {
      var log = new Log({ log: { type: process.browser ? 'console' : 'stdio', level: 'error' } });
      log.listenerCount('error').should.eql(1);
      log.listenerCount('warning').should.eql(0);
      log.listenerCount('info').should.eql(0);
      log.listenerCount('debug').should.eql(0);
      log.listenerCount('trace').should.eql(0);
    });

    it('accepts a string and treat it as a log level', function () {
      var log = new Log({ log: 'error' });
      log.listenerCount('error').should.eql(1);
      log.listenerCount('warning').should.eql(0);
      log.listenerCount('info').should.eql(0);
      log.listenerCount('debug').should.eql(0);
      log.listenerCount('trace').should.eql(0);
    });

    it('accepts an array of strings and treat it as a log level config', function () {
      var log = new Log({ log: ['error', 'trace'] });
      log.listenerCount('error').should.eql(1);
      log.listenerCount('warning').should.eql(0);
      log.listenerCount('info').should.eql(0);
      log.listenerCount('debug').should.eql(0);
      log.listenerCount('trace').should.eql(1);
    });

    it('accepts an array of output config objects', function () {
      var log = new Log({ log: [{ level: 'error' }, { level: 'trace'}] });
      log.listenerCount('error').should.eql(2);
      log.listenerCount('warning').should.eql(1);
      log.listenerCount('info').should.eql(1);
      log.listenerCount('debug').should.eql(1);
      log.listenerCount('trace').should.eql(1);
    });

    it('rejects numbers and other truthy data-types', function () {
      (function () {
        var log = new Log({ log: 1515 });
      }).should.throw(/invalid logging output config/i);
      (function () {
        var log = new Log({ log: /regexp/ });
      }).should.throw(/invalid logging output config/i);
      (function () {
        var log = new Log({ log: new Date() });
      }).should.throw(/invalid logging output config/i);
      (function () {
        var log = new Log({ log: [1515] });
      }).should.throw(/invalid logging output config/i);
      (function () {
        var log = new Log({ log: [/regexp/] });
      }).should.throw(/invalid logging output config/i);
      (function () {
        var log = new Log({ log: [new Date()] });
      }).should.throw(/invalid logging output config/i);
    });
  });
});
