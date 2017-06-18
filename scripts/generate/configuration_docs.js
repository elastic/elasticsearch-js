module.exports = function (done) {
  const _ = require('../../src/lib/utils');

  const chalk = require('chalk');
  const fromRoot = _.partial(require('path').join, require('find-root')(__dirname));
  const write = require('fs').writeFile;

  const outputPath = fromRoot('docs/configuration.asciidoc');
  write(outputPath, require('./templates').configurationDocs(), 'utf8', done);
  console.log(chalk.white.bold('wrote'), 'configuration docs to', outputPath);
};
