var config = require('../../.aws-config.json');

module.exports = {
  options: {
    key: config.key,
    secret: config.secret,
    bucket: 'download.elasticsearch.org',
    access: 'public-read'
  },

  latest: {
    upload: [
      {
        src: '<%= distDir %>/*.js',
        dest: 'elasticsearch/elasticsearch-js/latest'
      }
    ]
  },

  release: {
    upload: [
      {
        src: '<%= distDir %>/*.js',
        dest: 'elasticsearch/elasticsearch-js/<%= package.version %>'
      }
    ]
  }

};