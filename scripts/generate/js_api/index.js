var _ = require('../../../src/lib/utils');
var fs = require('fs');
var templates = require('./templates');
var clean = require('../../clean');
var restSpecUpdated = require('../../rest_spec_updated');

var outputPath = _.joinPath(__dirname, '../../../src/lib/api.js');
var docOutputPath = _.joinPath(__dirname, '../../../docs/api.md');

function download() {
  require('./actions').on('ready', function (actions) {
    var namespaces = _.filter(_.map(actions, function (action) {
      if (~action.location.indexOf('.')) {
        var path = action.location.split('.').slice(0, -1);
        _.pull(path, 'prototype');
        return path.join('.');
      }
    }));

    clean(outputPath);
    console.log('writing', actions.length, 'api actions to', outputPath);
    fs.writeFileSync(outputPath, templates.apiFile({
      actions: actions,
      namespaces: _.unique(namespaces.sort(), true)
    }));
    fs.writeFileSync(docOutputPath, templates.apiDocs({
      actions: actions
    }));
  });
}

restSpecUpdated(function (err, updated) {
  if (process.env.FORCE_GEN || err || updated) {
    download();
  }
});
