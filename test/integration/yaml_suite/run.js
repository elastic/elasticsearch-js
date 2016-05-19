module.exports = function (branch) {
  var path = require('path');
  var jsYaml = require('js-yaml');
  var YamlFile = require('./yaml_file');
  var root = require('find-root')(__dirname);
  var rootReq = function (loc) { return require(path.join(root, loc)); };
  var _ = rootReq('src/lib/utils');
  var utils = rootReq('grunt/utils');
  var es = rootReq('src/elasticsearch');
  var clientManager = require('./client_manager');

  var port = parseInt(process.env.ES_PORT || 9200, 10);
  var host = process.env.ES_HOST || 'localhost';
  var _release = branch.match(/^v(\d+\.\d+)\.\d+$/);
  var apiVersion = _release ? _release[1] : branch;

  console.log('  branch:', branch);
  console.log('  port:', port);
  console.log('  api version:', apiVersion);

  describe('integration', function () {
    this.timeout(30000);

    // before running any tests...
    before(function (done) {
      this.timeout(5 * 60 * 1000);
      clientManager.create(apiVersion, port, host, done);
    });

    before(function () {
      // make sure ES is empty
      return clientManager.get().clearEs();
    });

    var files = _.map(require('./yaml_tests_' + _.snakeCase(branch) + '.json'), function (docs, filename) {
      return new YamlFile(filename, docs);
    });

  });
};
