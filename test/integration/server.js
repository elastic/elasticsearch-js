var childProc = require('child_process'),
  events = require('events'),
  q = require('q'),
  path = require('path'),
  fs = require('fs'),
  _ = require('../../src/lib/utils');

exports.start = function (params, cb) {

  if (!fs.existsSync(params.executable)) {
    return cb(new Error('unable to find elasticsearch executable'));
  }

  var server = childProc.spawn(
    params.executable,
    [
      '-f',
      '-D es.cluster.name=' + params.clusterName,
      params.port ? '-D es.http.port=' + params.port : undefined,
      '-D es.path.data=' + params.dataPath,
      '-D es.gateway.type=none',
      '-D es.index.store.type=memory',
      '-D es.discovery.zen.ping.multicast.enabled=false',
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

  server.stdout.on('data', function (line) {
    line = line.toString();
    var match;
    // console.log(_.trim(line));
    if (!params.port && (match = line.match(/bound_address \{inet\[\/?([^:]+):(\d+)\]\}/))) {
      server.__hostname = match[1];
      server.__port = match[2];
    }

    if (line.match(/started\s*$/)) {
      console.log('Personal ES Server started at', server.__hostname + ':' + server.__port);
      server.stdout.removeAllListeners();
      server.stderr.removeAllListeners();
      cb(null, server);
    }
  });

  server.stderr.on('data', function (line) {
    console.error(_.trim(line));
  });

  process.on('exit', function () {
    server.kill();
  });

};
