const Fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');

const chalk = require('chalk');
const AWS = require('aws-sdk');

module.exports = function(grunt) {
  grunt.registerTask('browser_clients:build', function() {
    // prevent this from running more than once accidentally
    grunt.task.renameTask('browser_clients:build', 'browser_clients:rebuild');
    grunt.task.registerTask('browser_clients:build', []);

    grunt.task.run([
      'clean:dist',
      'webpack:browser_clients',
      'uglify:dist',
      'concat:dist_banners',
      'copy:dist_to_named_dir',
      'compress:release_zip',
      'compress:release_tarball',
    ]);
  });

  grunt.registerTask('browser_clients:distribute', [
    'browser_clients:build',
    '_upload_archive:master',
  ]);

  grunt.registerTask('browser_clients:release', [
    'prompt_confirm_release',
    'browser_clients:build',
    '_upload_archive:release',
    'run:clone_bower_repo',
    'run:checkout_bower_repo_master',
    'copy:dist_to_bower',
    'run:release_bower_tag',
  ]);

  grunt.registerTask('browser_clients:push_prerelease', [
    'browser_clients:build',
    'run:clone_bower_repo',
    'run:checkout_bower_repo_prerelease',
    'copy:dist_to_bower',
    'run:push_prerelease_branch',
  ]);

  grunt.registerTask('_upload_archive', function(type) {
    this.requires(['browser_clients:build']);

    grunt.task.run([
      'copy:dist_to_named_dir',
      'compress:' + type + '_zip',
      'compress:' + type + '_tarball',
      'upload_to_s3',
    ]);
  });

  grunt.registerTask('prompt_confirm_release', function() {
    const done = this.async();
    const version = grunt.config.get('package.version');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `Are you sure you want to ${chalk.bold(
        'overwrite/release'
      )} version ${chalk.bold(version)} of elasticsearch-js [Yn]: `,
      resp => {
        const answer = resp.trim().toLowerCase();
        const confirm = answer === '' || answer === 'y' || answer === 'yes';

        if (!confirm) {
          grunt.fatal(new Error('Aborting release'));
        }

        rl.close();
        done();
      }
    );
  });

  grunt.registerTask('upload_to_s3', function() {
    const done = this.async();

    Promise.resolve()
      .then(async () => {
        const s3 = new AWS.S3({
          accessKeyId: process.env.AWS_KEY,
          secretAccessKey: process.env.AWS_SECRET,
        });

        const archivesDir = resolve(grunt.config.get('distDir'), 'archives');
        const bucket = 'download.elasticsearch.org';

        for (const name of Fs.readdirSync(archivesDir)) {
          grunt.log.writeln(`Uploading ${name} to ${bucket}`);
          await s3
            .putObject({
              ACL: 'public-read',
              Body: Fs.createReadStream(resolve(archivesDir, name)),
              Bucket: bucket,
              Key: `elasticsearch/elasticsearch-js/${name}`,
              ContentDisposition: 'attachment',
            })
            .promise();
          grunt.log.ok(`${name} complete`);
        }

        done();
      })
      .catch(error => {
        grunt.fatal(error);
      });
  });
};
