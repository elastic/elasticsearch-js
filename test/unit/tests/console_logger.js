var Log = require('../../../src/lib/log');
var ConsoleLogger = require('../../../src/lib/loggers/console');
var sinon = require('sinon');
var expect = require('expect.js');
var parentLog;

beforeEach(function () {
  parentLog = new Log();
});

afterEach(function () {
  parentLog.close();
});

function makeLogger(parent, levels) {
  parent = parent || parentLog;
  var config = {
    levels: Log.parseLevels(levels || 'trace')
  };
  return new ConsoleLogger(parent, config);
}

var stub = require('../../utils/auto_release_stub').make();

describe('Console Logger', function () {

  require('../generic_logger_tests')(makeLogger);

  it('checks before using unique logging functions, falls back to #log()', function () {
    var _warning = console.warn;
    console.warn = null;
    sinon.stub(console, 'log');

    var logger = makeLogger();

    logger.onWarning('message');
    expect(console.log.callCount).to.be(1);

    console.warn = _warning;
    console.log.restore();
  });

});
