var Log = require('../../../src/lib/log');
var _ = require('lodash-node');
var expect = require('expect.js');

describe('Log class', function () {
  describe('::parseLevels', function () {
    it('accepts a string and returns it and the other levels below it', function () {
      expect(Log.parseLevels('trace')).to.eql([
        'error',
        'warning',
        'info',
        'debug',
        'trace'
      ]);
    });

    it('accepts and validates an array of levels', function () {
      expect(Log.parseLevels(['warning', 'info'])).to.eql(['warning', 'info']);
    });

    it('throws an error when an invalid string is supplied', function () {
      expect(function () {
        Log.parseLevels('INVALID');
      }).to.throwError(/invalid logging level/);
    });

    it('throws an error when an invalid string is supplied in side an array', function () {
      expect(function () {
        Log.parseLevels(['error', 'INVALID']);
      }).to.throwError(/invalid logging level/);
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
      expect(log.addOutput({ type: 'stub' })).to.be.a(Log.loggers.stub);
    });

    it('Accepts a config object with `level: "{{level}}"`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: 'warning'
      });

      expect(logger.config.levels).to.eql([
        'error', 'warning'
      ]);
    });

    it('Accepts a config object with `level: ["{{level}}"]`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: ['warning']
      });

      expect(logger.config.levels).to.eql([
        'warning'
      ]);
    });


    it('Accepts a config object with `levels: "{{level}}"`', function () {
      var logger = log.addOutput({
        type: 'stub',
        levels: 'warning'
      });

      expect(logger.config.levels).to.eql([
        'error', 'warning'
      ]);
    });

    it('Accepts a config object with `levels: ["{{level}}"]`', function () {
      var logger = log.addOutput({
        type: 'stub',
        level: ['warning']
      });

      expect(logger.config.levels).to.eql([
        'warning'
      ]);
    });
  });

  describe('#join', function () {
    it('joins strings together with spaces', function () {
      expect(Log.join(['foo', 'bar'])).to.eql('foo bar');
    });
    it('stringifies objects', function () {
      expect(Log.join([{ foo: 'bar' }])).to.eql('{ foo: \'bar\' }\n');
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
      expect(call.event).to.eql('error');
      expect(call.args[0]).to.be(err);

      call = void 0;

      log.error('error');
      expect(call.event).to.eql('error');
      expect(call.args[0]).to.be.a(Error);
      expect(call.args[0].message).to.eql('error');
    });

    it('should emit a "warning" event with a single message arg for #warning calls', function () {
      log.warning('shit!');
      expect(call.event).to.eql('warning');
      expect(call.args.length).to.be(1);
      expect(call.args[0]).to.eql('shit!');
    });

    it('should emit a "info" event with a single message arg for #info calls', function () {
      log.info('look out!');
      expect(call.event).to.eql('info');
      expect(call.args.length).to.be(1);
      expect(call.args[0]).to.eql('look out!');
    });

    it('should emit a "debug" event with a single message arg for #debug calls', function () {
      log.debug('here');
      expect(call.event).to.eql('debug');
      expect(call.args.length).to.be(1);
      expect(call.args[0]).to.eql('here');
    });

    it('should emit a trace event for trace events, with normalized request details arg', function () {
      log.trace('GET', 'http://localhost:9200/_cluster/nodes', '', '', 200);
      expect(call.event).to.eql('trace');
      expect(call.args.length).to.be(1);
      expect(call.args[0]).to.have.property('method', 'GET');
      expect(call.args[0]).to.have.property('url', 'http://localhost:9200/_cluster/nodes');
      expect(call.args[0]).to.have.property('status', 200);
    });
  });

  describe('constructor', function () {
    it('looks for output config options at config.log', function () {
      var log = new Log({ log: { type: process.browser ? 'console' : 'stdio', level: 'error' } });
      expect(log.listenerCount('error')).to.eql(1);
      expect(log.listenerCount('warning')).to.eql(0);
      expect(log.listenerCount('info')).to.eql(0);
      expect(log.listenerCount('debug')).to.eql(0);
      expect(log.listenerCount('trace')).to.eql(0);
    });

    it('accepts a string and treat it as a log level', function () {
      var log = new Log({ log: 'error' });
      expect(log.listenerCount('error')).to.eql(1);
      expect(log.listenerCount('warning')).to.eql(0);
      expect(log.listenerCount('info')).to.eql(0);
      expect(log.listenerCount('debug')).to.eql(0);
      expect(log.listenerCount('trace')).to.eql(0);
    });

    it('accepts an array of strings and treat it as a log level config', function () {
      var log = new Log({ log: ['error', 'trace'] });
      expect(log.listenerCount('error')).to.eql(1);
      expect(log.listenerCount('warning')).to.eql(0);
      expect(log.listenerCount('info')).to.eql(0);
      expect(log.listenerCount('debug')).to.eql(0);
      expect(log.listenerCount('trace')).to.eql(1);
    });

    it('accepts an array of output config objects', function () {
      var log = new Log({ log: [{ level: 'error' }, { level: 'trace'}] });
      expect(log.listenerCount('error')).to.eql(2);
      expect(log.listenerCount('warning')).to.eql(1);
      expect(log.listenerCount('info')).to.eql(1);
      expect(log.listenerCount('debug')).to.eql(1);
      expect(log.listenerCount('trace')).to.eql(1);
    });

    it('rejects numbers and other truthy data-types', function () {
      expect(function () {
        var log = new Log({ log: 1515 });
      }).to.throwError(/invalid logging output config/i);
      expect(function () {
        var log = new Log({ log: /regexp/ });
      }).to.throwError(/invalid logging output config/i);
      expect(function () {
        var log = new Log({ log: new Date() });
      }).to.throwError(/invalid logging output config/i);
      expect(function () {
        var log = new Log({ log: [1515] });
      }).to.throwError(/invalid logging output config/i);
      expect(function () {
        var log = new Log({ log: [/regexp/] });
      }).to.throwError(/invalid logging output config/i);
      expect(function () {
        var log = new Log({ log: [new Date()] });
      }).to.throwError(/invalid logging output config/i);
    });
  });
});
