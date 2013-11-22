/**
 * Class to wrap a single document from a yaml test file
 *
 * @constructor
 * @class YamlDoc
 * @param actions {Array} - The array of actions directly from the Yaml file
 */
module.exports = YamlDoc;

var _ = require('../../../src/lib/utils');
var clientManager = require('./client_manager');
var expect = require('expect.js');

/**
 * The version that ES is running, in comparable string form XXX-XXX-XXX, fetched when needed
 * @type {String}
 */
var ES_VERSION = null;

// core expression for finding a version
var versionExp = '([\\d\\.]*\\d)(?:\\.\\w+)?';

/**
 * Regular Expression to extract a version number from a string
 * @type {RegExp}
 */
var versionRE = new RegExp(versionExp);

/**
 * Regular Expression to extract a version range from a string
 * @type {RegExp}
 */
var versionRangeRE = new RegExp(versionExp + '\\s*\\-\\s*' + versionExp);


/**
 * Fetches the client.info, and parses out the version number to a comparable string
 * @param done {Function} - callback
 */
function getVersionFromES(done) {
  clientManager.get().info({}, function (err, resp) {
    if (err) {
      throw new Error('unable to get info about ES');
    }
    expect(resp.version.number).to.match(versionRE);
    ES_VERSION = versionToComparableString(versionRE.exec(resp.version.number)[1]);
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
function versionToComparableString(version) {
  var parts = _.map(version.split('.'), function (part) {
    part = '' + _.parseInt(part);
    return (new Array(4 - part.length)).join('0') + part;
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
  function doWork() {
    expect(rangeString).to.match(versionRangeRE);

    var range = versionRangeRE.exec(rangeString);
    range = _.map(_.last(range, 2), versionToComparableString);

    done(ES_VERSION >= range[0] && ES_VERSION <= range[1]);
  }

  if (!ES_VERSION) {
    getVersionFromES(doWork);
  } else {
    doWork();
  }
}

// empty all of the indices in ES please
function clearIndices(done) {
  clientManager.get().indices.delete({
    index: '*',
    ignore: 404
  }, done);
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
    expect(method).to.be.a('function');

    if (_.isPlainObject(action.args)) {
      action.name += ' ' + _.keys(action.args).join(', ');
    } else if (action.args) {
      action.name += ' ' + action.args;
    }

    // wrap in a check for skipping
    action.bound = _.bind(method, self, action.args);

    // create a function that can be passed to
    action.testable = function (done) {
      if (self.skipping || self.file.skipping) {
        return done();
      }
      if (method.length > 1) {
        action.bound(done);
      } else {
        action.bound();
        done();
      }
    };

    return action;
  });
}

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

    var log = process.env.LOG_GETS && !from ? console.log.bind(console) : function () {};
    var i;

    if (!from) {
      if (path[0] === '$') {
        from = this._stash;
        path = path.substring(1);
      } else {
        from = this._last_requests_response;
      }
    }

    log('getting', path, 'from', from);

    var steps = path ? path.split('.') : [];
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
    rangeMatchesCurrentVersion(args.version, _.bind(function (match) {
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
    var action = Object.keys(args).pop();
    var clientActionName = _.map(action.split('.'), _.camelCase).join('.');
    var clientAction = this.get(clientActionName, client);
    var params = _.transform(args[action], function (note, val, name) {
      note[_.camelCase(name)] = (typeof val === 'string' && val[0] === '$') ? this.get(val) : val;
    }, {}, this);

    expect(clientAction || clientActionName).to.be.a('function');

    if (typeof clientAction === 'function') {
      if (_.isNumeric(catcher)) {
        params.ignore = _.union(params.ignore || [], [catcher]);
        catcher = null;
      }

      var cb =  _.bind(function (error, body, status) {
        this._last_requests_response = body;

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

      clientAction.call(client, params, cb);
    } else {
      done(new Error('stepped in do_do, did not find a function'));
    }

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
    expect(this.get(path)).to.be.ok;
  },

  /**
   * Test that the specified path exists in the response and has a
   * false value (eg. 0, false, undefined, null or the empty string)
   *
   * @param  {string} path - Path to the response value to test
   * @return {undefined}
   */
  do_is_false: function (path) {
    expect(this.get(path)).to.not.be.ok;
  },

  /**
   * Test that the response field (arg key) matches the value specified
   *
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_match: function (args) {
    _.forOwn(args, function (val, path) {
      if (val[0] === '$') {
        val = this.get(val);
      }
      expect(this.get(path)).to.eql(val);
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
      expect(this.get(path)).to.be.below(num);
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
      expect(this.get(path)).to.be.above(num);
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
      expect(_.size(this.get(path))).to.be(len);
    }, this);
  }
};
