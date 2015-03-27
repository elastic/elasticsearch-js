module.exports = function (grunt) {
  var Promise = require('bluebird');
  var utils = require('./utils');
  var readFile = Promise.promisify(require('fs').readFile);
  var writeFile = Promise.promisify(require('fs').writeFile);


  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', function (branch) {
    var tasks = [
      'jshint',
      branch ? 'run:generate_' + branch : 'run:generate',
      'mochacov:unit'
    ];

    var branches = branch ? [branch] : utils.branches;

    process.env.ES_PORT = process.env.ES_PORT || 9400;
    branches.forEach(function (branch) {
      tasks.push(
        'esvm:' + branch,
        'mocha_integration:' + branch,
        'esvm_shutdown:' + branch
      );
    });

    grunt.task.run(tasks);
  });

  grunt.registerTask('unit_test', [
    'jshint',
    'run:generate',
    'mochacov:unit',
  ]);

  grunt.registerTask('coverage', [
    'mochacov:make_coverage_html',
    'open:coverage'
  ]);

  grunt.registerTask('version', function (type) {
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
      var next = utils.increaseVersion(current, type);

      pkg.version = next;
      browserBuilds = utils.replaceAll(browserBuilds, current, next);

      readme = utils.replaceAll(readme, current, next);

      readme = utils.replaceAll(
        readme,
        '/' + utils.minorVersion(current) + '.svg',
        '/' + utils.minorVersion(next) + '.svg'
      );

      readme = utils.replaceAll(
        readme,
        'branch=' + utils.minorVersion(current),
        'branch=' + utils.minorVersion(next)
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