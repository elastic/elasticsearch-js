/**
 * Check that the test directory exists, and is less than a day old, otherwise wipe it out
 * and rebuild
 */
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var spec = require('../../get_spec');
var clean = require('../../clean');

var testDir = path.resolve(__dirname, '../../../test/integration/yaml_suite/tests');

function download() {

  clean(testDir);
  spec.get('test/**/*.yaml')
    .on('entry', function (entry) {
      entry.path = path.resolve(testDir, path.relative('test', entry.path));
      mkdirp.sync(path.dirname(entry.path));
      fs.writeFileSync(entry.path, entry.data, 'utf8');
    })
    .on('end', function () {
      console.log('download yaml tests to', testDir);
    });
}

try {
  var stat = fs.statSync(testDir);
  if (!stat.isDirectory() || stat.ctime < Date.now() - 86400000) {
    download();
  }
} catch (e) {
  download();
}
