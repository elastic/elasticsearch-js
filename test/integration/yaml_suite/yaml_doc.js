/**
 * Class to wrap a single document from a yaml test file
 *
 * @constructor
 * @class YamlDoc
 * @param actions {Array} - The array of actions directly from the Yaml file
 */
module.exports = YamlDoc;

var _ = require('../../../src/lib/utils');
var expect = require('expect.js');
var clientManager = require('./client_manager');
var inspect = require('util').inspect;

var implementedFeatures = ['gtelte', 'regex', 'benchmark', 'stash_in_path'];

/**
 * The version that ES is running, in comparable string form XXX-XXX-XXX, fetched when needed
 * @type {String}
 */
var ES_VERSION = null;

// core expression for finding a version
var versionExp = '((?:\\d+\\.){0,2}\\d+)(?:\\.\\w+)?|';

// match all whitespace within a "regexp" match arg
var reWhitespace_RE = /\s+/g;

// match all comments within a "regexp" match arg
var reComments_RE = /([\S\s]?)#[^\n]*\n/g;

/**
 * Regular Expression to extract a version number from a string
 * @type {RegExp}
 */
var versionRE = new RegExp('^(?:' + versionExp + ')$');

/**
 * Regular Expression to extract a version range from a string
 * @type {RegExp}
 */
var versionRangeRE = new RegExp('^(?:' + versionExp + ')\\s*\\-\\s*(?:' + versionExp + ')$');

/**
 * Fetches the client.info, and parses out the version number to a comparable string
 * @param done {Function} - callback
 */
function getVersionFromES(done) {
  clientManager.get().info({}, function (err, resp) {
    if (err) {
      throw new Error('unable to get info about ES');
    }

    ES_VERSION = resp.version.number;
    done();
  });
}

/**
 * Transform x.x.x into xxx.xxx.xxx, striping off any text at the end like beta or pre-alpha35
 *
 * @param  {String} version - Version number represented as a string
 * @return {String} - Version number represented as three numbers, seperated by -, all numbers are
 *   padded with 0 and will be three characters long so the strings can be compared.
 */
function versionToComparableString(version, def) {
  if (!version) {
    return def;
  }

  var parts = _.map(version.split('.'), function (part) {
    part = '' + _.parseInt(part);
    return (new Array(Math.max(4 - part.length, 0))).join('0') + part;
  });

  while (parts.length < 3) {
    parts.push('000');
  }

  return parts.join('-');
}

/**
 * Compare a version range to the ES_VERSION, determining if the current version
 * falls within the range.
 *
 * @param  {String} rangeString - a string representing two version numbers seperated by a "-"
 * @return {Boolean} - is the current version within the range (inclusive)
 */
function rangeMatchesCurrentVersion(rangeString, done) {
  if (rangeString === 'all') {
    return done(true);
  }

  if (!ES_VERSION) {
    getVersionFromES(function () {
      rangeMatchesCurrentVersion(rangeString, done);
    });
    return;
  }

  done(YamlDoc.compareRangeToVersion(rangeString, ES_VERSION));
}


function YamlDoc(doc, file) {
  var self = this;

  self.file = file;
  self.description = _.keys(doc).shift();
  self._stash = {};
  self._last_requests_response = null;

  // setup the actions, creating a bound and testable method for each
  self._actions = _.map(self.flattenTestActions(doc[self.description]), function (action, i) {
    // get the method that will do the action
    var method = self['do_' + action.name];

    // check that it's a function
    expect(method || 'YamlDoc#' + action.name).to.be.a('function');

    if (_.isPlainObject(action.args)) {
      action.name += '(' + JSON.stringify(action.args) + ')';
    } else if (action.args) {
      action.name += '(' + action.args + ')';
    }

    // wrap in a check for skipping
    action.bound = _.bind(method, self, action.args);

    // create a function that can be passed to mocha or async
    action.testable = function (_cb) {
      function done(err) {
        process.nextTick(function () {
          if (err) {
            err.message += ' in ' + action.name;
          }
          _cb(err);
        });
      }

      if (self.skipping || self.file.skipping) {
        return done();
      }
      if (method.length > 1) {
        action.bound(done);
      } else {
        try {
          action.bound();
          process.nextTick(done);
        } catch (err) {
          done(err);
        }
      }
    };

    return action;
  });
}

YamlDoc.compareRangeToVersion = function (range, version) {
  expect(range).to.match(versionRangeRE);
  var rangeMatch = versionRangeRE.exec(range);

  expect(version).to.match(versionRE);
  var versionMatch = versionRE.exec(version);

  var min = versionToComparableString(rangeMatch[1], -Infinity);
  var max = versionToComparableString(rangeMatch[2], Infinity);
  var comp = versionToComparableString(versionMatch[1], Infinity);

  return (min === -Infinity || min <= comp) && (max === Infinity || max >= comp);
};

YamlDoc.prototype = {

  /**
   * convert tests actions
   *   from: [ {name:args, name:args}, {name:args}, ... ]
   *   to:   [ {name:'', args:'' }, {name:'', args:''} ]
   * so it's easier to work with
   * @param {ArrayOfObjects} config - Actions to be taken as defined in the yaml specs
   */
  flattenTestActions: function (config) {
    // creates [ [ {name:"", args:"" }, ... ], ... ]
    // from [ {name:args, name:args}, {name:args} ]
    var actionSets = _.map(config, function (set) {
      return _.map(_.pairs(set), function (pair) {
        return { name: pair[0], args: pair[1] };
      });
    });

    // do a single level flatten, merge=ing the nested arrays from step one
    // into a master array, creating an array of action objects
    return _.reduce(actionSets, function (note, set) {
      return note.concat(set);
    }, []);
  },

  /**
   * Itterate over each of the actions, provides the testable function, and a name/description.
   * return a litteral false to stop itterating
   * @param  {Function} ittr - The function to call for each action.
   * @return {undefined}
   */
  each: function (ittr) {
    for (var i = 0; i < this._actions.length; i++) {
      if (ittr(this._actions[i].testable, this._actions[i].name) === false) {
        break;
      }
    }
  },

  /**
   * Get a value from the last response, using dot-notation
   *
   * Example
   * ===
   *
   * get '_source.tags.1'
   *
   * from {
   *   _source: {
   *     tags: [
   *       'one',
   *       'two'
   *     ]
   *   }
   * }
   *
   * returns 'two'
   *
   * @param  {string} path - The dot-notation path to the value needed.
   * @return {*} - The value requested, or undefined if it was not found
   */
  get: function (path, from) {
    var self = this;
    var log = process.env.LOG_GETS && !from ? console.log.bind(console) : function () {};
    var i;

    if (path === '$body') {
      // shortcut, the test just wants the whole body
      return self._last_requests_response;
    } else if (path) {
      path = path.replace(/\.\$([a-zA-Z0-9_]+)/g, function (m, name) {
        return '.' + self._stash[name];
      });
    }

    if (!from) {
      if (path[0] === '$') {
        from = self._stash;
        path = path.substring(1);
      } else {
        from = self._last_requests_response;
      }
    }

    log('getting', path, 'from', from);

    var steps = _.map(path ? path.replace(/\\\./g, '\uffff').split('.') : [], function (step) {
      return step.replace(/\uffff/g, '.');
    });
    var remainingSteps;

    for (i = 0; from != null && i < steps.length; i++) {
      if (from[steps[i]] === void 0) {
        remainingSteps = steps.slice(i).join('.').replace(/\\\./g, '.');
        from = from[remainingSteps];
        break;
      } else {
        from = from[steps[i]];
      }
    }

    log('found', typeof from !== 'function' ? from : 'function');
    return from;
  },

  /**
   * Do a skip operation, setting the skipping flag to true if the version matches
   * the range defined in args.version
   *
   * @param args
   * @param done
   */
  do_skip: function (args, done) {
    if (args.version) {
      return rangeMatchesCurrentVersion(args.version, _.bind(function (match) {
        if (match) {
          if (this.description === 'setup') {
            this.file.skipping = true;
            // console.log('skipping this file' + (args.reason ? ' because ' + args.reason : ''));
          } else {
            this.skipping = true;
            // console.log('skipping the rest of this doc' + (args.reason ? ' because ' + args.reason : ''));
          }
        } else {
          this.skipping = false;
          this.file.skipping = false;
        }
        done();
      }, this));
    }

    if (args.features) {
      var features = Array.isArray(args.features) ? args.features : [args.features];
      var notImplemented = _.difference(features, implementedFeatures);

      if (notImplemented.length) {
        if (this.description === 'setup') {
          this.file.skipping = true;
          console.log('skipping this file because ' + notImplemented.join(' & ') + ' are not implemented');
        } else {
          this.skipping = true;
          console.log('skipping the rest of this doc because ' + notImplemented.join(' & ') + ' are not implemented');
        }
      }
      return done();
    }
  },

  /**
   * Do a request, as outlined in the args
   *
   * @param  {[type]}   args [description]
   * @param  {Function} done [description]
   * @return {[type]}        [description]
   */
  do_do: function (args, done) {
    var catcher;

    if (process.env.LOG_DO) {
      var __done = done;
      done = function (err, resp) {
        console.log('doing', clientActionName, 'with', params);
        console.log('got', resp);
        __done(err, resp);
      };
    }

    // resolve the catch arg to a value used for matching once the request is complete
    switch (args.catch) {
    case void 0:
      catcher = null;
      break;
    case 'missing':
      catcher = 404;
      break;
    case 'conflict':
      catcher = 409;
      break;
    case 'forbidden':
      catcher = 403;
      break;
    case 'request':
      catcher = /.*/;
      break;
    case 'param':
      catcher = TypeError;
      break;
    default:
      catcher = args.catch.match(/^\/(.*)\/$/);
      if (catcher) {
        catcher = new RegExp(catcher[1]);
      }
    }

    delete args.catch;

    var client = clientManager.get();
    var action = _.keys(args).pop();
    var clientActionName = _.map(action.split('.'), _.camelCase).join('.');
    var clientAction = this.get(clientActionName, client);
    var params = _.transform(args[action], function (params, val, name) {
      var camelName = _.camelCase(name);

      // search through the params and url peices to find this param name
      var paramName = name;
      var spec = clientAction && clientAction.spec;
      var knownParam = spec && spec.params && spec.params[camelName];
      var knownUrlParam = spec && !knownParam && !!_.find(spec.url ? [spec.url] : spec.urls, function (url) {
        if ((url.opt && url.opt[camelName]) || (url.req && url.req[camelName])) {
          return true;
        }
      });

      // if we do know this param name, use the camelCase verison
      if (knownParam || knownUrlParam) {
        paramName = camelName;
      }

      // for ercursively traversing the params to replace '$stashed' vars
      var transformObject = function (vals, val, i) {
        switch (typeof val) {
        case 'string':
          val = (val[0] === '$') ? this.get(val) : val;
          break;
        case 'object':
          val = _.transform(val, transformObject);
        }
        vals[i] = val;
      }.bind(this);

      // start with the initial param, only traverse traversables
      switch (typeof val) {
      case 'string':
        val = (val[0] === '$') ? this.get(val) : val;
        break;
      case 'object':
        val = _.transform(val, transformObject);
        break;
      }

      params[paramName] = val;
    }, {}, this);


    expect(clientAction || clientActionName).to.be.a('function');

    if (_.isNumeric(catcher)) {
      params.ignore = _.union(params.ignore || [], [catcher]);
      catcher = null;
    }

    var timeoutId;
    var cb =  _.bind(function (error, body, status) {
      this._last_requests_response = body;
      clearTimeout(timeoutId);

      if (error) {
        if (catcher) {
          if (catcher instanceof RegExp) {
            // error message should match the regexp
            expect(error.message).to.match(catcher);
            error = null;
          } else if (typeof catcher === 'function') {
            // error should be an instance of
            expect(error).to.be.a(catcher);
            error = null;
          } else {
            return done(new Error('Invalid catcher ' + catcher));
          }
        } else {
          return done(error);
        }
      }

      done(error);
    }, this);

    var req = clientAction.call(client, params, cb);
    timeoutId = setTimeout(function () {
      // request timed out, so we will skip the rest of the tests and continue
      req.abort();
      this.skipping = true;
      this._last_requests_response = {};
      done();
    }.bind(this), 20000);
  },

  /**
   * Set a value from the respose into the stash
   *
   * Example
   * ====
   * { _id: id }  # stash the value of `response._id` as `id`
   *
   * @param  {Object} args - The object set to the "set" key in the test
   * @return {undefined}
   */
  do_set: function (args) {
    _.forOwn(args, function (name, path) {
      this._stash[name] = this.get(path);
    }, this);
  },

  /**
   * Test that the specified path exists in the response and has a
   * true value (eg. not 0, false, undefined, null or the empty string)
   *
   * @param  {string} path - Path to the response value to test
   * @return {undefined}
   */
  do_is_true: function (path) {
    var val = this.get(path);
    try {
      expect(Boolean(val)).to.be(true, 'path: ' + path);
    } catch (e) {
      throw new Error('expected path "' + path + '" to be true but got ' + val);
    }
  },

  /**
   * Test that the specified path exists in the response and has a
   * false value (eg. 0, false, undefined, null or the empty string)
   *
   * @param  {string} path - Path to the response value to test
   * @return {undefined}
   */
  do_is_false: function (path) {
    var val = this.get(path);
    try {
      expect(Boolean(val)).to.be(false, 'path: ' + path);
    } catch (e) {
      throw new Error('expected path "' + path + '" to be false but got ' + val);
    }
  },

  /**
   * Test that the response field (arg key) matches the value specified.
   *
   * @param  {Object} args - Args can be specified in a number of formats:
   *
   *   object{ <path>: <string|number|obj> }
   *     - used to match simple values against properties of the last response body
   *     - keys are "paths" to values in the previous response
   *     - values are what they should match
   *     example:
   *       resp:
   *       {
   *         hits: {
   *           total: 100,
   *           hits: [ ... ]
   *         }
   *       }
   *       args:
   *       {
   *         "hits.total": 100,
   *       }
   *
   *
   *   object{ <path>: <RegExp> }
   *     - regexp is expressed as a string that starts and ends with a /
   *     - we have to make several replacements on the string before converting
   *     it into a regexp because javascript doesn't support the "verbose" mode
   *     they are written for.
   *
   * @return {undefined}
   */
  do_match: function (args) {
    var self = this;

    // recursively replace all $var within args
    _.forOwn(args, function recurse(val, key, lvl) {
      if (_.isObject(val)) {
        return _.each(val, recurse);
      }

      if (_.isString(val)) {
        lvl[key] = val.replace(/\$[a-zA-Z0-9_]+/g, function (name) {
          return self.get(name);
        });
      }
    });

    _.forOwn(args, function (match, path) {
      var origMatch = match;

      var maybeRE = false;
      var usedRE = false;

      if (_.isString(match)) {
        // convert the matcher into a compatible string for building a regexp
        maybeRE = match
          // replace comments, but allow the # to be escaped like \#
          .replace(reComments_RE, function (match, prevChar) {
            if (prevChar === '\\') {
              return match;
            } else {
              return prevChar + '\n';
            }
          })
          // remove all whitespace from the expression, all meaningful
          // whitespace is represented with \s
          .replace(reWhitespace_RE, '');

        var startsWithSlash = maybeRE[0] === '/';
        var endsWithSlash = maybeRE[maybeRE.length - 1] === '/';

        if (startsWithSlash && endsWithSlash) {
          usedRE = true;
          match = new RegExp(maybeRE.substr(1, maybeRE.length - 2));
        }
      }

      var val = this.get(path);
      var test = 'eql';

      if (match instanceof RegExp) {
        test = 'match';

        // convert falsy values to an empty string so that regexp doesn't
        // cast them to the strings "false", "undefined", etc.
        val = val || '';
      }

      try {
        expect(val).to[test](match);
      } catch (e) {
        var msg = [
          '\nUnable to match',
          inspect(match),
          'with the path',
          inspect(path),
          'and value',
          inspect(val)
        ];

        if (usedRE) {
          msg.push(
            'and original matcher',
            '|' + origMatch
          );
        }

        msg.push(
          'original error',
          e.message
        );

        throw new Error(msg.join('\n'));
      }
    }, this);
  },

  /**
   * Test that the response field (arg key) is less than the value specified
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_lt: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path)).to.be.below(num, 'path: ' + path);
    }, this);
  },

  /**
   * Test that the response field (arg key) is less than the value specified
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_lte: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path) <= num).to.be.ok('path: ' + path);
    }, this);
  },

  /**
   * Test that the response field (arg key) is greater than the value specified
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_gt: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path)).to.be.above(num, 'path: ' + path);
    }, this);
  },

  /**
   * Test that the response field (arg key) is greater than the value specified
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_gte: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path) >= num).to.be.ok('path: ' + path);
    }, this);
  },

  /**
   * Test that the response field (arg key) has a length equal to that specified.
   * For object values, checks the length of the keys.
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_length: function (args) {
    _.forOwn(args, function (len, path) {
      expect(_.size(this.get(path))).to.eql(len, 'path: ' + path);
    }, this);
  }
};
