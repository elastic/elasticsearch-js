module.exports = function (makeLogger) {
  var expect = require('expect.js');
  var stub = require('../utils/auto_release_stub').make();
  var fs = require('fs');
  var once = require('events').EventEmitter.prototype.once;
  var _ = require('lodash');

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
        expect(flushedOutput.match(new RegExp(line, 'g'))).to.have.property('length', 9);
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
};