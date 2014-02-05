module.exports = function (branch, done) {
  /**
   * Creates a JSON version of the YAML test suite that can be simply bundled for use in the browser.
   */
  var jsYaml = require('js-yaml');
  var fs = require('fs');
  var async = require('async');
  var chalk = require('chalk');
  var path = require('path');
  var fromRoot = path.join.bind(path, require('find-root')(__dirname));
  var _ = require(fromRoot('src/lib/utils'));
  var tests = {}; // populated in readYamlTests

  var esDir = fromRoot('src/elasticsearch_' + _.snakeCase(branch));

  // generate the yaml tests
  async.series([
    readYamlTests,
    writeYamlTests,
    writeTestIndex
  ], done);

  function readYamlTests(done) {
    var testDir = path.join(esDir, 'rest-api-spec/test/');

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
    var testFile = fromRoot('test/integration/yaml_suite/yaml_tests_' + _.snakeCase(branch) + '.json');
    fs.writeFileSync(testFile, JSON.stringify(tests, null, '  '), 'utf8');
    console.log(chalk.white.bold('wrote') + ' YAML tests as JSON to', testFile);
    done();
  }

  function writeTestIndex(done) {
    var file = fromRoot('test/integration/yaml_suite/index_' + _.snakeCase(branch) + '.js');
    fs.writeFileSync(file, 'require(\'./run\')(\'' + branch + '\');', 'utf8');
    console.log(chalk.white.bold('wrote') + ' YAML index to', file);
    done();
  }
};