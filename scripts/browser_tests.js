var argv = require('optimist')
  .options({
    browser: {
      default: null,
      string: true
    },
    es_branch: {
      default: 'master',
      string: true
    }
  }).argv;

console.log(argv);