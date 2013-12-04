var Log = require('../../src/lib/log');
var StreamLogger = require('../../src/lib/loggers/stream');
var MockWritableStream = require('../mocks/writable_stream');
var MockOldWritableStream = require('../mocks/old_writable_stream');
var once = require('events').EventEmitter.prototype.once;
var write = require('stream').Writable.prototype.write;
var sinon = require('sinon');
var stream = new MockWritableStream();
var _ = require('lodash');
var util = require('util');
var parentLog;

var stub = require('./auto_release_stub').make();

beforeEach(function () {
  parentLog = new Log();
  stub(stream, 'write');
  stub(stream, 'end');
});

afterEach(function () {
  parentLog.close();
});

function makeLogger(parent, levels) {
  parent = parent || parentLog;
  var config = {
    levels: Log.parseLevels(levels || 'trace'),
    stream: stream
  };
  return new StreamLogger(parent, config);
}

describe('Stream Logger', function () {
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

      // the first line is stuck "in writing" and there is nothing we can do about that
      flushedOutput.match(new RegExp(line, 'g')).length.should.eql(9);
    });

    it('works with older streams');
  });


  require('./generic_logger_tests')(makeLogger);

});
