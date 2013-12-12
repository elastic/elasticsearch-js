var path = require('path');

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

require('./_steps')(argv, [
  ['runInModule', {
    cmd: 'node',
    args: [path.join(__dirname, './generate'), '--force']
  }],
  ['copy', {
    from: path.join(__dirname, '../docs/_methods.jade'),
    to: path.join(argv.outputDir, '_methods.jade')
  }],
  ['copy', {
    from: path.join(__dirname, '../docs/_method_list.jade'),
    to: path.join(argv.outputDir, '_method_list.jade')
  }]
]);

// function runInModule(cmd, args, exitCb) {
//   log('running', cmd, args.join(' '));

//   var proc = cp.spawn(cmd, args, {
//     stdio: argv.verbose ? 'inherit' : 'ignore'
//   });

//   proc.on('error', function (err) {
//     console.error('Error! --', err.message);
//     process.exit(1);
//   });

//   proc.on('exit', function (status) {
//     if (status) {
//       console.error('Error! --', cmd, 'exit status was', status);
//       process.exit(1);
//     } else {
//       exitCb();
//     }
//   });
// }

// function copy(from, to, done) {
//   log('copying', from, 'to', to);

//   var read = fs.createReadStream(from);
//   var write = fs.createWriteStream(to);

//   read.pipe(write);

//   read.on('error', function (err) {
//     console.error('unable to read: ' + from);
//     console.error(err.message);
//     process.exit(1);
//   });

//   write.on('error', function (err) {
//     console.error('unable to write to: ' + to);
//     console.error(err.message);
//     process.exit(1);
//   });

//   write.on('finish', function () {
//     done();
//   });
// }
