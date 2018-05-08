module.exports = function (grunt) {
  var Promise = require('bluebird');
  var gruntUtils = require('./utils');
  var readFile = Promise.promisify(require('fs').readFile);
  var writeFile = Promise.promisify(require('fs').writeFile);


  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', function (branch) {
    var tasks = [
      branch ? 'run:generate_' + branch : 'run:generate',
      'mochacov:unit'
    ];

    var branches = branch ? [branch] : gruntUtils.branches;

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
    var root = require('path').join.bind(null, __dirname, '..');
    var readmePath = root('README.md');
    var packagePath = root('package.json');
    var browserBuildsPath = root('docs/browser_builds.asciidoc');

    Promise.all([
      require(packagePath),
      readFile(readmePath, 'utf8'),
      readFile(browserBuildsPath, 'utf8')
    ])
    .spread(function (pkg, readme, browserBuilds) {
      var current = pkg.version;

      pkg.version = nextVersion;
      browserBuilds = gruntUtils.replaceAll(browserBuilds, current, nextVersion);

      readme = gruntUtils.replaceAll(readme, current, nextVersion);

      readme = gruntUtils.replaceAll(
        readme,
        '/' + gruntUtils.minorVersion(current) + '.svg',
        '/' + gruntUtils.minorVersion(nextVersion) + '.svg'
      );

      readme = gruntUtils.replaceAll(
        readme,
        'branch=' + gruntUtils.minorVersion(current),
        'branch=' + gruntUtils.minorVersion(nextVersion)
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
