var path = require('path');
var fs = require('fs');
var format = require('util').format;
var cp = require('child_process');

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

var steps = [
  [runInModule, 'npm', ['run', 'build_clients']],
  [copy, buildFile, outputFile],
  [copy, minifiedBuildFile, minifiedOutputFile]
];

(function next() {
  var step = steps.shift();
  if (step) {
    var fn = step.shift();
    step.push(next);
    fn.apply(null, step);
  } else {
    console.log('Done');
    process.exit();
  }
})();

function log() {
  var out = format.apply(console, arguments);
  if (argv.verbose) {
    out = '\n' + out + '\n';
  }
  console.log(out);
}

function runInModule(cmd, args, exitCb) {
  log('running', cmd, args.join(' '));

  var proc = cp.spawn(cmd, args, {
    stdio: argv.verbose ? 'inherit' : 'ignore'
  });

  proc.on('error', function (err) {
    console.error('Error! --', err.message);
    process.exit(1);
  });

  proc.on('exit', function (status) {
    if (status) {
      console.error('Error! --', cmd, 'exit status was', status);
      process.exit(1);
    } else {
      exitCb();
    }
  });
}

function copy(from, to, done) {
  log('copying', from, 'to', to);

  var read = fs.createReadStream(from);
  var write = fs.createWriteStream(to);

  read.pipe(write);

  read.on('error', function (err) {
    console.error('unable to read: ' + from);
    console.error(err.message);
    process.exit(1);
  });

  write.on('error', function (err) {
    console.error('unable to write to: ' + to);
    console.error(err.message);
    process.exit(1);
  });

  write.on('finish', function () {
    done();
  });
}
