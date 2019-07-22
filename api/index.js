// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const assert = require('assert')

function ESAPI (opts) {
  assert(opts.makeRequest, 'Missing makeRequest function')
  assert(opts.ConfigurationError, 'Missing ConfigurationError class')
  assert(opts.result, 'Missing default result object')

  const { result } = opts
  opts.handleError = handleError
  opts.snakeCaseKeys = snakeCaseKeys

  const apis = {
    bulk: lazyLoad('bulk', opts),
    cat: {
      aliases: lazyLoad('cat.aliases', opts),
      allocation: lazyLoad('cat.allocation', opts),
      count: lazyLoad('cat.count', opts),
      fielddata: lazyLoad('cat.fielddata', opts),
      health: lazyLoad('cat.health', opts),
      help: lazyLoad('cat.help', opts),
      indices: lazyLoad('cat.indices', opts),
      master: lazyLoad('cat.master', opts),
      nodeattrs: lazyLoad('cat.nodeattrs', opts),
      nodes: lazyLoad('cat.nodes', opts),
      pending_tasks: lazyLoad('cat.pending_tasks', opts),
      pendingTasks: lazyLoad('cat.pending_tasks', opts),
      plugins: lazyLoad('cat.plugins', opts),
      recovery: lazyLoad('cat.recovery', opts),
      repositories: lazyLoad('cat.repositories', opts),
      segments: lazyLoad('cat.segments', opts),
      shards: lazyLoad('cat.shards', opts),
      snapshots: lazyLoad('cat.snapshots', opts),
      tasks: lazyLoad('cat.tasks', opts),
      templates: lazyLoad('cat.templates', opts),
      thread_pool: lazyLoad('cat.thread_pool', opts),
      threadPool: lazyLoad('cat.thread_pool', opts)
    },
    clear_scroll: lazyLoad('clear_scroll', opts),
    clearScroll: lazyLoad('clear_scroll', opts),
    cluster: {
      allocation_explain: lazyLoad('cluster.allocation_explain', opts),
      allocationExplain: lazyLoad('cluster.allocation_explain', opts),
      get_settings: lazyLoad('cluster.get_settings', opts),
      getSettings: lazyLoad('cluster.get_settings', opts),
      health: lazyLoad('cluster.health', opts),
      pending_tasks: lazyLoad('cluster.pending_tasks', opts),
      pendingTasks: lazyLoad('cluster.pending_tasks', opts),
      put_settings: lazyLoad('cluster.put_settings', opts),
      putSettings: lazyLoad('cluster.put_settings', opts),
      remote_info: lazyLoad('cluster.remote_info', opts),
      remoteInfo: lazyLoad('cluster.remote_info', opts),
      reroute: lazyLoad('cluster.reroute', opts),
      state: lazyLoad('cluster.state', opts),
      stats: lazyLoad('cluster.stats', opts)
    },
    count: lazyLoad('count', opts),
    count_percolate: lazyLoad('count_percolate', opts),
    countPercolate: lazyLoad('count_percolate', opts),
    create: lazyLoad('create', opts),
    delete: lazyLoad('delete', opts),
    delete_by_query: lazyLoad('delete_by_query', opts),
    deleteByQuery: lazyLoad('delete_by_query', opts),
    delete_script: lazyLoad('delete_script', opts),
    deleteScript: lazyLoad('delete_script', opts),
    delete_template: lazyLoad('delete_template', opts),
    deleteTemplate: lazyLoad('delete_template', opts),
    exists: lazyLoad('exists', opts),
    exists_source: lazyLoad('exists_source', opts),
    existsSource: lazyLoad('exists_source', opts),
    explain: lazyLoad('explain', opts),
    field_caps: lazyLoad('field_caps', opts),
    fieldCaps: lazyLoad('field_caps', opts),
    field_stats: lazyLoad('field_stats', opts),
    fieldStats: lazyLoad('field_stats', opts),
    get: lazyLoad('get', opts),
    get_script: lazyLoad('get_script', opts),
    getScript: lazyLoad('get_script', opts),
    get_source: lazyLoad('get_source', opts),
    getSource: lazyLoad('get_source', opts),
    get_template: lazyLoad('get_template', opts),
    getTemplate: lazyLoad('get_template', opts),
    index: lazyLoad('index', opts),
    indices: {
      analyze: lazyLoad('indices.analyze', opts),
      clear_cache: lazyLoad('indices.clear_cache', opts),
      clearCache: lazyLoad('indices.clear_cache', opts),
      close: lazyLoad('indices.close', opts),
      create: lazyLoad('indices.create', opts),
      delete: lazyLoad('indices.delete', opts),
      delete_alias: lazyLoad('indices.delete_alias', opts),
      deleteAlias: lazyLoad('indices.delete_alias', opts),
      delete_template: lazyLoad('indices.delete_template', opts),
      deleteTemplate: lazyLoad('indices.delete_template', opts),
      exists: lazyLoad('indices.exists', opts),
      exists_alias: lazyLoad('indices.exists_alias', opts),
      existsAlias: lazyLoad('indices.exists_alias', opts),
      exists_template: lazyLoad('indices.exists_template', opts),
      existsTemplate: lazyLoad('indices.exists_template', opts),
      exists_type: lazyLoad('indices.exists_type', opts),
      existsType: lazyLoad('indices.exists_type', opts),
      flush: lazyLoad('indices.flush', opts),
      flush_synced: lazyLoad('indices.flush_synced', opts),
      flushSynced: lazyLoad('indices.flush_synced', opts),
      forcemerge: lazyLoad('indices.forcemerge', opts),
      get: lazyLoad('indices.get', opts),
      get_alias: lazyLoad('indices.get_alias', opts),
      getAlias: lazyLoad('indices.get_alias', opts),
      get_field_mapping: lazyLoad('indices.get_field_mapping', opts),
      getFieldMapping: lazyLoad('indices.get_field_mapping', opts),
      get_mapping: lazyLoad('indices.get_mapping', opts),
      getMapping: lazyLoad('indices.get_mapping', opts),
      get_settings: lazyLoad('indices.get_settings', opts),
      getSettings: lazyLoad('indices.get_settings', opts),
      get_template: lazyLoad('indices.get_template', opts),
      getTemplate: lazyLoad('indices.get_template', opts),
      get_upgrade: lazyLoad('indices.get_upgrade', opts),
      getUpgrade: lazyLoad('indices.get_upgrade', opts),
      open: lazyLoad('indices.open', opts),
      put_alias: lazyLoad('indices.put_alias', opts),
      putAlias: lazyLoad('indices.put_alias', opts),
      put_mapping: lazyLoad('indices.put_mapping', opts),
      putMapping: lazyLoad('indices.put_mapping', opts),
      put_settings: lazyLoad('indices.put_settings', opts),
      putSettings: lazyLoad('indices.put_settings', opts),
      put_template: lazyLoad('indices.put_template', opts),
      putTemplate: lazyLoad('indices.put_template', opts),
      recovery: lazyLoad('indices.recovery', opts),
      refresh: lazyLoad('indices.refresh', opts),
      rollover: lazyLoad('indices.rollover', opts),
      segments: lazyLoad('indices.segments', opts),
      shard_stores: lazyLoad('indices.shard_stores', opts),
      shardStores: lazyLoad('indices.shard_stores', opts),
      shrink: lazyLoad('indices.shrink', opts),
      stats: lazyLoad('indices.stats', opts),
      update_aliases: lazyLoad('indices.update_aliases', opts),
      updateAliases: lazyLoad('indices.update_aliases', opts),
      upgrade: lazyLoad('indices.upgrade', opts),
      validate_query: lazyLoad('indices.validate_query', opts),
      validateQuery: lazyLoad('indices.validate_query', opts)
    },
    info: lazyLoad('info', opts),
    ingest: {
      delete_pipeline: lazyLoad('ingest.delete_pipeline', opts),
      deletePipeline: lazyLoad('ingest.delete_pipeline', opts),
      get_pipeline: lazyLoad('ingest.get_pipeline', opts),
      getPipeline: lazyLoad('ingest.get_pipeline', opts),
      processor_grok: lazyLoad('ingest.processor_grok', opts),
      processorGrok: lazyLoad('ingest.processor_grok', opts),
      put_pipeline: lazyLoad('ingest.put_pipeline', opts),
      putPipeline: lazyLoad('ingest.put_pipeline', opts),
      simulate: lazyLoad('ingest.simulate', opts)
    },
    mget: lazyLoad('mget', opts),
    mpercolate: lazyLoad('mpercolate', opts),
    msearch: lazyLoad('msearch', opts),
    msearch_template: lazyLoad('msearch_template', opts),
    msearchTemplate: lazyLoad('msearch_template', opts),
    mtermvectors: lazyLoad('mtermvectors', opts),
    nodes: {
      hot_threads: lazyLoad('nodes.hot_threads', opts),
      hotThreads: lazyLoad('nodes.hot_threads', opts),
      info: lazyLoad('nodes.info', opts),
      stats: lazyLoad('nodes.stats', opts)
    },
    percolate: lazyLoad('percolate', opts),
    ping: lazyLoad('ping', opts),
    put_script: lazyLoad('put_script', opts),
    putScript: lazyLoad('put_script', opts),
    put_template: lazyLoad('put_template', opts),
    putTemplate: lazyLoad('put_template', opts),
    reindex: lazyLoad('reindex', opts),
    reindex_rethrottle: lazyLoad('reindex_rethrottle', opts),
    reindexRethrottle: lazyLoad('reindex_rethrottle', opts),
    render_search_template: lazyLoad('render_search_template', opts),
    renderSearchTemplate: lazyLoad('render_search_template', opts),
    scroll: lazyLoad('scroll', opts),
    search: lazyLoad('search', opts),
    search_shards: lazyLoad('search_shards', opts),
    searchShards: lazyLoad('search_shards', opts),
    search_template: lazyLoad('search_template', opts),
    searchTemplate: lazyLoad('search_template', opts),
    snapshot: {
      create: lazyLoad('snapshot.create', opts),
      create_repository: lazyLoad('snapshot.create_repository', opts),
      createRepository: lazyLoad('snapshot.create_repository', opts),
      delete: lazyLoad('snapshot.delete', opts),
      delete_repository: lazyLoad('snapshot.delete_repository', opts),
      deleteRepository: lazyLoad('snapshot.delete_repository', opts),
      get: lazyLoad('snapshot.get', opts),
      get_repository: lazyLoad('snapshot.get_repository', opts),
      getRepository: lazyLoad('snapshot.get_repository', opts),
      restore: lazyLoad('snapshot.restore', opts),
      status: lazyLoad('snapshot.status', opts),
      verify_repository: lazyLoad('snapshot.verify_repository', opts),
      verifyRepository: lazyLoad('snapshot.verify_repository', opts)
    },
    suggest: lazyLoad('suggest', opts),
    tasks: {
      cancel: lazyLoad('tasks.cancel', opts),
      get: lazyLoad('tasks.get', opts),
      list: lazyLoad('tasks.list', opts)
    },
    termvectors: lazyLoad('termvectors', opts),
    update: lazyLoad('update', opts),
    update_by_query: lazyLoad('update_by_query', opts),
    updateByQuery: lazyLoad('update_by_query', opts)
  }

  return apis

  function handleError (err, callback) {
    if (callback) return callback(err, result)
    return Promise.reject(err)
  }

  function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
    var target = {}
    var keys = Object.keys(querystring)
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      target[snakeCase[key] || key] = querystring[key]
      if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
        warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
      }
    }
    return target
  }
}

// It's unlikely that a user needs all of our APIs,
// and since require is a sync operation that takes time
// (given the amount of APIs we have), let's lazy load them,
// so a given API file will be required only
// if the user actually needs that API.
// The following implementation takes advantage
// of js closures to have a simple cache with the least overhead.
function lazyLoad (file, opts) {
  var fn = null
  return function _lazyLoad (params, options, callback) {
    if (fn === null) {
      fn = require(`./api/${file}.js`)(opts)
    }
    return fn(params, options, callback)
  }
}

module.exports = ESAPI
