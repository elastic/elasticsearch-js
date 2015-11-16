var _ = require('./utils');

var extractHostPartsRE1x = /\[\/*([^:]+):(\d+)\]/;
var extractHostPartsRE = /^([\.:0-9a-f]*):([0-9]+)?$/;

function makeNodeParser(hostProp) {
  return function (nodes) {
    return _.transform(nodes, function (hosts, node, id) {
      if (!node[hostProp]) {
        return;
      }

      var hostnameMatches = extractHostPartsRE.exec(node[hostProp]);
      if (!hostnameMatches) {
        hostnameMatches = extractHostPartsRE1x.exec(node[hostProp]);
      }

      if (!hostnameMatches) {
        throw new Error('expected node\'s ' + hostProp + ' property (' + JSON.stringify(node[hostProp]) +
          ') to match either ' + extractHostPartsRE + ' or ' + extractHostPartsRE1x + '.');
      }

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
    }, []);
  };
}

module.exports = makeNodeParser('http_address');
module.exports.thrift = makeNodeParser('transport_address');
