var EventEmitter = require('events').EventEmitter;
var Minimatch = require('minimatch').Minimatch;
var https = require('https');
var tar = require('tar');
var zlib = require('zlib');
var path = require('path');
var _ = require('lodash');
var url = require('url');
var tarUrl = 'https://github.com/elasticsearch/elasticsearch-rest-api-spec/tarball/master';
var topDir = null; // remove the lowest directory, which changes with each commit.

exports.get = function (pattern) {
  var stream = new EventEmitter();
  var matcher = new Minimatch(pattern);

  var req = https.get(tarUrl, function receiveTarBall(incoming) {
    if (incoming.statusCode !== 200) {
      req.abort();
      if (incoming.headers.location) {
        console.log('redirecting to', incoming.headers.location);
        req = https.get(_.extend(
            url.parse(tarUrl),
            url.parse(incoming.headers.location)
          ),
          receiveTarBall
        );
      } else {
        console.error('request failed', incoming.statusCode, incoming.headers);
      }
    } else {
      incoming
        .pipe(zlib.createGunzip())
        .pipe(tar.Parse())
        .on('entry', function (entry) {
          if (!topDir) {
            topDir = entry.path.split('/').shift();
          }
          entry.path = path.relative(topDir, entry.path);
          if (matcher.match(entry.path)) {
            collectData(entry);
          } else {
            entry.resume();
          }
        })
        .on('end', function () {
          stream.emit('end');
        });
    }
  });

  function collectData(entry) {
    entry.data = '';

    entry.on('data', onData);
    entry.on('end', onEnd);

    function onData(chunk) {
      entry.data += chunk;
    }

    function onEnd() {
      entry.removeListener('data', onData);
      entry.removeListener('end', onEnd);
      stream.emit('entry', entry);
    }
  }

  return stream;
};
