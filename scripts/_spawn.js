module.exports = _spawn;

var map = require('through2-map');
var split = require('split');
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var path = require('path');
var root = path.resolve(__dirname, '../');

function indent(line) {
  line = String(line).trim();
  return line ? '    ' + line + '\n' : '';
}

function consume(stream) {
  stream
  .pipe(split())
  .pipe(map(indent))
  .pipe(process.stdout, { end: false });
}

function _spawn(cmd, args, opts, cb) {
  opts = opts || {};

  if (cmd === 'rm') {
    opts.verbose = false;
  }

  var conf = {
    stdio: [
      'ignore',
      opts.verbose ? 'pipe' : 'ignore',
      'pipe'
    ]
  };

  var subdir;

  if (opts.cwd) {
    conf.cwd = opts.cwd;
    subdir = path.relative(root, opts.cwd);
  }

  console.log(chalk.white.bold((subdir ? subdir + ' ' : '') + '$ ') + cmd + ' ' + args.join(' '));

  var cp = spawn(cmd, args, conf);

  if (opts.verbose) {
    consume(cp.stdout);
  }

  consume(cp.stderr);

  if (typeof cb === 'function') {
    cp.on('exit', cb);
  }

  return cp;
}

_spawn.exec = function (cmd, opts, cb) {
  return _spawn('/bin/sh', ['-c', cmd], opts, cb);
};