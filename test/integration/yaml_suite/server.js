var childProc = require('child_process');
var events = require('events');
var path = require('path');
var fs = require('fs');
var _ = require('../../../src/lib/utils');
var argv = require('./argv');

exports.start = function (cb) {

  if (!argv.executable || !fs.existsSync(argv.executable)) {
    return cb(new Error('unable to find elasticsearch executable, ' +
      'set ES_HOME env var to the instalation path of elasticsearch'));
  }

  var server = childProc.spawn(
    argv.executable,
    [
      '-f',
      '-Des.cluster.name=' + argv.clusterName,
      '-Des.path.data=' + argv.dataPath,
      // '-Des.logger.level=DEBUG',
      '-Des.discovery.zen.ping.multicast.enabled=false',
    ],
    {
      cwd: void 0,
      env: process.env,
      stdio: [
        'ignore',
        'pipe',
        'pipe'
      ]
    }
  );

  server.stdout.on('data', function onProcessData(line) {
    line = line.toString().trim();
    var match;
    if (match = line.match(/\{inet\[\/?([^:]+):(\d+)\]\}/)) {
      server.__hostname = match[1];
      server.__port = match[2];
    }

    if (line.match(/started\s*$/m)) {
      console.log('Personal ES Server started at', server.__hostname + ':' + server.__port);
      server.stdout.removeListener('data', onProcessData);
      server.stdout.resume();
      cb(null, server);
    }
  });

  server.stderr.on('data', function (line) {
    console.error(line.toString().trim());
  });

  server.on('close', function (code) {
    server.stdout.removeAllListeners();
    server.stderr.removeAllListeners();
    console.log('Personal ES Server Shutdown with exit code', code);
  });

  process.on('exit', function () {
    server.kill();
  });

};
