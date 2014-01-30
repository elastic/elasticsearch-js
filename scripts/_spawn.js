module.exports = spawn;

var estream = require('event-stream');
var chalk = require('chalk');
var cp = require('child_process');

function spawn(cmd, args, opts, cb) {
  opts = opts || {};

  console.log(chalk.white.bold('$ ' + cmd + ' ' + args.join(' ')));

  var proc = cp.spawn(cmd, args, {
    stdio: 'pipe',
    cwd: opts.cwd
  });
  var out = estream.split();

  if (opts.verbose) {
    proc.stdout.pipe(out);
  } else {
    proc.stdout.resume();
  }

  proc.stderr.pipe(out);

  out
    .pipe(estream.mapSync(function indent(line) {
      return '    ' + line + '\n';
    }))
    .pipe(process.stdout);

  if (typeof cb === 'function') {
    proc.on('exit', cb);
  }

  return proc;
}