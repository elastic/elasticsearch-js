module.exports = {
  dist: {
    files: {
      '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.js',
      '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.js',
      '<%= distDir %>/elasticsearch.jquery.min.js': '<%= distDir %>/elasticsearch.jquery.js'
    }
  }
};