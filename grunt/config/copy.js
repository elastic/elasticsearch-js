module.exports = {
  dist_to_named_dir: {
    cwd: '<%= distDir %>',
    src: '*.js',
    dest: '<%= distDir %>/elasticsearch-js/',
    expand: true
  },
  dist_to_bower: {
    cwd: '<%= distDir %>',
    src: '*.js',
    dest: '<%= bowerSubmodule %>',
    expand: true
  }
};