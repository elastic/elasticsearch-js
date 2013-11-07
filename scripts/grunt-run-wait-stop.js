var runningProcs = [];

process.on('exit', function () {
  _.each(runningProcs, function (proc) {
    proc.kill();
  });
});

grunt.task.registerMultiTask('run', 'used to start external processes (like servers)', function () {
  var self = this;
  var name = this.target;
  var opts = this.options({
    wait: true,
    killOnError: true
  });

  console.log(opts);

  var proc = child_process.spawn(
    self.data.cmd,
    self.data.args,
    {
      stdio: ['ignore', 'pipe', 'pipe']
    }
  );

  proc.stdout.on('data', grunt.log.write);

  var done = this.async();

  if (opts.killOnError) {
    proc.stderr.on('data', function (chunk) {
      grunt.log.error(chunk);
      proc.kill();
      self.ansyc()(new Error('Error output received'));
      clearTimeout(timeoutId);
    });
  }

  if (opts.wait) {
    proc.on('close', function (exitCode) {
      done(!exitCode);
    });
  } else {
    grunt.config.set('stop.' + name + '._pid', proc.pid);
    grunt.config.set('wait.' + name + '._pid', proc.pid);
    runningProcs.push(proc);
    var timeoutId = setTimeout(done, 1000);
  }

  proc.on('close', function (exitCode) {
    var i;
    if ((i = runningProcs.indexOf(proc)) !== -1) {
      runningProcs.splice(i, 1);
    }
    grunt.log.debug('Process ' + name + ' closed.');
  });
});

grunt.task.registerMultiTask('stop', 'stop a process started with "start" ' +
  '(only works for tasks that use wait:false)', function () {
  var pid = this.data._pid;
  child_process.kill(pid);
});

grunt.task.registerMultiTask('wait', 'wait for a process to close ' +
  '(only works for tasks that use wait:false)', function () {

  var pid = this.data._pid;
  var proc = _.find(runningProcs, { pid: pid });
  if (proc) {
    proc.on('close', this.async());
  } else {
    grunt.log.writeLn('process already closed');
  }
});
