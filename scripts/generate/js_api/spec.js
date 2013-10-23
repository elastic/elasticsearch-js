var _ = require('../../../src/lib/utils')

var docs = _.requireDir(module, '../../../es_api_spec/api');
var aliases = require('./aliases');

var castNotFoundRE = /exists/;
var usesBulkBodyRE = /^(bulk|msearch)$/;

var defs = [];

// itterate all of the found docs
Object.keys(docs).forEach(function (filename) {
  Object.keys(docs[filename]).forEach(function (name) {
    var def = docs[filename][name];
    def.name = name;
    defs.push(def);
  })
});

module.exports = _.map(defs, function (def) {
  var name = def.name;
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

  return spec;
});
