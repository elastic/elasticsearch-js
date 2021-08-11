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

const AsyncSearchApi = require('./api/async_search')
const AutoscalingApi = require('./api/autoscaling')
const bulkApi = require('./api/bulk')
const CatApi = require('./api/cat')
const CcrApi = require('./api/ccr')
const clearScrollApi = require('./api/clear_scroll')
const closePointInTimeApi = require('./api/close_point_in_time')
const ClusterApi = require('./api/cluster')
const countApi = require('./api/count')
const createApi = require('./api/create')
const DanglingIndicesApi = require('./api/dangling_indices')
const deleteApi = require('./api/delete')
const deleteByQueryApi = require('./api/delete_by_query')
const deleteByQueryRethrottleApi = require('./api/delete_by_query_rethrottle')
const deleteScriptApi = require('./api/delete_script')
const EnrichApi = require('./api/enrich')
const EqlApi = require('./api/eql')
const existsApi = require('./api/exists')
const existsSourceApi = require('./api/exists_source')
const explainApi = require('./api/explain')
const FeaturesApi = require('./api/features')
const fieldCapsApi = require('./api/field_caps')
const FleetApi = require('./api/fleet')
const getApi = require('./api/get')
const getScriptApi = require('./api/get_script')
const getScriptContextApi = require('./api/get_script_context')
const getScriptLanguagesApi = require('./api/get_script_languages')
const getSourceApi = require('./api/get_source')
const GraphApi = require('./api/graph')
const IlmApi = require('./api/ilm')
const indexApi = require('./api/index')
const IndicesApi = require('./api/indices')
const infoApi = require('./api/info')
const IngestApi = require('./api/ingest')
const LicenseApi = require('./api/license')
const LogstashApi = require('./api/logstash')
const mgetApi = require('./api/mget')
const MigrationApi = require('./api/migration')
const MlApi = require('./api/ml')
const MonitoringApi = require('./api/monitoring')
const msearchApi = require('./api/msearch')
const msearchTemplateApi = require('./api/msearch_template')
const mtermvectorsApi = require('./api/mtermvectors')
const NodesApi = require('./api/nodes')
const openPointInTimeApi = require('./api/open_point_in_time')
const pingApi = require('./api/ping')
const putScriptApi = require('./api/put_script')
const rankEvalApi = require('./api/rank_eval')
const reindexApi = require('./api/reindex')
const reindexRethrottleApi = require('./api/reindex_rethrottle')
const renderSearchTemplateApi = require('./api/render_search_template')
const RollupApi = require('./api/rollup')
const scriptsPainlessExecuteApi = require('./api/scripts_painless_execute')
const scrollApi = require('./api/scroll')
const searchApi = require('./api/search')
const searchMvtApi = require('./api/search_mvt')
const searchShardsApi = require('./api/search_shards')
const searchTemplateApi = require('./api/search_template')
const SearchableSnapshotsApi = require('./api/searchable_snapshots')
const SecurityApi = require('./api/security')
const ShutdownApi = require('./api/shutdown')
const SlmApi = require('./api/slm')
const SnapshotApi = require('./api/snapshot')
const SqlApi = require('./api/sql')
const SslApi = require('./api/ssl')
const TasksApi = require('./api/tasks')
const termsEnumApi = require('./api/terms_enum')
const termvectorsApi = require('./api/termvectors')
const TextStructureApi = require('./api/text_structure')
const TransformApi = require('./api/transform')
const updateApi = require('./api/update')
const updateByQueryApi = require('./api/update_by_query')
const updateByQueryRethrottleApi = require('./api/update_by_query_rethrottle')
const WatcherApi = require('./api/watcher')
const XpackApi = require('./api/xpack')

const { kConfigurationError } = require('./utils')
const kAsyncSearch = Symbol('AsyncSearch')
const kAutoscaling = Symbol('Autoscaling')
const kCat = Symbol('Cat')
const kCcr = Symbol('Ccr')
const kCluster = Symbol('Cluster')
const kDanglingIndices = Symbol('DanglingIndices')
const kEnrich = Symbol('Enrich')
const kEql = Symbol('Eql')
const kFeatures = Symbol('Features')
const kFleet = Symbol('Fleet')
const kGraph = Symbol('Graph')
const kIlm = Symbol('Ilm')
const kIndices = Symbol('Indices')
const kIngest = Symbol('Ingest')
const kLicense = Symbol('License')
const kLogstash = Symbol('Logstash')
const kMigration = Symbol('Migration')
const kMl = Symbol('Ml')
const kMonitoring = Symbol('Monitoring')
const kNodes = Symbol('Nodes')
const kRollup = Symbol('Rollup')
const kSearchableSnapshots = Symbol('SearchableSnapshots')
const kSecurity = Symbol('Security')
const kShutdown = Symbol('Shutdown')
const kSlm = Symbol('Slm')
const kSnapshot = Symbol('Snapshot')
const kSql = Symbol('Sql')
const kSsl = Symbol('Ssl')
const kTasks = Symbol('Tasks')
const kTextStructure = Symbol('TextStructure')
const kTransform = Symbol('Transform')
const kWatcher = Symbol('Watcher')
const kXpack = Symbol('Xpack')

function ESAPI (opts) {
  this[kConfigurationError] = opts.ConfigurationError
  this[kAsyncSearch] = null
  this[kAutoscaling] = null
  this[kCat] = null
  this[kCcr] = null
  this[kCluster] = null
  this[kDanglingIndices] = null
  this[kEnrich] = null
  this[kEql] = null
  this[kFeatures] = null
  this[kFleet] = null
  this[kGraph] = null
  this[kIlm] = null
  this[kIndices] = null
  this[kIngest] = null
  this[kLicense] = null
  this[kLogstash] = null
  this[kMigration] = null
  this[kMl] = null
  this[kMonitoring] = null
  this[kNodes] = null
  this[kRollup] = null
  this[kSearchableSnapshots] = null
  this[kSecurity] = null
  this[kShutdown] = null
  this[kSlm] = null
  this[kSnapshot] = null
  this[kSql] = null
  this[kSsl] = null
  this[kTasks] = null
  this[kTextStructure] = null
  this[kTransform] = null
  this[kWatcher] = null
  this[kXpack] = null
}

ESAPI.prototype.bulk = bulkApi
ESAPI.prototype.clearScroll = clearScrollApi
ESAPI.prototype.closePointInTime = closePointInTimeApi
ESAPI.prototype.count = countApi
ESAPI.prototype.create = createApi
ESAPI.prototype.delete = deleteApi
ESAPI.prototype.deleteByQuery = deleteByQueryApi
ESAPI.prototype.deleteByQueryRethrottle = deleteByQueryRethrottleApi
ESAPI.prototype.deleteScript = deleteScriptApi
ESAPI.prototype.exists = existsApi
ESAPI.prototype.existsSource = existsSourceApi
ESAPI.prototype.explain = explainApi
ESAPI.prototype.fieldCaps = fieldCapsApi
ESAPI.prototype.get = getApi
ESAPI.prototype.getScript = getScriptApi
ESAPI.prototype.getScriptContext = getScriptContextApi
ESAPI.prototype.getScriptLanguages = getScriptLanguagesApi
ESAPI.prototype.getSource = getSourceApi
ESAPI.prototype.index = indexApi
ESAPI.prototype.info = infoApi
ESAPI.prototype.mget = mgetApi
ESAPI.prototype.msearch = msearchApi
ESAPI.prototype.msearchTemplate = msearchTemplateApi
ESAPI.prototype.mtermvectors = mtermvectorsApi
ESAPI.prototype.openPointInTime = openPointInTimeApi
ESAPI.prototype.ping = pingApi
ESAPI.prototype.putScript = putScriptApi
ESAPI.prototype.rankEval = rankEvalApi
ESAPI.prototype.reindex = reindexApi
ESAPI.prototype.reindexRethrottle = reindexRethrottleApi
ESAPI.prototype.renderSearchTemplate = renderSearchTemplateApi
ESAPI.prototype.scriptsPainlessExecute = scriptsPainlessExecuteApi
ESAPI.prototype.scroll = scrollApi
ESAPI.prototype.search = searchApi
ESAPI.prototype.searchMvt = searchMvtApi
ESAPI.prototype.searchShards = searchShardsApi
ESAPI.prototype.searchTemplate = searchTemplateApi
ESAPI.prototype.termsEnum = termsEnumApi
ESAPI.prototype.termvectors = termvectorsApi
ESAPI.prototype.update = updateApi
ESAPI.prototype.updateByQuery = updateByQueryApi
ESAPI.prototype.updateByQueryRethrottle = updateByQueryRethrottleApi

Object.defineProperties(ESAPI.prototype, {
  asyncSearch: {
    get () {
      if (this[kAsyncSearch] === null) {
        this[kAsyncSearch] = new AsyncSearchApi(this.transport, this[kConfigurationError])
      }
      return this[kAsyncSearch]
    }
  },
  async_search: { get () { return this.asyncSearch } },
  autoscaling: {
    get () {
      if (this[kAutoscaling] === null) {
        this[kAutoscaling] = new AutoscalingApi(this.transport, this[kConfigurationError])
      }
      return this[kAutoscaling]
    }
  },
  cat: {
    get () {
      if (this[kCat] === null) {
        this[kCat] = new CatApi(this.transport, this[kConfigurationError])
      }
      return this[kCat]
    }
  },
  ccr: {
    get () {
      if (this[kCcr] === null) {
        this[kCcr] = new CcrApi(this.transport, this[kConfigurationError])
      }
      return this[kCcr]
    }
  },
  clear_scroll: { get () { return this.clearScroll } },
  close_point_in_time: { get () { return this.closePointInTime } },
  cluster: {
    get () {
      if (this[kCluster] === null) {
        this[kCluster] = new ClusterApi(this.transport, this[kConfigurationError])
      }
      return this[kCluster]
    }
  },
  danglingIndices: {
    get () {
      if (this[kDanglingIndices] === null) {
        this[kDanglingIndices] = new DanglingIndicesApi(this.transport, this[kConfigurationError])
      }
      return this[kDanglingIndices]
    }
  },
  dangling_indices: { get () { return this.danglingIndices } },
  delete_by_query: { get () { return this.deleteByQuery } },
  delete_by_query_rethrottle: { get () { return this.deleteByQueryRethrottle } },
  delete_script: { get () { return this.deleteScript } },
  enrich: {
    get () {
      if (this[kEnrich] === null) {
        this[kEnrich] = new EnrichApi(this.transport, this[kConfigurationError])
      }
      return this[kEnrich]
    }
  },
  eql: {
    get () {
      if (this[kEql] === null) {
        this[kEql] = new EqlApi(this.transport, this[kConfigurationError])
      }
      return this[kEql]
    }
  },
  exists_source: { get () { return this.existsSource } },
  features: {
    get () {
      if (this[kFeatures] === null) {
        this[kFeatures] = new FeaturesApi(this.transport, this[kConfigurationError])
      }
      return this[kFeatures]
    }
  },
  field_caps: { get () { return this.fieldCaps } },
  fleet: {
    get () {
      if (this[kFleet] === null) {
        this[kFleet] = new FleetApi(this.transport, this[kConfigurationError])
      }
      return this[kFleet]
    }
  },
  get_script: { get () { return this.getScript } },
  get_script_context: { get () { return this.getScriptContext } },
  get_script_languages: { get () { return this.getScriptLanguages } },
  get_source: { get () { return this.getSource } },
  graph: {
    get () {
      if (this[kGraph] === null) {
        this[kGraph] = new GraphApi(this.transport, this[kConfigurationError])
      }
      return this[kGraph]
    }
  },
  ilm: {
    get () {
      if (this[kIlm] === null) {
        this[kIlm] = new IlmApi(this.transport, this[kConfigurationError])
      }
      return this[kIlm]
    }
  },
  indices: {
    get () {
      if (this[kIndices] === null) {
        this[kIndices] = new IndicesApi(this.transport, this[kConfigurationError])
      }
      return this[kIndices]
    }
  },
  ingest: {
    get () {
      if (this[kIngest] === null) {
        this[kIngest] = new IngestApi(this.transport, this[kConfigurationError])
      }
      return this[kIngest]
    }
  },
  license: {
    get () {
      if (this[kLicense] === null) {
        this[kLicense] = new LicenseApi(this.transport, this[kConfigurationError])
      }
      return this[kLicense]
    }
  },
  logstash: {
    get () {
      if (this[kLogstash] === null) {
        this[kLogstash] = new LogstashApi(this.transport, this[kConfigurationError])
      }
      return this[kLogstash]
    }
  },
  migration: {
    get () {
      if (this[kMigration] === null) {
        this[kMigration] = new MigrationApi(this.transport, this[kConfigurationError])
      }
      return this[kMigration]
    }
  },
  ml: {
    get () {
      if (this[kMl] === null) {
        this[kMl] = new MlApi(this.transport, this[kConfigurationError])
      }
      return this[kMl]
    }
  },
  monitoring: {
    get () {
      if (this[kMonitoring] === null) {
        this[kMonitoring] = new MonitoringApi(this.transport, this[kConfigurationError])
      }
      return this[kMonitoring]
    }
  },
  msearch_template: { get () { return this.msearchTemplate } },
  nodes: {
    get () {
      if (this[kNodes] === null) {
        this[kNodes] = new NodesApi(this.transport, this[kConfigurationError])
      }
      return this[kNodes]
    }
  },
  open_point_in_time: { get () { return this.openPointInTime } },
  put_script: { get () { return this.putScript } },
  rank_eval: { get () { return this.rankEval } },
  reindex_rethrottle: { get () { return this.reindexRethrottle } },
  render_search_template: { get () { return this.renderSearchTemplate } },
  rollup: {
    get () {
      if (this[kRollup] === null) {
        this[kRollup] = new RollupApi(this.transport, this[kConfigurationError])
      }
      return this[kRollup]
    }
  },
  scripts_painless_execute: { get () { return this.scriptsPainlessExecute } },
  search_mvt: { get () { return this.searchMvt } },
  search_shards: { get () { return this.searchShards } },
  search_template: { get () { return this.searchTemplate } },
  searchableSnapshots: {
    get () {
      if (this[kSearchableSnapshots] === null) {
        this[kSearchableSnapshots] = new SearchableSnapshotsApi(this.transport, this[kConfigurationError])
      }
      return this[kSearchableSnapshots]
    }
  },
  searchable_snapshots: { get () { return this.searchableSnapshots } },
  security: {
    get () {
      if (this[kSecurity] === null) {
        this[kSecurity] = new SecurityApi(this.transport, this[kConfigurationError])
      }
      return this[kSecurity]
    }
  },
  shutdown: {
    get () {
      if (this[kShutdown] === null) {
        this[kShutdown] = new ShutdownApi(this.transport, this[kConfigurationError])
      }
      return this[kShutdown]
    }
  },
  slm: {
    get () {
      if (this[kSlm] === null) {
        this[kSlm] = new SlmApi(this.transport, this[kConfigurationError])
      }
      return this[kSlm]
    }
  },
  snapshot: {
    get () {
      if (this[kSnapshot] === null) {
        this[kSnapshot] = new SnapshotApi(this.transport, this[kConfigurationError])
      }
      return this[kSnapshot]
    }
  },
  sql: {
    get () {
      if (this[kSql] === null) {
        this[kSql] = new SqlApi(this.transport, this[kConfigurationError])
      }
      return this[kSql]
    }
  },
  ssl: {
    get () {
      if (this[kSsl] === null) {
        this[kSsl] = new SslApi(this.transport, this[kConfigurationError])
      }
      return this[kSsl]
    }
  },
  tasks: {
    get () {
      if (this[kTasks] === null) {
        this[kTasks] = new TasksApi(this.transport, this[kConfigurationError])
      }
      return this[kTasks]
    }
  },
  terms_enum: { get () { return this.termsEnum } },
  textStructure: {
    get () {
      if (this[kTextStructure] === null) {
        this[kTextStructure] = new TextStructureApi(this.transport, this[kConfigurationError])
      }
      return this[kTextStructure]
    }
  },
  text_structure: { get () { return this.textStructure } },
  transform: {
    get () {
      if (this[kTransform] === null) {
        this[kTransform] = new TransformApi(this.transport, this[kConfigurationError])
      }
      return this[kTransform]
    }
  },
  update_by_query: { get () { return this.updateByQuery } },
  update_by_query_rethrottle: { get () { return this.updateByQueryRethrottle } },
  watcher: {
    get () {
      if (this[kWatcher] === null) {
        this[kWatcher] = new WatcherApi(this.transport, this[kConfigurationError])
      }
      return this[kWatcher]
    }
  },
  xpack: {
    get () {
      if (this[kXpack] === null) {
        this[kXpack] = new XpackApi(this.transport, this[kConfigurationError])
      }
      return this[kXpack]
    }
  }
})

module.exports = ESAPI
