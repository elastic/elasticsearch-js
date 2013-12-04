var Log = require('../../src/lib/log');
var StreamLogger = require('../../src/lib/loggers/stream');
var MockWritableStream = require('../mocks/writable_stream');
var MockOldWritableStream = require('../mocks/old_writable_stream');
var once = require('events').EventEmitter.prototype.once;
var sinon = require('sinon');
var stream = new MockWritableStream();
var _ = require('lodash');
var util = require('util');
var parentLog;

var stub = require('./auto_release_stub').make();

beforeEach(function () {
  parentLog = new Log();
  if (stream._writableState.buffer.length) {
    // empty the buffer manually
    stream._writableState.buffer.splice(0);
  }
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
      var logger = makeLogger();
      var line = 'This string is writte 10 times to create buffered output.\n';

      // get the last handler for process's "exit" event
      var exitHandlers = process._events.exit;
      var exitHandler = _.isArray(exitHandlers) ? _.last(exitHandlers) : exitHandlers;

      // allow the logger to acctually write to the stream
      stream.write.restore();

      // write the line 10 times
      _.times(10, function () {
        logger.onDebug(line);
      });

      // collect everything that is written to console.error
      var flushedOutput = '';
      stub(console, 'error', function (str) {
        flushedOutput += str;
      });

      // call the event handler
      exitHandler.call(process);

      // restore console.error asap.
      console.error.restore();

      // the first line is sent immediately to _write and there is nothing we are not going to worry about it
      flushedOutput.match(new RegExp(line, 'g')).length.should.eql(9);
    });
  });


  require('./generic_logger_tests')(makeLogger);

});
