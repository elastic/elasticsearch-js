require('fs').readdirSync(__dirname + '/tests').forEach(function (file) {
  require(__dirname + '/tests/' + file);
});