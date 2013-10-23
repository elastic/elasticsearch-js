var ClientAction = require('./client_action');
var errors = require('./errors');

exports.attach = function (Client) {
  Client.namespace('cluster');
  Client.namespace('indices');

  /**
   * Perform a [bulk](http://elasticsearch.org/guide/reference/api/bulk/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.consistency
   * @param {Boolean} params.refresh
   * @param {String} [params.replication=sync]
   * @param {String} params.type
   */
  Client.prototype.bulk = ClientAction({
    name: 'bulk',
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
   */
  Client.prototype.clearScroll = ClientAction({
    name: 'clear_scroll',
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

  /**
   * Perform a [cluster.get_settings](http://elasticsearch.org/guide/reference/api/admin-cluster-update-settings/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  Client.prototype.cluster.prototype.getSettings = ClientAction({
    name: 'cluster.get_settings',
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
   * @param {String} [params.level=cluster]
   * @param {Boolean} params.local
   * @param {Date|Number} params.master_timeout
   * @param {Date|Number} params.timeout
   * @param {Number} params.wait_for_active_shards
   * @param {String} params.wait_for_nodes
   * @param {Number} params.wait_for_relocating_shards
   * @param {String} params.wait_for_status
   */
  Client.prototype.cluster.prototype.health = ClientAction({
    name: 'cluster.health',
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
   * @param {Date|Number} params.interval
   * @param {Number} params.snapshots
   * @param {Number} params.threads
   * @param {String} params.type
   */
  Client.prototype.cluster.prototype.nodeHotThreads = ClientAction({
    name: 'cluster.node_hot_threads',
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
   * @param {Boolean} params.all
   * @param {Boolean} params.clear
   * @param {Boolean} params.http
   * @param {Boolean} params.jvm
   * @param {Boolean} params.network
   * @param {Boolean} params.os
   * @param {Boolean} params.plugin
   * @param {Boolean} params.process
   * @param {Boolean} params.settings
   * @param {Boolean} params.thread_pool
   * @param {Date|Number} params.timeout
   * @param {Boolean} params.transport
   */
  Client.prototype.cluster.prototype.nodeInfo = ClientAction({
    name: 'cluster.node_info',
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
   * @param {Date|Number} params.delay
   * @param {Boolean} params.exit
   */
  Client.prototype.cluster.prototype.nodeShutdown = ClientAction({
    name: 'cluster.node_shutdown',
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
   * @param {Boolean} params.all
   * @param {Boolean} params.clear
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {Boolean} params.fs
   * @param {Boolean} params.http
   * @param {Boolean} params.indices
   * @param {Boolean} params.jvm
   * @param {Boolean} params.network
   * @param {Boolean} params.os
   * @param {Boolean} params.process
   * @param {Boolean} params.thread_pool
   * @param {Boolean} params.transport
   */
  Client.prototype.cluster.prototype.nodeStats = ClientAction({
    name: 'cluster.node_stats',
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
  Client.prototype.cluster.prototype.putSettings = ClientAction({
    name: 'cluster.put_settings',
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
   * @param {Boolean} params.dry_run
   * @param {Boolean} params.filter_metadata
   */
  Client.prototype.cluster.prototype.reroute = ClientAction({
    name: 'cluster.reroute',
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
   * @param {Boolean} params.filter_blocks
   * @param {Boolean} params.filter_index_templates
   * @param {String|ArrayOfStrings|Boolean} params.filter_indices
   * @param {Boolean} params.filter_metadata
   * @param {Boolean} params.filter_nodes
   * @param {Boolean} params.filter_routing_table
   * @param {Boolean} params.local
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.cluster.prototype.state = ClientAction({
    name: 'cluster.state',
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
   * @param {String} [params.ignore_indices=none]
   * @param {Number} params.min_score
   * @param {String} params.preference
   * @param {String} params.routing
   * @param {String} params.source
   */
  Client.prototype.count = ClientAction({
    name: 'count',
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
   * @param {String} params.consistency
   * @param {String} params.id
   * @param {String} params.parent
   * @param {String} params.percolate
   * @param {Boolean} params.refresh
   * @param {String} [params.replication=sync]
   * @param {String} params.routing
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.timestamp
   * @param {Duration} params.ttl
   * @param {Number} params.version
   * @param {String} params.version_type
   */
  Client.prototype.create = ClientAction({
    name: 'create',
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
   * @param {String} params.consistency
   * @param {String} params.parent
   * @param {Boolean} params.refresh
   * @param {String} [params.replication=sync]
   * @param {String} params.routing
   * @param {Date|Number} params.timeout
   * @param {Number} params.version
   * @param {String} params.version_type
   */
  Client.prototype['delete'] = ClientAction({
    name: 'delete',
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
   * @param {String} params.analyzer
   * @param {String} params.consistency
   * @param {String} [params.default_operator=OR]
   * @param {String} params.df
   * @param {String} [params.ignore_indices=none]
   * @param {String} [params.replication=sync]
   * @param {String} params.q
   * @param {String} params.routing
   * @param {String} params.source
   * @param {Date|Number} params.timeout
   */
  Client.prototype.deleteByQuery = ClientAction({
    name: 'delete_by_query',
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
   * @param {String} params.parent
   * @param {String} params.preference
   * @param {Boolean} params.realtime
   * @param {Boolean} params.refresh
   * @param {String} params.routing
   */
  Client.prototype.exists = ClientAction({
    name: 'exists',
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
    castNotFound: true
  });

  /**
   * Perform a [explain](http://elasticsearch.org/guide/reference/api/explain/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Boolean} params.analyze_wildcard
   * @param {String} params.analyzer
   * @param {String} [params.default_operator=OR]
   * @param {String} params.df
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {Boolean} params.lenient
   * @param {Boolean} params.lowercase_expanded_terms
   * @param {String} params.parent
   * @param {String} params.preference
   * @param {String} params.q
   * @param {String} params.routing
   * @param {String} params.source
   * @param {String|ArrayOfStrings|Boolean} params._source
   * @param {String|ArrayOfStrings|Boolean} params._source_exclude
   * @param {String|ArrayOfStrings|Boolean} params._source_include
   */
  Client.prototype.explain = ClientAction({
    name: 'explain',
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
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {String} params.parent
   * @param {String} params.preference
   * @param {Boolean} params.realtime
   * @param {Boolean} params.refresh
   * @param {String} params.routing
   * @param {String|ArrayOfStrings|Boolean} params._source
   * @param {String|ArrayOfStrings|Boolean} params._source_exclude
   * @param {String|ArrayOfStrings|Boolean} params._source_include
   */
  Client.prototype.get = ClientAction({
    name: 'get',
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
   * @param {String|ArrayOfStrings|Boolean} params._source_exclude
   * @param {String|ArrayOfStrings|Boolean} params._source_include
   * @param {String} params.parent
   * @param {String} params.preference
   * @param {Boolean} params.realtime
   * @param {Boolean} params.refresh
   * @param {String} params.routing
   */
  Client.prototype.getSource = ClientAction({
    name: 'get_source',
    methods: [
      'GET'
    ],
    params: {
      _source_exclude: {
        type: 'list'
      },
      _source_include: {
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
   * @param {String} params.consistency
   * @param {String} [params.op_type=index]
   * @param {String} params.parent
   * @param {String} params.percolate
   * @param {Boolean} params.refresh
   * @param {String} [params.replication=sync]
   * @param {String} params.routing
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.timestamp
   * @param {Duration} params.ttl
   * @param {Number} params.version
   * @param {String} params.version_type
   */
  Client.prototype.index = ClientAction({
    name: 'index',
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

  /**
   * Perform a [indices.analyze](http://www.elasticsearch.org/guide/reference/api/admin-indices-analyze/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} params.analyzer
   * @param {String} params.field
   * @param {String|ArrayOfStrings|Boolean} params.filters
   * @param {String} params.index
   * @param {Boolean} params.prefer_local
   * @param {String} params.text
   * @param {String} params.tokenizer
   * @param {String} [params.format=detailed]
   */
  Client.prototype.indices.prototype.analyze = ClientAction({
    name: 'indices.analyze',
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
   * @param {Boolean} params.field_data
   * @param {Boolean} params.fielddata
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {Boolean} params.filter
   * @param {Boolean} params.filter_cache
   * @param {Boolean} params.filter_keys
   * @param {Boolean} params.id
   * @param {Boolean} params.id_cache
   * @param {String} [params.ignore_indices=none]
   * @param {String|ArrayOfStrings|Boolean} params.index
   * @param {Boolean} params.recycler
   */
  Client.prototype.indices.prototype.clearCache = ClientAction({
    name: 'indices.clear_cache',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.close = ClientAction({
    name: 'indices.close',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.create = ClientAction({
    name: 'indices.create',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype['delete'] = ClientAction({
    name: 'indices.delete',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.deleteAlias = ClientAction({
    name: 'indices.delete_alias',
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
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.deleteMapping = ClientAction({
    name: 'indices.delete_mapping',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.deleteTemplate = ClientAction({
    name: 'indices.delete_template',
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
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.deleteWarmer = ClientAction({
    name: 'indices.delete_warmer',
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
   */
  Client.prototype.indices.prototype.exists = ClientAction({
    name: 'indices.exists',
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
    castNotFound: true
  });

  /**
   * Perform a [indices.exists_alias](http://www.elasticsearch.org/guide/reference/api/admin-indices-aliases/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} [params.ignore_indices=none]
   */
  Client.prototype.indices.prototype.existsAlias = ClientAction({
    name: 'indices.exists_alias',
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
    castNotFound: true
  });

  /**
   * Perform a [indices.exists_type](http://www.elasticsearch.org/guide/reference/api/admin-indices-types-exists/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {String} [params.ignore_indices=none]
   */
  Client.prototype.indices.prototype.existsType = ClientAction({
    name: 'indices.exists_type',
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
    castNotFound: true
  });

  /**
   * Perform a [indices.flush](http://www.elasticsearch.org/guide/reference/api/admin-indices-flush/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   * @param {Boolean} params.force
   * @param {Boolean} params.full
   * @param {String} [params.ignore_indices=none]
   * @param {Boolean} params.refresh
   */
  Client.prototype.indices.prototype.flush = ClientAction({
    name: 'indices.flush',
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
   * @param {String} [params.ignore_indices=none]
   */
  Client.prototype.indices.prototype.getAlias = ClientAction({
    name: 'indices.get_alias',
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
   * @param {Date|Number} params.timeout
   */
  Client.prototype.indices.prototype.getAliases = ClientAction({
    name: 'indices.get_aliases',
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
   */
  Client.prototype.indices.prototype.getMapping = ClientAction({
    name: 'indices.get_mapping',
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
   */
  Client.prototype.indices.prototype.getSettings = ClientAction({
    name: 'indices.get_settings',
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
   */
  Client.prototype.indices.prototype.getTemplate = ClientAction({
    name: 'indices.get_template',
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
      }
    ]
  });

  /**
   * Perform a [indices.get_warmer](http://www.elasticsearch.org/guide/reference/api/admin-indices-warmers/) request
   *
   * @param {Object} params - An object with parameters used to carry out this action
   */
  Client.prototype.indices.prototype.getWarmer = ClientAction({
    name: 'indices.get_warmer',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.open = ClientAction({
    name: 'indices.open',
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
   * @param {Boolean} params.flush
   * @param {String} [params.ignore_indices=none]
   * @param {Number} params.max_num_segments
   * @param {Boolean} params.only_expunge_deletes
   * @param {*} params.operation_threading
   * @param {Boolean} params.refresh
   * @param {Boolean} params.wait_for_merge
   */
  Client.prototype.indices.prototype.optimize = ClientAction({
    name: 'indices.optimize',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.putAlias = ClientAction({
    name: 'indices.put_alias',
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
   * @param {Boolean} params.ignore_conflicts
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.putMapping = ClientAction({
    name: 'indices.put_mapping',
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
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.putSettings = ClientAction({
    name: 'indices.put_settings',
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
   * @param {Number} params.order
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.putTemplate = ClientAction({
    name: 'indices.put_template',
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
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.putWarmer = ClientAction({
    name: 'indices.put_warmer',
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
   * @param {String} [params.ignore_indices=none]
   * @param {*} params.operation_threading
   */
  Client.prototype.indices.prototype.refresh = ClientAction({
    name: 'indices.refresh',
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
   * @param {String} [params.ignore_indices=none]
   * @param {*} params.operation_threading
   */
  Client.prototype.indices.prototype.segments = ClientAction({
    name: 'indices.segments',
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
   * @param {String} [params.ignore_indices=none]
   */
  Client.prototype.indices.prototype.snapshotIndex = ClientAction({
    name: 'indices.snapshot_index',
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
   * @param {Boolean} params.all
   * @param {Boolean} params.clear
   * @param {Boolean} params.completion
   * @param {String|ArrayOfStrings|Boolean} params.completion_fields
   * @param {Boolean} params.docs
   * @param {Boolean} params.fielddata
   * @param {String|ArrayOfStrings|Boolean} params.fielddata_fields
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {Boolean} params.filter_cache
   * @param {Boolean} params.flush
   * @param {Boolean} params.get
   * @param {Boolean} params.groups
   * @param {Boolean} params.id_cache
   * @param {String} [params.ignore_indices=none]
   * @param {Boolean} params.indexing
   * @param {Boolean} params.merge
   * @param {Boolean} params.refresh
   * @param {Boolean} params.search
   * @param {Boolean} params.store
   * @param {Boolean} params.warmer
   */
  Client.prototype.indices.prototype.stats = ClientAction({
    name: 'indices.stats',
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
   * @param {String} [params.ignore_indices=none]
   * @param {*} params.operation_threading
   * @param {Boolean} params.recovery
   * @param {Boolean} params.snapshot
   */
  Client.prototype.indices.prototype.status = ClientAction({
    name: 'indices.status',
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
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.master_timeout
   */
  Client.prototype.indices.prototype.updateAliases = ClientAction({
    name: 'indices.update_aliases',
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
   * @param {Boolean} params.explain
   * @param {String} [params.ignore_indices=none]
   * @param {*} params.operation_threading
   * @param {String} params.source
   * @param {String} params.q
   */
  Client.prototype.indices.prototype.validateQuery = ClientAction({
    name: 'indices.validate_query',
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
  Client.prototype.info = ClientAction({
    name: 'info',
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
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {String} params.preference
   * @param {Boolean} params.realtime
   * @param {Boolean} params.refresh
   * @param {String|ArrayOfStrings|Boolean} params._source
   * @param {String|ArrayOfStrings|Boolean} params._source_exclude
   * @param {String|ArrayOfStrings|Boolean} params._source_include
   */
  Client.prototype.mget = ClientAction({
    name: 'mget',
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
   * @param {Number} params.boost_terms
   * @param {Number} params.max_doc_freq
   * @param {Number} params.max_query_terms
   * @param {Number} params.max_word_len
   * @param {Number} params.min_doc_freq
   * @param {Number} params.min_term_freq
   * @param {Number} params.min_word_len
   * @param {String|ArrayOfStrings|Boolean} params.mlt_fields
   * @param {Number} params.percent_terms_to_match
   * @param {String} params.routing
   * @param {Number} params.search_from
   * @param {String|ArrayOfStrings|Boolean} params.search_indices
   * @param {String} params.search_query_hint
   * @param {String} params.search_scroll
   * @param {Number} params.search_size
   * @param {String} params.search_source
   * @param {String} params.search_type
   * @param {String|ArrayOfStrings|Boolean} params.search_types
   * @param {String|ArrayOfStrings|Boolean} params.stop_words
   */
  Client.prototype.mlt = ClientAction({
    name: 'mlt',
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
   * @param {String} params.search_type
   */
  Client.prototype.msearch = ClientAction({
    name: 'msearch',
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
   * @param {Boolean} params.prefer_local
   */
  Client.prototype.percolate = ClientAction({
    name: 'percolate',
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
   * @param {Duration} params.scroll
   * @param {String} params.scroll_id
   */
  Client.prototype.scroll = ClientAction({
    name: 'scroll',
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
   * @param {String} params.analyzer
   * @param {Boolean} params.analyze_wildcard
   * @param {String} [params.default_operator=OR]
   * @param {String} params.df
   * @param {Boolean} params.explain
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {Number} params.from
   * @param {String} [params.ignore_indices=none]
   * @param {String|ArrayOfStrings|Boolean} params.indices_boost
   * @param {Boolean} params.lenient
   * @param {Boolean} params.lowercase_expanded_terms
   * @param {String} params.preference
   * @param {String} params.q
   * @param {String|ArrayOfStrings|Boolean} params.routing
   * @param {Duration} params.scroll
   * @param {String} params.search_type
   * @param {Number} params.size
   * @param {String|ArrayOfStrings|Boolean} params.sort
   * @param {String} params.source
   * @param {String|ArrayOfStrings|Boolean} params._source
   * @param {String|ArrayOfStrings|Boolean} params._source_exclude
   * @param {String|ArrayOfStrings|Boolean} params._source_include
   * @param {String|ArrayOfStrings|Boolean} params.stats
   * @param {String} params.suggest_field
   * @param {String} [params.suggest_mode=missing]
   * @param {Number} params.suggest_size
   * @param {Text} params.suggest_text
   * @param {Date|Number} params.timeout
   * @param {Boolean} params.version
   */
  Client.prototype.search = ClientAction({
    name: 'search',
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
   * @param {String} [params.ignore_indices=none]
   * @param {String} params.preference
   * @param {String} params.routing
   * @param {String} params.source
   */
  Client.prototype.suggest = ClientAction({
    name: 'suggest',
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
   * @param {String} params.consistency
   * @param {String|ArrayOfStrings|Boolean} params.fields
   * @param {String} params.lang
   * @param {String} params.parent
   * @param {String} params.percolate
   * @param {Boolean} params.refresh
   * @param {String} [params.replication=sync]
   * @param {Number} params.retry_on_conflict
   * @param {String} params.routing
   * @param {*} params.script
   * @param {Date|Number} params.timeout
   * @param {Date|Number} params.timestamp
   * @param {Duration} params.ttl
   * @param {Number} params.version
   * @param {Number} params.version_type
   */
  Client.prototype.update = ClientAction({
    name: 'update',
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

};