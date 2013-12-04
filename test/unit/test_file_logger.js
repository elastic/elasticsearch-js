var Log = require('../../src/lib/log');
var FileLogger = require('../../src/lib/loggers/file');
var sinon = require('sinon');
var parentLog;

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
  return new FileLogger(parent, config);
}

var stub = require('./auto_release_stub').make();

describe('File Logger', function () {

  require('./generic_logger_tests')(makeLogger);

});
