module.exports = function (branch, done) {
  /**
   * Creates a JSON version of the YAML test suite that can be simply bundled for use in the browser.
   */
  var jsYaml = require('js-yaml');
  var fs = require('relative-fs').relativeTo(__dirname);
  var async = require('async');
  var chalk = require('chalk');
  var _ = require('../../src/lib/utils');
  var path = require('path');
  var tests = {}; // populated in readYamlTests

  var branchSuffix = branch === 'master' ? '' : '_' + _.snakeCase(branch);

  // generate the yaml tests
  async.series([
    readYamlTests,
    writeYamlTests
  ], done);

  function readYamlTests(done) {
    var testDir = path.join(__dirname, '../../src/elasticsearch/rest-api-spec/test/');

    function readDirectories(dir) {
      fs.readdirSync(dir).forEach(function (filename) {
        var filePath = path.join(dir, filename);
        var stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          readDirectories(filePath);
        } else if (filename.match(/\.yaml$/)) {
          var file = tests[path.relative(testDir, filePath)] = [];
          jsYaml.loadAll(fs.readFileSync(filePath, 'utf8'), function (doc) {
            file.push(doc);
          });
        }
      });
    }

    readDirectories(testDir);
    done();
  }

  function writeYamlTests(done) {
    var testFile = require('path').resolve(__dirname, '../../test/integration/yaml_suite/yaml_tests' + branchSuffix + '.json');
    fs.writeFileSync(testFile, JSON.stringify(tests, null, ' '), 'utf8');
    console.log(chalk.white.bold('wrote') + ' YAML tests as JSON to', testFile);
    done();
  }
};