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

module.exports = {
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
  install_es_master: {
    exec: './scripts/es.sh install master',
  },
  es_master: {
    exec: './.snapshots/master_nightly/bin/elasticsearch ' + esOpts,
    options: {
      wait: false,
      quiet: true
    }
  },
  'install_es_0.90': {
    exec: './scripts/es.sh install 0.90',
  },
  'es_0.90': {
    exec: './.snapshots/0.90_nightly/bin/elasticsearch -f ' + esOpts,
    options: {
      wait: false,
      quiet: true
    }
  },
  clone_bower_repo: {
    exec: [
      'test -d src/elasticsearch',
      'git clone git@github.com:elasticsearch/bower-elasticsearch-js.git src/bower_es_js'
    ].join(' || '),
    options: {
      quiet: true
    }
  },
  release_bower_subm_tag: {
    exec: 'node ./scripts/release/bower'
  }
};