var _ = require('../../../src/lib/utils');
var asset = require('assert');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var outputDir = _.joinPath(__dirname, '../../../src/api/');

var templates = require('./templates');
var specs = require('./spec')(outputDir);

// completely delete the output directory
function clean(path) {
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
}

exports.run = function () {
  var defs = [];
  var namespaces = [];

  var actions = _.map(specs, function (spec) {
    spec.urls = _.map(
      _.sortBy(
        _.transform(spec.urls, function (note, url, i) {
          var optionalVars = {};
          var requiredVars = {};
          var param;
          var target;
          var urlParamRE = /\{(\w+)\}/g;

          if (url.charAt(0) !== '/') {
            url = '/' + url;
          }

          while (match = urlParamRE.exec(url)) {
            param = spec.urlParts[match[1]] || {};
            target = (param.required || !param.default) ? requiredVars : optionalVars;
            target[match[1]] = _.omit(param, 'required');
          }

          [requiredVars, optionalVars].forEach(function (vars) {
            _.each(vars, function (v, name) {
              vars[name] = _.omit(v, 'description');
            })
          })

          note.push(_.omit({
            fmt: url.replace(urlParamRE, '<%=$1%>'),
            opt: _.size(optionalVars) ? optionalVars : null,
            req: _.size(requiredVars) ? requiredVars : null,
            sortOrder: _.size(requiredVars) * -1
          }, function (v) { return !v; }));
        }, [])
      , 'sortOrder')
    , function (url) {
      return _.omit(url, 'sortOrder');
    });

    var docUrl = spec.docUrl;

    spec = _.pick(spec, [
      'name',
      'methods',
      'params',
      'urls',
      'needBody',
      'bulkBody',
      'castNotFound'
    ]);

    spec.params = _.transform(spec.params, function (note, param, name) {
      param.name = name;
      note[name] = _.pick(param, [
        'type', 'default', 'options', 'required'
      ]);
    }, {});

    var location = _.map(spec.name.split('.'), _.camelCase).join('.');
    if (~location.indexOf('.')) {
      var steps = location.split('.');
      namespaces.push(steps.slice(0, -1).join('.'));
      location = steps.join('.prototype.');
    }

    // escape method names with "special" keywords
    location = location.replace(/(^|\.)(delete|default)(\.|$)/g, '[\'$2\']');

    return templates.clientAction({spec: spec, location: location, docUrl: docUrl });
  });

  namespaces = _.map(_.unique(namespaces.sort(), true), function (namespace) {
    return templates.clientActionNamespace({
      get: namespace,
      set: namespace.replace(/\./g, '.prototype.'),
    });
  })


  var l = templates.lines(0);
  l('var ClientAction = require(\'./client_action\');');
  l('var errors = require(\'./errors\');');
  l('');
  l('exports.attach = function (Client) {').in();
  l.split(namespaces.join('') + '\n' + actions.join('\n'));
  l.out('};');

  fs.writeFileSync(_.joinPath(__dirname, '../../../src/lib/api.js'), l.toString());
};

exports.run();
