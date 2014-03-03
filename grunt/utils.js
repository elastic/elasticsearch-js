var _ = require('../src/lib/utils');

var root = require('find-root')(__dirname);
var pkg = require(root + '/package.json');
var branches = pkg.config.supported_es_branches;
branches._default = pkg.config.default_api_branch;

module.exports = {
  branchSuffix: function (branch) {
    return branch === branches._default ? '' : '_' + _.snakeCase(branch);
  },
  branches: branches
};