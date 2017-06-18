module.exports = function (branch, done) {
  /**
   * Read the API actions form the rest-api-spec repo.
   * @type {[type]}
   */
  const _ = require('../../src/lib/utils');
  const utils = require('../../grunt/utils');
  const fs = require('fs');
  const async = require('async');
  const chalk = require('chalk');
  const path = require('path');
  const fromRoot = path.join.bind(path, require('find-root')(__dirname));
  const templates = require('./templates');
  const Version = require('../Version');
  const urlParamRE = /\{(\w+)\}/g;

  let files; // populated in readSpecFiles
  let apiSpec; // populated by parseSpecFiles
  let docVars; // slightly modified clone of apiSpec for the docs

  const branchSuffix = utils.branchSuffix(branch);
  const esDir = fromRoot('tmp/es/branches', _.snakeCase(branch));

  const version = Version.fromBranch(branch);
  const overrides = version.mergeOpts(require('./overrides'), {
    aliases: {},
    mergeConcatParams: {},
    paramAsBody: {},
    clientActionModifier: false,
    examples: {},
    descriptions: {},
  });

  const steps = [
    readSpecFiles,
    parseSpecFiles,
    writeApiFile
  ];

  if (!~utils.unstableBranches.indexOf(branch)) {
    steps.push(
      ensureDocsDir,
      formatDocVars,
      writeMethodDocs
    );
  }

  // generate the API
  async.series(steps, function (err) {
    done(err);
  });

  function readSpecFiles(done) {
    const apiDir = path.join(esDir, 'rest-api-spec/api/');
    files = fs.readdirSync(apiDir)
      .filter(function (filename) {
        return filename[0] !== '_';
      })
      .map(function (filename) {
        const module = require(apiDir + filename);
        delete require.cache[apiDir + filename];
        return module;
      });
    done();
  }

  function parseSpecFiles(done) {
    const actions = [];

    files.forEach(function (spec) {
      __puke__transformSpec(spec).forEach(function (action) {
        actions.push(action);
      });
    });

    // collect the namespaces from the action locations
    const namespaces = _.filter(_.map(actions, function (action) {
      return action.location
        .split('.')
        .slice(0, -1)
        .filter(step => step !== 'prototype')
        .join('.prototype.');
    }));

    // seperate the proxy actions
    const groups = _.groupBy(actions, function (action) {
      return action.proxy ? 'proxies' : 'normal';
    });

    apiSpec = {
      actions: groups.normal || [],
      proxies: groups.proxies || [],
      namespaces: _.uniq(namespaces.sort()),
      clientActionModifier: overrides.clientActionModifier
    };

    if (!_.find(apiSpec.actions, { name: 'create' })) {
      const create = _.assign(
        {},
        _.cloneDeep(_.find(apiSpec.actions, { name: 'index' })),
        {
          name: 'create',
          location: 'create',
          proxy: 'index',
          transformBody: 'params.op_type = \'create\';'
        }
      );

      if (create.allParams && create.allParams.opType) {
        delete create.allParams.opType;
      }

      apiSpec.proxies.push(create);
    }

    [].concat(apiSpec.actions, apiSpec.proxies)
    .forEach(function (action) {
      const examplePath = overrides.examples[action.name] || action.name + '.asciidoc';
      const descriptionPath = overrides.descriptions[action.name] || action.name + '.asciidoc';

      try {
        action.examples = fs.readFileSync(fromRoot('docs/_examples', examplePath), 'utf8');
      } catch (e) {
        action.examples = '// no examples';
      }

      try {
        action.description = fs.readFileSync(fromRoot('docs/_descriptions', descriptionPath), 'utf8');
      } catch (e) {
        action.description = '// no description';
      }
    });

    done();
  }

  function writeApiFile(done) {
    const outputPath = fromRoot('src/lib/apis/' + _.snakeCase(branch) + '.js');
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
    docVars.branchIsDefault = branch === utils.branches._default;
    docVars.branchSuffix = branchSuffix.replace(/_/g, '-');
    done();
  }

  function writeMethodDocs(done) {
    const filename = fromRoot('docs/api_methods' + branchSuffix + '.asciidoc');
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

  function __puke__transformSpec(spec) { // eslint-disable-line
    const actions = [];

    // itterate all of the specs within the file, should only be one
    _.each(spec, function (def, name) {
      // camelcase the name
      name = _.map(name.split('.'), _.camelCase).join('.');

      if (name === 'cat.aliases') {
        def.documentation = 'http://www.elasticsearch.org/guide/en/elasticsearch/reference/master/cat.html';
      }

      const steps = name.split('.');

      function transformParamKeys(note, param, key) {
        const cmlKey = _.camelCase(key);
        if (cmlKey !== key) {
          param.name = key;
        }
        note[cmlKey] = param;
      }

      def.url.params = _.transform(def.url.params, transformParamKeys, {});
      def.url.parts = _.transform(def.url.parts, transformParamKeys, {});

      const allParams = _.extend({}, def.url.params, def.url.parts);
      _.forOwn(allParams, (paramSpec, paramName) => {
        const toMerge = _.get(overrides, ['mergeConcatParams', name, paramName]);
        if (toMerge) {
          _.merge(paramSpec, toMerge, (dest, src) => {
            if (_.isArray(dest) && _.isArray(src)) {
              return dest.concat(src);
            }
          });
        }

        if (paramSpec.options) {
          const invalidOpts = paramSpec.options.some(opt => typeof opt !== 'string');
          if (invalidOpts) throw new Error(`${name} has options that are not strings...`);
        }
      });

      const spec = {
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
        spec.requestTimeout = 3000;
      }

      let urls = _.difference(def.url.paths, overrides.aliases[name]);
      const urlSignatures = [];
      urls = _.map(urls, function (url) {
        const optionalVars = {};
        const requiredVars = {};
        let param;
        let name;
        let target;
        let match;

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

      if (urlSignatures.length !== _.uniq(urlSignatures).length) {
        throw new Error(
          'Multiple URLS with the same signature detected for ' +
          spec.name +
          '\n' +
          _.map(urls, 'fmt').join('\n') +
          '\n'
        );
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

      if (overrides.paramAsBody[name]) {
        spec.paramAsBody = overrides.paramAsBody[name];
      }

      if (_.size(spec.params) === 0) {
        delete spec.params;
      }

      // escape method names with "special" keywords
      const location = spec.name.split('.').join('.prototype.')
        .replace(/(^|\.)(delete|default)(\.|$)/g, '[\'$2\']');

      const action = {
        _methods: spec.methods,
        spec: _.pick(spec, [
          'params',
          'url',
          'urls',
          'needBody',
          'requestTimeout',
          'bulkBody',
          'paramAsBody'
        ]),
        location: location,
        docUrl: def.documentation,
        name: spec.name,
        namespace: spec.name.split('.').slice(0, -1).join('.'),
        allParams: allParams
      };

      function hasMethod(/* ...methods */) {
        for (let i = 0; i < arguments.length; i++) {
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

      let method;

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
