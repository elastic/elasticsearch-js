module.exports = function (done) {
  var _ = require('../../src/lib/utils');

  var chalk = require('chalk');
  var fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  var write = require('fs').writeFile;

  var outputPath = fromRoot('docs/configuration.asciidoc');
  write(outputPath, require('./templates').configurationDocs(), 'utf8', done);
  console.log(chalk.white.bold('wrote'), 'configuration docs to', outputPath);
};
