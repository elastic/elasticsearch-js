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

const bulkApi = require('./api/bulk')
const Cat = require('./api/cat')
const clearScrollApi = require('./api/clear_scroll')
const Cluster = require('./api/cluster')
const countApi = require('./api/count')
const createApi = require('./api/create')
const DanglingIndices = require('./api/dangling_indices')
const deleteApi = require('./api/delete')
const deleteByQueryApi = require('./api/delete_by_query')
const deleteByQueryRethrottleApi = require('./api/delete_by_query_rethrottle')
const deleteScriptApi = require('./api/delete_script')
const existsApi = require('./api/exists')
const existsSourceApi = require('./api/exists_source')
const explainApi = require('./api/explain')
const fieldCapsApi = require('./api/field_caps')
const getApi = require('./api/get')
const getScriptApi = require('./api/get_script')
const getScriptContextApi = require('./api/get_script_context')
const getScriptLanguagesApi = require('./api/get_script_languages')
const getSourceApi = require('./api/get_source')
const indexApi = require('./api/index')
const Indices = require('./api/indices')
const infoApi = require('./api/info')
const Ingest = require('./api/ingest')
const mgetApi = require('./api/mget')
const msearchApi = require('./api/msearch')
const msearchTemplateApi = require('./api/msearch_template')
const mtermvectorsApi = require('./api/mtermvectors')
const Nodes = require('./api/nodes')
const pingApi = require('./api/ping')
const putScriptApi = require('./api/put_script')
const rankEvalApi = require('./api/rank_eval')
const reindexApi = require('./api/reindex')
const reindexRethrottleApi = require('./api/reindex_rethrottle')
const renderSearchTemplateApi = require('./api/render_search_template')
const scriptsPainlessExecuteApi = require('./api/scripts_painless_execute')
const scrollApi = require('./api/scroll')
const searchApi = require('./api/search')
const searchShardsApi = require('./api/search_shards')
const searchTemplateApi = require('./api/search_template')
const Snapshot = require('./api/snapshot')
const Tasks = require('./api/tasks')
const termvectorsApi = require('./api/termvectors')
const updateApi = require('./api/update')
const updateByQueryApi = require('./api/update_by_query')
const updateByQueryRethrottleApi = require('./api/update_by_query_rethrottle')
const AsyncSearch = require('./api/async_search')
const Autoscaling = require('./api/autoscaling')
const Ccr = require('./api/ccr')
const closePointInTimeApi = require('./api/close_point_in_time')
const DataFrameTransformDeprecated = require('./api/data_frame_transform_deprecated')
const Enrich = require('./api/enrich')
const Eql = require('./api/eql')
const Graph = require('./api/graph')
const Ilm = require('./api/ilm')
const License = require('./api/license')
const Migration = require('./api/migration')
const Ml = require('./api/ml')
const Monitoring = require('./api/monitoring')
const openPointInTimeApi = require('./api/open_point_in_time')
const Rollup = require('./api/rollup')
const SearchableSnapshots = require('./api/searchable_snapshots')
const Security = require('./api/security')
const Slm = require('./api/slm')
const Sql = require('./api/sql')
const Ssl = require('./api/ssl')
const Transform = require('./api/transform')
const Watcher = require('./api/watcher')
const Xpack = require('./api/xpack')

const kCat = Symbol('Cat')
const kCluster = Symbol('Cluster')
const kDanglingIndices = Symbol('DanglingIndices')
const kIndices = Symbol('Indices')
const kIngest = Symbol('Ingest')
const kNodes = Symbol('Nodes')
const kSnapshot = Symbol('Snapshot')
const kTasks = Symbol('Tasks')
const kAsyncSearch = Symbol('AsyncSearch')
const kAutoscaling = Symbol('Autoscaling')
const kCcr = Symbol('Ccr')
const kDataFrameTransformDeprecated = Symbol('DataFrameTransformDeprecated')
const kEnrich = Symbol('Enrich')
const kEql = Symbol('Eql')
const kGraph = Symbol('Graph')
const kIlm = Symbol('Ilm')
const kLicense = Symbol('License')
const kMigration = Symbol('Migration')
const kMl = Symbol('Ml')
const kMonitoring = Symbol('Monitoring')
const kRollup = Symbol('Rollup')
const kSearchableSnapshots = Symbol('SearchableSnapshots')
const kSecurity = Symbol('Security')
const kSlm = Symbol('Slm')
const kSql = Symbol('Sql')
const kSsl = Symbol('Ssl')
const kTransform = Symbol('Transform')
const kWatcher = Symbol('Watcher')
const kXpack = Symbol('Xpack')

function ESAPI () {
  this[kCat] = null
  this[kCluster] = null
  this[kDanglingIndices] = null
  this[kIndices] = null
  this[kIngest] = null
  this[kNodes] = null
  this[kSnapshot] = null
  this[kTasks] = null
  this[kAsyncSearch] = null
  this[kAutoscaling] = null
  this[kCcr] = null
  this[kDataFrameTransformDeprecated] = null
  this[kEnrich] = null
  this[kEql] = null
  this[kGraph] = null
  this[kIlm] = null
  this[kLicense] = null
  this[kMigration] = null
  this[kMl] = null
  this[kMonitoring] = null
  this[kRollup] = null
  this[kSearchableSnapshots] = null
  this[kSecurity] = null
  this[kSlm] = null
  this[kSql] = null
  this[kSsl] = null
  this[kTransform] = null
  this[kWatcher] = null
  this[kXpack] = null
}

ESAPI.prototype.bulk = bulkApi
ESAPI.prototype.clearScroll = clearScrollApi
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
ESAPI.prototype.ping = pingApi
ESAPI.prototype.putScript = putScriptApi
ESAPI.prototype.rankEval = rankEvalApi
ESAPI.prototype.reindex = reindexApi
ESAPI.prototype.reindexRethrottle = reindexRethrottleApi
ESAPI.prototype.renderSearchTemplate = renderSearchTemplateApi
ESAPI.prototype.scriptsPainlessExecute = scriptsPainlessExecuteApi
ESAPI.prototype.scroll = scrollApi
ESAPI.prototype.search = searchApi
ESAPI.prototype.searchShards = searchShardsApi
ESAPI.prototype.searchTemplate = searchTemplateApi
ESAPI.prototype.termvectors = termvectorsApi
ESAPI.prototype.update = updateApi
ESAPI.prototype.updateByQuery = updateByQueryApi
ESAPI.prototype.updateByQueryRethrottle = updateByQueryRethrottleApi
ESAPI.prototype.closePointInTime = closePointInTimeApi
ESAPI.prototype.openPointInTime = openPointInTimeApi

Object.defineProperties(ESAPI.prototype, {
  cat: {
    get () {
      if (this[kCat] === null) {
        this[kCat] = new Cat(this.transport)
      }
      return this[kCat]
    }
  },
  cluster: {
    get () {
      if (this[kCluster] === null) {
        this[kCluster] = new Cluster(this.transport)
      }
      return this[kCluster]
    }
  },
  danglingIndices: {
    get () {
      if (this[kDanglingIndices] === null) {
        this[kDanglingIndices] = new DanglingIndices(this.transport)
      }
      return this[kDanglingIndices]
    }
  },
  dangling_indices: {
    get () {
      return this.danglingIndices
    }
  },
  indices: {
    get () {
      if (this[kIndices] === null) {
        this[kIndices] = new Indices(this.transport)
      }
      return this[kIndices]
    }
  },
  ingest: {
    get () {
      if (this[kIngest] === null) {
        this[kIngest] = new Ingest(this.transport)
      }
      return this[kIngest]
    }
  },
  nodes: {
    get () {
      if (this[kNodes] === null) {
        this[kNodes] = new Nodes(this.transport)
      }
      return this[kNodes]
    }
  },
  snapshot: {
    get () {
      if (this[kSnapshot] === null) {
        this[kSnapshot] = new Snapshot(this.transport)
      }
      return this[kSnapshot]
    }
  },
  tasks: {
    get () {
      if (this[kTasks] === null) {
        this[kTasks] = new Tasks(this.transport)
      }
      return this[kTasks]
    }
  },
  asyncSearch: {
    get () {
      if (this[kAsyncSearch] === null) {
        this[kAsyncSearch] = new AsyncSearch(this.transport)
      }
      return this[kAsyncSearch]
    }
  },
  async_search: {
    get () {
      return this.asyncSearch
    }
  },
  autoscaling: {
    get () {
      if (this[kAutoscaling] === null) {
        this[kAutoscaling] = new Autoscaling(this.transport)
      }
      return this[kAutoscaling]
    }
  },
  ccr: {
    get () {
      if (this[kCcr] === null) {
        this[kCcr] = new Ccr(this.transport)
      }
      return this[kCcr]
    }
  },
  dataFrameTransformDeprecated: {
    get () {
      if (this[kDataFrameTransformDeprecated] === null) {
        this[kDataFrameTransformDeprecated] = new DataFrameTransformDeprecated(this.transport)
      }
      return this[kDataFrameTransformDeprecated]
    }
  },
  data_frame_transform_deprecated: {
    get () {
      return this.dataFrameTransformDeprecated
    }
  },
  enrich: {
    get () {
      if (this[kEnrich] === null) {
        this[kEnrich] = new Enrich(this.transport)
      }
      return this[kEnrich]
    }
  },
  eql: {
    get () {
      if (this[kEql] === null) {
        this[kEql] = new Eql(this.transport)
      }
      return this[kEql]
    }
  },
  graph: {
    get () {
      if (this[kGraph] === null) {
        this[kGraph] = new Graph(this.transport)
      }
      return this[kGraph]
    }
  },
  ilm: {
    get () {
      if (this[kIlm] === null) {
        this[kIlm] = new Ilm(this.transport)
      }
      return this[kIlm]
    }
  },
  license: {
    get () {
      if (this[kLicense] === null) {
        this[kLicense] = new License(this.transport)
      }
      return this[kLicense]
    }
  },
  migration: {
    get () {
      if (this[kMigration] === null) {
        this[kMigration] = new Migration(this.transport)
      }
      return this[kMigration]
    }
  },
  ml: {
    get () {
      if (this[kMl] === null) {
        this[kMl] = new Ml(this.transport)
      }
      return this[kMl]
    }
  },
  monitoring: {
    get () {
      if (this[kMonitoring] === null) {
        this[kMonitoring] = new Monitoring(this.transport)
      }
      return this[kMonitoring]
    }
  },
  rollup: {
    get () {
      if (this[kRollup] === null) {
        this[kRollup] = new Rollup(this.transport)
      }
      return this[kRollup]
    }
  },
  searchableSnapshots: {
    get () {
      if (this[kSearchableSnapshots] === null) {
        this[kSearchableSnapshots] = new SearchableSnapshots(this.transport)
      }
      return this[kSearchableSnapshots]
    }
  },
  searchable_snapshots: {
    get () {
      return this.searchableSnapshots
    }
  },
  security: {
    get () {
      if (this[kSecurity] === null) {
        this[kSecurity] = new Security(this.transport)
      }
      return this[kSecurity]
    }
  },
  slm: {
    get () {
      if (this[kSlm] === null) {
        this[kSlm] = new Slm(this.transport)
      }
      return this[kSlm]
    }
  },
  sql: {
    get () {
      if (this[kSql] === null) {
        this[kSql] = new Sql(this.transport)
      }
      return this[kSql]
    }
  },
  ssl: {
    get () {
      if (this[kSsl] === null) {
        this[kSsl] = new Ssl(this.transport)
      }
      return this[kSsl]
    }
  },
  transform: {
    get () {
      if (this[kTransform] === null) {
        this[kTransform] = new Transform(this.transport)
      }
      return this[kTransform]
    }
  },
  watcher: {
    get () {
      if (this[kWatcher] === null) {
        this[kWatcher] = new Watcher(this.transport)
      }
      return this[kWatcher]
    }
  },
  xpack: {
    get () {
      if (this[kXpack] === null) {
        this[kXpack] = new Xpack(this.transport)
      }
      return this[kXpack]
    }
  }
})

module.exports = ESAPI
