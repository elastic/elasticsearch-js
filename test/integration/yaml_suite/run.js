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

  describe('integration', function () {
    this.timeout(30000);

    // before running any tests...
    before(function (done) {
      this.timeout(5 * 60 * 1000);

      var apiVersion = branch;
      var match;
      if (match = apiVersion.match(/^v(\d+\.\d+)\.\d+$/)) {
        apiVersion = match[1];
      }

      var port = parseInt(process.env.ES_PORT || 9200, 10);

      console.log('branch:', branch);
      console.log('port:', port);
      console.log('api version:', apiVersion);

      clientManager.create(apiVersion, port, done);
    });

    before(function (done) {
      // make sure ES is empty
      clientManager.get().clearEs(done);
    });

    var files = _.map(require('./yaml_tests_' + _.snakeCase(branch) + '.json'), function (docs, filename) {
      return new YamlFile(filename, docs);
    });

  });
};