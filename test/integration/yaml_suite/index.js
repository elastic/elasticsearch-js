var path = require('path');
var async = require('async');
var jsYaml = require('js-yaml');
var YamlFile = require('./yaml_file');
var _ = require('../../../src/lib/utils');
var es = require('../../../src/elasticsearch');
var clientManager = require('./client_manager');
var argv = require('./argv');
var testDir = path.resolve(__dirname, './tests');

describe('integration', function () {
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
    return new YamlFile(filename, docs);
  });

});