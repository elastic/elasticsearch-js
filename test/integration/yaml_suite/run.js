module.exports = function (branch) {
  const path = require('path');
  const YamlFile = require('./yaml_file');
  const root = require('find-root')(__dirname);
  const rootReq = function (loc) { return require(path.join(root, loc)); };
  const _ = rootReq('src/lib/utils');
  const clientManager = require('./client_manager');

  const port = parseInt(process.env.ES_PORT || 9200, 10);
  const host = process.env.ES_HOST || 'localhost';
  const _release = branch.match(/^v(\d+\.\d+)\.\d+$/);
  const apiVersion = _release ? _release[1] : branch;

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

    _.each(require('./yaml_tests_' + _.snakeCase(branch) + '.json'), function (docs, filename) {
      new YamlFile(filename, docs);
    });

  });
};
