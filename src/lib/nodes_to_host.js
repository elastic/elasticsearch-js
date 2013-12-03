var _ = require('./utils');
var extractHostPartsRE = /\[([^:]+):(\d+)\]/;

module.exports = function (nodes) {
  var hosts = [];
  _.each(nodes, function (node, id) {
    var hostnameMatches = extractHostPartsRE.exec(node.http_address);
    hosts.push({
      host: hostnameMatches[1],
      port: hostnameMatches[2],
      _meta: {
        id: id,
        name: node.name,
        hostname: node.hostname,
        version: node.version
      }
    });
  });
  return hosts;
};
