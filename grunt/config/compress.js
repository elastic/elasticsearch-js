module.exports = {
  dist_zip: {
    src: '<%= distDir %>/*.js',
    options: {
      archive: '<%= distDir %>/archives/elasticsearch-js.zip'
    }
  },
  dist_tarball: {
    src: '<%= distDir %>/*.js',
    options: {
      archive: '<%= distDir %>/archives/elasticsearch-js.tar.gz'
    }
  }
};