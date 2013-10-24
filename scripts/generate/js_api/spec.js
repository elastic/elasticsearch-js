var _ = require('../../../src/lib/utils');

var EventEmitter = require('events').EventEmitter;
var aliases = require('./aliases');

var castNotFoundRE = /exists/;
var usesBulkBodyRE = /^(bulk|msearch)$/;

var specCount = 0;
var completedSpecs = [];
var doneParsing = false;

require('../../get_spec')
  .get('api/*.json')
  .on('entry', transformFile)
  .on('end', function () {
    doneParsing = true;
    if (completedSpecs.length === specCount) {
      module.exports.emit('ready', completedSpecs);
    }
  });

function transformFile(entry) {
  specCount++;

  var file = entry.data;
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
    if (completedSpecs.push(spec) === specCount && doneParsing) {
      module.exports.emit('ready', completedSpecs);
    }
  });
}

module.exports = new EventEmitter();
