module.exports = spawn;

var estream = require('event-stream');
var chalk = require('chalk');
var cp = require('child_process');
var path = require('path');
var root = path.resolve(__dirname, '../');

function spawn(cmd, args, opts, cb) {
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

  var proc = cp.spawn(cmd, args, opts);
  var out = estream.split();

  if (opts.verbose) {
    proc.stdout.pipe(out);
  } else {
    proc.stdout.resume();
  }

  proc.stderr.pipe(out);

  out
    .pipe(estream.mapSync(function indent(line) {
      return line ? '    ' + line + '\n' : '';
    }))
    .pipe(process.stdout);

  if (typeof cb === 'function') {
    proc.on('exit', cb);
  }

  return proc;
}