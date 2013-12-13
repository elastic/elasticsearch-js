module.exports = function (argv, steps) {

  var async = require('async');
  var fs = require('fs');
  var path = require('path');
  var format = require('util').format;
  var cp = require('child_process');

  function log() {
    var out = format.apply(console, arguments);
    if (argv.verbose) {
      out = '\n' + out + '\n';
    }
    console.log(out);
  }

  var tasks = {
    exec: function (params, done) {
      var cmd = params.cmd;
      var opts = {};

      if (params.cwd) {
        opts.cwd = path.resolve(params.cwd);
      }

      log('running', cmd, (opts.cwd ? 'in ' + opts.cwd : ''));

      cp.exec(cmd, opts, function (err, stdout, stderr) {
        stdout = stdout.trim();
        stderr = stderr.trim();

        if (err) {
          console.error('Error! status:', err.code, ' -----\n' + err.message);
          process.exit(1);
        }
        else {
          if (argv.verbose) {
            if (stderr) {
              console.error('----------- STDERR -----------');
              console.error(stdout);
              console.error('------------------------------');
            }
            console.log(stdout);
          }
          done();
        }
      });
    },
    run: function (params, done) {
      var cmd = params.cmd;
      var args = params.args || [];
      var opts = {
        stdio: argv.verbose ? 'inherit' : 'ignore'
      };

      if (params.cwd) {
        opts.cwd = path.resolve(params.cwd);
      }

      log('running', cmd, args.join(' '), (opts.cwd ? 'in ' + opts.cwd : ''));

      var proc = cp.spawn(cmd, args, opts);

      proc.on('error', function (err) {
        console.error('Error! --', err.message);
        process.exit(1);
      });

      proc.on('exit', function (status) {
        if (status) {
          console.error('Error! --', cmd, 'exit status was', status);
          process.exit(1);
        } else {
          done();
        }
      });
    },
    runInModule: function (params, done) {
      params = params || {};
      params.cwd = path.resolve(__dirname, '../');
      this.run(params, done);
    },
    copy: function (params, done) {
      var from = params.from;
      var to = params.to;

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
  };

  async.forEachSeries(steps, function (args, done) {
    // pass the callback to the task
    args.push(done);

    // get the task name
    var taskName = args.shift();

    // find the task
    var task = tasks;
    taskName.split('.').forEach(function (name) {
      if (task && task[name]) {
        task = task[name];
      } else {
        throw new Error(taskName + ' is an invalid task, unable to get ' + name + ' from ' + task);
      }
    });

    if (typeof task === 'function') {
      task.apply(tasks, args);
    } else {
      throw new Error(taskName + ' is an invalid task, does not resolve to a function.');
    }
  }, function () {
    console.log('✔︎');
    process.exit();
  });

};