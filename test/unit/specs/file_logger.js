describe('File Logger', function () {
  const Log = require('../../../src/lib/log');
  const FileLogger = require('../../../src/lib/loggers/file');
  const once = require('events').EventEmitter.prototype.once;
  const _ = require('../../../src/lib/utils');
  let parentLog;
  let logger;
  const expect = require('expect.js');
  const fs = require('fs');
  const stub = require('../../utils/auto_release_stub').make();

  beforeEach(function () {
    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();
    logger && _.clearWriteStreamBuffer(logger.stream);
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
        const line = 'This string is written 10 times to create buffered output\n';

        let exitHandler;
        stub(process, 'once', function (event, handler) {
          if (event === 'exit') {
            exitHandler = handler;
          }
          once.call(process, event, handler);
        });

        const logger = makeLogger();

        // write the line 10 times
        _.times(10, function () {
          logger.onDebug(line);
        });

        // collect everything that is written to fs.appendFileSync
        let flushedOutput = '';
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
        let exitHandler;
        stub(process, 'once', function (event, handler) {
          if (event === 'exit') {
            exitHandler = handler;
          }
          once.call(process, event, handler);
        });

        makeLogger();

        expect(function () {
          // call the event handler
          exitHandler.call(process);
        }).to.not.throwError();
      });
    }
  });
});
