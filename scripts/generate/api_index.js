module.exports = function (done) {
  var _ = require('lodash');
  var gruntUtils = require('../../grunt/utils');

  var chalk = require('chalk');
  var fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  var write = require('fs').writeFileSync;

  var nodeApiIndex = fromRoot('src/lib/apis/index.js');
  var browserApiIndex = fromRoot('src/lib/apis/browser_index.js');

  write(nodeApiIndex, require('./templates').apiIndex({
    branches: gruntUtils.branches
  }), 'utf8');

  console.log(chalk.white.bold('wrote'), 'api index to', nodeApiIndex);

  write(browserApiIndex, require('./templates').apiIndexBrowser({
    branches: gruntUtils.browserBranches
  }), 'utf8');

  console.log(chalk.white.bold('wrote'), 'browser api index to', browserApiIndex);

  done();
};
