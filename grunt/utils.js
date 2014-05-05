var _ = require('../src/lib/utils');

var root = require('find-root')(__dirname);
var pkg = require(root + '/package.json');
var stable = pkg.config.supported_es_branches;
var unstable = pkg.config.unstable_es_branches;

var utils = {
  branchSuffix: function (branch) {
    return branch === utils.branches._default ? '' : '_' + _.snakeCase(branch);
  },
  branches: [].concat(stable, unstable),
  stableBranches: stable,
  unstableBranches: unstable
};

utils.branches._default = pkg.config.default_api_branch;

module.exports = utils;