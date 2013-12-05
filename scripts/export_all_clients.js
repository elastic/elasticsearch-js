var path = require('path');
var fs = require('fs');

var argv = require('optimist')
  .default({
    verbose: false
  })
  .alias({
    v: 'verbose'
  })
  .argv;

var steps = [];

['browser', 'jquery', 'angular'].forEach(function (build) {

  if (!fs.existsSync('../bower-elasticsearch-' + build) ||
      !fs.existsSync('../bower-elasticsearch-' + build + '/.git')
  ) {
    throw new Error('Ensure that all of the bower repos are checked out next to this repo');
  }

  steps.push([
    'run', {
      cwd: '../bower-elasticsearch-' + build + '/',
      cmd: 'npm',
      args: ['run', 'generate']
    }
  ]);

});

require('./_steps')(argv, steps);