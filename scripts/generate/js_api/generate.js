module.exports = function (force) {
  var _ = require('../../../src/lib/utils');
  var fs = require('fs');
  var templates = require('./templates');
  var restSpecUpdated = require('../../rest_spec_updated');

  var outputPath = _.joinPath(__dirname, '../../../src/lib/api.js');
  var docOutputDir = _.joinPath(__dirname, '../../../docs/');

  function download() {
    require('./actions').on('ready', function (actions) {
      var namespaces = _.filter(_.map(actions, function (action) {
        if (~action.location.indexOf('.')) {
          var path = action.location.split('.').slice(0, -1);
          _.pull(path, 'prototype');
          return path.join('.');
        }
      }));

      // seperate the proxy actions
      var groups = _.groupBy(actions, function (action) {
        return action.proxy ? 'proxies' : 'normal';
      });

      fs.unlink(outputPath, function () {
        console.log('writing', actions.length, 'api actions to', outputPath);

        fs.writeFileSync(outputPath, templates.apiFile({
          actions: groups.normal,
          proxies: groups.proxies,
          namespaces: _.unique(namespaces.sort(), true)
        }));

        if (!fs.existsSync(docOutputDir)) {
          fs.mkdirSync(docOutputDir);
        }

        fs.writeFileSync(docOutputDir + '_method_list.jade', templates.apiMethodList({
          actions: actions
        }));

        fs.writeFileSync(docOutputDir + '_methods.jade', templates.apiMethods({
          actions: actions
        }));

      });
    });
  }

  if (force) {
    download();
  } else {
    restSpecUpdated(function (err, updated) {
      if (err || updated) {
        download();
      }
    });
  }
};