var aliases; // defined at the bottom of this file.

module.exports = function (done) {
  /**
   * Read the API actions form the rest-api-spec repo.
   * @type {[type]}
   */
  var _ = require('../../src/lib/utils');
  var fs = require('relative-fs').relativeTo(__dirname);
  var async = require('async');
  var templates = require('./templates');
  var castExistsRE = /exists/;
  var usesBulkBodyRE = /^(bulk|msearch)$/;
  var urlParamRE = /\{(\w+)\}/g;

  var files; // populated in readSpecFiles
  var apiSpec; // populated by parseSpecFiles
  var docVars; // slightly modified clone of apiSpec for the docs

  // generate the API
  async.series([
    readSpecFiles,
    parseSpecFiles,
    writeApiFile,
    ensureDocsDir,
    formatDocVars,
    writeMethodDocs
  ], done);

  function readSpecFiles(done) {
    var apiDir = '../../src/elasticsearch/rest-api-spec/api/';
    files = fs.readdirSync(apiDir).map(function (filename) {
      return require(apiDir + filename);
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
      actions: groups.normal,
      proxies: groups.proxies,
      namespaces: _.unique(namespaces.sort(), true)
    };

    done();
  }

  function writeApiFile(done) {
    var outputPath = require('path').join(__dirname, '../../src/lib/api.js');
    console.log('writing', apiSpec.actions.length, 'api actions to', outputPath);
    fs.writeFile(outputPath, templates.apiFile(apiSpec), done);
  }

  function ensureDocsDir(done) {
    fs.stat('../../docs', function (err, stat) {
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
    done();
  }

  function writeMethodDocs(done) {
    fs.writeFile(
      '../../docs/api_methods.asciidoc',
      templates.apiMethods(docVars),
      done
    );
  }

  function __puke__transformSpec(spec) {
    var actions = [];

    // itterate all of the specs within the file, should only be one
    _.each(spec, function (def, name) {
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
        throw new Error('Multiple URLS with the same signature detected for ' + spec.name);
      }

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
        _methods: spec.methods,
        spec: _.pick(spec, [
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
      } else {
        throw new Error('unable to pick a method for ' + JSON.stringify(action, null, '  '));
      }

      if (action.name === 'create') {
        action.proxy = 'index';
        action.transformBody = 'params.op_type = \'create\';';
      }

      actions.push(action);
    });

    return actions;
  }
};

aliases = {
  'cluster.nodeHotThreads': [
    '/_cluster/nodes/hotthreads',
    '/_cluster/nodes/hot_threads',
    '/_nodes/hot_threads',
    '/_cluster/nodes/{node_id}/hotthreads',
    '/_cluster/nodes/{node_id}/hot_threads',
    '/_nodes/{node_id}/hot_threads'
  ],
  'cluster.nodeInfo': [
    '/_cluster/nodes',
    '/_nodes/settings',
    '/_nodes/os',
    '/_nodes/process',
    '/_nodes/jvm',
    '/_nodes/thread_pool',
    '/_nodes/network',
    '/_nodes/transport',
    '/_nodes/http',
    '/_nodes/plugin',
    '/_cluster/nodes/{node_id}',
    '/_nodes/{node_id}/settings',
    '/_nodes/{node_id}/os',
    '/_nodes/{node_id}/process',
    '/_nodes/{node_id}/jvm',
    '/_nodes/{node_id}/thread_pool',
    '/_nodes/{node_id}/network',
    '/_nodes/{node_id}/transport',
    '/_nodes/{node_id}/http',
    '/_nodes/{node_id}/plugin'
  ],
  'cluster.nodeShutdown': [
    '/_cluster/nodes/_shutdown'
  ],
  'cluster.nodeStats': [
    '/_cluster/nodes/stats',
    '/_nodes/stats/{metric_family}',
    '/_nodes/stats/indices/{metric}/{fields}',
    '/_cluster/nodes/{node_id}/stats',
    '/_nodes/{node_id}/stats/{metric_family}',
    '/_nodes/{node_id}/stats/indices/{metric}/{fields}'
  ],
  'get': [
    '/{index}/{type}/{id}/_source'
  ],
  'indices.deleteMapping': [
    '/{index}/{type}/_mapping'
  ],
  'indices.stats': [
    '_stats/{metric_family}',
    '/_stats/indexing',
    '/_stats/indexing/{indexing_types}',
    '/_stats/search/{search_groups}',
    '/_stats/fielddata/{fields}',
    '/{index}/_stats/{metric_family}',
    '/{index}/_stats/indexing',
    '/{index}/_stats/search/{search_groups}',
    '/{index}/_stats/fielddata/{fields}'
  ],
  'search': [
    '/_search'
  ]
};