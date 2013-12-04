var _ = require('./utils');
var extractHostPartsRE = /\[\/*([^:]+):(\d+)\]/;

function makeNodeParser(hostProp) {
  return function (nodes) {
    var hosts = [];
    _.each(nodes, function (node, id) {
      var hostnameMatches = extractHostPartsRE.exec(node[hostProp]);
      hosts.push({
        host: hostnameMatches[1],
        port: parseInt(hostnameMatches[2], 10),
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
}

module.exports = makeNodeParser('http_address');
module.exports.thrift = makeNodeParser('transport_address');
