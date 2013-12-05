var path = require('path');

var argv = require('optimist')
  .default({
    buildName: '',
    outputDir: '.',
    verbose: false
  })
  .alias({
    b: 'buildName',
    o: 'outputDir',
    v: 'verbose'
  })
  .argv;

switch (argv.buildName) {
case 'jquery':
  var buildFile = './dist/elasticsearch.jquery.js';
  var minifiedBuildFile = './dist/elasticsearch.jquery.min.js';
  break;
case 'angular':
  var buildFile = './dist/elasticsearch.angular.js';
  var minifiedBuildFile = './dist/elasticsearch.angular.min.js';
  break;
default:
  var buildFile = './dist/elasticsearch.js';
  var minifiedBuildFile = './dist/elasticsearch.min.js';
  break;
}

var outputFile = path.join(argv.outputDir, 'elasticsearch.js');
var minifiedOutputFile = path.join(argv.outputDir, 'elasticsearch.min.js');

require('./_steps')(argv, [
  ['run', {
    cmd: 'npm',
    args: ['run', 'build_clients']
  }],
  ['copy', {
    from: buildFile,
    to: outputFile
  }],
  ['copy', {
    from: minifiedBuildFile,
    to: minifiedOutputFile
  }]
]);


