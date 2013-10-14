var program = require('commander');

program
  .version('0.0.1')
  .option('-c, --clusterName [name]', 'Set the name of the "cluster" this node will start', 'yaml_test_runners')
  .option('-n, --nodeName [name]', 'Set the node\'s name', 'yaml_runner')
  .option('-p, --httpPort [port]', 'Set the port for this node', 9299)
  .option('-d, --dataPath [path]', 'Do not set this', '/tmp/yaml-test-data')
  .parse(process.argv);

module.exports = program;
