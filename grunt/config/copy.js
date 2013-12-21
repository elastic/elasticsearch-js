module.exports = {
  dist_to_named_dir: {
    cwd: '<%= distDir %>',
    src: '*.js',
    dest: '<%= distDir %>/elasticsearch-js/',
    expand: true
  }
};