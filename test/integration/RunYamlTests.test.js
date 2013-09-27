
var fs = require('fs')
  , path = require('path')
  , async = require('async')
  , assert = require('assert')
  , jsYaml = require('js-yaml')
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
  hosts: ['localhost:9200'],
  log: {
    level: 'trace'
  }
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
    nodeunitTests[groupName],
    path.basename(relativeName)
  );

  jsYaml.loadAll(fileContents, itterator, { filename: location });
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
function makeTest(tests, fileName, testConfigs) {
  _.forOwn(testConfigs, function (config, description) {
    /**
     * convert the config from: [ {name:args}, ... ] to: [ {name:"", args:"" } ]
     * so it's easier to work with, taking into consideration the possibility
     * that each "set" _could_ have more than one action
     */

    // creates [ [ {name:"", args:"" }, ... ], ... ]
    var actionSets = _.map(config, function (set) {
      return _.map(_.pairs(set), function (pair) {
        return {
          name: pair[0],
          args: pair[1]
        };
      });
    });

    var actionList = _.reduce(actionSets, function(note, set) {
      return note.concat(set);
    }, []);


    if (actionList.length) {
      tests[fileName + '::' + description] = function (test) {
        var outcome = new YamlTest(actionList, test);
      };
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
 * Accepts a list of actions and searched for skips if it finds one it will:
 *   - query elasticsearch to learn it's version
 *
 *   - parse out the the version and remove
 * @param  {Array}   actions - An array of action objects.
 * @param  {Function} done   - callback for when complete
 */
function filterSkips(actions, done) {
  var rangeString, range;
  for (var i = 0; i < actions.length; i++) {
    if (actions[i].name === 'skip') {
      rangeString = actions[i].args.version;
      return ES_VERSION == null ? getEsVersion() : haveEsVersion();
    }
  }
  done(); //only called if skip is never found

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

  function getEsVersion() {
    client.info().then(function (resp) {
      assert(ES_VERSION = versionRegExp.exec(resp.version.number));
      ES_VERSION = versionToComparableString(ES_VERSION[1]);
      haveEsVersion();
    });
  }

  function haveEsVersion() {
    range = versionRegExp.exec(rangeString);

    if (!range) {
      throw new Error('Unable to parse version string '+rangeString);
    }

    range = _.map(_.last(range, 2), versionToComparableString);
    if (ES_VERSION >= range[0] && ES_VERSION <= range[1]) {
      // remove this and the rest of the skips
      actions.splice(i);
      done();
    } else {
      // just remove this skip
      actions.splice(i, 1);
      // check again incase there are other skips in the list
      filterSkips(actions, done);
    }
  }

}

function YamlTest(actions, test) {
  this.actions = actions;
  this.test = test;
  this._stash = {};
  this._last_request = null;

  filterSkips(actions, _.bindKey(this, 'run'));

}

YamlTest.prototype = {

  run: function () {
    async.eachSeries(
      this.actions,
      _.bind(function (action, done) {
        var method = this['do_' + action.name];
        this.test.ok(method, 'method exists');
        if (method.length > 1) {
          // it's async
          method.call(this, action.args, done);
        } else {
          // its a sync test
          method.call(this, action.args);
          done();
        }
      }, this),
      _.bindKey(this.test, 'done')
    );
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
  get: function (path) {
    var steps = path.split('.')
      , from = path[0] === '$' ? this._stash : this._last_request
      , i;

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
      , callee = client
      , parent;

    if (params.index) {
      params.index = params.index.replace(/^test_/, indexPrefix);
    }

    action.split('.').forEach(function (step) {
      step = _.camelCase(step);
      if(callee[step]) {
        // reference to the previous parent, used to set context
        parent = callee;
        // find the function that this action refers to
        callee = callee[step];
      } else {
        console.log('tried to find', step, 'on', callee);
        console.log('parent is', parent);
        throw new Error('unable to find step');
      }
    }, this);

    if (typeof callee === 'function') {
      callee.call(parent, params)
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
    this.test.ok(this.get(path));
  },

  /**
   * Test that the specified path exists in the response and has a
   * false value (eg. 0, false, undefined, null or the empty string)
   * @param  {string} path - Path to the response value to test
   * @return {undefined}
   */
  do_is_false: function (path) {
    this.test.ok(!this.get(path));
  },

  /**
   * Test that the response field (arg key) matches the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_match: function (args) {
    _.forOwn(args, function (val, path) {
      this.test.deepEqual(this.get(path), val);
    }, this);
  },

  /**
   * Test that the response field (arg key) is less than the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_lt: function (args) {
    _.forOwn(args, function (num, path) {
      this.test.ok(this.get(path) < num);
    }, this);
  },

  /**
   * Test that the response field (arg key) is greater than the value specified
   * @param  {Object} args - Hash of fields->values that need to be checked
   * @return {undefined}
   */
  do_gt: function (args) {
    _.forOwn(args, function (num, path) {
      this.test.ok(this.get(path) > num);
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
      this.test.equal(_.size(this.get(path)), len);
    }, this);
  }
};

loadDir(TEST_DIR);
module.exports['YAML Tests'] = nodeunitTests;