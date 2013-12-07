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

var cmd = argv._.join(' ');

if (!cmd) {
  throw new Error('you should specify a command...');
}

['browser', 'jquery', 'angular'].forEach(function (build) {

  if (!fs.existsSync('../bower-elasticsearch-' + build) ||
      !fs.existsSync('../bower-elasticsearch-' + build + '/.git')
  ) {
    throw new Error('Ensure that all of the bower repos are checked out next to this repo');
  }

  steps.push([
    'exec', {
      cmd: cmd,
      cwd: '../bower-elasticsearch-' + build
    }
  ]);

});

require('./_steps')(argv, steps);