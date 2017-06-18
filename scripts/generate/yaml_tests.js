module.exports = function (branch, ES_BRANCHES_DIR, YAML_TESTS_DIR, done) {
  /**
   * Creates a JSON version of the YAML test suite that can be simply bundled for use in the browser.
   */
  const jsYaml = require('js-yaml');
  const fs = require('fs');
  const async = require('async');
  const chalk = require('chalk');
  const path = require('path');
  const mkdirp = require('mkdirp');
  const fromRoot = path.join.bind(path, require('find-root')(__dirname));
  const _ = require(fromRoot('src/lib/utils'));
  const tests = {}; // populated in readYamlTests

  const RUN_SCRIPT_PATH = fromRoot('test/integration/yaml_suite/run');
  const esDir = path.join(ES_BRANCHES_DIR, _.snakeCase(branch));

  // generate the yaml tests
  async.series([
    readYamlTests,
    writeYamlTests,
    writeTestIndex
  ], done);

  function readYamlTests(done) {
    const testDir = path.join(esDir, 'rest-api-spec/test/');

    function readDirectories(dir) {
      fs.readdirSync(dir).forEach(function (filename) {
        const filePath = path.join(dir, filename);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          readDirectories(filePath);
        } else if (filename.match(/\.yaml$/)) {
          const file = tests[path.relative(testDir, filePath)] = [];
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
    const testFile = path.join(YAML_TESTS_DIR, _.snakeCase(branch), 'spec.json');

    mkdirp.sync(path.dirname(testFile));
    fs.writeFileSync(testFile, JSON.stringify(tests, null, '  '), 'utf8');
    console.log(chalk.white.bold('wrote') + ' YAML tests as JSON to', testFile);
    done();
  }

  function writeTestIndex(done) {
    const file = path.join(YAML_TESTS_DIR, _.snakeCase(branch), 'index.js');
    const fileDir = path.dirname(file);
    const relativeRunFile = path.relative(fileDir, RUN_SCRIPT_PATH);

    mkdirp.sync(fileDir);
    fs.writeFileSync(file, 'require(\'' + relativeRunFile + '\')(\'' + branch + '\');\n', 'utf8');
    console.log(chalk.white.bold('wrote') + ' YAML index to', file);
    done();
  }
};
