# `CatNodesNodesRecord` [interface-CatNodesNodesRecord]

| Name | Type | Description |
| - | - | - |
| `"bulk.avg_size_in_bytes"` | string | The average size in bytes of shard bulk. |
| `"bulk.avg_time"` | string | The average time spend in shard bulk. |
| `"bulk.total_operations"` | string | The number of bulk shard operations. |
| `"bulk.total_size_in_bytes"` | string | The total size in bytes of shard bulk. |
| `"bulk.total_time"` | string | The time spend in shard bulk. |
| `"completion.size"` | string | The size of completion. |
| `"disk.avail"` | [ByteSize](./ByteSize.md) | The available disk space. |
| `"disk.total"` | [ByteSize](./ByteSize.md) | The total disk space. |
| `"disk.used_percent"` | [Percentage](./Percentage.md) | The used disk space percentage. |
| `"disk.used"` | [ByteSize](./ByteSize.md) | The used disk space. |
| `"fielddata.evictions"` | string | The fielddata evictions. |
| `"fielddata.memory_size"` | string | The used fielddata cache. |
| `"file_desc.current"` | string | The used file descriptors. |
| `"file_desc.max"` | string | The maximum number of file descriptors. |
| `"file_desc.percent"` | [Percentage](./Percentage.md) | The used file descriptor ratio. |
| `"flush.total_time"` | string | The time spent in flush. |
| `"flush.total"` | string | The number of flushes. |
| `"get.current"` | string | The number of current get ops. |
| `"get.exists_time"` | string | The time spent in successful gets. |
| `"get.exists_total"` | string | The number of successful get operations. |
| `"get.missing_time"` | string | The time spent in failed gets. |
| `"get.missing_total"` | string | The number of failed gets. |
| `"get.time"` | string | The time spent in get. |
| `"get.total"` | string | The number of get ops. |
| `"heap.current"` | string | The used heap. |
| `"heap.max"` | string | The maximum configured heap. |
| `"heap.percent"` | [Percentage](./Percentage.md) | The used heap ratio. |
| `"indexing.delete_current"` | string | The number of current deletions. |
| `"indexing.delete_time"` | string | The time spent in deletions. |
| `"indexing.delete_total"` | string | The number of delete operations. |
| `"indexing.index_current"` | string | The number of current indexing operations. |
| `"indexing.index_failed"` | string | The number of failed indexing operations. |
| `"indexing.index_time"` | string | The time spent in indexing. |
| `"indexing.index_total"` | string | The number of indexing operations. |
| `"merges.current_docs"` | string | The number of current merging docs. |
| `"merges.current_size"` | string | The size of current merges. |
| `"merges.current"` | string | The number of current merges. |
| `"merges.total_docs"` | string | The docs merged. |
| `"merges.total_size"` | string | The size merged. |
| `"merges.total_time"` | string | The time spent in merges. |
| `"merges.total"` | string | The number of completed merge operations. |
| `"node.role"` | string | The roles of the node. Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). |
| `"query_cache.evictions"` | string | The query cache evictions. |
| `"query_cache.hit_count"` | string | The query cache hit counts. |
| `"query_cache.memory_size"` | string | The used query cache. |
| `"query_cache.miss_count"` | string | The query cache miss counts. |
| `"ram.current"` | string | The used machine memory. |
| `"ram.max"` | string | The total machine memory. |
| `"ram.percent"` | [Percentage](./Percentage.md) | The used machine memory ratio. |
| `"refresh.external_time"` | string | The time spent in external refreshes. |
| `"refresh.external_total"` | string | The total external refreshes. |
| `"refresh.listeners"` | string | The number of pending refresh listeners. |
| `"refresh.time"` | string | The time spent in refreshes. |
| `"refresh.total"` | string | The total refreshes. |
| `"request_cache.evictions"` | string | The request cache evictions. |
| `"request_cache.hit_count"` | string | The request cache hit counts. |
| `"request_cache.memory_size"` | string | The used request cache. |
| `"request_cache.miss_count"` | string | The request cache miss counts. |
| `"script.cache_evictions"` | string | The total compiled scripts evicted from the cache. |
| `"script.compilation_limit_triggered"` | string | The script cache compilation limit triggered. |
| `"script.compilations"` | string | The total script compilations. |
| `"search.fetch_current"` | string | The current fetch phase operations. |
| `"search.fetch_time"` | string | The time spent in fetch phase. |
| `"search.fetch_total"` | string | The total fetch operations. |
| `"search.open_contexts"` | string | The open search contexts. |
| `"search.query_current"` | string | The current query phase operations. |
| `"search.query_time"` | string | The time spent in query phase. |
| `"search.query_total"` | string | The total query phase operations. |
| `"search.scroll_current"` | string | The open scroll contexts. |
| `"search.scroll_time"` | string | The time scroll contexts held open. |
| `"search.scroll_total"` | string | The completed scroll contexts. |
| `"segments.count"` | string | The number of segments. |
| `"segments.fixed_bitset_memory"` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. |
| `"segments.index_writer_memory"` | string | The memory used by the index writer. |
| `"segments.memory"` | string | The memory used by segments. |
| `"segments.version_map_memory"` | string | The memory used by the version map. |
| `"suggest.current"` | string | The number of current suggest operations. |
| `"suggest.time"` | string | The time spend in suggest. |
| `"suggest.total"` | string | The number of suggest operations. |
| `b` | string | The Elasticsearch build hash. build |
| `basi` | string | The average size in bytes of shard bulk. 'bulk.avg_size_in_bytes' |
| `bati` | string | The average time spend in shard bulk. 'bulk.avg_time' |
| `bto` | string | The number of bulk shard operations. 'bulk.total_operations' |
| `btsi` | string | The total size in bytes of shard bulk. 'bulk.total_size_in_bytes' |
| `btti` | string | The time spend in shard bulk. 'bulk.total_time' |
| `build` | string | The Elasticsearch build hash. |
| `bulkAvgSizeInBytes` | string | The average size in bytes of shard bulk. 'bulk.avg_size_in_bytes' |
| `bulkAvgTime` | string | The average time spend in shard bulk. 'bulk.avg_time' |
| `bulkTotalOperations` | string | The number of bulk shard operations. 'bulk.total_operations' |
| `bulkTotalSizeInBytes` | string | The total size in bytes of shard bulk. 'bulk.total_size_in_bytes' |
| `bulkTotalTime` | string | The time spend in shard bulk. 'bulk.total_time' |
| `completionSize` | string | The size of completion. 'completion.size' |
| `cpu` | string | The recent system CPU usage as a percentage. |
| `cs` | string | The size of completion. 'completion.size' |
| `d` | [ByteSize](./ByteSize.md) | The available disk space. 'disk.avail' |
| `da` | [ByteSize](./ByteSize.md) | The available disk space. 'disk.avail' |
| `disk` | [ByteSize](./ByteSize.md) | The available disk space. 'disk.avail' |
| `diskAvail` | [ByteSize](./ByteSize.md) | The available disk space. 'disk.avail' |
| `diskTotal` | [ByteSize](./ByteSize.md) | The total disk space. 'disk.total' |
| `diskUsed` | [ByteSize](./ByteSize.md) | The used disk space. 'disk.used' |
| `diskUsedPercent` | [Percentage](./Percentage.md) | The used disk space percentage. 'disk.used_percent' |
| `dt` | [ByteSize](./ByteSize.md) | The total disk space. 'disk.total' |
| `du` | [ByteSize](./ByteSize.md) | The used disk space. 'disk.used' |
| `dup` | [Percentage](./Percentage.md) | The used disk space percentage. 'disk.used_percent' |
| `f` | string | The Elasticsearch distribution flavor. flavor |
| `fdc` | string | The used file descriptors. 'file_desc.current' |
| `fdm` | string | The maximum number of file descriptors. 'file_desc.max' |
| `fdp` | [Percentage](./Percentage.md) | The used file descriptor ratio. 'file_desc.percent' |
| `fe` | string | The fielddata evictions. 'fielddata.evictions' |
| `fielddataEvictions` | string | The fielddata evictions. 'fielddata.evictions' |
| `fielddataMemory` | string | The used fielddata cache. 'fielddata.memory_size' |
| `fileDescriptorCurrent` | string | The used file descriptors. 'file_desc.current' |
| `fileDescriptorMax` | string | The maximum number of file descriptors. 'file_desc.max' |
| `fileDescriptorPercent` | [Percentage](./Percentage.md) | The used file descriptor ratio. 'file_desc.percent' |
| `fixedBitsetMemory` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. 'segments.fixed_bitset_memory' |
| `flavor` | string | The Elasticsearch distribution flavor. |
| `flushTotal` | string | The number of flushes. 'flush.total' |
| `flushTotalTime` | string | The time spent in flush. 'flush.total_time' |
| `fm` | string | The used fielddata cache. 'fielddata.memory_size' |
| `ft` | string | The number of flushes. 'flush.total' |
| `ftt` | string | The time spent in flush. 'flush.total_time' |
| `gc` | string | The number of current get ops. 'get.current' |
| `getCurrent` | string | The number of current get ops. 'get.current' |
| `getExistsTime` | string | The time spent in successful gets. 'get.exists_time' |
| `getExistsTotal` | string | The number of successful get operations. 'get.exists_total' |
| `geti` | string | The time spent in successful gets. 'get.exists_time' |
| `getMissingTime` | string | The time spent in failed gets. 'get.missing_time' |
| `getMissingTotal` | string | The number of failed gets. 'get.missing_total' |
| `geto` | string | The number of successful get operations. 'get.exists_total' |
| `getTime` | string | The time spent in get. 'get.time' |
| `getTotal` | string | The number of get ops. 'get.total' |
| `gmti` | string | The time spent in failed gets. 'get.missing_time' |
| `gmto` | string | The number of failed gets. 'get.missing_total' |
| `gti` | string | The time spent in get. 'get.time' |
| `gto` | string | The number of get ops. 'get.total' |
| `hc` | string | The used heap. 'heap.current' |
| `heapCurrent` | string | The used heap. 'heap.current' |
| `heapMax` | string | The maximum configured heap. 'heap.max' |
| `heapPercent` | [Percentage](./Percentage.md) | The used heap ratio. 'heap.percent' |
| `hm` | string | The maximum configured heap. 'heap.max' |
| `hp` | [Percentage](./Percentage.md) | The used heap ratio. 'heap.percent' |
| `http_address` | string | The bound HTTP address. |
| `http` | string | The bound HTTP address. http_address |
| `i` | string | The IP address. ip |
| `id` | [Id](./Id.md) | The unique node identifier. |
| `idc` | string | The number of current deletions. 'indexing.delete_current' |
| `idti` | string | The time spent in deletions. 'indexing.delete_time' |
| `idto` | string | The number of delete operations. 'indexing.delete_total' |
| `iic` | string | The number of current indexing operations. 'indexing.index_current' |
| `iif` | string | The number of failed indexing operations. 'indexing.index_failed' |
| `iiti` | string | The time spent in indexing. 'indexing.index_time' |
| `iito` | string | The number of indexing operations. 'indexing.index_total' |
| `indexingDeleteCurrent` | string | The number of current deletions. 'indexing.delete_current' |
| `indexingDeleteTime` | string | The time spent in deletions. 'indexing.delete_time' |
| `indexingDeleteTotal` | string | The number of delete operations. 'indexing.delete_total' |
| `indexingIndexCurrent` | string | The number of current indexing operations. 'indexing.index_current' |
| `indexingIndexFailed` | string | The number of failed indexing operations. 'indexing.index_failed' |
| `indexingIndexTime` | string | The time spent in indexing. 'indexing.index_time' |
| `indexingIndexTotal` | string | The number of indexing operations. 'indexing.index_total' |
| `ip` | string | The IP address. |
| `j` | string | The Java version. jdk |
| `jdk` | string | The Java version. |
| `l` | string | The load average for the last fifteen minutes. load_15m |
| `load_15m` | string | The load average for the last fifteen minutes. |
| `load_1m` | string | The load average for the most recent minute. |
| `load_5m` | string | The load average for the last five minutes. |
| `m` | string | Indicates whether the node is the elected master node. Returned values include `*`(elected master) and `-`(not elected master). master |
| `master` | string | Indicates whether the node is the elected master node. Returned values include `*`(elected master) and `-`(not elected master). |
| `mc` | string | The number of current merges. 'merges.current' |
| `mcd` | string | The number of current merging docs. 'merges.current_docs' |
| `mcs` | string | The size of current merges. 'merges.current_size' |
| `mergesCurrent` | string | The number of current merges. 'merges.current' |
| `mergesCurrentDocs` | string | The number of current merging docs. 'merges.current_docs' |
| `mergesCurrentSize` | string | The size of current merges. 'merges.current_size' |
| `mergesTotal` | string | The number of completed merge operations. 'merges.total' |
| `mergesTotalDocs` | string | The docs merged. 'merges.total_docs' |
| `mergesTotalSize` | string | The size merged. 'merges.total_size' |
| `mergesTotalTime` | string | The time spent in merges. 'merges.total_time' |
| `mt` | string | The number of completed merge operations. 'merges.total' |
| `mtd` | string | The docs merged. 'merges.total_docs' |
| `mts` | string | The size merged. 'merges.total_size' |
| `mtt` | string | The time spent in merges. 'merges.total_time' |
| `n` | [Name](./Name.md) | The node name. name |
| `name` | [Name](./Name.md) | The node name. |
| `nodeId` | [Id](./Id.md) | The unique node identifier. id |
| `nodeRole` | string | The roles of the node. Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). 'node.role' |
| `p` | string | The process identifier. pid |
| `pid` | string | The process identifier. |
| `po` | string | The bound transport port. port |
| `port` | string | The bound transport port. |
| `qce` | string | The query cache evictions. 'query_cache.evictions' |
| `qchc` | string | The query cache hit counts. 'query_cache.hit_count' |
| `qcm` | string | The used query cache. 'query_cache.memory_size' |
| `qcmc` | string | The query cache miss counts. 'query_cache.miss_count' |
| `queryCacheEvictions` | string | The query cache evictions. 'query_cache.evictions' |
| `queryCacheHitCount` | string | The query cache hit counts. 'query_cache.hit_count' |
| `queryCacheMemory` | string | The used query cache. 'query_cache.memory_size' |
| `queryCacheMissCount` | string | The query cache miss counts. 'query_cache.miss_count' |
| `r` | string | The roles of the node. Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). 'node.role' |
| `ramCurrent` | string | The used machine memory. 'ram.current' |
| `ramMax` | string | The total machine memory. 'ram.max' |
| `ramPercent` | [Percentage](./Percentage.md) | The used machine memory ratio. 'ram.percent' |
| `rc` | string | The used machine memory. 'ram.current' |
| `rce` | string | The request cache evictions. 'request_cache.evictions' |
| `rchc` | string | The request cache hit counts. 'request_cache.hit_count' |
| `rcm` | string | The used request cache. 'request_cache.memory_size' |
| `rcmc` | string | The request cache miss counts. 'request_cache.miss_count' |
| `refreshListeners` | string | The number of pending refresh listeners. 'refresh.listeners' |
| `refreshTime` | string | The time spent in external refreshes. 'refresh.external_time' |
| `refreshTotal` | string | The total external refreshes. 'refresh.external_total' |
| `requestCacheEvictions` | string | The request cache evictions. 'request_cache.evictions' |
| `requestCacheHitCount` | string | The request cache hit counts. 'request_cache.hit_count' |
| `requestCacheMemory` | string | The used request cache. 'request_cache.memory_size' |
| `requestCacheMissCount` | string | The request cache miss counts. 'request_cache.miss_count' |
| `rli` | string | The number of pending refresh listeners. 'refresh.listeners' |
| `rn` | string | The total machine memory. 'ram.max' |
| `role` | string | The roles of the node. Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). 'node.role' |
| `rp` | [Percentage](./Percentage.md) | The used machine memory ratio. 'ram.percent' |
| `rti` | string | The time spent in external refreshes. 'refresh.external_time' |
| `rto` | string | The total external refreshes. 'refresh.external_total' |
| `sc` | string | The number of segments. 'segments.count' |
| `scc` | string | The open scroll contexts. 'search.scroll_current' |
| `scrcc` | string | The total script compilations. 'script.compilations' |
| `scrce` | string | The total compiled scripts evicted from the cache. 'script.cache_evictions' |
| `scrclt` | string | The script cache compilation limit triggered. 'script.compilation_limit_triggered' |
| `scriptCacheCompilationLimitTriggered` | string | The script cache compilation limit triggered. 'script.compilation_limit_triggered' |
| `scriptCacheEvictions` | string | The total compiled scripts evicted from the cache. 'script.cache_evictions' |
| `scriptCompilations` | string | The total script compilations. 'script.compilations' |
| `scti` | string | The time scroll contexts held open. 'search.scroll_time' |
| `scto` | string | The completed scroll contexts. 'search.scroll_total' |
| `searchFetchCurrent` | string | The current fetch phase operations. 'search.fetch_current' |
| `searchFetchTime` | string | The time spent in fetch phase. 'search.fetch_time' |
| `searchFetchTotal` | string | The total fetch operations. 'search.fetch_total' |
| `searchOpenContexts` | string | The open search contexts. 'search.open_contexts' |
| `searchQueryCurrent` | string | The current query phase operations. 'search.query_current' |
| `searchQueryTime` | string | The time spent in query phase. 'search.query_time' |
| `searchQueryTotal` | string | The total query phase operations. 'search.query_total' |
| `searchScrollCurrent` | string | The open scroll contexts. 'search.scroll_current' |
| `searchScrollTime` | string | The time scroll contexts held open. 'search.scroll_time' |
| `searchScrollTotal` | string | The completed scroll contexts. 'search.scroll_total' |
| `segmentsCount` | string | The number of segments. 'segments.count' |
| `segmentsIndexWriterMemory` | string | The memory used by the index writer. 'segments.index_writer_memory' |
| `segmentsMemory` | string | The memory used by segments. 'segments.memory' |
| `segmentsVersionMapMemory` | string | The memory used by the version map. 'segments.version_map_memory' |
| `sfbm` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. 'segments.fixed_bitset_memory' |
| `sfc` | string | The current fetch phase operations. 'search.fetch_current' |
| `sfti` | string | The time spent in fetch phase. 'search.fetch_time' |
| `sfto` | string | The total fetch operations. 'search.fetch_total' |
| `siwm` | string | The memory used by the index writer. 'segments.index_writer_memory' |
| `sm` | string | The memory used by segments. 'segments.memory' |
| `so` | string | The open search contexts. 'search.open_contexts' |
| `sqc` | string | The current query phase operations. 'search.query_current' |
| `sqti` | string | The time spent in query phase. 'search.query_time' |
| `sqto` | string | The total query phase operations. 'search.query_total' |
| `suc` | string | The number of current suggest operations. 'suggest.current' |
| `suggestCurrent` | string | The number of current suggest operations. 'suggest.current' |
| `suggestTime` | string | The time spend in suggest. 'suggest.time' |
| `suggestTotal` | string | The number of suggest operations. 'suggest.total' |
| `suti` | string | The time spend in suggest. 'suggest.time' |
| `suto` | string | The number of suggest operations. 'suggest.total' |
| `svmm` | string | The memory used by the version map. 'segments.version_map_memory' |
| `t` | string | The Elasticsearch distribution type. type |
| `type` | string | The Elasticsearch distribution type. |
| `u` | string | The node uptime. uptime |
| `uptime` | string | The node uptime. |
| `v` | [VersionString](./VersionString.md) | The Elasticsearch version. version |
| `version` | [VersionString](./VersionString.md) | The Elasticsearch version. |
