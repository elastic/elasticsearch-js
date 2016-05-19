/* eslint-env mocha */
/* eslint-disable no-console */
/**
 * Class representing a YAML file
 * @type {[type]}
 */
module.exports = YamlFile;

var YamlDoc = require('./yaml_doc');
var clientManager = require('./client_manager');
// var _ = require('../../../src/lib/utils');
var async = require('async');

function YamlFile(filename, docs) {
  var file = this;

  // file level skipping flag
  file.skipping = false;

  describe(filename, function () {
    file.docs = _v4.map(docs, function (doc) {
      doc = new YamlDoc(doc, file);
      if (doc.description === 'setup') {
        beforeEach(/* doc */function (done) {
          async.series(doc.getActionsRunners(), done);
        });
      } else {
        it(doc.description, function (done) {
          async.series(doc.getActionsRunners(), done);
        });
      }
    });

    afterEach(/* doc */function () {
      clientManager.get().transport.log.debug(
        '===========================\n' +
        'Cleanup\n' +
        '==========================='
      );
      return clientManager.get().clearEs();
    });
  });

}
