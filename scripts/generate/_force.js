var force = process.env.FORCE || process.env.FORCE_GEN;

if (!force) {
  var argv = require('optimist')
    .options({
      force: {
        alias: 'f',
        default: false,
        boolean: true
      }
    });

  if (process.env.npm_config_argv) {
    // when called by NPM
    argv = argv.parse(JSON.parse(process.env.npm_config_argv).original);
  } else {
    // when called directly
    argv = argv.argv;
  }

  force = argv.force;
}

module.exports = force;