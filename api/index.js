'use strict'

const assert = require('assert')

const bulk = require('./api/bulk.js')
const catAliases = require('./api/cat.aliases.js')
const catAllocation = require('./api/cat.allocation.js')
const catCount = require('./api/cat.count.js')
const catFielddata = require('./api/cat.fielddata.js')
const catHealth = require('./api/cat.health.js')
const catHelp = require('./api/cat.help.js')
const catIndices = require('./api/cat.indices.js')
const catMaster = require('./api/cat.master.js')
const catNodeattrs = require('./api/cat.nodeattrs.js')
const catNodes = require('./api/cat.nodes.js')
const catPendingTasks = require('./api/cat.pending_tasks.js')
const catPlugins = require('./api/cat.plugins.js')
const catRecovery = require('./api/cat.recovery.js')
const catRepositories = require('./api/cat.repositories.js')
const catSegments = require('./api/cat.segments.js')
const catShards = require('./api/cat.shards.js')
const catSnapshots = require('./api/cat.snapshots.js')
const catTasks = require('./api/cat.tasks.js')
const catTemplates = require('./api/cat.templates.js')
const catThreadPool = require('./api/cat.thread_pool.js')
const ccrDeleteAutoFollowPattern = require('./api/ccr.delete_auto_follow_pattern.js')
const ccrFollow = require('./api/ccr.follow.js')
const ccrFollowStats = require('./api/ccr.follow_stats.js')
const ccrGetAutoFollowPattern = require('./api/ccr.get_auto_follow_pattern.js')
const ccrPauseFollow = require('./api/ccr.pause_follow.js')
const ccrPutAutoFollowPattern = require('./api/ccr.put_auto_follow_pattern.js')
const ccrResumeFollow = require('./api/ccr.resume_follow.js')
const ccrStats = require('./api/ccr.stats.js')
const ccrUnfollow = require('./api/ccr.unfollow.js')
const clearScroll = require('./api/clear_scroll.js')
const clusterAllocationExplain = require('./api/cluster.allocation_explain.js')
const clusterGetSettings = require('./api/cluster.get_settings.js')
const clusterHealth = require('./api/cluster.health.js')
const clusterPendingTasks = require('./api/cluster.pending_tasks.js')
const clusterPutSettings = require('./api/cluster.put_settings.js')
const clusterRemoteInfo = require('./api/cluster.remote_info.js')
const clusterReroute = require('./api/cluster.reroute.js')
const clusterState = require('./api/cluster.state.js')
const clusterStats = require('./api/cluster.stats.js')
const count = require('./api/count.js')
const create = require('./api/create.js')
const _delete = require('./api/delete.js')
const deleteByQuery = require('./api/delete_by_query.js')
const deleteByQueryRethrottle = require('./api/delete_by_query_rethrottle.js')
const deleteScript = require('./api/delete_script.js')
const exists = require('./api/exists.js')
const existsSource = require('./api/exists_source.js')
const explain = require('./api/explain.js')
const fieldCaps = require('./api/field_caps.js')
const get = require('./api/get.js')
const getScript = require('./api/get_script.js')
const getSource = require('./api/get_source.js')
const index = require('./api/index.js')
const indicesAnalyze = require('./api/indices.analyze.js')
const indicesClearCache = require('./api/indices.clear_cache.js')
const indicesClose = require('./api/indices.close.js')
const indicesCreate = require('./api/indices.create.js')
const indicesDelete = require('./api/indices.delete.js')
const indicesDeleteAlias = require('./api/indices.delete_alias.js')
const indicesDeleteTemplate = require('./api/indices.delete_template.js')
const indicesExists = require('./api/indices.exists.js')
const indicesExistsAlias = require('./api/indices.exists_alias.js')
const indicesExistsTemplate = require('./api/indices.exists_template.js')
const indicesExistsType = require('./api/indices.exists_type.js')
const indicesFlush = require('./api/indices.flush.js')
const indicesFlushSynced = require('./api/indices.flush_synced.js')
const indicesForcemerge = require('./api/indices.forcemerge.js')
const indicesGet = require('./api/indices.get.js')
const indicesGetAlias = require('./api/indices.get_alias.js')
const indicesGetFieldMapping = require('./api/indices.get_field_mapping.js')
const indicesGetMapping = require('./api/indices.get_mapping.js')
const indicesGetSettings = require('./api/indices.get_settings.js')
const indicesGetTemplate = require('./api/indices.get_template.js')
const indicesGetUpgrade = require('./api/indices.get_upgrade.js')
const indicesOpen = require('./api/indices.open.js')
const indicesPutAlias = require('./api/indices.put_alias.js')
const indicesPutMapping = require('./api/indices.put_mapping.js')
const indicesPutSettings = require('./api/indices.put_settings.js')
const indicesPutTemplate = require('./api/indices.put_template.js')
const indicesRecovery = require('./api/indices.recovery.js')
const indicesRefresh = require('./api/indices.refresh.js')
const indicesRollover = require('./api/indices.rollover.js')
const indicesSegments = require('./api/indices.segments.js')
const indicesShardStores = require('./api/indices.shard_stores.js')
const indicesShrink = require('./api/indices.shrink.js')
const indicesSplit = require('./api/indices.split.js')
const indicesStats = require('./api/indices.stats.js')
const indicesUpdateAliases = require('./api/indices.update_aliases.js')
const indicesUpgrade = require('./api/indices.upgrade.js')
const indicesValidateQuery = require('./api/indices.validate_query.js')
const info = require('./api/info.js')
const ingestDeletePipeline = require('./api/ingest.delete_pipeline.js')
const ingestGetPipeline = require('./api/ingest.get_pipeline.js')
const ingestProcessorGrok = require('./api/ingest.processor_grok.js')
const ingestPutPipeline = require('./api/ingest.put_pipeline.js')
const ingestSimulate = require('./api/ingest.simulate.js')
const mget = require('./api/mget.js')
const msearch = require('./api/msearch.js')
const msearchTemplate = require('./api/msearch_template.js')
const mtermvectors = require('./api/mtermvectors.js')
const nodesHotThreads = require('./api/nodes.hot_threads.js')
const nodesInfo = require('./api/nodes.info.js')
const nodesReloadSecureSettings = require('./api/nodes.reload_secure_settings.js')
const nodesStats = require('./api/nodes.stats.js')
const nodesUsage = require('./api/nodes.usage.js')
const ping = require('./api/ping.js')
const putScript = require('./api/put_script.js')
const rankEval = require('./api/rank_eval.js')
const reindex = require('./api/reindex.js')
const reindexRethrottle = require('./api/reindex_rethrottle.js')
const renderSearchTemplate = require('./api/render_search_template.js')
const scriptsPainlessExecute = require('./api/scripts_painless_execute.js')
const scroll = require('./api/scroll.js')
const search = require('./api/search.js')
const searchShards = require('./api/search_shards.js')
const searchTemplate = require('./api/search_template.js')
const snapshotCreate = require('./api/snapshot.create.js')
const snapshotCreateRepository = require('./api/snapshot.create_repository.js')
const snapshotDelete = require('./api/snapshot.delete.js')
const snapshotDeleteRepository = require('./api/snapshot.delete_repository.js')
const snapshotGet = require('./api/snapshot.get.js')
const snapshotGetRepository = require('./api/snapshot.get_repository.js')
const snapshotRestore = require('./api/snapshot.restore.js')
const snapshotStatus = require('./api/snapshot.status.js')
const snapshotVerifyRepository = require('./api/snapshot.verify_repository.js')
const tasksCancel = require('./api/tasks.cancel.js')
const tasksGet = require('./api/tasks.get.js')
const tasksList = require('./api/tasks.list.js')
const termvectors = require('./api/termvectors.js')
const update = require('./api/update.js')
const updateByQuery = require('./api/update_by_query.js')
const updateByQueryRethrottle = require('./api/update_by_query_rethrottle.js')
const xpackGraphExplore = require('./api/xpack.graph.explore.js')
const xpackInfo = require('./api/xpack.info.js')
const xpackLicenseDelete = require('./api/xpack.license.delete.js')
const xpackLicenseGet = require('./api/xpack.license.get.js')
const xpackLicenseGetBasicStatus = require('./api/xpack.license.get_basic_status.js')
const xpackLicenseGetTrialStatus = require('./api/xpack.license.get_trial_status.js')
const xpackLicensePost = require('./api/xpack.license.post.js')
const xpackLicensePostStartBasic = require('./api/xpack.license.post_start_basic.js')
const xpackLicensePostStartTrial = require('./api/xpack.license.post_start_trial.js')
const xpackMigrationDeprecations = require('./api/xpack.migration.deprecations.js')
const xpackMigrationGetAssistance = require('./api/xpack.migration.get_assistance.js')
const xpackMigrationUpgrade = require('./api/xpack.migration.upgrade.js')
const xpackMlCloseJob = require('./api/xpack.ml.close_job.js')
const xpackMlDeleteCalendar = require('./api/xpack.ml.delete_calendar.js')
const xpackMlDeleteCalendarEvent = require('./api/xpack.ml.delete_calendar_event.js')
const xpackMlDeleteCalendarJob = require('./api/xpack.ml.delete_calendar_job.js')
const xpackMlDeleteDatafeed = require('./api/xpack.ml.delete_datafeed.js')
const xpackMlDeleteExpiredData = require('./api/xpack.ml.delete_expired_data.js')
const xpackMlDeleteFilter = require('./api/xpack.ml.delete_filter.js')
const xpackMlDeleteForecast = require('./api/xpack.ml.delete_forecast.js')
const xpackMlDeleteJob = require('./api/xpack.ml.delete_job.js')
const xpackMlDeleteModelSnapshot = require('./api/xpack.ml.delete_model_snapshot.js')
const xpackMlFindFileStructure = require('./api/xpack.ml.find_file_structure.js')
const xpackMlFlushJob = require('./api/xpack.ml.flush_job.js')
const xpackMlForecast = require('./api/xpack.ml.forecast.js')
const xpackMlGetBuckets = require('./api/xpack.ml.get_buckets.js')
const xpackMlGetCalendarEvents = require('./api/xpack.ml.get_calendar_events.js')
const xpackMlGetCalendars = require('./api/xpack.ml.get_calendars.js')
const xpackMlGetCategories = require('./api/xpack.ml.get_categories.js')
const xpackMlGetDatafeedStats = require('./api/xpack.ml.get_datafeed_stats.js')
const xpackMlGetDatafeeds = require('./api/xpack.ml.get_datafeeds.js')
const xpackMlGetFilters = require('./api/xpack.ml.get_filters.js')
const xpackMlGetInfluencers = require('./api/xpack.ml.get_influencers.js')
const xpackMlGetJobStats = require('./api/xpack.ml.get_job_stats.js')
const xpackMlGetJobs = require('./api/xpack.ml.get_jobs.js')
const xpackMlGetModelSnapshots = require('./api/xpack.ml.get_model_snapshots.js')
const xpackMlGetOverallBuckets = require('./api/xpack.ml.get_overall_buckets.js')
const xpackMlGetRecords = require('./api/xpack.ml.get_records.js')
const xpackMlInfo = require('./api/xpack.ml.info.js')
const xpackMlOpenJob = require('./api/xpack.ml.open_job.js')
const xpackMlPostCalendarEvents = require('./api/xpack.ml.post_calendar_events.js')
const xpackMlPostData = require('./api/xpack.ml.post_data.js')
const xpackMlPreviewDatafeed = require('./api/xpack.ml.preview_datafeed.js')
const xpackMlPutCalendar = require('./api/xpack.ml.put_calendar.js')
const xpackMlPutCalendarJob = require('./api/xpack.ml.put_calendar_job.js')
const xpackMlPutDatafeed = require('./api/xpack.ml.put_datafeed.js')
const xpackMlPutFilter = require('./api/xpack.ml.put_filter.js')
const xpackMlPutJob = require('./api/xpack.ml.put_job.js')
const xpackMlRevertModelSnapshot = require('./api/xpack.ml.revert_model_snapshot.js')
const xpackMlStartDatafeed = require('./api/xpack.ml.start_datafeed.js')
const xpackMlStopDatafeed = require('./api/xpack.ml.stop_datafeed.js')
const xpackMlUpdateDatafeed = require('./api/xpack.ml.update_datafeed.js')
const xpackMlUpdateFilter = require('./api/xpack.ml.update_filter.js')
const xpackMlUpdateJob = require('./api/xpack.ml.update_job.js')
const xpackMlUpdateModelSnapshot = require('./api/xpack.ml.update_model_snapshot.js')
const xpackMlValidate = require('./api/xpack.ml.validate.js')
const xpackMlValidateDetector = require('./api/xpack.ml.validate_detector.js')
const xpackMonitoringBulk = require('./api/xpack.monitoring.bulk.js')
const xpackRollupDeleteJob = require('./api/xpack.rollup.delete_job.js')
const xpackRollupGetJobs = require('./api/xpack.rollup.get_jobs.js')
const xpackRollupGetRollupCaps = require('./api/xpack.rollup.get_rollup_caps.js')
const xpackRollupGetRollupIndexCaps = require('./api/xpack.rollup.get_rollup_index_caps.js')
const xpackRollupPutJob = require('./api/xpack.rollup.put_job.js')
const xpackRollupRollupSearch = require('./api/xpack.rollup.rollup_search.js')
const xpackRollupStartJob = require('./api/xpack.rollup.start_job.js')
const xpackRollupStopJob = require('./api/xpack.rollup.stop_job.js')
const xpackSecurityAuthenticate = require('./api/xpack.security.authenticate.js')
const xpackSecurityChangePassword = require('./api/xpack.security.change_password.js')
const xpackSecurityClearCachedRealms = require('./api/xpack.security.clear_cached_realms.js')
const xpackSecurityClearCachedRoles = require('./api/xpack.security.clear_cached_roles.js')
const xpackSecurityDeletePrivileges = require('./api/xpack.security.delete_privileges.js')
const xpackSecurityDeleteRole = require('./api/xpack.security.delete_role.js')
const xpackSecurityDeleteRoleMapping = require('./api/xpack.security.delete_role_mapping.js')
const xpackSecurityDeleteUser = require('./api/xpack.security.delete_user.js')
const xpackSecurityDisableUser = require('./api/xpack.security.disable_user.js')
const xpackSecurityEnableUser = require('./api/xpack.security.enable_user.js')
const xpackSecurityGetPrivileges = require('./api/xpack.security.get_privileges.js')
const xpackSecurityGetRole = require('./api/xpack.security.get_role.js')
const xpackSecurityGetRoleMapping = require('./api/xpack.security.get_role_mapping.js')
const xpackSecurityGetToken = require('./api/xpack.security.get_token.js')
const xpackSecurityGetUser = require('./api/xpack.security.get_user.js')
const xpackSecurityGetUserPrivileges = require('./api/xpack.security.get_user_privileges.js')
const xpackSecurityHasPrivileges = require('./api/xpack.security.has_privileges.js')
const xpackSecurityInvalidateToken = require('./api/xpack.security.invalidate_token.js')
const xpackSecurityPutPrivileges = require('./api/xpack.security.put_privileges.js')
const xpackSecurityPutRole = require('./api/xpack.security.put_role.js')
const xpackSecurityPutRoleMapping = require('./api/xpack.security.put_role_mapping.js')
const xpackSecurityPutUser = require('./api/xpack.security.put_user.js')
const xpackSqlClearCursor = require('./api/xpack.sql.clear_cursor.js')
const xpackSqlQuery = require('./api/xpack.sql.query.js')
const xpackSqlTranslate = require('./api/xpack.sql.translate.js')
const xpackSslCertificates = require('./api/xpack.ssl.certificates.js')
const xpackUsage = require('./api/xpack.usage.js')
const xpackWatcherAckWatch = require('./api/xpack.watcher.ack_watch.js')
const xpackWatcherActivateWatch = require('./api/xpack.watcher.activate_watch.js')
const xpackWatcherDeactivateWatch = require('./api/xpack.watcher.deactivate_watch.js')
const xpackWatcherDeleteWatch = require('./api/xpack.watcher.delete_watch.js')
const xpackWatcherExecuteWatch = require('./api/xpack.watcher.execute_watch.js')
const xpackWatcherGetWatch = require('./api/xpack.watcher.get_watch.js')
const xpackWatcherPutWatch = require('./api/xpack.watcher.put_watch.js')
const xpackWatcherRestart = require('./api/xpack.watcher.restart.js')
const xpackWatcherStart = require('./api/xpack.watcher.start.js')
const xpackWatcherStats = require('./api/xpack.watcher.stats.js')
const xpackWatcherStop = require('./api/xpack.watcher.stop.js')

function ESAPI (opts) {
  assert(opts.makeRequest, 'Missing makeRequest function')
  assert(opts.ConfigurationError, 'Missing ConfigurationError class')
  assert(opts.result, 'Missing default result object')

  const apis = {
    bulk: bulk(opts),
    cat: {
      aliases: catAliases(opts),
      allocation: catAllocation(opts),
      count: catCount(opts),
      fielddata: catFielddata(opts),
      health: catHealth(opts),
      help: catHelp(opts),
      indices: catIndices(opts),
      master: catMaster(opts),
      nodeattrs: catNodeattrs(opts),
      nodes: catNodes(opts),
      pending_tasks: catPendingTasks(opts),
      pendingTasks: catPendingTasks(opts),
      plugins: catPlugins(opts),
      recovery: catRecovery(opts),
      repositories: catRepositories(opts),
      segments: catSegments(opts),
      shards: catShards(opts),
      snapshots: catSnapshots(opts),
      tasks: catTasks(opts),
      templates: catTemplates(opts),
      thread_pool: catThreadPool(opts),
      threadPool: catThreadPool(opts)
    },
    ccr: {
      delete_auto_follow_pattern: ccrDeleteAutoFollowPattern(opts),
      deleteAutoFollowPattern: ccrDeleteAutoFollowPattern(opts),
      follow: ccrFollow(opts),
      follow_stats: ccrFollowStats(opts),
      followStats: ccrFollowStats(opts),
      get_auto_follow_pattern: ccrGetAutoFollowPattern(opts),
      getAutoFollowPattern: ccrGetAutoFollowPattern(opts),
      pause_follow: ccrPauseFollow(opts),
      pauseFollow: ccrPauseFollow(opts),
      put_auto_follow_pattern: ccrPutAutoFollowPattern(opts),
      putAutoFollowPattern: ccrPutAutoFollowPattern(opts),
      resume_follow: ccrResumeFollow(opts),
      resumeFollow: ccrResumeFollow(opts),
      stats: ccrStats(opts),
      unfollow: ccrUnfollow(opts)
    },
    clear_scroll: clearScroll(opts),
    clearScroll: clearScroll(opts),
    cluster: {
      allocation_explain: clusterAllocationExplain(opts),
      allocationExplain: clusterAllocationExplain(opts),
      get_settings: clusterGetSettings(opts),
      getSettings: clusterGetSettings(opts),
      health: clusterHealth(opts),
      pending_tasks: clusterPendingTasks(opts),
      pendingTasks: clusterPendingTasks(opts),
      put_settings: clusterPutSettings(opts),
      putSettings: clusterPutSettings(opts),
      remote_info: clusterRemoteInfo(opts),
      remoteInfo: clusterRemoteInfo(opts),
      reroute: clusterReroute(opts),
      state: clusterState(opts),
      stats: clusterStats(opts)
    },
    count: count(opts),
    create: create(opts),
    delete: _delete(opts),
    delete_by_query: deleteByQuery(opts),
    deleteByQuery: deleteByQuery(opts),
    delete_by_query_rethrottle: deleteByQueryRethrottle(opts),
    deleteByQueryRethrottle: deleteByQueryRethrottle(opts),
    delete_script: deleteScript(opts),
    deleteScript: deleteScript(opts),
    exists: exists(opts),
    exists_source: existsSource(opts),
    existsSource: existsSource(opts),
    explain: explain(opts),
    field_caps: fieldCaps(opts),
    fieldCaps: fieldCaps(opts),
    get: get(opts),
    get_script: getScript(opts),
    getScript: getScript(opts),
    get_source: getSource(opts),
    getSource: getSource(opts),
    index: index(opts),
    indices: {
      analyze: indicesAnalyze(opts),
      clear_cache: indicesClearCache(opts),
      clearCache: indicesClearCache(opts),
      close: indicesClose(opts),
      create: indicesCreate(opts),
      delete: indicesDelete(opts),
      delete_alias: indicesDeleteAlias(opts),
      deleteAlias: indicesDeleteAlias(opts),
      delete_template: indicesDeleteTemplate(opts),
      deleteTemplate: indicesDeleteTemplate(opts),
      exists: indicesExists(opts),
      exists_alias: indicesExistsAlias(opts),
      existsAlias: indicesExistsAlias(opts),
      exists_template: indicesExistsTemplate(opts),
      existsTemplate: indicesExistsTemplate(opts),
      exists_type: indicesExistsType(opts),
      existsType: indicesExistsType(opts),
      flush: indicesFlush(opts),
      flush_synced: indicesFlushSynced(opts),
      flushSynced: indicesFlushSynced(opts),
      forcemerge: indicesForcemerge(opts),
      get: indicesGet(opts),
      get_alias: indicesGetAlias(opts),
      getAlias: indicesGetAlias(opts),
      get_field_mapping: indicesGetFieldMapping(opts),
      getFieldMapping: indicesGetFieldMapping(opts),
      get_mapping: indicesGetMapping(opts),
      getMapping: indicesGetMapping(opts),
      get_settings: indicesGetSettings(opts),
      getSettings: indicesGetSettings(opts),
      get_template: indicesGetTemplate(opts),
      getTemplate: indicesGetTemplate(opts),
      get_upgrade: indicesGetUpgrade(opts),
      getUpgrade: indicesGetUpgrade(opts),
      open: indicesOpen(opts),
      put_alias: indicesPutAlias(opts),
      putAlias: indicesPutAlias(opts),
      put_mapping: indicesPutMapping(opts),
      putMapping: indicesPutMapping(opts),
      put_settings: indicesPutSettings(opts),
      putSettings: indicesPutSettings(opts),
      put_template: indicesPutTemplate(opts),
      putTemplate: indicesPutTemplate(opts),
      recovery: indicesRecovery(opts),
      refresh: indicesRefresh(opts),
      rollover: indicesRollover(opts),
      segments: indicesSegments(opts),
      shard_stores: indicesShardStores(opts),
      shardStores: indicesShardStores(opts),
      shrink: indicesShrink(opts),
      split: indicesSplit(opts),
      stats: indicesStats(opts),
      update_aliases: indicesUpdateAliases(opts),
      updateAliases: indicesUpdateAliases(opts),
      upgrade: indicesUpgrade(opts),
      validate_query: indicesValidateQuery(opts),
      validateQuery: indicesValidateQuery(opts)
    },
    info: info(opts),
    ingest: {
      delete_pipeline: ingestDeletePipeline(opts),
      deletePipeline: ingestDeletePipeline(opts),
      get_pipeline: ingestGetPipeline(opts),
      getPipeline: ingestGetPipeline(opts),
      processor_grok: ingestProcessorGrok(opts),
      processorGrok: ingestProcessorGrok(opts),
      put_pipeline: ingestPutPipeline(opts),
      putPipeline: ingestPutPipeline(opts),
      simulate: ingestSimulate(opts)
    },
    mget: mget(opts),
    msearch: msearch(opts),
    msearch_template: msearchTemplate(opts),
    msearchTemplate: msearchTemplate(opts),
    mtermvectors: mtermvectors(opts),
    nodes: {
      hot_threads: nodesHotThreads(opts),
      hotThreads: nodesHotThreads(opts),
      info: nodesInfo(opts),
      reload_secure_settings: nodesReloadSecureSettings(opts),
      reloadSecureSettings: nodesReloadSecureSettings(opts),
      stats: nodesStats(opts),
      usage: nodesUsage(opts)
    },
    ping: ping(opts),
    put_script: putScript(opts),
    putScript: putScript(opts),
    rank_eval: rankEval(opts),
    rankEval: rankEval(opts),
    reindex: reindex(opts),
    reindex_rethrottle: reindexRethrottle(opts),
    reindexRethrottle: reindexRethrottle(opts),
    render_search_template: renderSearchTemplate(opts),
    renderSearchTemplate: renderSearchTemplate(opts),
    scripts_painless_execute: scriptsPainlessExecute(opts),
    scriptsPainlessExecute: scriptsPainlessExecute(opts),
    scroll: scroll(opts),
    search: search(opts),
    search_shards: searchShards(opts),
    searchShards: searchShards(opts),
    search_template: searchTemplate(opts),
    searchTemplate: searchTemplate(opts),
    snapshot: {
      create: snapshotCreate(opts),
      create_repository: snapshotCreateRepository(opts),
      createRepository: snapshotCreateRepository(opts),
      delete: snapshotDelete(opts),
      delete_repository: snapshotDeleteRepository(opts),
      deleteRepository: snapshotDeleteRepository(opts),
      get: snapshotGet(opts),
      get_repository: snapshotGetRepository(opts),
      getRepository: snapshotGetRepository(opts),
      restore: snapshotRestore(opts),
      status: snapshotStatus(opts),
      verify_repository: snapshotVerifyRepository(opts),
      verifyRepository: snapshotVerifyRepository(opts)
    },
    tasks: {
      cancel: tasksCancel(opts),
      get: tasksGet(opts),
      list: tasksList(opts)
    },
    termvectors: termvectors(opts),
    update: update(opts),
    update_by_query: updateByQuery(opts),
    updateByQuery: updateByQuery(opts),
    update_by_query_rethrottle: updateByQueryRethrottle(opts),
    updateByQueryRethrottle: updateByQueryRethrottle(opts),
    xpack: {
      graph: {
        explore: xpackGraphExplore(opts)
      },
      info: xpackInfo(opts),
      license: {
        delete: xpackLicenseDelete(opts),
        get: xpackLicenseGet(opts),
        get_basic_status: xpackLicenseGetBasicStatus(opts),
        getBasicStatus: xpackLicenseGetBasicStatus(opts),
        get_trial_status: xpackLicenseGetTrialStatus(opts),
        getTrialStatus: xpackLicenseGetTrialStatus(opts),
        post: xpackLicensePost(opts),
        post_start_basic: xpackLicensePostStartBasic(opts),
        postStartBasic: xpackLicensePostStartBasic(opts),
        post_start_trial: xpackLicensePostStartTrial(opts),
        postStartTrial: xpackLicensePostStartTrial(opts)
      },
      migration: {
        deprecations: xpackMigrationDeprecations(opts),
        get_assistance: xpackMigrationGetAssistance(opts),
        getAssistance: xpackMigrationGetAssistance(opts),
        upgrade: xpackMigrationUpgrade(opts)
      },
      ml: {
        close_job: xpackMlCloseJob(opts),
        closeJob: xpackMlCloseJob(opts),
        delete_calendar: xpackMlDeleteCalendar(opts),
        deleteCalendar: xpackMlDeleteCalendar(opts),
        delete_calendar_event: xpackMlDeleteCalendarEvent(opts),
        deleteCalendarEvent: xpackMlDeleteCalendarEvent(opts),
        delete_calendar_job: xpackMlDeleteCalendarJob(opts),
        deleteCalendarJob: xpackMlDeleteCalendarJob(opts),
        delete_datafeed: xpackMlDeleteDatafeed(opts),
        deleteDatafeed: xpackMlDeleteDatafeed(opts),
        delete_expired_data: xpackMlDeleteExpiredData(opts),
        deleteExpiredData: xpackMlDeleteExpiredData(opts),
        delete_filter: xpackMlDeleteFilter(opts),
        deleteFilter: xpackMlDeleteFilter(opts),
        delete_forecast: xpackMlDeleteForecast(opts),
        deleteForecast: xpackMlDeleteForecast(opts),
        delete_job: xpackMlDeleteJob(opts),
        deleteJob: xpackMlDeleteJob(opts),
        delete_model_snapshot: xpackMlDeleteModelSnapshot(opts),
        deleteModelSnapshot: xpackMlDeleteModelSnapshot(opts),
        find_file_structure: xpackMlFindFileStructure(opts),
        findFileStructure: xpackMlFindFileStructure(opts),
        flush_job: xpackMlFlushJob(opts),
        flushJob: xpackMlFlushJob(opts),
        forecast: xpackMlForecast(opts),
        get_buckets: xpackMlGetBuckets(opts),
        getBuckets: xpackMlGetBuckets(opts),
        get_calendar_events: xpackMlGetCalendarEvents(opts),
        getCalendarEvents: xpackMlGetCalendarEvents(opts),
        get_calendars: xpackMlGetCalendars(opts),
        getCalendars: xpackMlGetCalendars(opts),
        get_categories: xpackMlGetCategories(opts),
        getCategories: xpackMlGetCategories(opts),
        get_datafeed_stats: xpackMlGetDatafeedStats(opts),
        getDatafeedStats: xpackMlGetDatafeedStats(opts),
        get_datafeeds: xpackMlGetDatafeeds(opts),
        getDatafeeds: xpackMlGetDatafeeds(opts),
        get_filters: xpackMlGetFilters(opts),
        getFilters: xpackMlGetFilters(opts),
        get_influencers: xpackMlGetInfluencers(opts),
        getInfluencers: xpackMlGetInfluencers(opts),
        get_job_stats: xpackMlGetJobStats(opts),
        getJobStats: xpackMlGetJobStats(opts),
        get_jobs: xpackMlGetJobs(opts),
        getJobs: xpackMlGetJobs(opts),
        get_model_snapshots: xpackMlGetModelSnapshots(opts),
        getModelSnapshots: xpackMlGetModelSnapshots(opts),
        get_overall_buckets: xpackMlGetOverallBuckets(opts),
        getOverallBuckets: xpackMlGetOverallBuckets(opts),
        get_records: xpackMlGetRecords(opts),
        getRecords: xpackMlGetRecords(opts),
        info: xpackMlInfo(opts),
        open_job: xpackMlOpenJob(opts),
        openJob: xpackMlOpenJob(opts),
        post_calendar_events: xpackMlPostCalendarEvents(opts),
        postCalendarEvents: xpackMlPostCalendarEvents(opts),
        post_data: xpackMlPostData(opts),
        postData: xpackMlPostData(opts),
        preview_datafeed: xpackMlPreviewDatafeed(opts),
        previewDatafeed: xpackMlPreviewDatafeed(opts),
        put_calendar: xpackMlPutCalendar(opts),
        putCalendar: xpackMlPutCalendar(opts),
        put_calendar_job: xpackMlPutCalendarJob(opts),
        putCalendarJob: xpackMlPutCalendarJob(opts),
        put_datafeed: xpackMlPutDatafeed(opts),
        putDatafeed: xpackMlPutDatafeed(opts),
        put_filter: xpackMlPutFilter(opts),
        putFilter: xpackMlPutFilter(opts),
        put_job: xpackMlPutJob(opts),
        putJob: xpackMlPutJob(opts),
        revert_model_snapshot: xpackMlRevertModelSnapshot(opts),
        revertModelSnapshot: xpackMlRevertModelSnapshot(opts),
        start_datafeed: xpackMlStartDatafeed(opts),
        startDatafeed: xpackMlStartDatafeed(opts),
        stop_datafeed: xpackMlStopDatafeed(opts),
        stopDatafeed: xpackMlStopDatafeed(opts),
        update_datafeed: xpackMlUpdateDatafeed(opts),
        updateDatafeed: xpackMlUpdateDatafeed(opts),
        update_filter: xpackMlUpdateFilter(opts),
        updateFilter: xpackMlUpdateFilter(opts),
        update_job: xpackMlUpdateJob(opts),
        updateJob: xpackMlUpdateJob(opts),
        update_model_snapshot: xpackMlUpdateModelSnapshot(opts),
        updateModelSnapshot: xpackMlUpdateModelSnapshot(opts),
        validate: xpackMlValidate(opts),
        validate_detector: xpackMlValidateDetector(opts),
        validateDetector: xpackMlValidateDetector(opts)
      },
      monitoring: {
        bulk: xpackMonitoringBulk(opts)
      },
      rollup: {
        delete_job: xpackRollupDeleteJob(opts),
        deleteJob: xpackRollupDeleteJob(opts),
        get_jobs: xpackRollupGetJobs(opts),
        getJobs: xpackRollupGetJobs(opts),
        get_rollup_caps: xpackRollupGetRollupCaps(opts),
        getRollupCaps: xpackRollupGetRollupCaps(opts),
        get_rollup_index_caps: xpackRollupGetRollupIndexCaps(opts),
        getRollupIndexCaps: xpackRollupGetRollupIndexCaps(opts),
        put_job: xpackRollupPutJob(opts),
        putJob: xpackRollupPutJob(opts),
        rollup_search: xpackRollupRollupSearch(opts),
        rollupSearch: xpackRollupRollupSearch(opts),
        start_job: xpackRollupStartJob(opts),
        startJob: xpackRollupStartJob(opts),
        stop_job: xpackRollupStopJob(opts),
        stopJob: xpackRollupStopJob(opts)
      },
      security: {
        authenticate: xpackSecurityAuthenticate(opts),
        change_password: xpackSecurityChangePassword(opts),
        changePassword: xpackSecurityChangePassword(opts),
        clear_cached_realms: xpackSecurityClearCachedRealms(opts),
        clearCachedRealms: xpackSecurityClearCachedRealms(opts),
        clear_cached_roles: xpackSecurityClearCachedRoles(opts),
        clearCachedRoles: xpackSecurityClearCachedRoles(opts),
        delete_privileges: xpackSecurityDeletePrivileges(opts),
        deletePrivileges: xpackSecurityDeletePrivileges(opts),
        delete_role: xpackSecurityDeleteRole(opts),
        deleteRole: xpackSecurityDeleteRole(opts),
        delete_role_mapping: xpackSecurityDeleteRoleMapping(opts),
        deleteRoleMapping: xpackSecurityDeleteRoleMapping(opts),
        delete_user: xpackSecurityDeleteUser(opts),
        deleteUser: xpackSecurityDeleteUser(opts),
        disable_user: xpackSecurityDisableUser(opts),
        disableUser: xpackSecurityDisableUser(opts),
        enable_user: xpackSecurityEnableUser(opts),
        enableUser: xpackSecurityEnableUser(opts),
        get_privileges: xpackSecurityGetPrivileges(opts),
        getPrivileges: xpackSecurityGetPrivileges(opts),
        get_role: xpackSecurityGetRole(opts),
        getRole: xpackSecurityGetRole(opts),
        get_role_mapping: xpackSecurityGetRoleMapping(opts),
        getRoleMapping: xpackSecurityGetRoleMapping(opts),
        get_token: xpackSecurityGetToken(opts),
        getToken: xpackSecurityGetToken(opts),
        get_user: xpackSecurityGetUser(opts),
        getUser: xpackSecurityGetUser(opts),
        get_user_privileges: xpackSecurityGetUserPrivileges(opts),
        getUserPrivileges: xpackSecurityGetUserPrivileges(opts),
        has_privileges: xpackSecurityHasPrivileges(opts),
        hasPrivileges: xpackSecurityHasPrivileges(opts),
        invalidate_token: xpackSecurityInvalidateToken(opts),
        invalidateToken: xpackSecurityInvalidateToken(opts),
        put_privileges: xpackSecurityPutPrivileges(opts),
        putPrivileges: xpackSecurityPutPrivileges(opts),
        put_role: xpackSecurityPutRole(opts),
        putRole: xpackSecurityPutRole(opts),
        put_role_mapping: xpackSecurityPutRoleMapping(opts),
        putRoleMapping: xpackSecurityPutRoleMapping(opts),
        put_user: xpackSecurityPutUser(opts),
        putUser: xpackSecurityPutUser(opts)
      },
      sql: {
        clear_cursor: xpackSqlClearCursor(opts),
        clearCursor: xpackSqlClearCursor(opts),
        query: xpackSqlQuery(opts),
        translate: xpackSqlTranslate(opts)
      },
      ssl: {
        certificates: xpackSslCertificates(opts)
      },
      usage: xpackUsage(opts),
      watcher: {
        ack_watch: xpackWatcherAckWatch(opts),
        ackWatch: xpackWatcherAckWatch(opts),
        activate_watch: xpackWatcherActivateWatch(opts),
        activateWatch: xpackWatcherActivateWatch(opts),
        deactivate_watch: xpackWatcherDeactivateWatch(opts),
        deactivateWatch: xpackWatcherDeactivateWatch(opts),
        delete_watch: xpackWatcherDeleteWatch(opts),
        deleteWatch: xpackWatcherDeleteWatch(opts),
        execute_watch: xpackWatcherExecuteWatch(opts),
        executeWatch: xpackWatcherExecuteWatch(opts),
        get_watch: xpackWatcherGetWatch(opts),
        getWatch: xpackWatcherGetWatch(opts),
        put_watch: xpackWatcherPutWatch(opts),
        putWatch: xpackWatcherPutWatch(opts),
        restart: xpackWatcherRestart(opts),
        start: xpackWatcherStart(opts),
        stats: xpackWatcherStats(opts),
        stop: xpackWatcherStop(opts)
      }
    }
  }

  return apis
}

module.exports = ESAPI
