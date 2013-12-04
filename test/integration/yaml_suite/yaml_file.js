/**
 * Class representing a YAML file
 * @type {[type]}
 */
module.exports = YamlFile;

var YamlDoc = require('./yaml_doc');
var clientManager = require('./client_manager');
var _ = require('../../../src/lib/utils');
var async = require('async');

function YamlFile(filename, docs) {
  var file = this;

  // file level skipping flag
  file.skipping = false;

  describe(filename, function () {
    file.docs = _.map(docs, function (doc) {
      doc =  new YamlDoc(doc, file);
      if (doc.description === 'setup') {
        beforeEach(/* doc */function (done) {
          async.series(_.pluck(doc._actions, 'testable'), done);
        });
      } else {
        it(doc.description, function (done) {
          async.series(_.pluck(doc._actions, 'testable'), done);
        });
      }
    });

    afterEach(/* doc */function (done) {
      clientManager.get().indices.delete({
        index: '*',
        ignore: 404
      }, done);
    });
  });

}
