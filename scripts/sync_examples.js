var async = require('async');
var fs = require('fs');
var S = require('string');

var restSpecDir = './src/rest-api-spec/api/';

function fileExists(path, done) {
  fs.stat(path, function (err, stats) {
    var exists;

    if (err) {
      if (err.message.match(/enoent/i)) {
        err = void 0;
        exists = false;
      }
    } else if (stats.isFile()) {
      exists = true;
    } else {
      err = new Error('weird stats: ' + JSON.stringify(stats));
    }

    done(err, exists);
  });
}

fs.readdir(restSpecDir, function (err, files) {
  if (err) {
    throw err;
  }

  async.forEachSeries(files, function (fileName, done) {
    var apiName = S(fileName.replace(/\.json$/, '')).camelize().s;
    var filePath = './docs/_descriptions/' + apiName;
    var jadeFileExists;
    var asciiFileExists;

    async.series([
      function (done) {
        fileExists(filePath + '.jade', function (err, exists) {
          jadeFileExists = exists;
          done(err);
        });
      },
      function (done) {
        fileExists(filePath + '.asciidoc', function (err, exists) {
          asciiFileExists = exists;
          done(err);
        });
      },
      function (done) {
        if (jadeFileExists && !asciiFileExists) {
          console.log(apiName, 'jade, no ascii');
          fs.rename(filePath + '.jade', filePath + '.asciidoc', done);
        }
        else if (!jadeFileExists && !asciiFileExists) {
          console.log(apiName, 'no jade, no ascii');
          fs.writeFile(filePath + '.asciidoc', '', done);
        }
        else if (jadeFileExists) {
          console.log(apiName, 'jade');
          fs.unlink(filePath + '.jade', done);
        }
      }
    ], done);
  }, function done(err) {
    if (err) {
      throw err;
    } else {
      console.log('done');
    }
  });
});