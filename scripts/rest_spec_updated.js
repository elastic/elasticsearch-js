var https = require('https');
var request = {
  hostname: 'api.github.com',
  path: '/repos/elasticsearch/elasticsearch-rest-api-spec/commits/HEAD',
  headers: {
    'User-Agent': 'spenceralger'
  }
};
var fs = require('fs');

var lastRestSpecUpdateFile = __dirname + '/last_rest_spec_update.sha';
var lastRestSpecUpdate;
var updated;

if (fs.existsSync(lastRestSpecUpdateFile)) {
  lastRestSpecUpdate = fs.readFileSync(lastRestSpecUpdateFile, 'utf8');
}

var req = https.get(request, function (incoming) {
  if (incoming.statusCode !== 200) {
    req.abort();
    console.error('request for last commit failed', incoming.statusCode, incoming.headers);
    return;
  }

  var body = '';

  incoming.on('data', onData);
  incoming.on('end', onEnd);

  function onData(chunk) {
    body += chunk;
  }

  function onEnd() {
    incoming.removeListener('data', onData);
    incoming.removeListener('end', onEnd);
    var _req = req;
    req = null;

    var resp;
    try {
      resp = JSON.parse(body);
    } catch (e) {
      console.log('unable to parse response from github');
      _req.emit('ready');
      return;
    }

    if (lastRestSpecUpdate === resp.sha) {
      updated = false;
    } else {
      updated = true;
      fs.writeFileSync(lastRestSpecUpdateFile, resp.sha);
    }
    _req.emit('ready');
  }
});

module.exports = function (cb) {
  function done() {
    cb(null, updated);
  }

  if (req) {
    req.on('ready', done);
  } else {
    process.nextTick(done);
  }
};
