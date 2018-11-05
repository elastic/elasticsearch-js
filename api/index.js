'use strict'

const assert = require('assert')

function ESAPI (opts) {
  assert(opts.makeRequest, 'Missing makeRequest function')
  assert(opts.ConfigurationError, 'Missing ConfigurationError class')
  assert(opts.result, 'Missing default result object')

  const apis = {
    bulk: require('./api/bulk.js')(opts),
    cat: {
      aliases: require('./api/cat.aliases.js')(opts),
      allocation: require('./api/cat.allocation.js')(opts),
      count: require('./api/cat.count.js')(opts),
      fielddata: require('./api/cat.fielddata.js')(opts),
      health: require('./api/cat.health.js')(opts),
      help: require('./api/cat.help.js')(opts),
      indices: require('./api/cat.indices.js')(opts),
      master: require('./api/cat.master.js')(opts),
      nodeattrs: require('./api/cat.nodeattrs.js')(opts),
      nodes: require('./api/cat.nodes.js')(opts),
      pending_tasks: require('./api/cat.pending_tasks.js')(opts),
      plugins: require('./api/cat.plugins.js')(opts),
      recovery: require('./api/cat.recovery.js')(opts),
      repositories: require('./api/cat.repositories.js')(opts),
      segments: require('./api/cat.segments.js')(opts),
      shards: require('./api/cat.shards.js')(opts),
      snapshots: require('./api/cat.snapshots.js')(opts),
      tasks: require('./api/cat.tasks.js')(opts),
      templates: require('./api/cat.templates.js')(opts),
      thread_pool: require('./api/cat.thread_pool.js')(opts)
    },
    clear_scroll: require('./api/clear_scroll.js')(opts),
    cluster: {
      allocation_explain: require('./api/cluster.allocation_explain.js')(opts),
      get_settings: require('./api/cluster.get_settings.js')(opts),
      health: require('./api/cluster.health.js')(opts),
      pending_tasks: require('./api/cluster.pending_tasks.js')(opts),
      put_settings: require('./api/cluster.put_settings.js')(opts),
      remote_info: require('./api/cluster.remote_info.js')(opts),
      reroute: require('./api/cluster.reroute.js')(opts),
      state: require('./api/cluster.state.js')(opts),
      stats: require('./api/cluster.stats.js')(opts)
    },
    count: require('./api/count.js')(opts),
    create: require('./api/create.js')(opts),
    delete: require('./api/delete.js')(opts),
    delete_by_query: require('./api/delete_by_query.js')(opts),
    delete_script: require('./api/delete_script.js')(opts),
    exists: require('./api/exists.js')(opts),
    exists_source: require('./api/exists_source.js')(opts),
    explain: require('./api/explain.js')(opts),
    field_caps: require('./api/field_caps.js')(opts),
    get: require('./api/get.js')(opts),
    get_script: require('./api/get_script.js')(opts),
    get_source: require('./api/get_source.js')(opts),
    index: require('./api/index.js')(opts),
    indices: {
      analyze: require('./api/indices.analyze.js')(opts),
      clear_cache: require('./api/indices.clear_cache.js')(opts),
      close: require('./api/indices.close.js')(opts),
      create: require('./api/indices.create.js')(opts),
      delete: require('./api/indices.delete.js')(opts),
      delete_alias: require('./api/indices.delete_alias.js')(opts),
      delete_template: require('./api/indices.delete_template.js')(opts),
      exists: require('./api/indices.exists.js')(opts),
      exists_alias: require('./api/indices.exists_alias.js')(opts),
      exists_template: require('./api/indices.exists_template.js')(opts),
      exists_type: require('./api/indices.exists_type.js')(opts),
      flush: require('./api/indices.flush.js')(opts),
      flush_synced: require('./api/indices.flush_synced.js')(opts),
      forcemerge: require('./api/indices.forcemerge.js')(opts),
      get: require('./api/indices.get.js')(opts),
      get_alias: require('./api/indices.get_alias.js')(opts),
      get_field_mapping: require('./api/indices.get_field_mapping.js')(opts),
      get_mapping: require('./api/indices.get_mapping.js')(opts),
      get_settings: require('./api/indices.get_settings.js')(opts),
      get_template: require('./api/indices.get_template.js')(opts),
      get_upgrade: require('./api/indices.get_upgrade.js')(opts),
      open: require('./api/indices.open.js')(opts),
      put_alias: require('./api/indices.put_alias.js')(opts),
      put_mapping: require('./api/indices.put_mapping.js')(opts),
      put_settings: require('./api/indices.put_settings.js')(opts),
      put_template: require('./api/indices.put_template.js')(opts),
      recovery: require('./api/indices.recovery.js')(opts),
      refresh: require('./api/indices.refresh.js')(opts),
      rollover: require('./api/indices.rollover.js')(opts),
      segments: require('./api/indices.segments.js')(opts),
      shard_stores: require('./api/indices.shard_stores.js')(opts),
      shrink: require('./api/indices.shrink.js')(opts),
      split: require('./api/indices.split.js')(opts),
      stats: require('./api/indices.stats.js')(opts),
      update_aliases: require('./api/indices.update_aliases.js')(opts),
      upgrade: require('./api/indices.upgrade.js')(opts),
      validate_query: require('./api/indices.validate_query.js')(opts)
    },
    info: require('./api/info.js')(opts),
    ingest: {
      delete_pipeline: require('./api/ingest.delete_pipeline.js')(opts),
      get_pipeline: require('./api/ingest.get_pipeline.js')(opts),
      processor_grok: require('./api/ingest.processor_grok.js')(opts),
      put_pipeline: require('./api/ingest.put_pipeline.js')(opts),
      simulate: require('./api/ingest.simulate.js')(opts)
    },
    mget: require('./api/mget.js')(opts),
    msearch: require('./api/msearch.js')(opts),
    msearch_template: require('./api/msearch_template.js')(opts),
    mtermvectors: require('./api/mtermvectors.js')(opts),
    nodes: {
      hot_threads: require('./api/nodes.hot_threads.js')(opts),
      info: require('./api/nodes.info.js')(opts),
      stats: require('./api/nodes.stats.js')(opts),
      usage: require('./api/nodes.usage.js')(opts)
    },
    ping: require('./api/ping.js')(opts),
    put_script: require('./api/put_script.js')(opts),
    rank_eval: require('./api/rank_eval.js')(opts),
    reindex: require('./api/reindex.js')(opts),
    reindex_rethrottle: require('./api/reindex_rethrottle.js')(opts),
    render_search_template: require('./api/render_search_template.js')(opts),
    scripts_painless_execute: require('./api/scripts_painless_execute.js')(opts),
    scroll: require('./api/scroll.js')(opts),
    search: require('./api/search.js')(opts),
    search_shards: require('./api/search_shards.js')(opts),
    search_template: require('./api/search_template.js')(opts),
    snapshot: {
      create: require('./api/snapshot.create.js')(opts),
      create_repository: require('./api/snapshot.create_repository.js')(opts),
      delete: require('./api/snapshot.delete.js')(opts),
      delete_repository: require('./api/snapshot.delete_repository.js')(opts),
      get: require('./api/snapshot.get.js')(opts),
      get_repository: require('./api/snapshot.get_repository.js')(opts),
      restore: require('./api/snapshot.restore.js')(opts),
      status: require('./api/snapshot.status.js')(opts),
      verify_repository: require('./api/snapshot.verify_repository.js')(opts)
    },
    tasks: {
      cancel: require('./api/tasks.cancel.js')(opts),
      get: require('./api/tasks.get.js')(opts),
      list: require('./api/tasks.list.js')(opts)
    },
    termvectors: require('./api/termvectors.js')(opts),
    update: require('./api/update.js')(opts),
    update_by_query: require('./api/update_by_query.js')(opts)
  }

  Object.defineProperties(apis.cat, {
    pendingTasks: {
      get: function () { return this.pending_tasks },
      enumerable: true
    },
    threadPool: {
      get: function () { return this.thread_pool },
      enumerable: true
    }
  })

  Object.defineProperties(apis, {
    clearScroll: {
      get: function () { return this.clear_scroll },
      enumerable: true
    },
    deleteByQuery: {
      get: function () { return this.delete_by_query },
      enumerable: true
    },
    deleteScript: {
      get: function () { return this.delete_script },
      enumerable: true
    },
    existsSource: {
      get: function () { return this.exists_source },
      enumerable: true
    },
    fieldCaps: {
      get: function () { return this.field_caps },
      enumerable: true
    },
    getScript: {
      get: function () { return this.get_script },
      enumerable: true
    },
    getSource: {
      get: function () { return this.get_source },
      enumerable: true
    },
    msearchTemplate: {
      get: function () { return this.msearch_template },
      enumerable: true
    },
    putScript: {
      get: function () { return this.put_script },
      enumerable: true
    },
    rankEval: {
      get: function () { return this.rank_eval },
      enumerable: true
    },
    reindexRethrottle: {
      get: function () { return this.reindex_rethrottle },
      enumerable: true
    },
    renderSearchTemplate: {
      get: function () { return this.render_search_template },
      enumerable: true
    },
    scriptsPainlessExecute: {
      get: function () { return this.scripts_painless_execute },
      enumerable: true
    },
    searchShards: {
      get: function () { return this.search_shards },
      enumerable: true
    },
    searchTemplate: {
      get: function () { return this.search_template },
      enumerable: true
    },
    updateByQuery: {
      get: function () { return this.update_by_query },
      enumerable: true
    }
  })

  Object.defineProperties(apis.cluster, {
    allocationExplain: {
      get: function () { return this.allocation_explain },
      enumerable: true
    },
    getSettings: {
      get: function () { return this.get_settings },
      enumerable: true
    },
    pendingTasks: {
      get: function () { return this.pending_tasks },
      enumerable: true
    },
    putSettings: {
      get: function () { return this.put_settings },
      enumerable: true
    },
    remoteInfo: {
      get: function () { return this.remote_info },
      enumerable: true
    }
  })

  Object.defineProperties(apis.indices, {
    clearCache: {
      get: function () { return this.clear_cache },
      enumerable: true
    },
    deleteAlias: {
      get: function () { return this.delete_alias },
      enumerable: true
    },
    deleteTemplate: {
      get: function () { return this.delete_template },
      enumerable: true
    },
    existsAlias: {
      get: function () { return this.exists_alias },
      enumerable: true
    },
    existsTemplate: {
      get: function () { return this.exists_template },
      enumerable: true
    },
    existsType: {
      get: function () { return this.exists_type },
      enumerable: true
    },
    flushSynced: {
      get: function () { return this.flush_synced },
      enumerable: true
    },
    getAlias: {
      get: function () { return this.get_alias },
      enumerable: true
    },
    getFieldMapping: {
      get: function () { return this.get_field_mapping },
      enumerable: true
    },
    getMapping: {
      get: function () { return this.get_mapping },
      enumerable: true
    },
    getSettings: {
      get: function () { return this.get_settings },
      enumerable: true
    },
    getTemplate: {
      get: function () { return this.get_template },
      enumerable: true
    },
    getUpgrade: {
      get: function () { return this.get_upgrade },
      enumerable: true
    },
    putAlias: {
      get: function () { return this.put_alias },
      enumerable: true
    },
    putMapping: {
      get: function () { return this.put_mapping },
      enumerable: true
    },
    putSettings: {
      get: function () { return this.put_settings },
      enumerable: true
    },
    putTemplate: {
      get: function () { return this.put_template },
      enumerable: true
    },
    shardStores: {
      get: function () { return this.shard_stores },
      enumerable: true
    },
    updateAliases: {
      get: function () { return this.update_aliases },
      enumerable: true
    },
    validateQuery: {
      get: function () { return this.validate_query },
      enumerable: true
    }
  })

  Object.defineProperties(apis.ingest, {
    deletePipeline: {
      get: function () { return this.delete_pipeline },
      enumerable: true
    },
    getPipeline: {
      get: function () { return this.get_pipeline },
      enumerable: true
    },
    processorGrok: {
      get: function () { return this.processor_grok },
      enumerable: true
    },
    putPipeline: {
      get: function () { return this.put_pipeline },
      enumerable: true
    }
  })

  Object.defineProperties(apis.nodes, {
    hotThreads: {
      get: function () { return this.hot_threads },
      enumerable: true
    }
  })

  Object.defineProperties(apis.snapshot, {
    createRepository: {
      get: function () { return this.create_repository },
      enumerable: true
    },
    deleteRepository: {
      get: function () { return this.delete_repository },
      enumerable: true
    },
    getRepository: {
      get: function () { return this.get_repository },
      enumerable: true
    },
    verifyRepository: {
      get: function () { return this.verify_repository },
      enumerable: true
    }
  })

  return apis
}

module.exports = ESAPI
