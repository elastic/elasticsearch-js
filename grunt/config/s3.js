var config = {};
try {
  config = require('../../.aws-config.json');
} catch (e) {}

module.exports = {
  upload_archives: {
    upload: [
      {
        src: '<%= distDir %>/archives/*',
        dest: 'elasticsearch/elasticsearch-js/'
      }
    ],
    options: {
      key: config.key || process.env.AWS_KEY,
      secret: config.secret || process.env.AWS_SECRET,
      bucket: 'download.elasticsearch.org',
      access: 'public-read',
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'attachment'
      }
    }
  }
};