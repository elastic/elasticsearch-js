var path = require('path');
var async = require('async');
var jsYaml = require('js-yaml');
var expect = require('expect.js');
var YamlFile = require('./yaml_file');
var _ = require('../../../src/lib/utils');
var es = require('../../../src/elasticsearch');
var clientManager = require('./client_manager');
var Minimatch = require('minimatch').Minimatch;
var argv = require('./argv');
var testDir = path.resolve(__dirname, './tests');
var doPattern = new Minimatch(argv.match);

describe('yaml -', function () {
  this.timeout(30000);

  // before running any tests...
  before(function (done) {
    // start our personal ES Server
    this.timeout(null);
    clientManager.create(done);
  });

  before(function (done) {
    // make sure ES is empty
    clientManager.get().indices.delete({
      index: '*',
      ignore: 404
    }, done);
  });

  var files = _.map(require('./yaml_tests.json'), function (docs, filename) {
    if (doPattern.match(filename)) {
      return new YamlFile(filename, docs);
    }
  });

});