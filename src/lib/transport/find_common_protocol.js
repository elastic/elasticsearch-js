var isEmpty = require('lodash').isEmpty;

module.exports = function (hosts) {
  if (isEmpty(hosts)) return false;

  var commonProtocol = hosts.shift().protocol;
  for (var i = 0; i < hosts.length; i += 1) {
    if (commonProtocol !== hosts[i].protocol) {
      return false;
    }
  }

  return commonProtocol;
}
