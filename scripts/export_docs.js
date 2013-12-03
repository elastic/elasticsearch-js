var path = require('path');
var fs = require('fs');
var format = require('util').format;
var cp = require('child_process');

var argv = require('optimist')
  .default({
    outputDir: '.',
    verbose: false
  })
  .alias({
    o: 'outputDir',
    v: 'verbose'
  })
  .argv;

var steps = [
  [runInModule, 'node', [path.join(__dirname, './generate/js_api'), '--force']],
  [
    copy,
    path.join(__dirname, '../docs/_methods.jade'),
    path.join(argv.outputDir, '_methods.jade')
  ],
  [
    copy,
    path.join(__dirname, '../docs/_method_list.jade'),
    path.join(argv.outputDir, '_method_list.jade')
  ]
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
