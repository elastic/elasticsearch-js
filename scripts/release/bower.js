const fs = require('fs');
const spawn = require('../_spawn');
const async = require('async');
const _ = require('lodash');

const root = require('path').join(__dirname, '../..');
const bowerDir = root + '/src/bower_es_js';

// get both the bower and node package files
const bowerJson = require(bowerDir + '/bower.json');
const bowerPackageJson = require(bowerDir + '/package.json');
const esjsJson = require(root + '/package.json');

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
