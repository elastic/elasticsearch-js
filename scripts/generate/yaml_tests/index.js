/**
 * Check that the test directory exists, and is less than a day old, otherwise wipe it out
 * and rebuild
 */
var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');
var spec = require('../../get_spec');
var clean = require('../../clean');
var _ = require('../../../src/lib/utils');

var testFile = path.resolve(__dirname, '../../../test/integration/yaml_suite/yaml_tests.json');

function download() {

  var tests = {};

  clean(testFile);
  spec.get('test/**/*.yaml')
    .on('entry', function (entry) {
      var filename = path.relative('test', entry.path);
      var file = tests[filename] = [];
      jsYaml.loadAll(entry.data, function (doc) {
        file.push(doc);
      });
    })
    .on('end', function () {
      fs.writeFileSync(testFile, JSON.stringify(tests, null, ' '), 'utf8');
      console.log('download yaml tests to', testFile);
    });
}

try {
  var stat = fs.statSync(testFile);
  if (!stat.isFile() || stat.ctime < Date.now() - 86400000) {
    download();
  }
} catch (e) {
  download();
}
