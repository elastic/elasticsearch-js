const isEmpty = require('lodash.isempty');

module.exports = function (hosts) {
  if (isEmpty(hosts)) return false;

  const commonProtocol = hosts.shift().protocol;
  for (let i = 0; i < hosts.length; i++) {
    if (commonProtocol !== hosts[i].protocol) {
      return false;
    }
  }

  return commonProtocol;
};
