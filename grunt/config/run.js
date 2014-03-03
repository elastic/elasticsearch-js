var esOpts = [
  '-D es.http.port=9400',
  '-D es.network.host=localhost',
  '-D es.cluster.name=elasticsearch_js_test_runners',
  '-D es.node.name=elasticsearch_js_test_runner',
  '-D es.gateway.type=none',
  '-D es.index.store.type=memory',
  '-D es.discovery.zen.ping.multicast.enabled=false',
  '-D es.discovery.zen.ping_timeout=1',
  '-D es.logger.level=ERROR'
].join(' ');

var utils = require('../utils');

var config = {
  generate: {
    exec: 'node ./scripts/generate/index.js',
    options: {
      passArgs: [
        'verbose'
      ]
    }
  },
  browser_test_server: {
    exec: 'node ./test/utils/server',
    options: {
      wait: false,
      quiet: true,
      ready: /listening/
    }
  },
  clone_bower_repo: {
    exec: [
      'test -d src/bower_es_js',
      'git clone git@github.com:elasticsearch/bower-elasticsearch-js.git <%= bowerSubmodule %>'
    ].join(' || '),
    options: {
      quiet: true
    }
  },
  release_bower_tag: {
    exec: 'node ./scripts/release/bower'
  }
};

utils.branches.forEach(function (branch) {

  config['install_es_' + branch] = {
    exec: './scripts/es.sh install ' + branch,
  };

  config['es_' + branch] = {
    exec:
      './.snapshots/' + branch + '_nightly/bin/elasticsearch ' +
      (branch === '0.90' ? '-f ' : '') +
      esOpts,
    options: {
      wait: false,
      quiet: true
    }
  };
});

module.exports = config;