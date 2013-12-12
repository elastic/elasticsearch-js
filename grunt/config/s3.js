var config = {};
try {
  config = require('../../.aws-config.json');
} catch (e) {}


module.exports = {
  options: {
    key: config.key,
    secret: config.secret,
    bucket: 'download.elasticsearch.org',
    access: 'public-read',
    headers: {
      'Content-Type': 'text/plain',
      'X-Content-Type-Options': 'nosniff',
      'Content-Disposition': 'attachment'
    }
  },

  latest: {
    upload: [
      {
        src: '<%= distDir %>/archives/*',
        dest: 'elasticsearch/elasticsearch-js/latest'
      }
    ]
  },

  release: {
    upload: [
      {
        src: '<%= distDir %>/archives/*',
        dest: 'elasticsearch/elasticsearch-js/<%= package.version %>'
      }
    ]
  }

};