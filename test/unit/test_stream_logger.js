var Log = require('../../src/lib/log');
var StreamLogger = require('../../src/lib/loggers/stream');
var MockWritableStream = require('../mocks/writable_stream');
var once = require('events').EventEmitter.prototype.once;
var write = require('stream').Writable.prototype.write;
var sinon = require('sinon');
var stubs = [];
var parentLog;
var stream = new MockWritableStream();
var _ = require('lodash');
var util = require('util');

beforeEach(function () {
  parentLog = new Log();
  stub(stream, 'write', function () { console.log('stubbed write'); });
  stub(stream, 'end', function () { console.log('stubbed close'); });
});

afterEach(function () {
  parentLog.close();

  var stub;
  while (stub = stubs.pop()) {
    stub.restore();
  }
});

function stub() {
  stubs.push(sinon.stub.apply(sinon, arguments));
}

function makeLogger() {
  var config = {
    levels: Log.parseLevels('trace'),
    stream: stream
  };
  return new StreamLogger(parentLog, config);
}

describe('Stream Logger', function () {
  describe('pays attention to the level setting', function () {

    beforeEach(function () {
      var logger = makeLogger();
      stub(parentLog, 'emit');
    });

    it('listens for all the events', function () {
      parentLog.listenerCount('error').should.eql(1);
      parentLog.listenerCount('warning').should.eql(1);
      parentLog.listenerCount('info').should.eql(1);
      parentLog.listenerCount('debug').should.eql(1);
      parentLog.listenerCount('trace').should.eql(1);
    });

    it('emits events because something is listening', function () {
      parentLog.error(new Error('error message'));
      parentLog.emit.lastCall.args[0].should.eql('error');

      parentLog.warning('warning');
      parentLog.emit.lastCall.args[0].should.eql('warning');

      parentLog.info('info');
      parentLog.emit.lastCall.args[0].should.eql('info');

      parentLog.debug('debug');
      parentLog.emit.lastCall.args[0].should.eql('debug');

      parentLog.trace('GET', {}, '', '', 200);
      parentLog.emit.lastCall.args[0].should.eql('trace');
    });
  });

  describe('buffer flushing', function () {
    it('writes everything in the buffer to console.error', function () {
      var onExitCallback;
      sinon.stub(process, 'once', function (evName, cb) {
        if (evName === 'exit') {
          onExitCallback = cb;
          process.once.restore();
        } else {
          once.call(process, evName, cb);
        }
      });

      var logger = makeLogger();
      var line = 'This string is repeated 10 times to create buffered output.\n';

      _.times(10, function () {
        write.call(stream, line);
      });

      var flushedOutput = '';
      sinon.stub(console, 'error', function (str) {
        flushedOutput += str;
      });
      onExitCallback();
      console.error.restore();
      // empty the buffer manually
      stream._writableState.buffer.splice(0);

      flushedOutput.match(new RegExp(line, 'g')).length.should.above(0);
    });
  });

});
