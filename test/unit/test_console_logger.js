var Log = require('../../src/lib/log');
var StdioLogger = require('../../src/lib/loggers/console');
var sinon = require('sinon');
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
  return new StdioLogger(parent, config);
}

var stub = require('./auto_release_stub').make();

describe('Console Logger', function () {

  require('./generic_logger_tests')(makeLogger);

});
