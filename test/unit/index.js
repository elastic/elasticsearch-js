require('bluebird').longStackTraces();
const { resolve } = require('path');

var specDir = resolve(__dirname, 'specs');
require('fs')
  .readdirSync(specDir)
  .forEach(function(file) {
    require(specDir + '/' + file);
  });
