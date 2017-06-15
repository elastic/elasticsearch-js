module.exports = function (grunt) {
  const Promise = require('bluebird');
  const utils = require('./utils');
  const readFile = Promise.promisify(require('fs').readFile);
  const writeFile = Promise.promisify(require('fs').writeFile);


  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', function (branch) {
    const tasks = [
      branch ? 'run:generate_' + branch : 'run:generate',
      'mochacov:unit'
    ];

    const branches = branch ? [branch] : utils.branches;

    process.env.ES_PORT = process.env.ES_PORT || 9400;
    process.env.ES_HOST = process.env.ES_HOST || 'localhost';
    branches.forEach(function (branch) {
      tasks.push(
        'esvm:' + branch,
        'mocha_integration:' + branch,
        'esvm_shutdown:' + branch
      );
    });

    grunt.task.run(tasks);
  });

  grunt.registerTask('unit_test', 'mochacov:unit');
  grunt.registerTask('coverage', [
    'mochacov:make_coverage_html',
    'open:coverage'
  ]);

  grunt.registerTask('version', function (nextVersion) {
    const root = require('path').join.bind(null, __dirname, '..');
    const readmePath = root('README.md');
    const packagePath = root('package.json');
    const browserBuildsPath = root('docs/browser_builds.asciidoc');

    Promise.all([
      require(packagePath),
      readFile(readmePath, 'utf8'),
      readFile(browserBuildsPath, 'utf8')
    ])
    .spread(function (pkg, readme, browserBuilds) {
      const current = pkg.version;

      pkg.version = nextVersion;
      browserBuilds = utils.replaceAll(browserBuilds, current, nextVersion);

      readme = utils.replaceAll(readme, current, nextVersion);

      readme = utils.replaceAll(
        readme,
        '/' + utils.minorVersion(current) + '.svg',
        '/' + utils.minorVersion(nextVersion) + '.svg'
      );

      readme = utils.replaceAll(
        readme,
        'branch=' + utils.minorVersion(current),
        'branch=' + utils.minorVersion(nextVersion)
      );

      // write all files to disk
      return Promise.all([
        writeFile(readmePath, readme),
        writeFile(browserBuildsPath, browserBuilds),
        writeFile(packagePath, JSON.stringify(pkg, null, '  '))
      ]);
    })
    .nodeify(this.async());
  });
};
