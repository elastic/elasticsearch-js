/* eslint-env mocha */
/* eslint-disable no-console */
/**
 * Class representing a YAML file
 * @type {[type]}
 */
module.exports = YamlFile;

const YamlDoc = require('./yaml_doc');
const clientManager = require('./client_manager');
const _ = require('../../../src/lib/utils');
const async = require('async');

function YamlFile(filename, docs) {
  const file = this;

  // file level skipping flag
  file.skipping = false;

  describe(filename, function () {
    file.docs = _.map(docs, function (doc) {
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
