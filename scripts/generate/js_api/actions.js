var _ = require('../../../src/lib/utils');

var EventEmitter = require('events').EventEmitter;
var aliases = require('./aliases');

var castExistsRE = /exists/;
var usesBulkBodyRE = /^(bulk|msearch)$/;
var urlParamRE = /\{(\w+)\}/g;

var specCount = 0;
var actions = [];
var doneParsing = false;

require('../../get_spec')
  .get('api/*.json')
  .on('entry', transformFile)
  .on('end', function () {
    doneParsing = true;
    if (actions.length === specCount) {
      module.exports.emit('ready', actions);
    }
  });

function transformFile(entry) {
  specCount++;

  // itterate all of the specs within the file, should only be one
  _.each(JSON.parse(entry.data), function (def, name) {
    var steps = name.split('.');
    var allParams = _.extend({}, def.url.params, def.url.parts);
    var spec = {
      name: name,
      methods: _.map(def.methods, function (m) { return m.toUpperCase(); }),
      params: def.url.params,
      body: def.body || null,
      path2lib: _.repeat('../', steps.length + 1) + 'lib/'
    };

    if (def.body && def.body.requires) {
      spec.needBody = true;
    }

    if (usesBulkBodyRE.test(name)) {
      spec.bulkBody = true;
    }

    if (castExistsRE.test(name)) {
      spec.castExists = true;
    }

    var urls = _.difference(def.url.paths, aliases[name]);
    urls = _.map(urls, function (url, i) {
      var optionalVars = {};
      var requiredVars = {};
      var param;
      var target;
      var match;

      if (url.charAt(0) !== '/') {
        url = '/' + url;
      }

      while (match = urlParamRE.exec(url)) {
        param = def.url.parts[match[1]] || {};
        target = (param.required || !param.default) ? requiredVars : optionalVars;
        target[match[1]] = _.omit(param, 'required');
      }

      [requiredVars, optionalVars].forEach(function (vars) {
        _.each(vars, function (v, name) {
          vars[name] = _.omit(v, 'description');
        });
      });

      return _.omit({
        fmt: url.replace(urlParamRE, '<%=$1%>'),
        opt: _.size(optionalVars) ? optionalVars : null,
        req: _.size(requiredVars) ? requiredVars : null,
        sortOrder: _.size(requiredVars) * -1
      }, function (v) {
        return !v;
      });
    });

    spec.urls = _.map(_.sortBy(urls, 'sortOrder'), function (url) {
      return _.omit(url, 'sortOrder');
    });

    spec.params = _.transform(spec.params, function (note, param, name) {
      param.name = name;
      note[name] = _.pick(param, [
        'type', 'default', 'options', 'required'
      ]);
    }, {});

    // escape method names with "special" keywords
    var location = _.map(spec.name.split('.'), _.camelCase)
      .join('.prototype.')
      .replace(/(^|\.)(delete|default)(\.|$)/g, '[\'$2\']');

    var action = {
      spec: _.pick(spec, [
        'methods',
        'params',
        'urls',
        'needBody',
        'bulkBody',
        'castExists',
        'castNotFound'
      ]),
      location: location,
      docUrl: def.documentation,
      name: spec.name,
      allParams: allParams
    };

    if (actions.push(action) === specCount && doneParsing) {
      module.exports.emit('ready', action);
    }
  });
}

module.exports = new EventEmitter();
