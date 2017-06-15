describe('Stream Logger', function () {
  const Log = require('../../../src/lib/log');
  const StreamLogger = require('../../../src/lib/loggers/stream');
  const MockWritableStream = require('../../mocks/writable_stream');
  const once = require('events').EventEmitter.prototype.once;
  const stream = new MockWritableStream();
  const _ = require('../../../src/lib/utils');
  const expect = require('expect.js');
  let parentLog;

  const stub = require('../../utils/auto_release_stub').make();

  beforeEach(function () {
    stub(stream, 'write');
    stub(stream, 'end');

    parentLog = new Log();
  });

  afterEach(function () {
    parentLog.close();
    _.clearWriteStreamBuffer(stream);
  });

  function makeLogger(parent, levels) {
    parent = parent || parentLog;
    const config = {
      levels: Log.parseLevels(levels || 'trace'),
      stream: stream
    };
    return new StreamLogger(parent, config);
  }

  require('../generic_logger_tests')(makeLogger);

  describe('buffer flush', function () {
    if (require('stream').Writable) {
      it('writes everything in the buffer to console.error', function () {
        const logger = makeLogger();
        const line = 'This string is written 10 times to create buffered output\n';

        // get the last handler for process's "exit" event
        const exitHandlers = process._events.exit;
        const exitHandler = _.isArray(exitHandlers) ? _.last(exitHandlers) : exitHandlers;

        // allow the logger to acctually write to the stream
        stream.write.restore();

        // write the line 10 times
        _.times(10, function () {
          logger.onDebug(line);
        });

        // collect everything that is written to console.error
        let flushedOutput = '';
        stub(console, 'error', function (str) {
          flushedOutput += str;
        });

        // call the event handler
        exitHandler.call(process);

        // restore console.error asap.
        console.error.restore();

        // the first line is sent immediately to _write and there is nothing we are not going to worry about it
        expect(flushedOutput).to.match(new RegExp(line));
        expect(flushedOutput.match(new RegExp(line, 'g'))).to.have.length(9);
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

        const logger = makeLogger();

        expect(function () {
          // call the event handler
          exitHandler.call(process);
        }).to.not.throwError();
      });
    }
  });

});
