var _ = require('lodash');

module.exports = function(hosts) {
  if (_.isEmpty(hosts)) return false;

  var commonProtocol = hosts.shift().protocol;
  for (var i = 0; i < hosts.length; i++) {
    if (commonProtocol !== hosts[i].protocol) {
      return false;
    }
  }

  return commonProtocol;
};
