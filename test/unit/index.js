var specDir = __dirname + '/specs';

require('fs').readdirSync(specDir).forEach(function (file) {
  require(specDir + '/' + file);
});