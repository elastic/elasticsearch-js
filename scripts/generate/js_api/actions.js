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
    //camelcase the name
    name = _.map(name.split('.'), _.camelCase).join('.');

    var steps = name.split('.');

    function transformParamKeys(note, param, key) {
      var cmlKey = _.camelCase(key);
      if (cmlKey !== key) {
        param.name = key;
      }
      note[cmlKey] = param;
    }

    def.url.params = _.transform(def.url.params, transformParamKeys, {});
    def.url.parts = _.transform(def.url.parts, transformParamKeys, {});

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
    urls = _.map(urls, function (url) {
      var optionalVars = {};
      var requiredVars = {};
      var param;
      var name;
      var target;
      var match;

      if (url.charAt(0) !== '/') {
        url = '/' + url;
      }

      while (match = urlParamRE.exec(url)) {
        name = _.camelCase(match[1]);
        param = def.url.parts[name] || {};
        target = (param.required || !param.default) ? requiredVars : optionalVars;
        target[name] = _.omit(param, 'required', 'description', 'name');
      }

      return _.omit({
        fmt: url.replace(urlParamRE, function (full, match) {
          return '<%=' + _.camelCase(match) + '%>';
        }),
        opt: _.size(optionalVars) ? optionalVars : null,
        req: _.size(requiredVars) ? requiredVars : null,
        sortOrder: _.size(requiredVars) * -1
      }, function (v) {
        return !v;
      });
    });

    if (urls.length > 1) {
      spec.urls = _.map(_.sortBy(urls, 'sortOrder'), function (url) {
        return _.omit(url, 'sortOrder');
      });
    } else {
      spec.url = urls[0];
    }

    spec.params = _.transform(spec.params, function (note, param, name) {
      // param.name = name;
      note[name] = _.pick(param, [
        'type', 'default', 'options', 'required', 'name'
      ]);
    }, {});

    if (_.size(spec.params) === 0) {
      delete spec.params;
    }

    // escape method names with "special" keywords
    var location = spec.name.split('.').join('.prototype.')
      .replace(/(^|\.)(delete|default)(\.|$)/g, '[\'$2\']');

    var action = {
      spec: _.pick(spec, [
        'methods',
        'params',
        'url',
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

    function hasMethod(/* ...methods */) {
      for (var i = 0; i < arguments.length; i++) {
        if (~action.spec.methods.indexOf(arguments[i])) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    }
    function methodsAre(/* ...methods */) {
      return hasMethod.apply(null, arguments) && arguments.length === action.spec.methods.length;
    }

    var method;

    if (action.spec.methods.length === 1) {
      method = action.spec.methods[0];
    } else {
      // we need to define what the default method(s) will be
      if (hasMethod('DELETE', 'POST')) {
        method = 'POST';
      }
      else if (methodsAre('DELETE')) {
        method = 'DELETE';
      }
      else if (methodsAre('POST', 'PUT')) {
        method = 'POST';
      }
      else if (methodsAre('GET', 'POST')) {
        method = 'POST';
      }
      else if (methodsAre('GET', 'HEAD')) {
        if (action.spec.castExists) {
          method = 'HEAD';
        } else {
          method = 'GET';
        }
      }
    }

    if (method) {
      if (method !== 'GET') {
        action.spec.method = method;
      }
      delete action.spec.methods;
    } else {
      throw new Error('unable to pick a method for ' + JSON.stringify(action, null, '  '));
    }

    if (action.name === 'create') {
      action.proxy = 'index';
      action.transformBody = 'params.op_type = \'create\';';
    }

    if (actions.push(action) === specCount && doneParsing) {
      module.exports.emit('ready', action);
    }
  });
}

module.exports = new EventEmitter();
