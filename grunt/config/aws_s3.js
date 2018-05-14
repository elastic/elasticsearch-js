var config = {};
try {
  // eslint-disable-next-line
  config = require('../../.aws-config.json');
} catch (e) {}

module.exports = {
  upload_archives: {
    files: [
      {
        expand: true,
        cwd: '<%= distDir %>/archives',
        src: '*',
        dest: 'elasticsearch/elasticsearch-js/'
      },
    ],
    options: {
      accessKeyId: config.key || process.env.AWS_KEY,
      secretAccessKey: config.secret || process.env.AWS_SECRET,
      bucket: 'download.elasticsearch.org',
      access: 'public-read',
      params: {
        'ContentDisposition': 'attachment'
      }
    }
  }
};
