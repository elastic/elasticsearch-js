/* global describe, before, beforeEach, setup */
/* jshint -W030:true */
var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , assert = require('assert')
  , jsYaml = require('js-yaml')
  , expect = require('chai').expect
  , indexPrefix = 'yaml_tests_'
  , nodeunit = require('nodeunit')
  , _ = require('../../src/lib/utils')
  , es = require('../../src/elasticsearch');

/**
 * Where do our tests live?
 * @type {[type]}
 */
var TEST_DIR = path.resolve(__dirname, '../../es_api_spec/test/');

/**
 * This will be the object passed to nodeunit, which will run the tests.
 * @type {Object}
 */
var nodeunitTests = {
  setUp: function (done) {
    // RESET the test cluster (deleting indices etc)
    // the response var and the stash should be cleared.
    done();
  }
};


var client = new es.Client({
  hosts: ['localhost:9200']
});

/**
 * recursively crawl the directory, looking for yaml files which will be passed to loadFile
 * @param  {String} dir - The directory to crawl
 * @return {undefined}
 */
function loadDir(dir) {
  fs.readdirSync(dir).forEach(function (fileName) {
    var location = path.join(dir, fileName)
      , stat = fs.statSync(location);

    if (stat.isFile() && fileName.match(/\.yaml$/)) {
      loadFile(location);
    }
    else if (stat.isDirectory()) {
      loadDir(location);
    }
  });
}

/**
 * The version that ES is running, in comparable string form XXX-XXX-XXX, fetched when needed
 * @type {String}
 */
var ES_VERSION = null;

/**
 * Regular Expression to extract version numbers from a version string
 * @type {RegExp}
 */
var versionExp = '([\\d\\.]+)(?:\\.\\w+)?';
var versionRegExp = new RegExp(versionExp);
var versionRangeRegExp = new RegExp(versionExp + '\\s*\\-\\s*' + versionExp);

/**
 * Call out to ES and ask for it's version number before any tests run
 * @param  {Function} done - callback
 */
before(function getESVersion(done) {
  setTimeout(function () {
    var resp = {
      version: {
        number: '0.80.3'
      }
    };
    expect(resp.version.number).to.match(versionRegExp);
    ES_VERSION = versionToComparableString(versionRegExp.exec(resp.version.number)[1]);
    done();
  }, 100);
});

/**
 * Transform x.x.x into xxx.xxx.xxx, striping off any text at the end like beta or pre-alpha35
 * @param  {String} version - Version number represented as a string
 * @return {String} - Version number represented as three numbers, seperated by -, all numbers are
 *   padded with 0 and will be three characters long so the strings can be compared.
 */
function versionToComparableString(version) {
  var parts = _.map(version.split('.'), function (part) {
    part = '' + _.parseInt(part);
    return (new Array(4 - part.length)).join('0') + part;
  });

  while(parts.length < 3) {
    parts.push('000');
  }

  return parts.join('-');
}

/**
 * Compare a version range to the ES_VERSION, determining if the current version
 * falls within the range.
 * @param  {String} rangeString - a string representing two version numbers seperated by a "-"
 * @return {Boolean} - is the current version within the range (inclusive)
 */
function rangeMatchesCurrent(rangeString) {
  expect(rangeString).to.match(versionRangeRegExp);

  var range = versionRangeRegExp.exec(rangeString);
  range = _.map(_.last(range, 2), versionToComparableString);

  return ES_VERSION >= range[0] && ES_VERSION <= range[1];
}

/**
 * read the file's contents, parse the yaml, pass to makeTest
 * @param  {String} path - Full path to yaml file
 * @return {undefined}
 */
function loadFile(location) {
  var fileContents = fs.readFileSync(location, { encoding:'utf8' });
  var relativeName = path.relative(TEST_DIR, location);
  var groupName = path.dirname(relativeName);

  nodeunitTests[groupName] = (nodeunitTests[groupName] || {});

  var itterator = _.bind(makeTest, null,
    path.basename(relativeName)
  );

  jsYaml.loadAll(fileContents, itterator, { filename: location });
}

/**
 * convert tests actions
 *   from: [ {name:args, name:args}, {name:args}, ... ]
 *   to:   [ {name:'', args:'' }, {name:'', args:''} ]
 * so it's easier to work with
 * @param {ArrayOfObjects} config - Actions to be taken as defined in the yaml specs
 */
function flattenTestActions(config) {
  // creates [ [ {name:"", args:"" }, ... ], ... ]
  // from [ {name:args, name:args}, {name:args} ]
  var actionSets = _.map(config, function (set) {
    return _.map(_.pairs(set), function (pair) {
      return { name: pair[0], args: pair[1] };
    });
  });

  // do a single level flatten, mergeing the nested arrays from step one
  // into a master array, creating an array of actions
  return _.reduce(actionSets, function(note, set) {
    return note.concat(set);
  }, []);
}


/**
 * Read the test descriptions from a yaml document (usually only one test, per doc but
 * sometimes multiple docs per file)
 * @param  {Object} tests       The object to place the tests, which is a part of the spec
 *                              delivered to nodeunit
 * @param  {String} fileName    The filename that this yaml document came from
 * @param  {Object} testConfigs The yaml document
 * @return {undefined}
 */
function makeTest(fileName, testConfigs) {
  describe(fileName, function () {
    _.forOwn(testConfigs, function (config, description) {
      describe(description, new YamlTest('do ' + fileName + '::' + description, flattenTestActions(config)));
    });
  });
}



function YamlTest(description, actions) {
  this.actions = actions;
  this._stash = {};
  this._last_request = null;

  return _.bind(function () {
    var me = this;
    describe('actions', function () {
      var skip = false;
      _.each(actions, function (action, i) {
        if (action.name === 'skip') {
          it('skip when version is ' + action.args.version, function () {
            if (rangeMatchesCurrent(action.args.version)) {
              skip = true;
            }
          });
        } else {
          var method = me['do_' + action.name];
          expect(method).to.be.a('function');
          if (method.length > 1) {
            // async do
            it(action.name, function (done) {
              if (skip) {
                done();
              } else {
                method.call(me, action.args, done);
              }
            });
          } else {
            // sync do
            it(action.name, function () {
              if (!skip) {
                method.call(me, action.args);
              }
            });
          }
        }
      });
    });
  }, this);
}

YamlTest.prototype = {

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
    var steps = path.split('.')
      , i;

    if (!from) {
      from = path[0] === '$' ? this._stash : this._last_request;
    }

    for (i = 0; from != null && i < steps.length; i++) {
      from = from[steps[i]];
    }

    return from;
  },


  /**
   * Do a request, as outline
   * @param  {[type]}   args [description]
   * @param  {Function} done [description]
   * @return {[type]}        [description]
   */
  do_do: function (args, done) {
    this._last_request = null;

    var action = Object.keys(args).pop()
      , params = args[action]
      , callee = this.get(_.map(action.split('.'), _.camelCase).join('.'), client);

    expect(callee).to.be.a('function');

    if (params.index) {
      params.index = params.index.replace(/^test_/, indexPrefix);
    }

    if (typeof callee === 'function') {
      callee.call(client, params)
        .then(function (resp) {
          done();
        })
        .fail(function (error) {
          throw new Error('The call failed');
        });
    } else {
      throw new Error('stepped in do_do, did not find a function');
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
   * @param  {string} path - Path to the response value to test
   * @return {undefined}
   */
  do_is_false: function (path) {
    expect(this.get(path)).to.not.be.ok;
  },

  /**
   * Test that the response field (arg key) matches the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_match: function (args) {
    _.forOwn(args, function (val, path) {
      expect(this.get(path)).to.deep.eq(val);
    }, this);
  },

  /**
   * Test that the response field (arg key) is less than the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_lt: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path)).to.be.lt(num);
    }, this);
  },

  /**
   * Test that the response field (arg key) is greater than the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_gt: function (args) {
    _.forOwn(args, function (num, path) {
      expect(this.get(path)).to.be.gt(num);
    }, this);
  },

  /**
   * Test that the response field (arg key) has a length equal to that specified.
   * For object values, checks the length of the keys.
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_length: function (args) {
    _.forOwn(args, function (len, path) {
      expect(_.size(this.get(path))).to.eq(len);
    }, this);
  }
};

loadDir(TEST_DIR);
module.exports['YAML Tests'] = nodeunitTests;