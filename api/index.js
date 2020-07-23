/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
    ccr: {
      delete_auto_follow_pattern: lazyLoad('ccr.delete_auto_follow_pattern', opts),
      deleteAutoFollowPattern: lazyLoad('ccr.delete_auto_follow_pattern', opts),
      follow: lazyLoad('ccr.follow', opts),
      follow_info: lazyLoad('ccr.follow_info', opts),
      followInfo: lazyLoad('ccr.follow_info', opts),
      follow_stats: lazyLoad('ccr.follow_stats', opts),
      followStats: lazyLoad('ccr.follow_stats', opts),
      forget_follower: lazyLoad('ccr.forget_follower', opts),
      forgetFollower: lazyLoad('ccr.forget_follower', opts),
      get_auto_follow_pattern: lazyLoad('ccr.get_auto_follow_pattern', opts),
      getAutoFollowPattern: lazyLoad('ccr.get_auto_follow_pattern', opts),
      pause_follow: lazyLoad('ccr.pause_follow', opts),
      pauseFollow: lazyLoad('ccr.pause_follow', opts),
      put_auto_follow_pattern: lazyLoad('ccr.put_auto_follow_pattern', opts),
      putAutoFollowPattern: lazyLoad('ccr.put_auto_follow_pattern', opts),
      resume_follow: lazyLoad('ccr.resume_follow', opts),
      resumeFollow: lazyLoad('ccr.resume_follow', opts),
      stats: lazyLoad('ccr.stats', opts),
      unfollow: lazyLoad('ccr.unfollow', opts)
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
    create: lazyLoad('create', opts),
    delete: lazyLoad('delete', opts),
    delete_by_query: lazyLoad('delete_by_query', opts),
    deleteByQuery: lazyLoad('delete_by_query', opts),
    delete_by_query_rethrottle: lazyLoad('delete_by_query_rethrottle', opts),
    deleteByQueryRethrottle: lazyLoad('delete_by_query_rethrottle', opts),
    delete_script: lazyLoad('delete_script', opts),
    deleteScript: lazyLoad('delete_script', opts),
    exists: lazyLoad('exists', opts),
    exists_source: lazyLoad('exists_source', opts),
    existsSource: lazyLoad('exists_source', opts),
    explain: lazyLoad('explain', opts),
    field_caps: lazyLoad('field_caps', opts),
    fieldCaps: lazyLoad('field_caps', opts),
    get: lazyLoad('get', opts),
    get_script: lazyLoad('get_script', opts),
    getScript: lazyLoad('get_script', opts),
    get_source: lazyLoad('get_source', opts),
    getSource: lazyLoad('get_source', opts),
    ilm: {
      delete_lifecycle: lazyLoad('ilm.delete_lifecycle', opts),
      deleteLifecycle: lazyLoad('ilm.delete_lifecycle', opts),
      explain_lifecycle: lazyLoad('ilm.explain_lifecycle', opts),
      explainLifecycle: lazyLoad('ilm.explain_lifecycle', opts),
      get_lifecycle: lazyLoad('ilm.get_lifecycle', opts),
      getLifecycle: lazyLoad('ilm.get_lifecycle', opts),
      get_status: lazyLoad('ilm.get_status', opts),
      getStatus: lazyLoad('ilm.get_status', opts),
      move_to_step: lazyLoad('ilm.move_to_step', opts),
      moveToStep: lazyLoad('ilm.move_to_step', opts),
      put_lifecycle: lazyLoad('ilm.put_lifecycle', opts),
      putLifecycle: lazyLoad('ilm.put_lifecycle', opts),
      remove_policy: lazyLoad('ilm.remove_policy', opts),
      removePolicy: lazyLoad('ilm.remove_policy', opts),
      retry: lazyLoad('ilm.retry', opts),
      start: lazyLoad('ilm.start', opts),
      stop: lazyLoad('ilm.stop', opts)
    },
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
      freeze: lazyLoad('indices.freeze', opts),
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
      split: lazyLoad('indices.split', opts),
      stats: lazyLoad('indices.stats', opts),
      unfreeze: lazyLoad('indices.unfreeze', opts),
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
    msearch: lazyLoad('msearch', opts),
    msearch_template: lazyLoad('msearch_template', opts),
    msearchTemplate: lazyLoad('msearch_template', opts),
    mtermvectors: lazyLoad('mtermvectors', opts),
    nodes: {
      hot_threads: lazyLoad('nodes.hot_threads', opts),
      hotThreads: lazyLoad('nodes.hot_threads', opts),
      info: lazyLoad('nodes.info', opts),
      reload_secure_settings: lazyLoad('nodes.reload_secure_settings', opts),
      reloadSecureSettings: lazyLoad('nodes.reload_secure_settings', opts),
      stats: lazyLoad('nodes.stats', opts),
      usage: lazyLoad('nodes.usage', opts)
    },
    ping: lazyLoad('ping', opts),
    put_script: lazyLoad('put_script', opts),
    putScript: lazyLoad('put_script', opts),
    rank_eval: lazyLoad('rank_eval', opts),
    rankEval: lazyLoad('rank_eval', opts),
    reindex: lazyLoad('reindex', opts),
    reindex_rethrottle: lazyLoad('reindex_rethrottle', opts),
    reindexRethrottle: lazyLoad('reindex_rethrottle', opts),
    render_search_template: lazyLoad('render_search_template', opts),
    renderSearchTemplate: lazyLoad('render_search_template', opts),
    scripts_painless_execute: lazyLoad('scripts_painless_execute', opts),
    scriptsPainlessExecute: lazyLoad('scripts_painless_execute', opts),
    scroll: lazyLoad('scroll', opts),
    search: lazyLoad('search', opts),
    search_shards: lazyLoad('search_shards', opts),
    searchShards: lazyLoad('search_shards', opts),
    search_template: lazyLoad('search_template', opts),
    searchTemplate: lazyLoad('search_template', opts),
    security: {
      create_api_key: lazyLoad('security.create_api_key', opts),
      createApiKey: lazyLoad('security.create_api_key', opts),
      get_api_key: lazyLoad('security.get_api_key', opts),
      getApiKey: lazyLoad('security.get_api_key', opts),
      invalidate_api_key: lazyLoad('security.invalidate_api_key', opts),
      invalidateApiKey: lazyLoad('security.invalidate_api_key', opts)
    },
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
    tasks: {
      cancel: lazyLoad('tasks.cancel', opts),
      get: lazyLoad('tasks.get', opts),
      list: lazyLoad('tasks.list', opts)
    },
    termvectors: lazyLoad('termvectors', opts),
    update: lazyLoad('update', opts),
    update_by_query: lazyLoad('update_by_query', opts),
    updateByQuery: lazyLoad('update_by_query', opts),
    update_by_query_rethrottle: lazyLoad('update_by_query_rethrottle', opts),
    updateByQueryRethrottle: lazyLoad('update_by_query_rethrottle', opts),
    xpack: {
      graph: {
        explore: lazyLoad('xpack.graph.explore', opts)
      },
      info: lazyLoad('xpack.info', opts),
      license: {
        delete: lazyLoad('xpack.license.delete', opts),
        get: lazyLoad('xpack.license.get', opts),
        get_basic_status: lazyLoad('xpack.license.get_basic_status', opts),
        getBasicStatus: lazyLoad('xpack.license.get_basic_status', opts),
        get_trial_status: lazyLoad('xpack.license.get_trial_status', opts),
        getTrialStatus: lazyLoad('xpack.license.get_trial_status', opts),
        post: lazyLoad('xpack.license.post', opts),
        post_start_basic: lazyLoad('xpack.license.post_start_basic', opts),
        postStartBasic: lazyLoad('xpack.license.post_start_basic', opts),
        post_start_trial: lazyLoad('xpack.license.post_start_trial', opts),
        postStartTrial: lazyLoad('xpack.license.post_start_trial', opts)
      },
      migration: {
        deprecations: lazyLoad('xpack.migration.deprecations', opts),
        get_assistance: lazyLoad('xpack.migration.get_assistance', opts),
        getAssistance: lazyLoad('xpack.migration.get_assistance', opts),
        upgrade: lazyLoad('xpack.migration.upgrade', opts)
      },
      ml: {
        close_job: lazyLoad('xpack.ml.close_job', opts),
        closeJob: lazyLoad('xpack.ml.close_job', opts),
        delete_calendar: lazyLoad('xpack.ml.delete_calendar', opts),
        deleteCalendar: lazyLoad('xpack.ml.delete_calendar', opts),
        delete_calendar_event: lazyLoad('xpack.ml.delete_calendar_event', opts),
        deleteCalendarEvent: lazyLoad('xpack.ml.delete_calendar_event', opts),
        delete_calendar_job: lazyLoad('xpack.ml.delete_calendar_job', opts),
        deleteCalendarJob: lazyLoad('xpack.ml.delete_calendar_job', opts),
        delete_datafeed: lazyLoad('xpack.ml.delete_datafeed', opts),
        deleteDatafeed: lazyLoad('xpack.ml.delete_datafeed', opts),
        delete_expired_data: lazyLoad('xpack.ml.delete_expired_data', opts),
        deleteExpiredData: lazyLoad('xpack.ml.delete_expired_data', opts),
        delete_filter: lazyLoad('xpack.ml.delete_filter', opts),
        deleteFilter: lazyLoad('xpack.ml.delete_filter', opts),
        delete_forecast: lazyLoad('xpack.ml.delete_forecast', opts),
        deleteForecast: lazyLoad('xpack.ml.delete_forecast', opts),
        delete_job: lazyLoad('xpack.ml.delete_job', opts),
        deleteJob: lazyLoad('xpack.ml.delete_job', opts),
        delete_model_snapshot: lazyLoad('xpack.ml.delete_model_snapshot', opts),
        deleteModelSnapshot: lazyLoad('xpack.ml.delete_model_snapshot', opts),
        find_file_structure: lazyLoad('xpack.ml.find_file_structure', opts),
        findFileStructure: lazyLoad('xpack.ml.find_file_structure', opts),
        flush_job: lazyLoad('xpack.ml.flush_job', opts),
        flushJob: lazyLoad('xpack.ml.flush_job', opts),
        forecast: lazyLoad('xpack.ml.forecast', opts),
        get_buckets: lazyLoad('xpack.ml.get_buckets', opts),
        getBuckets: lazyLoad('xpack.ml.get_buckets', opts),
        get_calendar_events: lazyLoad('xpack.ml.get_calendar_events', opts),
        getCalendarEvents: lazyLoad('xpack.ml.get_calendar_events', opts),
        get_calendars: lazyLoad('xpack.ml.get_calendars', opts),
        getCalendars: lazyLoad('xpack.ml.get_calendars', opts),
        get_categories: lazyLoad('xpack.ml.get_categories', opts),
        getCategories: lazyLoad('xpack.ml.get_categories', opts),
        get_datafeed_stats: lazyLoad('xpack.ml.get_datafeed_stats', opts),
        getDatafeedStats: lazyLoad('xpack.ml.get_datafeed_stats', opts),
        get_datafeeds: lazyLoad('xpack.ml.get_datafeeds', opts),
        getDatafeeds: lazyLoad('xpack.ml.get_datafeeds', opts),
        get_filters: lazyLoad('xpack.ml.get_filters', opts),
        getFilters: lazyLoad('xpack.ml.get_filters', opts),
        get_influencers: lazyLoad('xpack.ml.get_influencers', opts),
        getInfluencers: lazyLoad('xpack.ml.get_influencers', opts),
        get_job_stats: lazyLoad('xpack.ml.get_job_stats', opts),
        getJobStats: lazyLoad('xpack.ml.get_job_stats', opts),
        get_jobs: lazyLoad('xpack.ml.get_jobs', opts),
        getJobs: lazyLoad('xpack.ml.get_jobs', opts),
        get_model_snapshots: lazyLoad('xpack.ml.get_model_snapshots', opts),
        getModelSnapshots: lazyLoad('xpack.ml.get_model_snapshots', opts),
        get_overall_buckets: lazyLoad('xpack.ml.get_overall_buckets', opts),
        getOverallBuckets: lazyLoad('xpack.ml.get_overall_buckets', opts),
        get_records: lazyLoad('xpack.ml.get_records', opts),
        getRecords: lazyLoad('xpack.ml.get_records', opts),
        info: lazyLoad('xpack.ml.info', opts),
        open_job: lazyLoad('xpack.ml.open_job', opts),
        openJob: lazyLoad('xpack.ml.open_job', opts),
        post_calendar_events: lazyLoad('xpack.ml.post_calendar_events', opts),
        postCalendarEvents: lazyLoad('xpack.ml.post_calendar_events', opts),
        post_data: lazyLoad('xpack.ml.post_data', opts),
        postData: lazyLoad('xpack.ml.post_data', opts),
        preview_datafeed: lazyLoad('xpack.ml.preview_datafeed', opts),
        previewDatafeed: lazyLoad('xpack.ml.preview_datafeed', opts),
        put_calendar: lazyLoad('xpack.ml.put_calendar', opts),
        putCalendar: lazyLoad('xpack.ml.put_calendar', opts),
        put_calendar_job: lazyLoad('xpack.ml.put_calendar_job', opts),
        putCalendarJob: lazyLoad('xpack.ml.put_calendar_job', opts),
        put_datafeed: lazyLoad('xpack.ml.put_datafeed', opts),
        putDatafeed: lazyLoad('xpack.ml.put_datafeed', opts),
        put_filter: lazyLoad('xpack.ml.put_filter', opts),
        putFilter: lazyLoad('xpack.ml.put_filter', opts),
        put_job: lazyLoad('xpack.ml.put_job', opts),
        putJob: lazyLoad('xpack.ml.put_job', opts),
        revert_model_snapshot: lazyLoad('xpack.ml.revert_model_snapshot', opts),
        revertModelSnapshot: lazyLoad('xpack.ml.revert_model_snapshot', opts),
        set_upgrade_mode: lazyLoad('xpack.ml.set_upgrade_mode', opts),
        setUpgradeMode: lazyLoad('xpack.ml.set_upgrade_mode', opts),
        start_datafeed: lazyLoad('xpack.ml.start_datafeed', opts),
        startDatafeed: lazyLoad('xpack.ml.start_datafeed', opts),
        stop_datafeed: lazyLoad('xpack.ml.stop_datafeed', opts),
        stopDatafeed: lazyLoad('xpack.ml.stop_datafeed', opts),
        update_datafeed: lazyLoad('xpack.ml.update_datafeed', opts),
        updateDatafeed: lazyLoad('xpack.ml.update_datafeed', opts),
        update_filter: lazyLoad('xpack.ml.update_filter', opts),
        updateFilter: lazyLoad('xpack.ml.update_filter', opts),
        update_job: lazyLoad('xpack.ml.update_job', opts),
        updateJob: lazyLoad('xpack.ml.update_job', opts),
        update_model_snapshot: lazyLoad('xpack.ml.update_model_snapshot', opts),
        updateModelSnapshot: lazyLoad('xpack.ml.update_model_snapshot', opts),
        validate: lazyLoad('xpack.ml.validate', opts),
        validate_detector: lazyLoad('xpack.ml.validate_detector', opts),
        validateDetector: lazyLoad('xpack.ml.validate_detector', opts)
      },
      monitoring: {
        bulk: lazyLoad('xpack.monitoring.bulk', opts)
      },
      rollup: {
        delete_job: lazyLoad('xpack.rollup.delete_job', opts),
        deleteJob: lazyLoad('xpack.rollup.delete_job', opts),
        get_jobs: lazyLoad('xpack.rollup.get_jobs', opts),
        getJobs: lazyLoad('xpack.rollup.get_jobs', opts),
        get_rollup_caps: lazyLoad('xpack.rollup.get_rollup_caps', opts),
        getRollupCaps: lazyLoad('xpack.rollup.get_rollup_caps', opts),
        get_rollup_index_caps: lazyLoad('xpack.rollup.get_rollup_index_caps', opts),
        getRollupIndexCaps: lazyLoad('xpack.rollup.get_rollup_index_caps', opts),
        put_job: lazyLoad('xpack.rollup.put_job', opts),
        putJob: lazyLoad('xpack.rollup.put_job', opts),
        rollup_search: lazyLoad('xpack.rollup.rollup_search', opts),
        rollupSearch: lazyLoad('xpack.rollup.rollup_search', opts),
        start_job: lazyLoad('xpack.rollup.start_job', opts),
        startJob: lazyLoad('xpack.rollup.start_job', opts),
        stop_job: lazyLoad('xpack.rollup.stop_job', opts),
        stopJob: lazyLoad('xpack.rollup.stop_job', opts)
      },
      security: {
        authenticate: lazyLoad('xpack.security.authenticate', opts),
        change_password: lazyLoad('xpack.security.change_password', opts),
        changePassword: lazyLoad('xpack.security.change_password', opts),
        clear_cached_realms: lazyLoad('xpack.security.clear_cached_realms', opts),
        clearCachedRealms: lazyLoad('xpack.security.clear_cached_realms', opts),
        clear_cached_roles: lazyLoad('xpack.security.clear_cached_roles', opts),
        clearCachedRoles: lazyLoad('xpack.security.clear_cached_roles', opts),
        delete_privileges: lazyLoad('xpack.security.delete_privileges', opts),
        deletePrivileges: lazyLoad('xpack.security.delete_privileges', opts),
        delete_role: lazyLoad('xpack.security.delete_role', opts),
        deleteRole: lazyLoad('xpack.security.delete_role', opts),
        delete_role_mapping: lazyLoad('xpack.security.delete_role_mapping', opts),
        deleteRoleMapping: lazyLoad('xpack.security.delete_role_mapping', opts),
        delete_user: lazyLoad('xpack.security.delete_user', opts),
        deleteUser: lazyLoad('xpack.security.delete_user', opts),
        disable_user: lazyLoad('xpack.security.disable_user', opts),
        disableUser: lazyLoad('xpack.security.disable_user', opts),
        enable_user: lazyLoad('xpack.security.enable_user', opts),
        enableUser: lazyLoad('xpack.security.enable_user', opts),
        get_privileges: lazyLoad('xpack.security.get_privileges', opts),
        getPrivileges: lazyLoad('xpack.security.get_privileges', opts),
        get_role: lazyLoad('xpack.security.get_role', opts),
        getRole: lazyLoad('xpack.security.get_role', opts),
        get_role_mapping: lazyLoad('xpack.security.get_role_mapping', opts),
        getRoleMapping: lazyLoad('xpack.security.get_role_mapping', opts),
        get_token: lazyLoad('xpack.security.get_token', opts),
        getToken: lazyLoad('xpack.security.get_token', opts),
        get_user: lazyLoad('xpack.security.get_user', opts),
        getUser: lazyLoad('xpack.security.get_user', opts),
        get_user_privileges: lazyLoad('xpack.security.get_user_privileges', opts),
        getUserPrivileges: lazyLoad('xpack.security.get_user_privileges', opts),
        has_privileges: lazyLoad('xpack.security.has_privileges', opts),
        hasPrivileges: lazyLoad('xpack.security.has_privileges', opts),
        invalidate_token: lazyLoad('xpack.security.invalidate_token', opts),
        invalidateToken: lazyLoad('xpack.security.invalidate_token', opts),
        put_privileges: lazyLoad('xpack.security.put_privileges', opts),
        putPrivileges: lazyLoad('xpack.security.put_privileges', opts),
        put_role: lazyLoad('xpack.security.put_role', opts),
        putRole: lazyLoad('xpack.security.put_role', opts),
        put_role_mapping: lazyLoad('xpack.security.put_role_mapping', opts),
        putRoleMapping: lazyLoad('xpack.security.put_role_mapping', opts),
        put_user: lazyLoad('xpack.security.put_user', opts),
        putUser: lazyLoad('xpack.security.put_user', opts)
      },
      sql: {
        clear_cursor: lazyLoad('xpack.sql.clear_cursor', opts),
        clearCursor: lazyLoad('xpack.sql.clear_cursor', opts),
        query: lazyLoad('xpack.sql.query', opts),
        translate: lazyLoad('xpack.sql.translate', opts)
      },
      ssl: {
        certificates: lazyLoad('xpack.ssl.certificates', opts)
      },
      usage: lazyLoad('xpack.usage', opts),
      watcher: {
        ack_watch: lazyLoad('xpack.watcher.ack_watch', opts),
        ackWatch: lazyLoad('xpack.watcher.ack_watch', opts),
        activate_watch: lazyLoad('xpack.watcher.activate_watch', opts),
        activateWatch: lazyLoad('xpack.watcher.activate_watch', opts),
        deactivate_watch: lazyLoad('xpack.watcher.deactivate_watch', opts),
        deactivateWatch: lazyLoad('xpack.watcher.deactivate_watch', opts),
        delete_watch: lazyLoad('xpack.watcher.delete_watch', opts),
        deleteWatch: lazyLoad('xpack.watcher.delete_watch', opts),
        execute_watch: lazyLoad('xpack.watcher.execute_watch', opts),
        executeWatch: lazyLoad('xpack.watcher.execute_watch', opts),
        get_watch: lazyLoad('xpack.watcher.get_watch', opts),
        getWatch: lazyLoad('xpack.watcher.get_watch', opts),
        put_watch: lazyLoad('xpack.watcher.put_watch', opts),
        putWatch: lazyLoad('xpack.watcher.put_watch', opts),
        restart: lazyLoad('xpack.watcher.restart', opts),
        start: lazyLoad('xpack.watcher.start', opts),
        stats: lazyLoad('xpack.watcher.stats', opts),
        stop: lazyLoad('xpack.watcher.stop', opts)
      }
    }
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
