# CatNodesNodesRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | [`Id`](Id.md) | The unique node identifier. |
| `nodeId?` | [`Id`](Id.md) | The unique node identifier. |
| `pid?` | `string` | The process identifier. |
| `p?` | `string` | The process identifier. |
| `ip?` | `string` | The IP address. |
| `i?` | `string` | The IP address. |
| `port?` | `string` | The bound transport port. |
| `po?` | `string` | The bound transport port. |
| `http_address?` | `string` | The bound HTTP address. |
| `http?` | `string` | The bound HTTP address. |
| `version?` | [`VersionString`](VersionString.md) | The Elasticsearch version. |
| `v?` | [`VersionString`](VersionString.md) | The Elasticsearch version. |
| `flavor?` | `string` | The Elasticsearch distribution flavor. |
| `f?` | `string` | The Elasticsearch distribution flavor. |
| `type?` | `string` | The Elasticsearch distribution type. |
| `t?` | `string` | The Elasticsearch distribution type. |
| `build?` | `string` | The Elasticsearch build hash. |
| `b?` | `string` | The Elasticsearch build hash. |
| `jdk?` | `string` | The Java version. |
| `j?` | `string` | The Java version. |
| `'disk.total'?` | [`ByteSize`](ByteSize.md) | The total disk space. |
| `dt?` | [`ByteSize`](ByteSize.md) | The total disk space. |
| `diskTotal?` | [`ByteSize`](ByteSize.md) | The total disk space. |
| `'disk.used'?` | [`ByteSize`](ByteSize.md) | The used disk space. |
| `du?` | [`ByteSize`](ByteSize.md) | The used disk space. |
| `diskUsed?` | [`ByteSize`](ByteSize.md) | The used disk space. |
| `'disk.avail'?` | [`ByteSize`](ByteSize.md) | The available disk space. |
| `d?` | [`ByteSize`](ByteSize.md) | The available disk space. |
| `da?` | [`ByteSize`](ByteSize.md) | The available disk space. |
| `disk?` | [`ByteSize`](ByteSize.md) | The available disk space. |
| `diskAvail?` | [`ByteSize`](ByteSize.md) | The available disk space. |
| `'disk.used_percent'?` | [`Percentage`](Percentage.md) | The used disk space percentage. |
| `dup?` | [`Percentage`](Percentage.md) | The used disk space percentage. |
| `diskUsedPercent?` | [`Percentage`](Percentage.md) | The used disk space percentage. |
| `'heap.current'?` | `string` | The used heap. |
| `hc?` | `string` | The used heap. |
| `heapCurrent?` | `string` | The used heap. |
| `'heap.percent'?` | [`Percentage`](Percentage.md) | The used heap ratio. |
| `hp?` | [`Percentage`](Percentage.md) | The used heap ratio. |
| `heapPercent?` | [`Percentage`](Percentage.md) | The used heap ratio. |
| `'heap.max'?` | `string` | The maximum configured heap. |
| `hm?` | `string` | The maximum configured heap. |
| `heapMax?` | `string` | The maximum configured heap. |
| `'ram.current'?` | `string` | The used machine memory. |
| `rc?` | `string` | The used machine memory. |
| `ramCurrent?` | `string` | The used machine memory. |
| `'ram.percent'?` | [`Percentage`](Percentage.md) | The used machine memory ratio. |
| `rp?` | [`Percentage`](Percentage.md) | The used machine memory ratio. |
| `ramPercent?` | [`Percentage`](Percentage.md) | The used machine memory ratio. |
| `'ram.max'?` | `string` | The total machine memory. |
| `rn?` | `string` | The total machine memory. |
| `ramMax?` | `string` | The total machine memory. |
| `'file_desc.current'?` | `string` | The used file descriptors. |
| `fdc?` | `string` | The used file descriptors. |
| `fileDescriptorCurrent?` | `string` | The used file descriptors. |
| `'file_desc.percent'?` | [`Percentage`](Percentage.md) | The used file descriptor ratio. |
| `fdp?` | [`Percentage`](Percentage.md) | The used file descriptor ratio. |
| `fileDescriptorPercent?` | [`Percentage`](Percentage.md) | The used file descriptor ratio. |
| `'file_desc.max'?` | `string` | The maximum number of file descriptors. |
| `fdm?` | `string` | The maximum number of file descriptors. |
| `fileDescriptorMax?` | `string` | The maximum number of file descriptors. |
| `cpu?` | `string` | The recent system CPU usage as a percentage. |
| `load_1m?` | `string` | The load average for the most recent minute. |
| `load_5m?` | `string` | The load average for the last five minutes. |
| `load_15m?` | `string` | The load average for the last fifteen minutes. |
| `l?` | `string` | The load average for the last fifteen minutes. |
| `available_processors?` | `string` | The number of available processors (logical CPU cores available to the JVM). |
| `ap?` | `string` | The number of available processors (logical CPU cores available to the JVM). |
| `uptime?` | `string` | The node uptime. |
| `u?` | `string` | The node uptime. |
| `'node.role'?` | `string` | The roles of the node.
Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). |
| `r?` | `string` | The roles of the node.
Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). |
| `role?` | `string` | The roles of the node.
Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). |
| `nodeRole?` | `string` | The roles of the node.
Returned values include `c`(cold node), `d`(data node), `f`(frozen node), `h`(hot node), `i`(ingest node), `l`(machine learning node), `m` (master eligible node), `r`(remote cluster client node), `s`(content node), `t`(transform node), `v`(voting-only node), `w`(warm node),and `-`(coordinating node only). |
| `master?` | `string` | Indicates whether the node is the elected master node.
Returned values include `*`(elected master) and `-`(not elected master). |
| `m?` | `string` | Indicates whether the node is the elected master node.
Returned values include `*`(elected master) and `-`(not elected master). |
| `name?` | [`Name`](Name.md) | The node name. |
| `n?` | [`Name`](Name.md) | The node name. |
| `'completion.size'?` | `string` | The size of completion. |
| `cs?` | `string` | The size of completion. |
| `completionSize?` | `string` | The size of completion. |
| `'fielddata.memory_size'?` | `string` | The used fielddata cache. |
| `fm?` | `string` | The used fielddata cache. |
| `fielddataMemory?` | `string` | The used fielddata cache. |
| `'fielddata.evictions'?` | `string` | The fielddata evictions. |
| `fe?` | `string` | The fielddata evictions. |
| `fielddataEvictions?` | `string` | The fielddata evictions. |
| `'query_cache.memory_size'?` | `string` | The used query cache. |
| `qcm?` | `string` | The used query cache. |
| `queryCacheMemory?` | `string` | The used query cache. |
| `'query_cache.evictions'?` | `string` | The query cache evictions. |
| `qce?` | `string` | The query cache evictions. |
| `queryCacheEvictions?` | `string` | The query cache evictions. |
| `'query_cache.hit_count'?` | `string` | The query cache hit counts. |
| `qchc?` | `string` | The query cache hit counts. |
| `queryCacheHitCount?` | `string` | The query cache hit counts. |
| `'query_cache.miss_count'?` | `string` | The query cache miss counts. |
| `qcmc?` | `string` | The query cache miss counts. |
| `queryCacheMissCount?` | `string` | The query cache miss counts. |
| `'request_cache.memory_size'?` | `string` | The used request cache. |
| `rcm?` | `string` | The used request cache. |
| `requestCacheMemory?` | `string` | The used request cache. |
| `'request_cache.evictions'?` | `string` | The request cache evictions. |
| `rce?` | `string` | The request cache evictions. |
| `requestCacheEvictions?` | `string` | The request cache evictions. |
| `'request_cache.hit_count'?` | `string` | The request cache hit counts. |
| `rchc?` | `string` | The request cache hit counts. |
| `requestCacheHitCount?` | `string` | The request cache hit counts. |
| `'request_cache.miss_count'?` | `string` | The request cache miss counts. |
| `rcmc?` | `string` | The request cache miss counts. |
| `requestCacheMissCount?` | `string` | The request cache miss counts. |
| `'flush.total'?` | `string` | The number of flushes. |
| `ft?` | `string` | The number of flushes. |
| `flushTotal?` | `string` | The number of flushes. |
| `'flush.total_time'?` | `string` | The time spent in flush. |
| `ftt?` | `string` | The time spent in flush. |
| `flushTotalTime?` | `string` | The time spent in flush. |
| `'get.current'?` | `string` | The number of current get ops. |
| `gc?` | `string` | The number of current get ops. |
| `getCurrent?` | `string` | The number of current get ops. |
| `'get.time'?` | `string` | The time spent in get. |
| `gti?` | `string` | The time spent in get. |
| `getTime?` | `string` | The time spent in get. |
| `'get.total'?` | `string` | The number of get ops. |
| `gto?` | `string` | The number of get ops. |
| `getTotal?` | `string` | The number of get ops. |
| `'get.exists_time'?` | `string` | The time spent in successful gets. |
| `geti?` | `string` | The time spent in successful gets. |
| `getExistsTime?` | `string` | The time spent in successful gets. |
| `'get.exists_total'?` | `string` | The number of successful get operations. |
| `geto?` | `string` | The number of successful get operations. |
| `getExistsTotal?` | `string` | The number of successful get operations. |
| `'get.missing_time'?` | `string` | The time spent in failed gets. |
| `gmti?` | `string` | The time spent in failed gets. |
| `getMissingTime?` | `string` | The time spent in failed gets. |
| `'get.missing_total'?` | `string` | The number of failed gets. |
| `gmto?` | `string` | The number of failed gets. |
| `getMissingTotal?` | `string` | The number of failed gets. |
| `'indexing.delete_current'?` | `string` | The number of current deletions. |
| `idc?` | `string` | The number of current deletions. |
| `indexingDeleteCurrent?` | `string` | The number of current deletions. |
| `'indexing.delete_time'?` | `string` | The time spent in deletions. |
| `idti?` | `string` | The time spent in deletions. |
| `indexingDeleteTime?` | `string` | The time spent in deletions. |
| `'indexing.delete_total'?` | `string` | The number of delete operations. |
| `idto?` | `string` | The number of delete operations. |
| `indexingDeleteTotal?` | `string` | The number of delete operations. |
| `'indexing.index_current'?` | `string` | The number of current indexing operations. |
| `iic?` | `string` | The number of current indexing operations. |
| `indexingIndexCurrent?` | `string` | The number of current indexing operations. |
| `'indexing.index_time'?` | `string` | The time spent in indexing. |
| `iiti?` | `string` | The time spent in indexing. |
| `indexingIndexTime?` | `string` | The time spent in indexing. |
| `'indexing.index_total'?` | `string` | The number of indexing operations. |
| `iito?` | `string` | The number of indexing operations. |
| `indexingIndexTotal?` | `string` | The number of indexing operations. |
| `'indexing.index_failed'?` | `string` | The number of failed indexing operations. |
| `iif?` | `string` | The number of failed indexing operations. |
| `indexingIndexFailed?` | `string` | The number of failed indexing operations. |
| `'merges.current'?` | `string` | The number of current merges. |
| `mc?` | `string` | The number of current merges. |
| `mergesCurrent?` | `string` | The number of current merges. |
| `'merges.current_docs'?` | `string` | The number of current merging docs. |
| `mcd?` | `string` | The number of current merging docs. |
| `mergesCurrentDocs?` | `string` | The number of current merging docs. |
| `'merges.current_size'?` | `string` | The size of current merges. |
| `mcs?` | `string` | The size of current merges. |
| `mergesCurrentSize?` | `string` | The size of current merges. |
| `'merges.total'?` | `string` | The number of completed merge operations. |
| `mt?` | `string` | The number of completed merge operations. |
| `mergesTotal?` | `string` | The number of completed merge operations. |
| `'merges.total_docs'?` | `string` | The docs merged. |
| `mtd?` | `string` | The docs merged. |
| `mergesTotalDocs?` | `string` | The docs merged. |
| `'merges.total_size'?` | `string` | The size merged. |
| `mts?` | `string` | The size merged. |
| `mergesTotalSize?` | `string` | The size merged. |
| `'merges.total_time'?` | `string` | The time spent in merges. |
| `mtt?` | `string` | The time spent in merges. |
| `mergesTotalTime?` | `string` | The time spent in merges. |
| `'refresh.total'?` | `string` | The total refreshes. |
| `'refresh.time'?` | `string` | The time spent in refreshes. |
| `'refresh.external_total'?` | `string` | The total external refreshes. |
| `rto?` | `string` | The total external refreshes. |
| `refreshTotal?` | `string` | The total external refreshes. |
| `'refresh.external_time'?` | `string` | The time spent in external refreshes. |
| `rti?` | `string` | The time spent in external refreshes. |
| `refreshTime?` | `string` | The time spent in external refreshes. |
| `'refresh.listeners'?` | `string` | The number of pending refresh listeners. |
| `rli?` | `string` | The number of pending refresh listeners. |
| `refreshListeners?` | `string` | The number of pending refresh listeners. |
| `'script.compilations'?` | `string` | The total script compilations. |
| `scrcc?` | `string` | The total script compilations. |
| `scriptCompilations?` | `string` | The total script compilations. |
| `'script.cache_evictions'?` | `string` | The total compiled scripts evicted from the cache. |
| `scrce?` | `string` | The total compiled scripts evicted from the cache. |
| `scriptCacheEvictions?` | `string` | The total compiled scripts evicted from the cache. |
| `'script.compilation_limit_triggered'?` | `string` | The script cache compilation limit triggered. |
| `scrclt?` | `string` | The script cache compilation limit triggered. |
| `scriptCacheCompilationLimitTriggered?` | `string` | The script cache compilation limit triggered. |
| `'search.fetch_current'?` | `string` | The current fetch phase operations. |
| `sfc?` | `string` | The current fetch phase operations. |
| `searchFetchCurrent?` | `string` | The current fetch phase operations. |
| `'search.fetch_time'?` | `string` | The time spent in fetch phase. |
| `sfti?` | `string` | The time spent in fetch phase. |
| `searchFetchTime?` | `string` | The time spent in fetch phase. |
| `'search.fetch_total'?` | `string` | The total fetch operations. |
| `sfto?` | `string` | The total fetch operations. |
| `searchFetchTotal?` | `string` | The total fetch operations. |
| `'search.open_contexts'?` | `string` | The open search contexts. |
| `so?` | `string` | The open search contexts. |
| `searchOpenContexts?` | `string` | The open search contexts. |
| `'search.query_current'?` | `string` | The current query phase operations. |
| `sqc?` | `string` | The current query phase operations. |
| `searchQueryCurrent?` | `string` | The current query phase operations. |
| `'search.query_time'?` | `string` | The time spent in query phase. |
| `sqti?` | `string` | The time spent in query phase. |
| `searchQueryTime?` | `string` | The time spent in query phase. |
| `'search.query_total'?` | `string` | The total query phase operations. |
| `sqto?` | `string` | The total query phase operations. |
| `searchQueryTotal?` | `string` | The total query phase operations. |
| `'search.scroll_current'?` | `string` | The open scroll contexts. |
| `scc?` | `string` | The open scroll contexts. |
| `searchScrollCurrent?` | `string` | The open scroll contexts. |
| `'search.scroll_time'?` | `string` | The time scroll contexts held open. |
| `scti?` | `string` | The time scroll contexts held open. |
| `searchScrollTime?` | `string` | The time scroll contexts held open. |
| `'search.scroll_total'?` | `string` | The completed scroll contexts. |
| `scto?` | `string` | The completed scroll contexts. |
| `searchScrollTotal?` | `string` | The completed scroll contexts. |
| `'segments.count'?` | `string` | The number of segments. |
| `sc?` | `string` | The number of segments. |
| `segmentsCount?` | `string` | The number of segments. |
| `'segments.memory'?` | `string` | The memory used by segments. |
| `sm?` | `string` | The memory used by segments. |
| `segmentsMemory?` | `string` | The memory used by segments. |
| `'segments.index_writer_memory'?` | `string` | The memory used by the index writer. |
| `siwm?` | `string` | The memory used by the index writer. |
| `segmentsIndexWriterMemory?` | `string` | The memory used by the index writer. |
| `'segments.version_map_memory'?` | `string` | The memory used by the version map. |
| `svmm?` | `string` | The memory used by the version map. |
| `segmentsVersionMapMemory?` | `string` | The memory used by the version map. |
| `'segments.fixed_bitset_memory'?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. |
| `sfbm?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. |
| `fixedBitsetMemory?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields. |
| `'suggest.current'?` | `string` | The number of current suggest operations. |
| `suc?` | `string` | The number of current suggest operations. |
| `suggestCurrent?` | `string` | The number of current suggest operations. |
| `'suggest.time'?` | `string` | The time spend in suggest. |
| `suti?` | `string` | The time spend in suggest. |
| `suggestTime?` | `string` | The time spend in suggest. |
| `'suggest.total'?` | `string` | The number of suggest operations. |
| `suto?` | `string` | The number of suggest operations. |
| `suggestTotal?` | `string` | The number of suggest operations. |
| `'bulk.total_operations'?` | `string` | The number of bulk shard operations. |
| `bto?` | `string` | The number of bulk shard operations. |
| `bulkTotalOperations?` | `string` | The number of bulk shard operations. |
| `'bulk.total_time'?` | `string` | The time spend in shard bulk. |
| `btti?` | `string` | The time spend in shard bulk. |
| `bulkTotalTime?` | `string` | The time spend in shard bulk. |
| `'bulk.total_size_in_bytes'?` | `string` | The total size in bytes of shard bulk. |
| `btsi?` | `string` | The total size in bytes of shard bulk. |
| `bulkTotalSizeInBytes?` | `string` | The total size in bytes of shard bulk. |
| `'bulk.avg_time'?` | `string` | The average time spend in shard bulk. |
| `bati?` | `string` | The average time spend in shard bulk. |
| `bulkAvgTime?` | `string` | The average time spend in shard bulk. |
| `'bulk.avg_size_in_bytes'?` | `string` | The average size in bytes of shard bulk. |
| `basi?` | `string` | The average size in bytes of shard bulk. |
| `bulkAvgSizeInBytes?` | `string` | The average size in bytes of shard bulk. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
