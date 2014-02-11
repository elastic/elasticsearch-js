describe('File Logger', function () {
  var Log = require('../../../src/lib/log');
  var FileLogger = require('../../../src/lib/loggers/file');
  var once = require('events').EventEmitter.prototype.once;
  var _ = require('lodash-node');
  var parentLog;
  var logger;
  var expect = require('expect.js');
  var fs = require('fs');
  var stub = require('../../utils/auto_release_stub').make();

  beforeEach(function () {
    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();

    if (logger
      && logger.stream
      && logger.stream._writableState
      && logger.stream._writableState.buffer.length
    ) {
      // empty the buffer manually
      logger.stream._writableState.buffer.splice(0);
    }
  });

  function makeLogger(parent, levels) {
    parent = parent || parentLog;
    logger = new FileLogger(parent, {
      levels: Log.parseLevels(levels || 'trace'),
      path: 'test.log'
    });
    return logger;
  }

  after(function () {
    fs.unlinkSync('test.log');
  });

  require('../generic_logger_tests')(makeLogger);

  describe('buffer flush', function () {
    if (require('stream').Writable) {
      it('writes everything in the buffer to console.error', function () {
        var line = 'This string is written 10 times to create buffered output\n';

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
        expect(flushedOutput).to.match(new RegExp(line));
        expect(flushedOutput.match(new RegExp(line, 'g')).length).to.be(9);
      });
    } else {
      it('does not fall apart with non streams2 streams', function () {
        var exitHandler;
        stub(process, 'once', function (event, handler) {
          if (event === 'exit') {
            exitHandler = handler;
          }
          once.call(process, event, handler);
        });

        var logger = makeLogger();

        expect(function () {
          // call the event handler
          exitHandler.call(process);
        }).to.not.throwError();
      });
    }
  });
});
