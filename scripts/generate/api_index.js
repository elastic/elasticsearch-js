module.exports = function (done) {
  const _ = require('../../src/lib/utils');
  const utils = require('../../grunt/utils');

  const chalk = require('chalk');
  const fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  const write = require('fs').writeFileSync;

  const nodeApiIndex = fromRoot('src/lib/apis/index.js');
  const browserApiIndex = fromRoot('src/lib/apis/browser_index.js');

  write(nodeApiIndex, require('./templates').apiIndex({
    branches: utils.branches
  }), 'utf8');

  console.log(chalk.white.bold('wrote'), 'api index to', nodeApiIndex);

  write(browserApiIndex, require('./templates').apiIndexBrowser({
    branches: utils.browserBranches
  }), 'utf8');

  console.log(chalk.white.bold('wrote'), 'browser api index to', browserApiIndex);

  done();
};
