module.exports = {
  'cluster.nodeHotThreads': [
    '/_cluster/nodes/hotthreads',
    '/_cluster/nodes/hot_threads',
    '/_nodes/hot_threads',
    '/_cluster/nodes/{node_id}/hotthreads',
    '/_cluster/nodes/{node_id}/hot_threads',
    '/_nodes/{node_id}/hot_threads'
  ],
  'cluster.nodeInfo': [
    '/_cluster/nodes',
    '/_nodes/settings',
    '/_nodes/os',
    '/_nodes/process',
    '/_nodes/jvm',
    '/_nodes/thread_pool',
    '/_nodes/network',
    '/_nodes/transport',
    '/_nodes/http',
    '/_nodes/plugin',
    '/_cluster/nodes/{node_id}',
    '/_nodes/{node_id}/settings',
    '/_nodes/{node_id}/os',
    '/_nodes/{node_id}/process',
    '/_nodes/{node_id}/jvm',
    '/_nodes/{node_id}/thread_pool',
    '/_nodes/{node_id}/network',
    '/_nodes/{node_id}/transport',
    '/_nodes/{node_id}/http',
    '/_nodes/{node_id}/plugin'
  ],
  'cluster.nodeShutdown': [
    '/_cluster/nodes/_shutdown'
  ],
  'cluster.nodeStats': [
    '/_cluster/nodes/stats',
    '/_nodes/stats/{metric_family}',
    '/_nodes/stats/indices/{metric}/{fields}',
    '/_cluster/nodes/{node_id}/stats',
    '/_nodes/{node_id}/stats/{metric_family}',
    '/_nodes/{node_id}/stats/indices/{metric}/{fields}'
  ],
  'get': [
    '/{index}/{type}/{id}/_source'
  ],
  'indices.deleteMapping': [
    '/{index}/{type}/_mapping'
  ],
  'indices.stats': [
    '_stats/{metric_family}',
    '/_stats/indexing',
    '/_stats/indexing/{indexing_types}',
    '/_stats/search/{search_groups}',
    '/_stats/fielddata/{fields}',
    '/{index}/_stats/{metric_family}',
    '/{index}/_stats/indexing',
    '/{index}/_stats/search/{search_groups}',
    '/{index}/_stats/fielddata/{fields}'
  ]
};