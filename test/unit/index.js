require('bluebird').longStackTraces();

var specDir = require('path').resolve(__dirname, 'specs');
require('fs').readdirSync(specDir).forEach(function (file) {
  require(specDir + '/' + file);
});
