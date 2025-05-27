## Interface `CatIndicesIndicesRecord`

| Name | Type | Description |
| - | - | - |
| `"bulk.avg_size_in_bytes"` | string | average size in bytes of shard bulk |
| `"bulk.avg_time"` | string | average time spend in shard bulk |
| `"bulk.total_operations"` | string | number of bulk shard ops |
| `"bulk.total_size_in_bytes"` | string | total size in bytes of shard bulk |
| `"bulk.total_time"` | string | time spend in shard bulk |
| `"completion.size"` | string | size of completion |
| `"creation.date.string"` | string | index creation date (as string) |
| `"creation.date"` | string | index creation date (millisecond value) |
| `"dataset.size"` | string | null | total size of dataset (including the cache for partially mounted indices) |
| `"docs.count"` | string | null | available docs |
| `"docs.deleted"` | string | null | deleted docs |
| `"fielddata.evictions"` | string | fielddata evictions |
| `"fielddata.memory_size"` | string | used fielddata cache |
| `"flush.total_time"` | string | time spent in flush |
| `"flush.total"` | string | number of flushes |
| `"get.current"` | string | number of current get ops |
| `"get.exists_time"` | string | time spent in successful gets |
| `"get.exists_total"` | string | number of successful gets |
| `"get.missing_time"` | string | time spent in failed gets |
| `"get.missing_total"` | string | number of failed gets |
| `"get.time"` | string | time spent in get |
| `"get.total"` | string | number of get ops |
| `"indexing.delete_current"` | string | number of current deletions |
| `"indexing.delete_time"` | string | time spent in deletions |
| `"indexing.delete_total"` | string | number of delete ops |
| `"indexing.index_current"` | string | number of current indexing ops |
| `"indexing.index_failed"` | string | number of failed indexing ops |
| `"indexing.index_time"` | string | time spent in indexing |
| `"indexing.index_total"` | string | number of indexing ops |
| `"memory.total"` | string | total used memory |
| `"merges.current_docs"` | string | number of current merging docs |
| `"merges.current_size"` | string | size of current merges |
| `"merges.current"` | string | number of current merges |
| `"merges.total_docs"` | string | docs merged |
| `"merges.total_size"` | string | size merged |
| `"merges.total_time"` | string | time spent in merges |
| `"merges.total"` | string | number of completed merge ops |
| `"pri.bulk.avg_size_in_bytes"` | string | average size in bytes of shard bulk |
| `"pri.bulk.avg_time"` | string | average time spend in shard bulk |
| `"pri.bulk.total_operations"` | string | number of bulk shard ops |
| `"pri.bulk.total_size_in_bytes"` | string | total size in bytes of shard bulk |
| `"pri.bulk.total_time"` | string | time spend in shard bulk |
| `"pri.completion.size"` | string | size of completion |
| `"pri.fielddata.evictions"` | string | fielddata evictions |
| `"pri.fielddata.memory_size"` | string | used fielddata cache |
| `"pri.flush.total_time"` | string | time spent in flush |
| `"pri.flush.total"` | string | number of flushes |
| `"pri.get.current"` | string | number of current get ops |
| `"pri.get.exists_time"` | string | time spent in successful gets |
| `"pri.get.exists_total"` | string | number of successful gets |
| `"pri.get.missing_time"` | string | time spent in failed gets |
| `"pri.get.missing_total"` | string | number of failed gets |
| `"pri.get.time"` | string | time spent in get |
| `"pri.get.total"` | string | number of get ops |
| `"pri.indexing.delete_current"` | string | number of current deletions |
| `"pri.indexing.delete_time"` | string | time spent in deletions |
| `"pri.indexing.delete_total"` | string | number of delete ops |
| `"pri.indexing.index_current"` | string | number of current indexing ops |
| `"pri.indexing.index_failed"` | string | number of failed indexing ops |
| `"pri.indexing.index_time"` | string | time spent in indexing |
| `"pri.indexing.index_total"` | string | number of indexing ops |
| `"pri.memory.total"` | string | total user memory |
| `"pri.merges.current_docs"` | string | number of current merging docs |
| `"pri.merges.current_size"` | string | size of current merges |
| `"pri.merges.current"` | string | number of current merges |
| `"pri.merges.total_docs"` | string | docs merged |
| `"pri.merges.total_size"` | string | size merged |
| `"pri.merges.total_time"` | string | time spent in merges |
| `"pri.merges.total"` | string | number of completed merge ops |
| `"pri.query_cache.evictions"` | string | query cache evictions |
| `"pri.query_cache.memory_size"` | string | used query cache |
| `"pri.refresh.external_time"` | string | time spent in external refreshes |
| `"pri.refresh.external_total"` | string | total external refreshes |
| `"pri.refresh.listeners"` | string | number of pending refresh listeners |
| `"pri.refresh.time"` | string | time spent in refreshes |
| `"pri.refresh.total"` | string | total refreshes |
| `"pri.request_cache.evictions"` | string | request cache evictions |
| `"pri.request_cache.hit_count"` | string | request cache hit count |
| `"pri.request_cache.memory_size"` | string | used request cache |
| `"pri.request_cache.miss_count"` | string | request cache miss count |
| `"pri.search.fetch_current"` | string | current fetch phase ops |
| `"pri.search.fetch_time"` | string | time spent in fetch phase |
| `"pri.search.fetch_total"` | string | total fetch ops |
| `"pri.search.open_contexts"` | string | open search contexts |
| `"pri.search.query_current"` | string | current query phase ops |
| `"pri.search.query_time"` | string | time spent in query phase |
| `"pri.search.query_total"` | string | total query phase ops |
| `"pri.search.scroll_current"` | string | open scroll contexts |
| `"pri.search.scroll_time"` | string | time scroll contexts held open |
| `"pri.search.scroll_total"` | string | completed scroll contexts |
| `"pri.segments.count"` | string | number of segments |
| `"pri.segments.fixed_bitset_memory"` | string | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `"pri.segments.index_writer_memory"` | string | memory used by index writer |
| `"pri.segments.memory"` | string | memory used by segments |
| `"pri.segments.version_map_memory"` | string | memory used by version map |
| `"pri.store.size"` | string | null | store size of primaries |
| `"pri.suggest.current"` | string | number of current suggest ops |
| `"pri.suggest.time"` | string | time spend in suggest |
| `"pri.suggest.total"` | string | number of suggest ops |
| `"pri.warmer.current"` | string | current warmer ops |
| `"pri.warmer.total_time"` | string | time spent in warmers |
| `"pri.warmer.total"` | string | total warmer ops |
| `"query_cache.evictions"` | string | query cache evictions |
| `"query_cache.memory_size"` | string | used query cache |
| `"refresh.external_time"` | string | time spent in external refreshes |
| `"refresh.external_total"` | string | total external refreshes |
| `"refresh.listeners"` | string | number of pending refresh listeners |
| `"refresh.time"` | string | time spent in refreshes |
| `"refresh.total"` | string | total refreshes |
| `"request_cache.evictions"` | string | request cache evictions |
| `"request_cache.hit_count"` | string | request cache hit count |
| `"request_cache.memory_size"` | string | used request cache |
| `"request_cache.miss_count"` | string | request cache miss count |
| `"search.fetch_current"` | string | current fetch phase ops |
| `"search.fetch_time"` | string | time spent in fetch phase |
| `"search.fetch_total"` | string | total fetch ops |
| `"search.open_contexts"` | string | open search contexts |
| `"search.query_current"` | string | current query phase ops |
| `"search.query_time"` | string | time spent in query phase |
| `"search.query_total"` | string | total query phase ops |
| `"search.scroll_current"` | string | open scroll contexts |
| `"search.scroll_time"` | string | time scroll contexts held open |
| `"search.scroll_total"` | string | completed scroll contexts |
| `"search.throttled"` | string | indicates if the index is search throttled |
| `"segments.count"` | string | number of segments |
| `"segments.fixed_bitset_memory"` | string | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `"segments.index_writer_memory"` | string | memory used by index writer |
| `"segments.memory"` | string | memory used by segments |
| `"segments.version_map_memory"` | string | memory used by version map |
| `"shards.primary"` | string | number of primary shards pri |
| `"shards.replica"` | string | number of replica shards rep |
| `"store.size"` | string | null | store size of primaries & replicas |
| `"suggest.current"` | string | number of current suggest ops |
| `"suggest.time"` | string | time spend in suggest |
| `"suggest.total"` | string | number of suggest ops |
| `"warmer.current"` | string | current warmer ops |
| `"warmer.total_time"` | string | time spent in warmers |
| `"warmer.total"` | string | total warmer ops |
| `basi` | string | average size in bytes of shard bulk 'bulk.avg_size_in_bytes' |
| `bati` | string | average time spend in shard bulk 'bulk.avg_time' |
| `bto` | string | number of bulk shard ops 'bulk.total_operations' |
| `btsi` | string | total size in bytes of shard bulk 'bulk.total_size_in_bytes' |
| `btti` | string | time spend in shard bulk 'bulk.total_time' |
| `bulkAvgSizeInBytes` | string | average size in bytes of shard bulk 'bulk.avg_size_in_bytes' |
| `bulkAvgTime` | string | average time spend in shard bulk 'bulk.avg_time' |
| `bulkTotalOperation` | string | number of bulk shard ops 'bulk.total_operations' |
| `bulkTotalSizeInBytes` | string | total size in bytes of shard bulk 'bulk.total_size_in_bytes' |
| `bulkTotalTime` | string | time spend in shard bulk 'bulk.total_time' |
| `cd` | string | index creation date (millisecond value) 'creation.date' |
| `cds` | string | index creation date (as string) 'creation.date.string' |
| `completionSize` | string | size of completion 'completion.size' |
| `cs` | string | size of completion 'completion.size' |
| `dc` | string | null | available docs 'docs.count' |
| `dd` | string | null | deleted docs 'docs.deleted' |
| `docsCount` | string | null | available docs 'docs.count' |
| `docsDeleted` | string | null | deleted docs 'docs.deleted' |
| `fe` | string | fielddata evictions 'fielddata.evictions' |
| `fielddataEvictions` | string | fielddata evictions 'fielddata.evictions' |
| `fielddataMemory` | string | used fielddata cache 'fielddata.memory_size' |
| `fixedBitsetMemory` | string | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields 'segments.fixed_bitset_memory' |
| `flushTotal` | string | number of flushes 'flush.total' |
| `flushTotalTime` | string | time spent in flush 'flush.total_time' |
| `fm` | string | used fielddata cache 'fielddata.memory_size' |
| `ft` | string | number of flushes 'flush.total' |
| `ftt` | string | time spent in flush 'flush.total_time' |
| `gc` | string | number of current get ops 'get.current' |
| `getCurrent` | string | number of current get ops 'get.current' |
| `getExistsTime` | string | time spent in successful gets 'get.exists_time' |
| `getExistsTotal` | string | number of successful gets 'get.exists_total' |
| `geti` | string | time spent in successful gets 'get.exists_time' |
| `getMissingTime` | string | time spent in failed gets 'get.missing_time' |
| `getMissingTotal` | string | number of failed gets 'get.missing_total' |
| `geto` | string | number of successful gets 'get.exists_total' |
| `getTime` | string | time spent in get 'get.time' |
| `getTotal` | string | number of get ops 'get.total' |
| `gmti` | string | time spent in failed gets 'get.missing_time' |
| `gmto` | string | number of failed gets 'get.missing_total' |
| `gti` | string | time spent in get 'get.time' |
| `gto` | string | number of get ops 'get.total' |
| `h` | string | current health status health |
| `health` | string | current health status |
| `i` | string | index name index |
| `id` | string | index uuid uuid |
| `idc` | string | number of current deletions 'indexing.delete_current' |
| `idti` | string | time spent in deletions 'indexing.delete_time' |
| `idto` | string | number of delete ops 'indexing.delete_total' |
| `idx` | string | index name index |
| `iic` | string | number of current indexing ops 'indexing.index_current' |
| `iif` | string | number of failed indexing ops 'indexing.index_failed' |
| `iiti` | string | time spent in indexing 'indexing.index_time' |
| `iito` | string | number of indexing ops 'indexing.index_total' |
| `index` | string | index name |
| `indexingDeleteCurrent` | string | number of current deletions 'indexing.delete_current' |
| `indexingDeleteTime` | string | time spent in deletions 'indexing.delete_time' |
| `indexingDeleteTotal` | string | number of delete ops 'indexing.delete_total' |
| `indexingIndexCurrent` | string | number of current indexing ops 'indexing.index_current' |
| `indexingIndexFailed` | string | number of failed indexing ops 'indexing.index_failed' |
| `indexingIndexTime` | string | time spent in indexing 'indexing.index_time' |
| `indexingIndexTotal` | string | number of indexing ops 'indexing.index_total' |
| `mc` | string | number of current merges 'merges.current' |
| `mcd` | string | number of current merging docs 'merges.current_docs' |
| `mcs` | string | size of current merges 'merges.current_size' |
| `memoryTotal` | string | total used memory 'memory.total' |
| `mergesCurrent` | string | number of current merges 'merges.current' |
| `mergesCurrentDocs` | string | number of current merging docs 'merges.current_docs' |
| `mergesCurrentSize` | string | size of current merges 'merges.current_size' |
| `mergesTotal` | string | number of completed merge ops 'merges.total' |
| `mergesTotalDocs` | string | docs merged 'merges.total_docs' |
| `mergesTotalSize` | string | size merged 'merges.total_size' |
| `mergesTotalTime` | string | time spent in merges 'merges.total_time' |
| `mt` | string | number of completed merge ops 'merges.total' |
| `mtd` | string | docs merged 'merges.total_docs' |
| `mts` | string | size merged 'merges.total_size' |
| `mtt` | string | time spent in merges 'merges.total_time' |
| `p` | string | number of primary shards pri |
| `pri` | string | number of primary shards |
| `qce` | string | query cache evictions 'query_cache.evictions' |
| `qcm` | string | used query cache 'query_cache.memory_size' |
| `queryCacheEvictions` | string | query cache evictions 'query_cache.evictions' |
| `queryCacheMemory` | string | used query cache 'query_cache.memory_size' |
| `r` | string | number of replica shards rep |
| `rce` | string | request cache evictions 'request_cache.evictions' |
| `rchc` | string | request cache hit count 'request_cache.hit_count' |
| `rcm` | string | used request cache 'request_cache.memory_size' |
| `rcmc` | string | request cache miss count 'request_cache.miss_count' |
| `refreshListeners` | string | number of pending refresh listeners 'refresh.listeners' |
| `refreshTime` | string | time spent in refreshes 'refresh.time' |
| `refreshTotal` | string | total refreshes 'refresh.total' |
| `rep` | string | number of replica shards |
| `requestCacheEvictions` | string | request cache evictions 'request_cache.evictions' |
| `requestCacheHitCount` | string | request cache hit count 'request_cache.hit_count' |
| `requestCacheMemory` | string | used request cache 'request_cache.memory_size' |
| `requestCacheMissCount` | string | request cache miss count 'request_cache.miss_count' |
| `reti` | string | time spent in external refreshes 'refresh.external_time' |
| `reto` | string | total external refreshes 'refresh.external_total' |
| `rli` | string | number of pending refresh listeners 'refresh.listeners' |
| `rti` | string | time spent in refreshes 'refresh.time' |
| `rto` | string | total refreshes 'refresh.total' |
| `s` | string | open/close status status |
| `sc` | string | number of segments 'segments.count' |
| `scc` | string | open scroll contexts 'search.scroll_current' |
| `scti` | string | time scroll contexts held open 'search.scroll_time' |
| `scto` | string | completed scroll contexts 'search.scroll_total' |
| `searchFetchCurrent` | string | current fetch phase ops 'search.fetch_current' |
| `searchFetchTime` | string | time spent in fetch phase 'search.fetch_time' |
| `searchFetchTotal` | string | total fetch ops 'search.fetch_total' |
| `searchOpenContexts` | string | open search contexts 'search.open_contexts' |
| `searchQueryCurrent` | string | current query phase ops 'search.query_current' |
| `searchQueryTime` | string | time spent in query phase 'search.query_time' |
| `searchQueryTotal` | string | total query phase ops 'search.query_total' |
| `searchScrollCurrent` | string | open scroll contexts 'search.scroll_current' |
| `searchScrollTime` | string | time scroll contexts held open 'search.scroll_time' |
| `searchScrollTotal` | string | completed scroll contexts 'search.scroll_total' |
| `segmentsCount` | string | number of segments 'segments.count' |
| `segmentsIndexWriterMemory` | string | memory used by index writer 'segments.index_writer_memory' |
| `segmentsMemory` | string | memory used by segments 'segments.memory' |
| `segmentsVersionMapMemory` | string | memory used by version map 'segments.version_map_memory' |
| `sfbm` | string | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields 'segments.fixed_bitset_memory' |
| `sfc` | string | current fetch phase ops 'search.fetch_current' |
| `sfti` | string | time spent in fetch phase 'search.fetch_time' |
| `sfto` | string | total fetch ops 'search.fetch_total' |
| `shardsPrimary` | string | number of primary shards pri |
| `shardsReplica` | string | number of replica shards rep |
| `siwm` | string | memory used by index writer 'segments.index_writer_memory' |
| `sm` | string | memory used by segments 'segments.memory' |
| `so` | string | open search contexts 'search.open_contexts' |
| `sqc` | string | current query phase ops 'search.query_current' |
| `sqti` | string | time spent in query phase 'search.query_time' |
| `sqto` | string | total query phase ops 'search.query_total' |
| `ss` | string | null | store size of primaries & replicas 'store.size' |
| `status` | string | open/close status |
| `sth` | string | indicates if the index is search throttled 'search.throttled' |
| `storeSize` | string | null | store size of primaries & replicas 'store.size' |
| `suc` | string | number of current suggest ops 'suggest.current' |
| `suggestCurrent` | string | number of current suggest ops 'suggest.current' |
| `suggestTime` | string | time spend in suggest 'suggest.time' |
| `suggestTotal` | string | number of suggest ops 'suggest.total' |
| `suti` | string | time spend in suggest 'suggest.time' |
| `suto` | string | number of suggest ops 'suggest.total' |
| `svmm` | string | memory used by version map 'segments.version_map_memory' |
| `tm` | string | total used memory 'memory.total' |
| `uuid` | string | index uuid |
| `warmerCurrent` | string | current warmer ops 'warmer.current' |
| `warmerTotal` | string | total warmer ops 'warmer.total' |
| `warmerTotalTime` | string | time spent in warmers 'warmer.total_time' |
| `wc` | string | current warmer ops 'warmer.current' |
| `wto` | string | total warmer ops 'warmer.total' |
| `wtt` | string | time spent in warmers 'warmer.total_time' |
