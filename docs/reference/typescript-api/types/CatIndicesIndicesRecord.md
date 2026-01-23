# CatIndicesIndicesRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `health?` | `string` | current health status |
| `h?` | `string` | current health status |
| `status?` | `string` | open/close status |
| `s?` | `string` | open/close status |
| `index?` | `string` | index name |
| `i?` | `string` | index name |
| `idx?` | `string` | index name |
| `uuid?` | `string` | index uuid |
| `id?` | `string` | index uuid |
| `pri?` | `string` | number of primary shards |
| `p?` | `string` | number of primary shards |
| `'shards.primary'?` | `string` | number of primary shards |
| `shardsPrimary?` | `string` | number of primary shards |
| `rep?` | `string` | number of replica shards |
| `r?` | `string` | number of replica shards |
| `'shards.replica'?` | `string` | number of replica shards |
| `shardsReplica?` | `string` | number of replica shards |
| `'docs.count'?` | `string | null` | The number of documents in the index, including hidden nested documents.
For indices with `semantic_text` fields or other nested field types,
this count includes the internal nested documents.
To get the logical document count (excluding nested documents), use
the `_count` API or `_cat/count` API instead. |
| `dc?` | `string | null` | The number of documents in the index, including hidden nested documents.
For indices with `semantic_text` fields or other nested field types,
this count includes the internal nested documents.
To get the logical document count (excluding nested documents), use
the `_count` API or `_cat/count` API instead. |
| `docsCount?` | `string | null` | The number of documents in the index, including hidden nested documents.
For indices with `semantic_text` fields or other nested field types,
this count includes the internal nested documents.
To get the logical document count (excluding nested documents), use
the `_count` API or `_cat/count` API instead. |
| `'docs.deleted'?` | `string | null` | deleted docs |
| `dd?` | `string | null` | deleted docs |
| `docsDeleted?` | `string | null` | deleted docs |
| `'creation.date'?` | `string` | index creation date (millisecond value) |
| `cd?` | `string` | index creation date (millisecond value) |
| `'creation.date.string'?` | `string` | index creation date (as string) |
| `cds?` | `string` | index creation date (as string) |
| `'store.size'?` | `string | null` | store size of primaries & replicas |
| `ss?` | `string | null` | store size of primaries & replicas |
| `storeSize?` | `string | null` | store size of primaries & replicas |
| `'pri.store.size'?` | `string | null` | store size of primaries |
| `'dataset.size'?` | `string | null` | total size of dataset (including the cache for partially mounted indices) |
| `'completion.size'?` | `string` | size of completion |
| `cs?` | `string` | size of completion |
| `completionSize?` | `string` | size of completion |
| `'pri.completion.size'?` | `string` | size of completion |
| `'fielddata.memory_size'?` | `string` | used fielddata cache |
| `fm?` | `string` | used fielddata cache |
| `fielddataMemory?` | `string` | used fielddata cache |
| `'pri.fielddata.memory_size'?` | `string` | used fielddata cache |
| `'fielddata.evictions'?` | `string` | fielddata evictions |
| `fe?` | `string` | fielddata evictions |
| `fielddataEvictions?` | `string` | fielddata evictions |
| `'pri.fielddata.evictions'?` | `string` | fielddata evictions |
| `'query_cache.memory_size'?` | `string` | used query cache |
| `qcm?` | `string` | used query cache |
| `queryCacheMemory?` | `string` | used query cache |
| `'pri.query_cache.memory_size'?` | `string` | used query cache |
| `'query_cache.evictions'?` | `string` | query cache evictions |
| `qce?` | `string` | query cache evictions |
| `queryCacheEvictions?` | `string` | query cache evictions |
| `'pri.query_cache.evictions'?` | `string` | query cache evictions |
| `'request_cache.memory_size'?` | `string` | used request cache |
| `rcm?` | `string` | used request cache |
| `requestCacheMemory?` | `string` | used request cache |
| `'pri.request_cache.memory_size'?` | `string` | used request cache |
| `'request_cache.evictions'?` | `string` | request cache evictions |
| `rce?` | `string` | request cache evictions |
| `requestCacheEvictions?` | `string` | request cache evictions |
| `'pri.request_cache.evictions'?` | `string` | request cache evictions |
| `'request_cache.hit_count'?` | `string` | request cache hit count |
| `rchc?` | `string` | request cache hit count |
| `requestCacheHitCount?` | `string` | request cache hit count |
| `'pri.request_cache.hit_count'?` | `string` | request cache hit count |
| `'request_cache.miss_count'?` | `string` | request cache miss count |
| `rcmc?` | `string` | request cache miss count |
| `requestCacheMissCount?` | `string` | request cache miss count |
| `'pri.request_cache.miss_count'?` | `string` | request cache miss count |
| `'flush.total'?` | `string` | number of flushes |
| `ft?` | `string` | number of flushes |
| `flushTotal?` | `string` | number of flushes |
| `'pri.flush.total'?` | `string` | number of flushes |
| `'flush.total_time'?` | `string` | time spent in flush |
| `ftt?` | `string` | time spent in flush |
| `flushTotalTime?` | `string` | time spent in flush |
| `'pri.flush.total_time'?` | `string` | time spent in flush |
| `'get.current'?` | `string` | number of current get ops |
| `gc?` | `string` | number of current get ops |
| `getCurrent?` | `string` | number of current get ops |
| `'pri.get.current'?` | `string` | number of current get ops |
| `'get.time'?` | `string` | time spent in get |
| `gti?` | `string` | time spent in get |
| `getTime?` | `string` | time spent in get |
| `'pri.get.time'?` | `string` | time spent in get |
| `'get.total'?` | `string` | number of get ops |
| `gto?` | `string` | number of get ops |
| `getTotal?` | `string` | number of get ops |
| `'pri.get.total'?` | `string` | number of get ops |
| `'get.exists_time'?` | `string` | time spent in successful gets |
| `geti?` | `string` | time spent in successful gets |
| `getExistsTime?` | `string` | time spent in successful gets |
| `'pri.get.exists_time'?` | `string` | time spent in successful gets |
| `'get.exists_total'?` | `string` | number of successful gets |
| `geto?` | `string` | number of successful gets |
| `getExistsTotal?` | `string` | number of successful gets |
| `'pri.get.exists_total'?` | `string` | number of successful gets |
| `'get.missing_time'?` | `string` | time spent in failed gets |
| `gmti?` | `string` | time spent in failed gets |
| `getMissingTime?` | `string` | time spent in failed gets |
| `'pri.get.missing_time'?` | `string` | time spent in failed gets |
| `'get.missing_total'?` | `string` | number of failed gets |
| `gmto?` | `string` | number of failed gets |
| `getMissingTotal?` | `string` | number of failed gets |
| `'pri.get.missing_total'?` | `string` | number of failed gets |
| `'indexing.delete_current'?` | `string` | number of current deletions |
| `idc?` | `string` | number of current deletions |
| `indexingDeleteCurrent?` | `string` | number of current deletions |
| `'pri.indexing.delete_current'?` | `string` | number of current deletions |
| `'indexing.delete_time'?` | `string` | time spent in deletions |
| `idti?` | `string` | time spent in deletions |
| `indexingDeleteTime?` | `string` | time spent in deletions |
| `'pri.indexing.delete_time'?` | `string` | time spent in deletions |
| `'indexing.delete_total'?` | `string` | number of delete ops |
| `idto?` | `string` | number of delete ops |
| `indexingDeleteTotal?` | `string` | number of delete ops |
| `'pri.indexing.delete_total'?` | `string` | number of delete ops |
| `'indexing.index_current'?` | `string` | number of current indexing ops |
| `iic?` | `string` | number of current indexing ops |
| `indexingIndexCurrent?` | `string` | number of current indexing ops |
| `'pri.indexing.index_current'?` | `string` | number of current indexing ops |
| `'indexing.index_time'?` | `string` | time spent in indexing |
| `iiti?` | `string` | time spent in indexing |
| `indexingIndexTime?` | `string` | time spent in indexing |
| `'pri.indexing.index_time'?` | `string` | time spent in indexing |
| `'indexing.index_total'?` | `string` | number of indexing ops |
| `iito?` | `string` | number of indexing ops |
| `indexingIndexTotal?` | `string` | number of indexing ops |
| `'pri.indexing.index_total'?` | `string` | number of indexing ops |
| `'indexing.index_failed'?` | `string` | number of failed indexing ops |
| `iif?` | `string` | number of failed indexing ops |
| `indexingIndexFailed?` | `string` | number of failed indexing ops |
| `'pri.indexing.index_failed'?` | `string` | number of failed indexing ops |
| `'merges.current'?` | `string` | number of current merges |
| `mc?` | `string` | number of current merges |
| `mergesCurrent?` | `string` | number of current merges |
| `'pri.merges.current'?` | `string` | number of current merges |
| `'merges.current_docs'?` | `string` | number of current merging docs |
| `mcd?` | `string` | number of current merging docs |
| `mergesCurrentDocs?` | `string` | number of current merging docs |
| `'pri.merges.current_docs'?` | `string` | number of current merging docs |
| `'merges.current_size'?` | `string` | size of current merges |
| `mcs?` | `string` | size of current merges |
| `mergesCurrentSize?` | `string` | size of current merges |
| `'pri.merges.current_size'?` | `string` | size of current merges |
| `'merges.total'?` | `string` | number of completed merge ops |
| `mt?` | `string` | number of completed merge ops |
| `mergesTotal?` | `string` | number of completed merge ops |
| `'pri.merges.total'?` | `string` | number of completed merge ops |
| `'merges.total_docs'?` | `string` | docs merged |
| `mtd?` | `string` | docs merged |
| `mergesTotalDocs?` | `string` | docs merged |
| `'pri.merges.total_docs'?` | `string` | docs merged |
| `'merges.total_size'?` | `string` | size merged |
| `mts?` | `string` | size merged |
| `mergesTotalSize?` | `string` | size merged |
| `'pri.merges.total_size'?` | `string` | size merged |
| `'merges.total_time'?` | `string` | time spent in merges |
| `mtt?` | `string` | time spent in merges |
| `mergesTotalTime?` | `string` | time spent in merges |
| `'pri.merges.total_time'?` | `string` | time spent in merges |
| `'refresh.total'?` | `string` | total refreshes |
| `rto?` | `string` | total refreshes |
| `refreshTotal?` | `string` | total refreshes |
| `'pri.refresh.total'?` | `string` | total refreshes |
| `'refresh.time'?` | `string` | time spent in refreshes |
| `rti?` | `string` | time spent in refreshes |
| `refreshTime?` | `string` | time spent in refreshes |
| `'pri.refresh.time'?` | `string` | time spent in refreshes |
| `'refresh.external_total'?` | `string` | total external refreshes |
| `reto?` | `string` | total external refreshes |
| `'pri.refresh.external_total'?` | `string` | total external refreshes |
| `'refresh.external_time'?` | `string` | time spent in external refreshes |
| `reti?` | `string` | time spent in external refreshes |
| `'pri.refresh.external_time'?` | `string` | time spent in external refreshes |
| `'refresh.listeners'?` | `string` | number of pending refresh listeners |
| `rli?` | `string` | number of pending refresh listeners |
| `refreshListeners?` | `string` | number of pending refresh listeners |
| `'pri.refresh.listeners'?` | `string` | number of pending refresh listeners |
| `'search.fetch_current'?` | `string` | current fetch phase ops |
| `sfc?` | `string` | current fetch phase ops |
| `searchFetchCurrent?` | `string` | current fetch phase ops |
| `'pri.search.fetch_current'?` | `string` | current fetch phase ops |
| `'search.fetch_time'?` | `string` | time spent in fetch phase |
| `sfti?` | `string` | time spent in fetch phase |
| `searchFetchTime?` | `string` | time spent in fetch phase |
| `'pri.search.fetch_time'?` | `string` | time spent in fetch phase |
| `'search.fetch_total'?` | `string` | total fetch ops |
| `sfto?` | `string` | total fetch ops |
| `searchFetchTotal?` | `string` | total fetch ops |
| `'pri.search.fetch_total'?` | `string` | total fetch ops |
| `'search.open_contexts'?` | `string` | open search contexts |
| `so?` | `string` | open search contexts |
| `searchOpenContexts?` | `string` | open search contexts |
| `'pri.search.open_contexts'?` | `string` | open search contexts |
| `'search.query_current'?` | `string` | current query phase ops |
| `sqc?` | `string` | current query phase ops |
| `searchQueryCurrent?` | `string` | current query phase ops |
| `'pri.search.query_current'?` | `string` | current query phase ops |
| `'search.query_time'?` | `string` | time spent in query phase |
| `sqti?` | `string` | time spent in query phase |
| `searchQueryTime?` | `string` | time spent in query phase |
| `'pri.search.query_time'?` | `string` | time spent in query phase |
| `'search.query_total'?` | `string` | total query phase ops |
| `sqto?` | `string` | total query phase ops |
| `searchQueryTotal?` | `string` | total query phase ops |
| `'pri.search.query_total'?` | `string` | total query phase ops |
| `'search.scroll_current'?` | `string` | open scroll contexts |
| `scc?` | `string` | open scroll contexts |
| `searchScrollCurrent?` | `string` | open scroll contexts |
| `'pri.search.scroll_current'?` | `string` | open scroll contexts |
| `'search.scroll_time'?` | `string` | time scroll contexts held open |
| `scti?` | `string` | time scroll contexts held open |
| `searchScrollTime?` | `string` | time scroll contexts held open |
| `'pri.search.scroll_time'?` | `string` | time scroll contexts held open |
| `'search.scroll_total'?` | `string` | completed scroll contexts |
| `scto?` | `string` | completed scroll contexts |
| `searchScrollTotal?` | `string` | completed scroll contexts |
| `'pri.search.scroll_total'?` | `string` | completed scroll contexts |
| `'segments.count'?` | `string` | number of segments |
| `sc?` | `string` | number of segments |
| `segmentsCount?` | `string` | number of segments |
| `'pri.segments.count'?` | `string` | number of segments |
| `'segments.memory'?` | `string` | memory used by segments |
| `sm?` | `string` | memory used by segments |
| `segmentsMemory?` | `string` | memory used by segments |
| `'pri.segments.memory'?` | `string` | memory used by segments |
| `'segments.index_writer_memory'?` | `string` | memory used by index writer |
| `siwm?` | `string` | memory used by index writer |
| `segmentsIndexWriterMemory?` | `string` | memory used by index writer |
| `'pri.segments.index_writer_memory'?` | `string` | memory used by index writer |
| `'segments.version_map_memory'?` | `string` | memory used by version map |
| `svmm?` | `string` | memory used by version map |
| `segmentsVersionMapMemory?` | `string` | memory used by version map |
| `'pri.segments.version_map_memory'?` | `string` | memory used by version map |
| `'segments.fixed_bitset_memory'?` | `string` | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `sfbm?` | `string` | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `fixedBitsetMemory?` | `string` | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `'pri.segments.fixed_bitset_memory'?` | `string` | memory used by fixed bit sets for nested object field types and export type filters for types referred in _parent fields |
| `'warmer.current'?` | `string` | current warmer ops |
| `wc?` | `string` | current warmer ops |
| `warmerCurrent?` | `string` | current warmer ops |
| `'pri.warmer.current'?` | `string` | current warmer ops |
| `'warmer.total'?` | `string` | total warmer ops |
| `wto?` | `string` | total warmer ops |
| `warmerTotal?` | `string` | total warmer ops |
| `'pri.warmer.total'?` | `string` | total warmer ops |
| `'warmer.total_time'?` | `string` | time spent in warmers |
| `wtt?` | `string` | time spent in warmers |
| `warmerTotalTime?` | `string` | time spent in warmers |
| `'pri.warmer.total_time'?` | `string` | time spent in warmers |
| `'suggest.current'?` | `string` | number of current suggest ops |
| `suc?` | `string` | number of current suggest ops |
| `suggestCurrent?` | `string` | number of current suggest ops |
| `'pri.suggest.current'?` | `string` | number of current suggest ops |
| `'suggest.time'?` | `string` | time spend in suggest |
| `suti?` | `string` | time spend in suggest |
| `suggestTime?` | `string` | time spend in suggest |
| `'pri.suggest.time'?` | `string` | time spend in suggest |
| `'suggest.total'?` | `string` | number of suggest ops |
| `suto?` | `string` | number of suggest ops |
| `suggestTotal?` | `string` | number of suggest ops |
| `'pri.suggest.total'?` | `string` | number of suggest ops |
| `'memory.total'?` | `string` | total used memory |
| `tm?` | `string` | total used memory |
| `memoryTotal?` | `string` | total used memory |
| `'pri.memory.total'?` | `string` | total user memory |
| `'search.throttled'?` | `string` | indicates if the index is search throttled |
| `sth?` | `string` | indicates if the index is search throttled |
| `'bulk.total_operations'?` | `string` | number of bulk shard ops |
| `bto?` | `string` | number of bulk shard ops |
| `bulkTotalOperation?` | `string` | number of bulk shard ops |
| `'pri.bulk.total_operations'?` | `string` | number of bulk shard ops |
| `'bulk.total_time'?` | `string` | time spend in shard bulk |
| `btti?` | `string` | time spend in shard bulk |
| `bulkTotalTime?` | `string` | time spend in shard bulk |
| `'pri.bulk.total_time'?` | `string` | time spend in shard bulk |
| `'bulk.total_size_in_bytes'?` | `string` | total size in bytes of shard bulk |
| `btsi?` | `string` | total size in bytes of shard bulk |
| `bulkTotalSizeInBytes?` | `string` | total size in bytes of shard bulk |
| `'pri.bulk.total_size_in_bytes'?` | `string` | total size in bytes of shard bulk |
| `'bulk.avg_time'?` | `string` | average time spend in shard bulk |
| `bati?` | `string` | average time spend in shard bulk |
| `bulkAvgTime?` | `string` | average time spend in shard bulk |
| `'pri.bulk.avg_time'?` | `string` | average time spend in shard bulk |
| `'bulk.avg_size_in_bytes'?` | `string` | average size in bytes of shard bulk |
| `basi?` | `string` | average size in bytes of shard bulk |
| `bulkAvgSizeInBytes?` | `string` | average size in bytes of shard bulk |
| `'pri.bulk.avg_size_in_bytes'?` | `string` | average size in bytes of shard bulk |

## See Also

- [All Types](./)
- [API Methods](../index.md)
