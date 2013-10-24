
/**
 * Stupid simple recursive file/directory clearing. Nothing serious.
 *
 * @param  {String} path Location of the file/directory which should be wiped out
 * @return {Boolean}     frue on success
 */
module.exports = function (path) {
  try {
    var stats = fs.statSync(path);
    if (stats && stats.isDirectory()) {
      console.log('removing', path, 'directory recursively');
      rmDirRecursive(path);
    } else {
      console.log('removing', path);
      fs.unlinkSync(path);
    }
    return true;
  } catch (e) {
    return false;
  }
};


function rmDirRecursive(path) {
  fs.readdirSync(path).forEach(function (file, index) {
    var curPath = path + '/' + file;
    if (fs.statSync(curPath).isDirectory()) { // recurse
      rmDirRecursive(curPath);
    } else { // delete file
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
}
