module.exports = _spawn;

var estream = require('event-stream');
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var path = require('path');
var root = path.resolve(__dirname, '../');

function _spawn(cmd, args, opts, cb) {
  opts = opts || {};
  var conf = {
    stdio: 'pipe'
  };

  var subdir;

  if (opts.cwd) {
    conf.cwd = opts.cwd;
    subdir = path.relative(root, opts.cwd);
  }
  console.log(chalk.white.bold((subdir ? subdir + ' ' : '') + '$ ') + cmd + ' ' + args.join(' '));

  var cp = spawn(cmd, args, opts);
  var split = estream.split();

  if (opts.verbose) {
    cp.stdout.pipe(split);
  } else {
    cp.stdout.resume();
  }

  cp.stderr.pipe(split);

  split
    .pipe(estream.mapSync(function indent(line) {
      return line ? '    ' + line + '\n' : '';
    }))
    .pipe(process.stdout);

  if (typeof cb === 'function') {
    cp.on('exit', cb);
  }

  return cp;
}

_spawn.exec = function (cmd, cb) {
  return _spawn('/bin/sh', ['-c', cmd], cb);
};