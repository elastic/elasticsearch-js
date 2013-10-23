var childProc = require('child_process'),
  events = require('events'),
  q = require('q'),
  path = require('path'),
  fs = require('fs'),
  _ = require('../../../src/lib/utils');

exports.start = function (params, cb) {

  if (!fs.existsSync(params.executable)) {
    return cb(new Error('unable to find elasticsearch executable'));
  }

  var server = childProc.spawn(
    params.executable,
    [
      '-f',
      '-Des.cluster.name=' + params.clusterName,
      '-Des.path.data=' + params.dataPath,
      // '-Des.logger.level=DEBUG',
      '-Des.discovery.zen.ping.multicast.enabled=false',
    ],
    {
      cwd: undefined,
      env: process.env,
      stdio: [
        'ignore',
        'pipe',
        'pipe'
      ]
    }
  );

  server.stdout.on('data', function onProcessData(line) {
    line = _.trim(line.toString());
    var match;
    if (match = line.match(/bound_address \{inet\[\/?([^:]+):(\d+)\]\}/)) {
      server.__hostname = match[1];
      server.__port = match[2];
    }

    if (line.match(/started\s*$/m)) {
      console.log('Personal ES Server started at', server.__hostname + ':' + server.__port);
      server.stdout.removeListener('data', onProcessData);
      server.stdout.on('data', _.noop);
      cb(null, server);
    }
  });

  server.stderr.on('data', function (line) {
    console.error(_.trim(line.toString()));
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
