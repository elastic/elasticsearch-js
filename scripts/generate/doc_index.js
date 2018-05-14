module.exports = function (done) {
  var _ = require('lodash');
  var gruntUtils = require('../../grunt/utils');

  var chalk = require('chalk');
  var fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  var write = require('fs').writeFile;

  var outputPath = fromRoot('docs/index.asciidoc');

  write(outputPath, require('./templates').docsIndex({
    apiFiles: gruntUtils.stableBranches.map(function (branch) {
      return 'api_methods' + gruntUtils.branchSuffix(branch) + '.asciidoc';
    })
  }), 'utf8', done);

  console.log(chalk.white.bold('wrote'), 'doc index to', outputPath);
};
