// make it dry
function archive(out) {
  return {
    cwd: '<%= distDir %>',
    src: 'elasticsearch-js/*',
    expand: true,
    options: {
      archive: '<%= distDir %>/archives/' + out
    }
  };
}

module.exports = {
  master_zip:       archive('elasticsearch-js-master.zip'),
  master_tarball:   archive('elasticsearch-js-master.tar.gz'),
  release_zip:      archive('elasticsearch-js-<%= package.version %>.zip'),
  release_tarball:  archive('elasticsearch-js-<%= package.version %>.tar.gz')
};