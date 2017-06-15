const Log = require('../../../src/lib/log');
const ConsoleLogger = require('../../../src/lib/loggers/console');
const sinon = require('sinon');
const expect = require('expect.js');
let parentLog;

beforeEach(function () {
  parentLog = new Log();
});

afterEach(function () {
  parentLog.close();
});

function makeLogger(parent, levels) {
  parent = parent || parentLog;
  const config = {
    levels: Log.parseLevels(levels || 'trace')
  };
  return new ConsoleLogger(parent, config);
}

require('../../utils/auto_release_stub').make();

describe('Console Logger', function () {

  require('../generic_logger_tests')(makeLogger);

  it('checks before using unique logging functions, falls back to #log()', function () {
    const _warning = console.warn;
    console.warn = null;
    sinon.stub(console, 'log');

    const logger = makeLogger();

    logger.onWarning('message');
    expect(console.log.callCount).to.be(1);

    console.warn = _warning;
    console.log.restore();
  });

});
