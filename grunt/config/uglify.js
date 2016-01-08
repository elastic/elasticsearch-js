module.exports = {
  dist: {
    files: {
      '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.js',
      '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.js',
      '<%= distDir %>/elasticsearch.jquery.min.js': '<%= distDir %>/elasticsearch.jquery.js'
    },
    options: {
      compress: {
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        negate_iife: true,

        pure_getters: false,
        drop_console: false,
        keep_fargs: false,
        keep_fnames: false
      },
      preserveComments: false,
      screwIE8: true,
      mangleProperties: true,
      reserveDOMProperties: true
    }
  }
};
