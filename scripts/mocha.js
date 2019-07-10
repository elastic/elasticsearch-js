process.argv.splice(
  2,
  0,
  ...[require.resolve('../test/unit/index.js'), '--reporter', 'nyan']
);

require('mocha/bin/mocha');
