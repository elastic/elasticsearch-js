module.exports = function (branch) {
  var path = require('path');
  var async = require('async');
  var jsYaml = require('js-yaml');
  var YamlFile = require('./yaml_file');
  var root = require('find-root')(__dirname);
  var rootReq = function (loc) { return require(path.join(root, loc)); };
  var _ = rootReq('src/lib/utils');
  var utils = rootReq('grunt/utils');
  var es = rootReq('src/elasticsearch');
  var clientManager = require('./client_manager');
  var argv = require('./argv');

  describe('integration', function () {
    this.timeout(30000);

    // before running any tests...
    before(function (done) {
      // start our personal ES Server
      this.timeout(null);
      clientManager.create(branch, done);
    });

    before(function (done) {
      // make sure ES is empty
      clientManager.get().indices.delete({
        index: '*',
        ignore: 404
      }, done);
    });

    var files = _.map(require('./yaml_tests_' + _.snakeCase(branch) + '.json'), function (docs, filename) {
      return new YamlFile(filename, docs);
    });

  });
};