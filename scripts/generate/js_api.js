module.exports = function (branch, done) {
  /**
   * Read the API actions form the rest-api-spec repo.
   * @type {[type]}
   */
  var _ = require('../../src/lib/utils');
  var utils = require('../../grunt/utils');
  var fs = require('fs');
  var async = require('async');
  var chalk = require('chalk');
  var path = require('path');
  var fromRoot = path.join.bind(path, require('find-root')(__dirname));
  var templates = require('./templates');
  var urlParamRE = /\{(\w+)\}/g;

  var files; // populated in readSpecFiles
  var apiSpec; // populated by parseSpecFiles
  var docVars; // slightly modified clone of apiSpec for the docs

  var branchSuffix = utils.branchSuffix(branch);
  var esDir = fromRoot('src/elasticsearch_' + _.snakeCase(branch));
  var aliases;
  try {
    aliases = require('./aliases_' + _.snakeCase(branch));
  } catch (e) {
    // fall back to the master aliases
    aliases = require('./aliases');
  }

  // generate the API
  async.series([
    readSpecFiles,
    parseSpecFiles,
    writeApiFile,
    ensureDocsDir,
    formatDocVars,
    writeMethodDocs
  ], function (err) {
    console.log('');
    done(err);
  });

  function readSpecFiles(done) {
    var apiDir = path.join(esDir, 'rest-api-spec/api/');
    files = fs.readdirSync(apiDir).map(function (filename) {
      var module = require(apiDir + filename);
      delete require.cache[apiDir + filename];
      return module;
    });
    done();
  }

  function parseSpecFiles(done) {
    var actions = [];

    files.forEach(function (spec) {
      __puke__transformSpec(spec).forEach(function (action) {
        actions.push(action);
      });
    });

    // collect the namespaces from the action locations
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

    apiSpec = {
      actions: groups.normal || [],
      proxies: groups.proxies || [],
      namespaces: _.unique(namespaces.sort(), true)
    };

    var create = _.assign({}, _.find(apiSpec.actions, { name: 'index' }), {
      name: 'create',
      location: 'create',
      proxy: 'index',
      transformBody: 'params.op_type = \'create\';'
    });

    if (create.allParams && create.allParams.opType) {
      delete create.allParams.opType;
    }

    apiSpec.proxies.push(create);

    done();
  }

  function writeApiFile(done) {
    var outputPath = fromRoot('src/lib/apis/' + _.snakeCase(branch) + '.js');
    fs.writeFileSync(outputPath, templates.apiFile(apiSpec));
    console.log(chalk.white.bold('wrote'), apiSpec.actions.length, 'api actions to', outputPath);
    done();
  }

  function ensureDocsDir(done) {
    fs.stat(fromRoot('docs'), function (err, stat) {
      if (err) {
        if (err.message.match(/enoent/i)) {
          fs.mkdir('../../docs', done);
        } else {
          done(err);
        }
      } else if (stat.isDirectory()) {
        done();
      } else {
        done(new Error('../../docs exists, but it is not a directory'));
      }
    });
  }

  function formatDocVars(done) {
    // merge the actions and proxies to make
    // itteration easir and keep them in order

    docVars = _.omit(apiSpec, 'proxies');
    docVars.actions = _.sortBy(
      [].concat(apiSpec.actions).concat(apiSpec.proxies),
      'name'
    );
    docVars.branch = branch;
    docVars.branchSuffix = branchSuffix.replace(/_/g, '-');
    done();
  }

  function writeMethodDocs(done) {
    var filename = fromRoot('docs/api_methods' + branchSuffix + '.asciidoc');
    fs.writeFile(
      filename,
      templates.apiMethods(docVars),
      function (err) {
        if (!err) {
          console.log(chalk.white.bold('wrote'), branch + ' method docs to', filename);
        }
        done(err);
      }
    );
  }

  function __puke__transformSpec(spec) {
    var actions = [];

    // itterate all of the specs within the file, should only be one
    _.each(spec, function (def, name) {
      //camelcase the name
      name = _.map(name.split('.'), _.camelCase).join('.');

      if (name === 'cat.aliases') {
        def.documentation = 'http://www.elasticsearch.org/guide/en/elasticsearch/reference/master/cat.html';
      }

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

      if (def.body && def.body.required) {
        spec.needBody = true;
      }

      if (def.body && def.body.serialize === 'bulk') {
        spec.bulkBody = true;
      }

      if (name === 'ping') {
        spec.requestTimeout = 100;
      }

      var urls = _.difference(def.url.paths, aliases[name]);
      var urlSignatures = [];
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

        urlSignatures.push(_.union(_.keys(optionalVars), _.keys(requiredVars)).sort().join(':'));

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

      if (urlSignatures.length !== _.unique(urlSignatures).length) {
        throw new Error('Multiple URLS with the same signature detected for ' + spec.name + '\n' + _.pluck(urls, 'fmt').join('\n') + '\n');
      }

      if (urls.length > 1) {
        spec.urls = _.map(_.sortBy(urls, 'sortOrder'), function (url) {
          return _.omit(url, 'sortOrder');
        });
      } else {
        spec.url = _.omit(urls[0], 'sortOrder');
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
        _methods: spec.methods,
        spec: _.pick(spec, [
          'params',
          'url',
          'urls',
          'needBody',
          'requestTimeout',
          'bulkBody'
        ]),
        location: location,
        docUrl: def.documentation,
        name: spec.name,
        namespace: spec.name.split('.').slice(0, -1).join('.'),
        allParams: allParams
      };

      function hasMethod(/* ...methods */) {
        for (var i = 0; i < arguments.length; i++) {
          if (~action._methods.indexOf(arguments[i])) {
            continue;
          } else {
            return false;
          }
        }
        return true;
      }
      function methodsAre(/* ...methods */) {
        return hasMethod.apply(null, arguments) && arguments.length === action._methods.length;
      }

      var method;

      if (action._methods.length === 1) {
        method = action._methods[0];
      } else {
        // we need to define what the default method(s) will be
        if (hasMethod('DELETE', 'POST')) {
          method = 'POST';
        }
        else if (methodsAre('DELETE')) {
          method = 'DELETE';
        }
        else if (methodsAre('POST', 'PUT')) {
          method = action.name.match(/put/i) ? 'PUT' : 'POST';
        }
        else if (methodsAre('GET', 'POST')) {
          method = 'POST';
        }
        else if (methodsAre('GET', 'HEAD')) {
          method = 'GET';
        }
      }

      if (method) {
        if (method !== 'GET') {
          action.spec.method = method;
        }
      } else {
        throw new Error('unable to pick a method for ' + JSON.stringify(action, null, '  '));
      }

      actions.push(action);
    });

    return actions;
  }
};

