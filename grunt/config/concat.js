module.exports = {
  dist_banners: {
    files: {
      '<%= distDir %>/elasticsearch.angular.js': '<%= distDir %>/elasticsearch.angular.js',
      '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.min.js',
      '<%= distDir %>/elasticsearch.jquery.js': '<%= distDir %>/elasticsearch.jquery.js',
      '<%= distDir %>/elasticsearch.jquery.min.js': '<%= distDir %>/elasticsearch.jquery.min.js',
      '<%= distDir %>/elasticsearch.js': '<%= distDir %>/elasticsearch.js',
      '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.min.js'
    },
    options: {
      banner: '<%= meta.banner %>\n' +
              ';(function () {\n' +
              '/* prevent lodash from detecting external amd loaders */var define; \n',
      footer: '\n}());'
    }
  }
};
