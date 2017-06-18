module.exports = _spawn;

const map = require('through2-map');
const split = require('split');
const chalk = require('chalk');
const spawn = require('child_process').spawn;
const path = require('path');
const root = path.resolve(__dirname, '../');

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

  const conf = {
    stdio: [
      'ignore',
      opts.verbose ? 'pipe' : 'ignore',
      'pipe'
    ]
  };

  let subdir;

  if (opts.cwd) {
    conf.cwd = opts.cwd;
    subdir = path.relative(root, opts.cwd);
  }

  console.log(chalk.white.bold((subdir ? subdir + ' ' : '') + '$ ') + cmd + ' ' + args.join(' '));

  const cp = spawn(cmd, args, conf);

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
