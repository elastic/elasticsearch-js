var ca = require('./client_action');
var errors = require('./errors');

var api = module.exports = {};

api._namespaces = ['cluster', 'indices'];

/**
 * Perform a [bulk](http://elasticsearch.org/guide/reference/api/bulk/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Explicitely set the replication type
 * @param {String} params.type - Default document type for items which don't provide one
 * @param {String} params.index - Default index for items which don't provide one
 */
api.bulk = ca({
  methods: [
    'POST',
    'PUT'
  ],
  params: {
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    refresh: {
      type: 'boolean'
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    type: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_bulk',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_bulk',
      req: {
        index: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_bulk'
    }
  ],
  bulkBody: true
});


/**
 * Perform a [clear_scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.scroll_id - A comma-separated list of scroll IDs to clear
 */
api.clearScroll = ca({
  methods: [
    'DELETE'
  ],
  params: {},
  urls: [
    {
      fmt: '/_search/scroll/<%=scroll_id%>',
      req: {
        scroll_id: {
          type: 'list'
        }
      }
    }
  ]
});


api.cluster = function ClusterNS(client) {
  if (this instanceof ClusterNS) {
    this.client = client;
  } else {
    return new ClusterNS(client);
  }
};

/**
 * Perform a [cluster.get_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 */
api.cluster.prototype.getSettings = ca({
  methods: [
    'GET'
  ],
  params: {},
  urls: [
    {
      fmt: '/_cluster/settings'
    }
  ]
});


/**
 * Perform a [cluster.health](http://elasticsearch.org/guide/reference/api/admin-cluster-health/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.level=cluster] - Specify the level of detail for returned information
 * @param {Boolean} params.local - Return local information, do not retrieve the state from master node (default: false)
 * @param {Date|Number} params.master_timeout - Explicit operation timeout for connection to master node
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Number} params.wait_for_active_shards - Wait until the specified number of shards is active
 * @param {String} params.wait_for_nodes - Wait until the specified number of nodes is available
 * @param {Number} params.wait_for_relocating_shards - Wait until the specified number of relocating shards is finished
 * @param {String} params.wait_for_status - Wait until cluster is in a specific state
 * @param {String} params.index - Limit the information returned to a specific index
 */
api.cluster.prototype.health = ca({
  methods: [
    'GET'
  ],
  params: {
    level: {
      type: 'enum',
      'default': 'cluster',
      options: [
        'cluster',
        'indices',
        'shards'
      ]
    },
    local: {
      type: 'boolean'
    },
    master_timeout: {
      type: 'time'
    },
    timeout: {
      type: 'time'
    },
    wait_for_active_shards: {
      type: 'number'
    },
    wait_for_nodes: {
      type: 'string'
    },
    wait_for_relocating_shards: {
      type: 'number'
    },
    wait_for_status: {
      type: 'enum',
      'default': null,
      options: [
        'green',
        'yellow',
        'red'
      ]
    }
  },
  urls: [
    {
      fmt: '/_cluster/health/<%=index%>',
      req: {
        index: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_cluster/health'
    }
  ]
});


/**
 * Perform a [cluster.node_hot_threads](http://www.elasticsearch.org/guide/reference/api/admin-cluster-nodes-hot-threads/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.interval - The interval for the second sampling of threads
 * @param {Number} params.snapshots - Number of samples of thread stacktrace (default: 10)
 * @param {Number} params.threads - Specify the number of threads to provide information for (default: 3)
 * @param {String} params.type - The type to sample (default: cpu)
 * @param {String|ArrayOfStrings|Boolean} params.node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
 */
api.cluster.prototype.nodeHotThreads = ca({
  methods: [
    'GET'
  ],
  params: {
    interval: {
      type: 'time'
    },
    snapshots: {
      type: 'number'
    },
    threads: {
      type: 'number'
    },
    type: {
      type: 'enum',
      options: [
        'cpu',
        'wait',
        'block'
      ]
    }
  },
  urls: [
    {
      fmt: '/_nodes/<%=node_id%>/hotthreads',
      req: {
        node_id: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_nodes/hotthreads'
    }
  ]
});


/**
 * Perform a [cluster.node_info](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-info/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.all - Return all available information
 * @param {Boolean} params.clear - Reset the default settings
 * @param {Boolean} params.http - Return information about HTTP
 * @param {Boolean} params.jvm - Return information about the JVM
 * @param {Boolean} params.network - Return information about network
 * @param {Boolean} params.os - Return information about the operating system
 * @param {Boolean} params.plugin - Return information about plugins
 * @param {Boolean} params.process - Return information about the Elasticsearch process
 * @param {Boolean} params.settings - Return information about node settings
 * @param {Boolean} params.thread_pool - Return information about the thread pool
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Boolean} params.transport - Return information about transport
 * @param {String|ArrayOfStrings|Boolean} params.node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
 */
api.cluster.prototype.nodeInfo = ca({
  methods: [
    'GET'
  ],
  params: {
    all: {
      type: 'boolean'
    },
    clear: {
      type: 'boolean'
    },
    http: {
      type: 'boolean'
    },
    jvm: {
      type: 'boolean'
    },
    network: {
      type: 'boolean'
    },
    os: {
      type: 'boolean'
    },
    plugin: {
      type: 'boolean'
    },
    process: {
      type: 'boolean'
    },
    settings: {
      type: 'boolean'
    },
    thread_pool: {
      type: 'boolean'
    },
    timeout: {
      type: 'time'
    },
    transport: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/_nodes/<%=node_id%>',
      req: {
        node_id: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_nodes'
    }
  ]
});


/**
 * Perform a [cluster.node_shutdown](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-shutdown/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.delay - Set the delay for the operation (default: 1s)
 * @param {Boolean} params.exit - Exit the JVM as well (default: true)
 * @param {String|ArrayOfStrings|Boolean} params.node_id - A comma-separated list of node IDs or names to perform the operation on; use `_local` to perform the operation on the node you're connected to, leave empty to perform the operation on all nodes
 */
api.cluster.prototype.nodeShutdown = ca({
  methods: [
    'POST'
  ],
  params: {
    delay: {
      type: 'time'
    },
    exit: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/_cluster/nodes/<%=node_id%>/_shutdown',
      req: {
        node_id: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_shutdown'
    }
  ]
});


/**
 * Perform a [cluster.node_stats](http://elasticsearch.org/guide/reference/api/admin-cluster-nodes-stats/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.all - Return all available information
 * @param {Boolean} params.clear - Reset the default level of detail
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return detailed information for, when returning the `indices` metric family (supports wildcards)
 * @param {Boolean} params.fs - Return information about the filesystem
 * @param {Boolean} params.http - Return information about HTTP
 * @param {Boolean} params.indices - Return information about indices
 * @param {Boolean} params.jvm - Return information about the JVM
 * @param {Boolean} params.network - Return information about network
 * @param {Boolean} params.os - Return information about the operating system
 * @param {Boolean} params.process - Return information about the Elasticsearch process
 * @param {Boolean} params.thread_pool - Return information about the thread pool
 * @param {Boolean} params.transport - Return information about transport
 * @param {String} params.metric_family - Limit the information returned to a certain metric family
 * @param {String} params.metric - Limit the information returned for `indices` family to a specific metric
 * @param {String|ArrayOfStrings|Boolean} params.node_id - A comma-separated list of node IDs or names to limit the returned information; use `_local` to return information from the node you're connecting to, leave empty to get information from all nodes
 */
api.cluster.prototype.nodeStats = ca({
  methods: [
    'GET'
  ],
  params: {
    all: {
      type: 'boolean'
    },
    clear: {
      type: 'boolean'
    },
    fields: {
      type: 'list'
    },
    fs: {
      type: 'boolean'
    },
    http: {
      type: 'boolean'
    },
    indices: {
      type: 'boolean'
    },
    jvm: {
      type: 'boolean'
    },
    network: {
      type: 'boolean'
    },
    os: {
      type: 'boolean'
    },
    process: {
      type: 'boolean'
    },
    thread_pool: {
      type: 'boolean'
    },
    transport: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/_nodes/<%=node_id%>/stats',
      req: {
        node_id: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_nodes/stats'
    }
  ]
});


/**
 * Perform a [cluster.put_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 */
api.cluster.prototype.putSettings = ca({
  methods: [
    'PUT'
  ],
  params: {},
  urls: [
    {
      fmt: '/_cluster/settings'
    }
  ]
});


/**
 * Perform a [cluster.reroute](http://elasticsearch.org/guide/reference/api/admin-cluster-reroute/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.dry_run - Simulate the operation only and return the resulting state
 * @param {Boolean} params.filter_metadata - Don't return cluster state metadata (default: false)
 */
api.cluster.prototype.reroute = ca({
  methods: [
    'POST'
  ],
  params: {
    dry_run: {
      type: 'boolean'
    },
    filter_metadata: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/_cluster/reroute'
    }
  ]
});


/**
 * Perform a [cluster.state](http://elasticsearch.org/guide/reference/api/admin-cluster-state/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.filter_blocks - Do not return information about blocks
 * @param {Boolean} params.filter_index_templates - Do not return information about index templates
 * @param {String|ArrayOfStrings|Boolean} params.filter_indices - Limit returned metadata information to specific indices
 * @param {Boolean} params.filter_metadata - Do not return information about indices metadata
 * @param {Boolean} params.filter_nodes - Do not return information about nodes
 * @param {Boolean} params.filter_routing_table - Do not return information about shard allocation (`routing_table` and `routing_nodes`)
 * @param {Boolean} params.local - Return local information, do not retrieve the state from master node (default: false)
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 */
api.cluster.prototype.state = ca({
  methods: [
    'GET'
  ],
  params: {
    filter_blocks: {
      type: 'boolean'
    },
    filter_index_templates: {
      type: 'boolean'
    },
    filter_indices: {
      type: 'list'
    },
    filter_metadata: {
      type: 'boolean'
    },
    filter_nodes: {
      type: 'boolean'
    },
    filter_routing_table: {
      type: 'boolean'
    },
    local: {
      type: 'boolean'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/_cluster/state'
    }
  ]
});


/**
 * Perform a [count](http://elasticsearch.org/guide/reference/api/count/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {Number} params.min_score - Include only documents with a specific `_score` value in the result
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {String} params.routing - Specific routing value
 * @param {String} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of indices to restrict the results
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of types to restrict the results
 */
api.count = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    min_score: {
      type: 'number'
    },
    preference: {
      type: 'string'
    },
    routing: {
      type: 'string'
    },
    source: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_count',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_count',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_count'
    }
  ]
});


/**
 * Perform a [create](http://elasticsearch.org/guide/reference/api/index_/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {String} params.id - Document ID
 * @param {String} params.parent - ID of the parent document
 * @param {String} params.percolate - Percolator queries to execute while indexing the document
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {String} params.routing - Specific routing value
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.timestamp - Explicit timestamp for the document
 * @param {Duration} params.ttl - Expiration time for the document
 * @param {Number} params.version - Explicit version number for concurrency control
 * @param {String} params.version_type - Specific version type
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api.create = ca({
  methods: [
    'POST',
    'PUT'
  ],
  params: {
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    id: {
      type: 'string'
    },
    parent: {
      type: 'string'
    },
    percolate: {
      type: 'string'
    },
    refresh: {
      type: 'boolean'
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    routing: {
      type: 'string'
    },
    timeout: {
      type: 'time'
    },
    timestamp: {
      type: 'time'
    },
    ttl: {
      type: 'duration'
    },
    version: {
      type: 'number'
    },
    version_type: {
      type: 'enum',
      options: [
        'internal',
        'external'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>/_create',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/<%=type%>',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [delete](http://elasticsearch.org/guide/reference/api/delete/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Specific write consistency setting for the operation
 * @param {String} params.parent - ID of parent document
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {String} params.routing - Specific routing value
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Number} params.version - Explicit version number for concurrency control
 * @param {String} params.version_type - Specific version type
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api['delete'] = ca({
  methods: [
    'DELETE'
  ],
  params: {
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    parent: {
      type: 'string'
    },
    refresh: {
      type: 'boolean'
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    routing: {
      type: 'string'
    },
    timeout: {
      type: 'time'
    },
    version: {
      type: 'number'
    },
    version_type: {
      type: 'enum',
      options: [
        'internal',
        'external'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [delete_by_query](http://www.elasticsearch.org/guide/reference/api/delete-by-query/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.analyzer - The analyzer to use for the query string
 * @param {String} params.consistency - Specific write consistency setting for the operation
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {String} params.df - The field to use as default where no field prefix is given in the query string
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {String} params.q - Query in the Lucene query string syntax
 * @param {String} params.routing - Specific routing value
 * @param {String} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of indices to restrict the operation; use `_all` to perform the operation on all indices
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of types to restrict the operation
 */
api.deleteByQuery = ca({
  methods: [
    'DELETE'
  ],
  params: {
    analyzer: {
      type: 'string'
    },
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    default_operator: {
      type: 'enum',
      'default': 'OR',
      options: [
        'AND',
        'OR'
      ]
    },
    df: {
      type: 'string'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    q: {
      type: 'string'
    },
    routing: {
      type: 'string'
    },
    source: {
      type: 'string'
    },
    timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_query',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_query',
      req: {
        index: {
          type: 'list'
        }
      }
    }
  ]
});


/**
 * Perform a [exists](http://elasticsearch.org/guide/reference/api/get/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.parent - The ID of the parent document
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {Boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {Boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {String} params.routing - Specific routing value
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} [params.type=_all] - The type of the document (use `_all` to fetch the first document matching the ID across all types)
 */
api.exists = ca({
  methods: [
    'HEAD'
  ],
  params: {
    parent: {
      type: 'string'
    },
    preference: {
      type: 'string'
    },
    realtime: {
      type: 'boolean'
    },
    refresh: {
      type: 'boolean'
    },
    routing: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>',
      opt: {
        type: {
          type: 'string',
          'default': '_all'
        }
      },
      req: {
        index: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ],
  castExists: true
});


/**
 * Perform a [explain](http://elasticsearch.org/guide/reference/api/explain/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.analyze_wildcard - Specify whether wildcards and prefix queries in the query string query should be analyzed (default: false)
 * @param {String} params.analyzer - The analyzer for the query string query
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {String} params.df - The default field for query string query (default: _all)
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {Boolean} params.lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
 * @param {Boolean} params.lowercase_expanded_terms - Specify whether query terms should be lowercased
 * @param {String} params.parent - The ID of the parent document
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {String} params.q - Query in the Lucene query string syntax
 * @param {String} params.routing - Specific routing value
 * @param {String} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api.explain = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    analyze_wildcard: {
      type: 'boolean'
    },
    analyzer: {
      type: 'string'
    },
    default_operator: {
      type: 'enum',
      'default': 'OR',
      options: [
        'AND',
        'OR'
      ]
    },
    df: {
      type: 'string'
    },
    fields: {
      type: 'list'
    },
    lenient: {
      type: 'boolean'
    },
    lowercase_expanded_terms: {
      type: 'boolean'
    },
    parent: {
      type: 'string'
    },
    preference: {
      type: 'string'
    },
    q: {
      type: 'string'
    },
    routing: {
      type: 'string'
    },
    source: {
      type: 'string'
    },
    _source: {
      type: 'list'
    },
    _source_exclude: {
      type: 'list'
    },
    _source_include: {
      type: 'list'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>/_explain',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [get](http://elasticsearch.org/guide/reference/api/get/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {String} params.parent - The ID of the parent document
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {Boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {Boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {String} params.routing - Specific routing value
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} [params.type=_all] - The type of the document (use `_all` to fetch the first document matching the ID across all types)
 */
api.get = ca({
  methods: [
    'GET'
  ],
  params: {
    fields: {
      type: 'list'
    },
    parent: {
      type: 'string'
    },
    preference: {
      type: 'string'
    },
    realtime: {
      type: 'boolean'
    },
    refresh: {
      type: 'boolean'
    },
    routing: {
      type: 'string'
    },
    _source: {
      type: 'list'
    },
    _source_exclude: {
      type: 'list'
    },
    _source_include: {
      type: 'list'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>',
      opt: {
        type: {
          type: 'string',
          'default': '_all'
        }
      },
      req: {
        index: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [get_source](http://elasticsearch.org/guide/reference/api/get/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params.include - A list of fields to extract and return from the _source field
 * @param {String} params.parent - The ID of the parent document
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {Boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {Boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {String} params.routing - Specific routing value
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} [params.type=_all] - The type of the document; use `_all` to fetch the first document matching the ID across all types
 */
api.getSource = ca({
  methods: [
    'GET'
  ],
  params: {
    exclude: {
      type: 'list'
    },
    include: {
      type: 'list'
    },
    parent: {
      type: 'string'
    },
    preference: {
      type: 'string'
    },
    realtime: {
      type: 'boolean'
    },
    refresh: {
      type: 'boolean'
    },
    routing: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>/_source',
      opt: {
        type: {
          type: 'string',
          'default': '_all'
        }
      },
      req: {
        index: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [index](http://elasticsearch.org/guide/reference/api/index_/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {String} [params.op_type=index] - Explicit operation type
 * @param {String} params.parent - ID of the parent document
 * @param {String} params.percolate - Percolator queries to execute while indexing the document
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {String} params.routing - Specific routing value
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.timestamp - Explicit timestamp for the document
 * @param {Duration} params.ttl - Expiration time for the document
 * @param {Number} params.version - Explicit version number for concurrency control
 * @param {String} params.version_type - Specific version type
 * @param {String} params.id - Document ID
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api.index = ca({
  methods: [
    'POST',
    'PUT'
  ],
  params: {
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    op_type: {
      type: 'enum',
      'default': 'index',
      options: [
        'index',
        'create'
      ]
    },
    parent: {
      type: 'string'
    },
    percolate: {
      type: 'string'
    },
    refresh: {
      type: 'boolean'
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    routing: {
      type: 'string'
    },
    timeout: {
      type: 'time'
    },
    timestamp: {
      type: 'time'
    },
    ttl: {
      type: 'duration'
    },
    version: {
      type: 'number'
    },
    version_type: {
      type: 'enum',
      options: [
        'internal',
        'external'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/<%=type%>',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    }
  ]
});


api.indices = function IndicesNS(client) {
  if (this instanceof IndicesNS) {
    this.client = client;
  } else {
    return new IndicesNS(client);
  }
};

/**
 * Perform a [indices.analyze](http://www.elasticsearch.org/guide/reference/api/admin-indices-analyze/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.analyzer - The name of the analyzer to use
 * @param {String} params.field - Use the analyzer configured for this field (instead of passing the analyzer name)
 * @param {String|ArrayOfStrings|Boolean} params.filters - A comma-separated list of filters to use for the analysis
 * @param {String} params.index - The name of the index to scope the operation
 * @param {Boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 * @param {String} params.text - The text on which the analysis should be performed (when request body is not used)
 * @param {String} params.tokenizer - The name of the tokenizer to use for the analysis
 * @param {String} [params.format=detailed] - Format of the output
 */
api.indices.prototype.analyze = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    analyzer: {
      type: 'string'
    },
    field: {
      type: 'string'
    },
    filters: {
      type: 'list'
    },
    index: {
      type: 'string'
    },
    prefer_local: {
      type: 'boolean'
    },
    text: {
      type: 'string'
    },
    tokenizer: {
      type: 'string'
    },
    format: {
      type: 'enum',
      'default': 'detailed',
      options: [
        'detailed',
        'text'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_analyze',
      req: {
        index: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_analyze'
    }
  ]
});


/**
 * Perform a [indices.clear_cache](http://www.elasticsearch.org/guide/reference/api/admin-indices-clearcache/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.field_data - Clear field data
 * @param {Boolean} params.fielddata - Clear field data
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to clear when using the `field_data` parameter (default: all)
 * @param {Boolean} params.filter - Clear filter caches
 * @param {Boolean} params.filter_cache - Clear filter caches
 * @param {Boolean} params.filter_keys - A comma-separated list of keys to clear when using the `filter_cache` parameter (default: all)
 * @param {Boolean} params.id - Clear ID caches for parent/child
 * @param {Boolean} params.id_cache - Clear ID caches for parent/child
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index name to limit the operation
 * @param {Boolean} params.recycler - Clear the recycler cache
 */
api.indices.prototype.clearCache = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    field_data: {
      type: 'boolean'
    },
    fielddata: {
      type: 'boolean'
    },
    fields: {
      type: 'list'
    },
    filter: {
      type: 'boolean'
    },
    filter_cache: {
      type: 'boolean'
    },
    filter_keys: {
      type: 'boolean'
    },
    id: {
      type: 'boolean'
    },
    id_cache: {
      type: 'boolean'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    index: {
      type: 'list'
    },
    recycler: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_cache/clear',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_cache/clear'
    }
  ]
});


/**
 * Perform a [indices.close](http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.index - The name of the index
 */
api.indices.prototype.close = ca({
  methods: [
    'POST'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_close',
      req: {
        index: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.create](http://www.elasticsearch.org/guide/reference/api/admin-indices-create-index/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.index - The name of the index
 */
api.indices.prototype.create = ca({
  methods: [
    'PUT',
    'POST'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>',
      req: {
        index: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.delete](http://www.elasticsearch.org/guide/reference/api/admin-indices-delete-index/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of indices to delete; use `_all` or empty string to delete all indices
 */
api.indices.prototype['delete'] = ca({
  methods: [
    'DELETE'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/'
    }
  ]
});


/**
 * Perform a [indices.delete_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit timestamp for the document
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.index - The name of the index with an alias
 * @param {String} params.name - The name of the alias to be deleted
 */
api.indices.prototype.deleteAlias = ca({
  methods: [
    'DELETE'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_alias/<%=name%>',
      req: {
        index: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.delete_mapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-delete-mapping/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` for all indices
 * @param {String} params.type - The name of the document type to delete
 */
api.indices.prototype.deleteMapping = ca({
  methods: [
    'DELETE'
  ],
  params: {
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.delete_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.name - The name of the template
 */
api.indices.prototype.deleteTemplate = ca({
  methods: [
    'DELETE'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/_template/<%=name%>',
      req: {
        name: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.delete_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to register warmer for; use `_all` or empty string to perform the operation on all indices
 * @param {String} params.name - The name of the warmer (supports wildcards); leave empty to delete all warmers
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to register warmer for; use `_all` or empty string to perform the operation on all types
 */
api.indices.prototype.deleteWarmer = ca({
  methods: [
    'DELETE'
  ],
  params: {
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_warmer',
      req: {
        index: {
          type: 'list'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.exists](http://www.elasticsearch.org/guide/reference/api/admin-indices-indices-exists/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of indices to check
 */
api.indices.prototype.exists = ca({
  methods: [
    'HEAD'
  ],
  params: {},
  urls: [
    {
      fmt: '/<%=index%>',
      req: {
        index: {
          type: 'list'
        }
      }
    }
  ],
  castExists: true
});


/**
 * Perform a [indices.exists_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to filter aliases
 * @param {String|ArrayOfStrings|Boolean} params.name - A comma-separated list of alias names to return
 */
api.indices.prototype.existsAlias = ca({
  methods: [
    'HEAD'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_alias/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        name: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_alias/<%=name%>',
      req: {
        name: {
          type: 'list'
        }
      }
    }
  ],
  castExists: true
});


/**
 * Perform a [indices.exists_type](http://www.elasticsearch.org/guide/reference/api/admin-indices-types-exists/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` to check the types across all indices
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to check
 */
api.indices.prototype.existsType = ca({
  methods: [
    'HEAD'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    }
  ],
  castExists: true
});


/**
 * Perform a [indices.flush](http://www.elasticsearch.org/guide/reference/api/admin-indices-flush/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.force - TODO: ?
 * @param {Boolean} params.full - TODO: ?
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string for all indices
 */
api.indices.prototype.flush = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    force: {
      type: 'boolean'
    },
    full: {
      type: 'boolean'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    refresh: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_flush',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_flush'
    }
  ]
});


/**
 * Perform a [indices.get_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to filter aliases
 * @param {String|ArrayOfStrings|Boolean} params.name - A comma-separated list of alias names to return
 */
api.indices.prototype.getAlias = ca({
  methods: [
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_alias/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        name: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_alias/<%=name%>',
      req: {
        name: {
          type: 'list'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.get_aliases](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to filter aliases
 */
api.indices.prototype.getAliases = ca({
  methods: [
    'GET'
  ],
  params: {
    timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_aliases',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_aliases'
    }
  ]
});


/**
 * Perform a [indices.get_mapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-get-mapping/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types
 */
api.indices.prototype.getMapping = ca({
  methods: [
    'GET'
  ],
  params: {},
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_mapping',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_mapping',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_mapping'
    }
  ]
});


/**
 * Perform a [indices.get_settings](http://www.elasticsearch.org/guide/reference/api/admin-indices-get-settings/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.getSettings = ca({
  methods: [
    'GET'
  ],
  params: {},
  urls: [
    {
      fmt: '/<%=index%>/_settings',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_settings'
    }
  ]
});


/**
 * Perform a [indices.get_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.name - The name of the template
 */
api.indices.prototype.getTemplate = ca({
  methods: [
    'GET'
  ],
  params: {},
  urls: [
    {
      fmt: '/_template/<%=name%>',
      req: {
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_template'
    }
  ]
});


/**
 * Perform a [indices.get_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to restrict the operation; use `_all` to perform the operation on all indices
 * @param {String} params.name - The name of the warmer (supports wildcards); leave empty to get all warmers
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to restrict the operation; leave empty to perform the operation on all types
 */
api.indices.prototype.getWarmer = ca({
  methods: [
    'GET'
  ],
  params: {},
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_warmer',
      req: {
        index: {
          type: 'list'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.open](http://www.elasticsearch.org/guide/reference/api/admin-indices-open-close/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.index - The name of the index
 */
api.indices.prototype.open = ca({
  methods: [
    'POST'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_open',
      req: {
        index: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.optimize](http://www.elasticsearch.org/guide/reference/api/admin-indices-optimize/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.flush - Specify whether the index should be flushed after performing the operation (default: true)
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {Number} params.max_num_segments - The number of segments the index should be merged into (default: dynamic)
 * @param {Boolean} params.only_expunge_deletes - Specify whether the operation should only expunge deleted documents
 * @param {*} params.operation_threading - TODO: ?
 * @param {Boolean} params.refresh - Specify whether the index should be refreshed after performing the operation (default: true)
 * @param {Boolean} params.wait_for_merge - Specify whether the request should block until the merge process is finished (default: true)
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.optimize = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    flush: {
      type: 'boolean'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    max_num_segments: {
      type: 'number'
    },
    only_expunge_deletes: {
      type: 'boolean'
    },
    operation_threading: {},
    refresh: {
      type: 'boolean'
    },
    wait_for_merge: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_optimize',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_optimize'
    }
  ]
});


/**
 * Perform a [indices.put_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Explicit timestamp for the document
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.index - The name of the index with an alias
 * @param {String} params.name - The name of the alias to be created or updated
 */
api.indices.prototype.putAlias = ca({
  methods: [
    'PUT'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_alias/<%=name%>',
      req: {
        index: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_alias/<%=name%>',
      req: {
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_alias',
      req: {
        index: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_alias'
    }
  ]
});


/**
 * Perform a [indices.put_mapping](http://www.elasticsearch.org/guide/reference/api/admin-indices-put-mapping/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.ignore_conflicts - Specify whether to ignore conflicts while updating the mapping (default: false)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` to perform the operation on all indices
 * @param {String} params.type - The name of the document type
 */
api.indices.prototype.putMapping = ca({
  methods: [
    'PUT',
    'POST'
  ],
  params: {
    ignore_conflicts: {
      type: 'boolean'
    },
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_mapping',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.put_settings](http://www.elasticsearch.org/guide/reference/api/admin-indices-update-settings/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.putSettings = ca({
  methods: [
    'PUT'
  ],
  params: {
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_settings',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_settings'
    }
  ]
});


/**
 * Perform a [indices.put_template](http://www.elasticsearch.org/guide/reference/api/admin-indices-templates/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Number} params.order - The order for this template when merging multiple matching ones (higher numbers are merged later, overriding the lower numbers)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String} params.name - The name of the template
 */
api.indices.prototype.putTemplate = ca({
  methods: [
    'PUT',
    'POST'
  ],
  params: {
    order: {
      type: 'number'
    },
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/_template/<%=name%>',
      req: {
        name: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.put_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to register the warmer for; use `_all` or empty string to perform the operation on all indices
 * @param {String} params.name - The name of the warmer
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to register the warmer for; leave empty to perform the operation on all types
 */
api.indices.prototype.putWarmer = ca({
  methods: [
    'PUT'
  ],
  params: {
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_warmer/<%=name%>',
      req: {
        index: {
          type: 'list'
        },
        name: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [indices.refresh](http://www.elasticsearch.org/guide/reference/api/admin-indices-refresh/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.refresh = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    operation_threading: {}
  },
  urls: [
    {
      fmt: '/<%=index%>/_refresh',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_refresh'
    }
  ]
});


/**
 * Perform a [indices.segments](http://elasticsearch.org/guide/reference/api/admin-indices-segments/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.segments = ca({
  methods: [
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    operation_threading: {}
  },
  urls: [
    {
      fmt: '/<%=index%>/_segments',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_segments'
    }
  ]
});


/**
 * Perform a [indices.snapshot_index](http://www.elasticsearch.org/guide/reference/api/admin-indices-gateway-snapshot/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string for all indices
 */
api.indices.prototype.snapshotIndex = ca({
  methods: [
    'POST'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_gateway/snapshot',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_gateway/snapshot'
    }
  ]
});


/**
 * Perform a [indices.stats](http://elasticsearch.org/guide/reference/api/admin-indices-stats/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.all - Return all available information
 * @param {Boolean} params.clear - Reset the default level of detail
 * @param {Boolean} params.completion - Return information about completion suggester stats
 * @param {String|ArrayOfStrings|Boolean} params.completion_fields - A comma-separated list of fields for `completion` metric (supports wildcards)
 * @param {Boolean} params.docs - Return information about indexed and deleted documents
 * @param {Boolean} params.fielddata - Return information about field data
 * @param {String|ArrayOfStrings|Boolean} params.fielddata_fields - A comma-separated list of fields for `fielddata` metric (supports wildcards)
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return detailed information for, when returning the `search` statistics
 * @param {Boolean} params.filter_cache - Return information about filter cache
 * @param {Boolean} params.flush - Return information about flush operations
 * @param {Boolean} params.get - Return information about get operations
 * @param {Boolean} params.groups - A comma-separated list of search groups for `search` statistics
 * @param {Boolean} params.id_cache - Return information about ID cache
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {Boolean} params.indexing - Return information about indexing operations
 * @param {Boolean} params.merge - Return information about merge operations
 * @param {Boolean} params.refresh - Return information about refresh operations
 * @param {Boolean} params.search - Return information about search operations; use the `groups` parameter to include information for specific search groups
 * @param {Boolean} params.store - Return information about the size of the index
 * @param {Boolean} params.warmer - Return information about warmers
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 * @param {String|ArrayOfStrings|Boolean} params.indexing_types - A comma-separated list of document types to include in the `indexing` statistics
 * @param {String} params.metric_family - Limit the information returned to a specific metric
 * @param {String|ArrayOfStrings|Boolean} params.search_groups - A comma-separated list of search groups to include in the `search` statistics
 */
api.indices.prototype.stats = ca({
  methods: [
    'GET'
  ],
  params: {
    all: {
      type: 'boolean'
    },
    clear: {
      type: 'boolean'
    },
    completion: {
      type: 'boolean'
    },
    completion_fields: {
      type: 'list'
    },
    docs: {
      type: 'boolean'
    },
    fielddata: {
      type: 'boolean'
    },
    fielddata_fields: {
      type: 'list'
    },
    fields: {
      type: 'list'
    },
    filter_cache: {
      type: 'boolean'
    },
    flush: {
      type: 'boolean'
    },
    get: {
      type: 'boolean'
    },
    groups: {
      type: 'boolean'
    },
    id_cache: {
      type: 'boolean'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    indexing: {
      type: 'boolean'
    },
    merge: {
      type: 'boolean'
    },
    refresh: {
      type: 'boolean'
    },
    search: {
      type: 'boolean'
    },
    store: {
      type: 'boolean'
    },
    warmer: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_stats',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_stats'
    }
  ]
});


/**
 * Perform a [indices.status](http://elasticsearch.org/guide/reference/api/admin-indices-status/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {Boolean} params.recovery - Return information about shard recovery
 * @param {Boolean} params.snapshot - TODO: ?
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names; use `_all` or empty string to perform the operation on all indices
 */
api.indices.prototype.status = ca({
  methods: [
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    operation_threading: {},
    recovery: {
      type: 'boolean'
    },
    snapshot: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_status',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_status'
    }
  ]
});


/**
 * Perform a [indices.update_aliases](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Date|Number} params.timeout - Request timeout
 * @param {Date|Number} params.master_timeout - Specify timeout for connection to master
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to filter aliases
 */
api.indices.prototype.updateAliases = ca({
  methods: [
    'POST'
  ],
  params: {
    timeout: {
      type: 'time'
    },
    master_timeout: {
      type: 'time'
    }
  },
  urls: [
    {
      fmt: '/_aliases'
    }
  ]
});


/**
 * Perform a [indices.validate_query](http://www.elasticsearch.org/guide/reference/api/validate/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.explain - Return detailed information about the error
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {*} params.operation_threading - TODO: ?
 * @param {String} params.source - The URL-encoded query definition (instead of using the request body)
 * @param {String} params.q - Query in the Lucene query string syntax
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to restrict the operation; use `_all` or empty string to perform the operation on all indices
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to restrict the operation; leave empty to perform the operation on all types
 */
api.indices.prototype.validateQuery = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    explain: {
      type: 'boolean'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    operation_threading: {},
    source: {
      type: 'string'
    },
    q: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_validate/query',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_validate/query',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_validate/query'
    }
  ]
});


/**
 * Perform a [info](http://elasticsearch.org/guide/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 */
api.info = ca({
  methods: [
    'GET',
    'HEAD'
  ],
  params: {},
  urls: [
    {
      fmt: '/'
    }
  ]
});


/**
 * Perform a [mget](http://elasticsearch.org/guide/reference/api/multi-get/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {Boolean} params.realtime - Specify whether to perform the operation in realtime or search mode
 * @param {Boolean} params.refresh - Refresh the shard containing the document before performing the operation
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api.mget = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    fields: {
      type: 'list'
    },
    preference: {
      type: 'string'
    },
    realtime: {
      type: 'boolean'
    },
    refresh: {
      type: 'boolean'
    },
    _source: {
      type: 'list'
    },
    _source_exclude: {
      type: 'list'
    },
    _source_include: {
      type: 'list'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_mget',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/<%=index%>/_mget',
      req: {
        index: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_mget'
    }
  ]
});


/**
 * Perform a [mlt](http://elasticsearch.org/guide/reference/api/more-like-this/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Number} params.boost_terms - The boost factor
 * @param {Number} params.max_doc_freq - The word occurrence frequency as count: words with higher occurrence in the corpus will be ignored
 * @param {Number} params.max_query_terms - The maximum query terms to be included in the generated query
 * @param {Number} params.max_word_len - The minimum length of the word: longer words will be ignored
 * @param {Number} params.min_doc_freq - The word occurrence frequency as count: words with lower occurrence in the corpus will be ignored
 * @param {Number} params.min_term_freq - The term frequency as percent: terms with lower occurence in the source document will be ignored
 * @param {Number} params.min_word_len - The minimum length of the word: shorter words will be ignored
 * @param {String|ArrayOfStrings|Boolean} params.mlt_fields - Specific fields to perform the query against
 * @param {Number} params.percent_terms_to_match - How many terms have to match in order to consider the document a match (default: 0.3)
 * @param {String} params.routing - Specific routing value
 * @param {Number} params.search_from - The offset from which to return results
 * @param {String|ArrayOfStrings|Boolean} params.search_indices - A comma-separated list of indices to perform the query against (default: the index containing the document)
 * @param {String} params.search_query_hint - The search query hint
 * @param {String} params.search_scroll - A scroll search request definition
 * @param {Number} params.search_size - The number of documents to return (default: 10)
 * @param {String} params.search_source - A specific search request definition (instead of using the request body)
 * @param {String} params.search_type - Specific search type (eg. `dfs_then_fetch`, `count`, etc)
 * @param {String|ArrayOfStrings|Boolean} params.search_types - A comma-separated list of types to perform the query against (default: the same type as the document)
 * @param {String|ArrayOfStrings|Boolean} params.stop_words - A list of stop words to be ignored
 * @param {String} params.id - The document ID
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document (use `_all` to fetch the first document matching the ID across all types)
 */
api.mlt = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    boost_terms: {
      type: 'number'
    },
    max_doc_freq: {
      type: 'number'
    },
    max_query_terms: {
      type: 'number'
    },
    max_word_len: {
      type: 'number'
    },
    min_doc_freq: {
      type: 'number'
    },
    min_term_freq: {
      type: 'number'
    },
    min_word_len: {
      type: 'number'
    },
    mlt_fields: {
      type: 'list'
    },
    percent_terms_to_match: {
      type: 'number'
    },
    routing: {
      type: 'string'
    },
    search_from: {
      type: 'number'
    },
    search_indices: {
      type: 'list'
    },
    search_query_hint: {
      type: 'string'
    },
    search_scroll: {
      type: 'string'
    },
    search_size: {
      type: 'number'
    },
    search_source: {
      type: 'string'
    },
    search_type: {
      type: 'string'
    },
    search_types: {
      type: 'list'
    },
    stop_words: {
      type: 'list'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>/_mlt',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [msearch](http://www.elasticsearch.org/guide/reference/api/multi-search/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.search_type - Search operation type
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to use as default
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to use as default
 */
api.msearch = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    search_type: {
      type: 'enum',
      options: [
        'query_then_fetch',
        'query_and_fetch',
        'dfs_query_then_fetch',
        'dfs_query_and_fetch',
        'count',
        'scan'
      ]
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_msearch',
      req: {
        index: {
          type: 'list'
        },
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_msearch',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_msearch'
    }
  ],
  bulkBody: true
});


/**
 * Perform a [percolate](http://elasticsearch.org/guide/reference/api/percolate/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Boolean} params.prefer_local - With `true`, specify that a local shard should be used if available, with `false`, use a random shard (default: true)
 * @param {String} params.index - The name of the index with a registered percolator query
 * @param {String} params.type - The document type
 */
api.percolate = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    prefer_local: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_percolate',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    }
  ]
});


/**
 * Perform a [scroll](http://www.elasticsearch.org/guide/reference/api/search/scroll/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {Duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {String} params.scroll_id - The scroll ID
 */
api.scroll = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    scroll: {
      type: 'duration'
    },
    scroll_id: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/_search/scroll/<%=scroll_id%>',
      req: {
        scroll_id: {
          type: 'string'
        }
      }
    },
    {
      fmt: '/_search/scroll'
    }
  ]
});


/**
 * Perform a [search](http://www.elasticsearch.org/guide/reference/api/search/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.analyzer - The analyzer to use for the query string
 * @param {Boolean} params.analyze_wildcard - Specify whether wildcard and prefix queries should be analyzed (default: false)
 * @param {String} [params.default_operator=OR] - The default operator for query string query (AND or OR)
 * @param {String} params.df - The field to use as default where no field prefix is given in the query string
 * @param {Boolean} params.explain - Specify whether to return detailed information about score computation as part of a hit
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return as part of a hit
 * @param {Number} params.from - Starting offset (default: 0)
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String|ArrayOfStrings|Boolean} params.indices_boost - Comma-separated list of index boosts
 * @param {Boolean} params.lenient - Specify whether format-based query failures (such as providing text to a numeric field) should be ignored
 * @param {Boolean} params.lowercase_expanded_terms - Specify whether query terms should be lowercased
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {String} params.q - Query in the Lucene query string syntax
 * @param {String|ArrayOfStrings|Boolean} params.routing - A comma-separated list of specific routing values
 * @param {Duration} params.scroll - Specify how long a consistent view of the index should be maintained for scrolled search
 * @param {String} params.search_type - Search operation type
 * @param {Number} params.size - Number of hits to return (default: 10)
 * @param {String|ArrayOfStrings|Boolean} params.sort - A comma-separated list of <field>:<direction> pairs
 * @param {String} params.source - The URL-encoded request definition using the Query DSL (instead of using request body)
 * @param {String|ArrayOfStrings|Boolean} params._source - True or false to return the _source field or not, or a list of fields to return
 * @param {String|ArrayOfStrings|Boolean} params._source_exclude - A list of fields to exclude from the returned _source field
 * @param {String|ArrayOfStrings|Boolean} params._source_include - A list of fields to extract and return from the _source field
 * @param {String|ArrayOfStrings|Boolean} params.stats - Specific 'tag' of the request for logging and statistical purposes
 * @param {String} params.suggest_field - Specify which field to use for suggestions
 * @param {String} [params.suggest_mode=missing] - Specify suggest mode
 * @param {Number} params.suggest_size - How many suggestions to return in response
 * @param {Text} params.suggest_text - The source text for which the suggestions should be returned
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Boolean} params.version - Specify whether to return document version as part of a hit
 * @param {String|ArrayOfStrings|Boolean} [params.index=_all] - A comma-separated list of index names to search; use `_all` or empty string to perform the operation on all indices
 * @param {String|ArrayOfStrings|Boolean} params.type - A comma-separated list of document types to search; leave empty to perform the operation on all types
 */
api.search = ca({
  methods: [
    'GET',
    'POST'
  ],
  params: {
    analyzer: {
      type: 'string'
    },
    analyze_wildcard: {
      type: 'boolean'
    },
    default_operator: {
      type: 'enum',
      'default': 'OR',
      options: [
        'AND',
        'OR'
      ]
    },
    df: {
      type: 'string'
    },
    explain: {
      type: 'boolean'
    },
    fields: {
      type: 'list'
    },
    from: {
      type: 'number'
    },
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    indices_boost: {
      type: 'list'
    },
    lenient: {
      type: 'boolean'
    },
    lowercase_expanded_terms: {
      type: 'boolean'
    },
    preference: {
      type: 'string'
    },
    q: {
      type: 'string'
    },
    routing: {
      type: 'list'
    },
    scroll: {
      type: 'duration'
    },
    search_type: {
      type: 'enum',
      options: [
        'query_then_fetch',
        'query_and_fetch',
        'dfs_query_then_fetch',
        'dfs_query_and_fetch',
        'count',
        'scan'
      ]
    },
    size: {
      type: 'number'
    },
    sort: {
      type: 'list'
    },
    source: {
      type: 'string'
    },
    _source: {
      type: 'list'
    },
    _source_exclude: {
      type: 'list'
    },
    _source_include: {
      type: 'list'
    },
    stats: {
      type: 'list'
    },
    suggest_field: {
      type: 'string'
    },
    suggest_mode: {
      type: 'enum',
      'default': 'missing',
      options: [
        'missing',
        'popular',
        'always'
      ]
    },
    suggest_size: {
      type: 'number'
    },
    suggest_text: {
      type: 'text'
    },
    timeout: {
      type: 'time'
    },
    version: {
      type: 'boolean'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/_search',
      opt: {
        index: {
          type: 'list',
          'default': '_all'
        }
      },
      req: {
        type: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/<%=index%>/_search',
      opt: {
        index: {
          type: 'list',
          'default': '_all'
        }
      }
    }
  ]
});


/**
 * Perform a [suggest](http://elasticsearch.org/guide/reference/api/search/suggest/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} [params.ignore_indices=none] - When performed on multiple indices, allows to ignore `missing` ones
 * @param {String} params.preference - Specify the node or shard the operation should be performed on (default: random)
 * @param {String} params.routing - Specific routing value
 * @param {String} params.source - The URL-encoded request definition (instead of using request body)
 * @param {String|ArrayOfStrings|Boolean} params.index - A comma-separated list of index names to restrict the operation; use `_all` or empty string to perform the operation on all indices
 */
api.suggest = ca({
  methods: [
    'POST',
    'GET'
  ],
  params: {
    ignore_indices: {
      type: 'enum',
      'default': 'none',
      options: [
        'none',
        'missing'
      ]
    },
    preference: {
      type: 'string'
    },
    routing: {
      type: 'string'
    },
    source: {
      type: 'string'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/_suggest',
      req: {
        index: {
          type: 'list'
        }
      }
    },
    {
      fmt: '/_suggest'
    }
  ]
});


/**
 * Perform a [update](http://elasticsearch.org/guide/reference/api/update/) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.consistency - Explicit write consistency setting for the operation
 * @param {String|ArrayOfStrings|Boolean} params.fields - A comma-separated list of fields to return in the response
 * @param {String} params.lang - The script language (default: mvel)
 * @param {String} params.parent - ID of the parent document
 * @param {String} params.percolate - Perform percolation during the operation; use specific registered query name, attribute, or wildcard
 * @param {Boolean} params.refresh - Refresh the index after performing the operation
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {Number} params.retry_on_conflict - Specify how many times should the operation be retried when a conflict occurs (default: 0)
 * @param {String} params.routing - Specific routing value
 * @param {*} params.script - The URL-encoded script definition (instead of using request body)
 * @param {Date|Number} params.timeout - Explicit operation timeout
 * @param {Date|Number} params.timestamp - Explicit timestamp for the document
 * @param {Duration} params.ttl - Expiration time for the document
 * @param {Number} params.version - Explicit version number for concurrency control
 * @param {Number} params.version_type - Explicit version number for concurrency control
 * @param {String} params.id - Document ID
 * @param {String} params.index - The name of the index
 * @param {String} params.type - The type of the document
 */
api.update = ca({
  methods: [
    'POST'
  ],
  params: {
    consistency: {
      type: 'enum',
      options: [
        'one',
        'quorum',
        'all'
      ]
    },
    fields: {
      type: 'list'
    },
    lang: {
      type: 'string'
    },
    parent: {
      type: 'string'
    },
    percolate: {
      type: 'string'
    },
    refresh: {
      type: 'boolean'
    },
    replication: {
      type: 'enum',
      'default': 'sync',
      options: [
        'sync',
        'async'
      ]
    },
    retry_on_conflict: {
      type: 'number'
    },
    routing: {
      type: 'string'
    },
    script: {},
    timeout: {
      type: 'time'
    },
    timestamp: {
      type: 'time'
    },
    ttl: {
      type: 'duration'
    },
    version: {
      type: 'number'
    },
    version_type: {
      type: 'number'
    }
  },
  urls: [
    {
      fmt: '/<%=index%>/<%=type%>/<%=id%>/_update',
      req: {
        index: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        id: {
          type: 'string'
        }
      }
    }
  ]
});

