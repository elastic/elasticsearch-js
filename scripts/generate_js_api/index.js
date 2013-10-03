var _ = require('../../src/lib/toolbelt')
  , asset = require('assert')
  , path = require('path')
  , fs = require('fs')
  , mkdirp = require('mkdirp')
  , docs = _.requireDir(module, '../../es_api_spec/api')
  , outputDir = _.joinPath(__dirname, '../../src/api/')
  , templates = require('./templates')
  , notes = require('./notes')
  , aliases = require('./aliases');

// completely delete the output directory
(function clean(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        clean(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
})(outputDir);

// itterate all of the found docs
_.each(docs, function (doc) {
  // and each definition within each doc (should only be one)
  _.each(doc, function (def, name) {

    var steps = name.split('.')
      , fileName = steps.pop() + '.js'
      , dirName = _.joinPath(outputDir, steps.join('/') || './');

    var spec = {
      name: name,
      methods: _.map(def.methods, function (m) { return m.toLowerCase(); }),
      docUrl: def.documentation,
      urlParts: def.url.parts,
      params: def.url.params,
      urls: _.difference(def.url.paths, aliases[name]),
      body: def.body || null,
      path2lib: _.repeat('../', steps.length + 1) + 'lib/',
      notes: notes[name]
    };

    spec.enumOptions = _.object(_.filter(_.map(_.pairs(_.extend({}, spec.params, spec.urlParts)), function (pair) {
      // pair = [name, param];
      if (pair[1].type === 'enum') {
        return [_.camelCase(pair[0]), pair[1].options];
      }
    })));

    mkdirp.sync(dirName);
    fs.writeFileSync(_.joinPath(dirName, fileName), templates.action(spec));

  });
});
