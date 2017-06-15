module.exports = function (done) {
  const _ = require('../../src/lib/utils');
  const utils = require('../../grunt/utils');

  const chalk = require('chalk');
  const fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  const write = require('fs').writeFile;

  const outputPath = fromRoot('docs/index.asciidoc');

  write(outputPath, require('./templates').docsIndex({
    apiFiles: utils.stableBranches.map(function (branch) {
      return 'api_methods' + utils.branchSuffix(branch) + '.asciidoc';
    })
  }), 'utf8', done);

  console.log(chalk.white.bold('wrote'), 'doc index to', outputPath);
};
