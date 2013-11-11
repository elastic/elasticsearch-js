var _ = require('../../../src/lib/utils');
var asset = require('assert');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var templates = require('./templates');
var clean = require('../../clean');
var urlParamRE = /\{(\w+)\}/g;

var outputPath = _.joinPath(__dirname, '../../../src/lib/api.js');

function download() {
  require('./actions').on('ready', function (actions) {
    var defs = [];

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
  });
}

try {
  var stat = fs.statSync(outputPath);
  if (!stat.isFile() || stat.ctime < Date.now() - 86400000) {
    download();
  }
} catch (e) {
  download();
}
