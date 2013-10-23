var _ = require('../../../src/lib/utils')

var EventEmitter = require('events').EventEmitter;
var aliases = require('./aliases');
var https = require('https');
var unzip = require('unzip');

var castNotFoundRE = /exists/;
var usesBulkBodyRE = /^(bulk|msearch)$/;

var specCount = 0;
var doneParsing = false;

https.get('https://codeload.github.com/elasticsearch/elasticsearch-rest-api-spec/zip/master', function (incoming) {
  incoming.pipe(unzip.Parse())
  .on('entry', function (entry) {
    if (entry.type === 'File' && entry.path.match(/(^|\/)api\/.*\.json$/)) {
      specCount++;
      return collectEntry(entry);
    } else {
      entry.autodrain();
    }
  })
  .on('close', function () {
    doneParsing = true;
    if (specs.length === specCount) {
      module.exports.emit('ready', specs);
    }
  });
})

var specs = [];

function collectEntry(entry) {
  var file = '';

  function onData (chunk) {
    file+= chunk;
  }

  function onEnd () {
    entry.removeListener('data', onData);
    entry.removeListener('end', onEnd);
    process.nextTick(function () {
      transformFile(file);
    });
  }

  entry.on('data', onData)
  entry.on('end', onEnd);
}

function transformFile(file) {
  // itterate all of the specs within the file, should only be one
  _.each(JSON.parse(file), function (def, name) {
    var steps = name.split('.');
    var spec = {
      name: name,
      methods: _.map(def.methods, function (m) { return m.toUpperCase(); }),
      docUrl: def.documentation,
      urlParts: def.url.parts,
      params: def.url.params,
      urls: _.difference(def.url.paths, aliases[name]),
      body: def.body || null,
      path2lib: _.repeat('../', steps.length + 1) + 'lib/'
    };

    if (def.body && def.body.requires) {
      spec.needBody = true;
    }

    if (usesBulkBodyRE.test(name)) {
      spec.bulkBody = true;
    }

    if (castNotFoundRE.test(name)) {
      spec.castNotFound = true;
    }
    if (specs.push(spec) === specCount && doneParsing) {
      module.exports.emit('ready', specs);
    }
  })
}

module.exports = new EventEmitter();
