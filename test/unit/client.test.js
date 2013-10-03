/* node transport function tests */
'use strict';

var Client = require('../../src/lib/client')
  , _ = require('../../src/lib/toolbelt')
  , api = _.requireDir(module, '../../src/api')
  , c;

exports['Client instances creation'] = {

  'setUp': function (done) {
    c = new Client();
    done();
  },

  'api is inherited': function(test) {
    test.equals(c.bulk, api.bulk);
    test.equals(c.cluster.node_stats, api.cluster.node_stats);
    test.done();
  }

};
