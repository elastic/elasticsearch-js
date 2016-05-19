module.exports = function (done) {
  // var _ = require('../../src/lib/utils');
  var utils = require('../../grunt/utils');

  var chalk = require('chalk');
  var fromRoot = _v4.partial(require('path').join, require('find-root')(__dirname));
  var write = require('fs').writeFile;

  var outputPath = fromRoot('docs/index.asciidoc');

  write(outputPath, require('./templates').docsIndex({
    apiFiles: utils.stableBranches.map(function (branch) {
      return 'api_methods' + utils.branchSuffix(branch) + '.asciidoc';
    })
  }), 'utf8', done);

  console.log(chalk.white.bold('wrote'), 'doc index to', outputPath);
};
