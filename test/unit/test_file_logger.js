var Log = require('../../src/lib/log');
var FileLogger = require('../../src/lib/loggers/file');
var sinon = require('sinon');
var once = require('events').EventEmitter.prototype.once;
var write = require('stream').Writable.prototype.write;
var MockWritableStream = require('../mocks/writable_stream');
var _ = require('lodash');
var parentLog;
var fs = require('fs');

beforeEach(function () {
  parentLog = new Log();
});

afterEach(function () {
  parentLog.close();
});

function makeLogger(parent, levels, path) {
  parent = parent || parentLog;
  var config = {
    levels: Log.parseLevels(levels || 'trace'),
    path: path === void 0 ? 'elasticsearch.log' : path
  };
  var logger = new FileLogger(parent, config);
  logger.stream.end();

  logger.stream = new MockWritableStream();
  return logger;
}

var stub = require('./auto_release_stub').make();

describe('File Logger', function () {

  require('./generic_logger_tests')(makeLogger);

  describe('buffer flush', function () {
    it('writes everything in the buffer to console.error', function () {
      var line = 'This string is writte 10 times to create buffered output.\n';

      var exitHandler;
      stub(process, 'once', function (event, handler) {
        if (event === 'exit') {
          exitHandler = handler;
        }
        once.call(process, event, handler);
      });

      var logger = makeLogger();

      // write the line 10 times
      _.times(10, function () {
        logger.onDebug(line);
      });

      // collect everything that is written to fs.appendFileSync
      var flushedOutput = '';
      stub(fs, 'appendFileSync', function (path, str) {
        flushedOutput += str;
      });

      // call the event handler
      exitHandler.call(process);

      // the first line is sent immediately to _write and there is nothing we can do about that
      flushedOutput.match(new RegExp(line, 'g')).length.should.eql(9);
    });
  });

});
