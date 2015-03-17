var fs = require('fs');
var spawn = require('../_spawn');
var async = require('async');
var _ = require('lodash');

var root = require('path').join(__dirname, '../..');
var bowerDir = root + '/src/bower_es_js';

// get both the bower and node package files
var bowerJson = require(bowerDir + '/bower.json');
var bowerPackageJson = require(bowerDir + '/package.json');
var esjsJson = require(root + '/package.json');

// update the version to match the node version
bowerJson.version = esjsJson.version;
bowerPackageJson.version = esjsJson.version;

// write the new bower.json file
fs.writeFileSync(bowerDir + '/bower.json', JSON.stringify(bowerJson, null, '  '));
// write the new package.json file
fs.writeFileSync(bowerDir + '/package.json', JSON.stringify(bowerPackageJson, null, '  '));

function make(cmd, args) {
  return _.bind(spawn, null, cmd, args, {
    verbose: true,
    cwd: bowerDir
  });
}

async.series([
  make('git', ['add', '-A']),
  make('git', ['commit', '-m', 'version ' + bowerJson.version]),
  make('git', ['tag', '-a', 'v' + bowerJson.version, '-m', 'version ' + bowerJson.version]),
  make('git', ['push', 'origin', 'master']),
  make('git', ['push', '--tags', 'origin']),
  make('npm', ['publish'])
], function (err) {
  if (err) {
    if (_.isNumber(err)) {
      console.log('Non-zero exit code: %d', err);
    } else {
      console.log('Error: ', err.message ? err.message : err);
    }
  }
});