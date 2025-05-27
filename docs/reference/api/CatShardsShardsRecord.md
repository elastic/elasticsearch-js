## Interface `CatShardsShardsRecord`

| Name | Type | Description |
| - | - | - |
| `"bulk.avg_size_in_bytes"` | string | The average size in bytes of shard bulk operations. |
| `"bulk.avg_time"` | string | The average time spent in shard bulk operations. |
| `"bulk.total_operations"` | string | The number of bulk shard operations. |
| `"bulk.total_size_in_bytes"` | string | The total size in bytes of shard bulk operations. |
| `"bulk.total_time"` | string | The time spent in shard bulk operations. |
| `"completion.size"` | string | The size of completion. |
| `"fielddata.evictions"` | string | The fielddata cache evictions. |
| `"fielddata.memory_size"` | string | The used fielddata cache memory. |
| `"flush.total_time"` | string | The time spent in flush. |
| `"flush.total"` | string | The number of flushes. |
| `"get.current"` | string | The number of current get operations. |
| `"get.exists_time"` | string | The time spent in successful get operations. |
| `"get.exists_total"` | string | The number of successful get operations. |
| `"get.missing_time"` | string | The time spent in failed get operations. |
| `"get.missing_total"` | string | The number of failed get operations. |
| `"get.time"` | string | The time spent in get operations. |
| `"get.total"` | string | The number of get operations. |
| `"indexing.delete_current"` | string | The number of current deletion operations. |
| `"indexing.delete_time"` | string | The time spent in deletion operations. |
| `"indexing.delete_total"` | string | The number of delete operations. |
| `"indexing.index_current"` | string | The number of current indexing operations. |
| `"indexing.index_failed"` | string | The number of failed indexing operations. |
| `"indexing.index_time"` | string | The time spent in indexing operations. |
| `"indexing.index_total"` | string | The number of indexing operations. |
| `"merges.current_docs"` | string | The number of current merging documents. |
| `"merges.current_size"` | string | The size of current merge operations. |
| `"merges.current"` | string | The number of current merge operations. |
| `"merges.total_docs"` | string | The nuber of merged documents. |
| `"merges.total_size"` | string | The size of current merges. |
| `"merges.total_time"` | string | The time spent merging documents. |
| `"merges.total"` | string | The number of completed merge operations. |
| `"path.data"` | string | The shard data path. |
| `"path.state"` | string | The shard state path. |
| `"query_cache.evictions"` | string | The query cache evictions. |
| `"query_cache.memory_size"` | string | The used query cache memory. |
| `"recoverysource.type"` | string | The type of recovery source. |
| `"refresh.external_time"` | string | The time spent in external refreshes. |
| `"refresh.external_total"` | string | The total nunber of external refreshes. |
| `"refresh.listeners"` | string | The number of pending refresh listeners. |
| `"refresh.time"` | string | The time spent in refreshes. |
| `"refresh.total"` | string | The total number of refreshes. |
| `"search.fetch_current"` | string | The current fetch phase operations. |
| `"search.fetch_time"` | string | The time spent in fetch phase. |
| `"search.fetch_total"` | string | The total number of fetch operations. |
| `"search.open_contexts"` | string | The number of open search contexts. |
| `"search.query_current"` | string | The current query phase operations. |
| `"search.query_time"` | string | The time spent in query phase. |
| `"search.query_total"` | string | The total number of query phase operations. |
| `"search.scroll_current"` | string | The open scroll contexts. |
| `"search.scroll_time"` | string | The time scroll contexts were held open. |
| `"search.scroll_total"` | string | The number of completed scroll contexts. |
| `"segments.count"` | string | The number of segments. |
| `"segments.fixed_bitset_memory"` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. |
| `"segments.index_writer_memory"` | string | The memory used by the index writer. |
| `"segments.memory"` | string | The memory used by segments. |
| `"segments.version_map_memory"` | string | The memory used by the version map. |
| `"seq_no.global_checkpoint"` | string | The global checkpoint. |
| `"seq_no.local_checkpoint"` | string | The local checkpoint. |
| `"seq_no.max"` | string | The maximum sequence number. |
| `"unassigned.at"` | string | The time at which the shard became unassigned in Coordinated Universal Time (UTC). |
| `"unassigned.details"` | string | Additional details as to why the shard became unassigned. It does not explain why the shard is not assigned; use the cluster allocation explain API for that information. |
| `"unassigned.for"` | string | The time at which the shard was requested to be unassigned in Coordinated Universal Time (UTC). |
| `"unassigned.reason"` | string | The reason for the last change to the state of an unassigned shard. It does not explain why the shard is currently unassigned; use the cluster allocation explain API for that information. Returned values include: `ALLOCATION_FAILED`: Unassigned as a result of a failed allocation of the shard. `CLUSTER_RECOVERED`: Unassigned as a result of a full cluster recovery. `DANGLING_INDEX_IMPORTED`: Unassigned as a result of importing a dangling index. `EXISTING_INDEX_RESTORED`: Unassigned as a result of restoring into a closed index. `FORCED_EMPTY_PRIMARY`: The shard’s allocation was last modified by forcing an empty primary using the cluster reroute API. `INDEX_CLOSED`: Unassigned because the index was closed. `INDEX_CREATED`: Unassigned as a result of an API creation of an index. `INDEX_REOPENED`: Unassigned as a result of opening a closed index. `MANUAL_ALLOCATION`: The shard’s allocation was last modified by the cluster reroute API. `NEW_INDEX_RESTORED`: Unassigned as a result of restoring into a new index. `NODE_LEFT`: Unassigned as a result of the node hosting it leaving the cluster. `NODE_RESTARTING`: Similar to `NODE_LEFT`, except that the node was registered as restarting using the node shutdown API. `PRIMARY_FAILED`: The shard was initializing as a replica, but the primary shard failed before the initialization completed. `REALLOCATED_REPLICA`: A better replica location is identified and causes the existing replica allocation to be cancelled. `REINITIALIZED`: When a shard moves from started back to initializing. `REPLICA_ADDED`: Unassigned as a result of explicit addition of a replica. `REROUTE_CANCELLED`: Unassigned as a result of explicit cancel reroute command. |
| `"warmer.current"` | string | The number of current warmer operations. |
| `"warmer.total_time"` | string | The time spent in warmer operations. |
| `"warmer.total"` | string | The total number of warmer operations. |
| `basi` | string | The average size in bytes of shard bulk operations. 'bulk.avg_size_in_bytes' |
| `bati` | string | The average time spent in shard bulk operations. 'bulk.avg_time' |
| `bto` | string | The number of bulk shard operations. 'bulk.total_operations' |
| `btsi` | string | The total size in bytes of shard bulk operations. 'bulk.total_size_in_bytes' |
| `btti` | string | The time spent in shard bulk operations. 'bulk.total_time' |
| `bulkAvgSizeInBytes` | string | The average size in bytes of shard bulk operations. 'bulk.avg_size_in_bytes' |
| `bulkAvgTime` | string | The average time spent in shard bulk operations. 'bulk.avg_time' |
| `bulkTotalOperations` | string | The number of bulk shard operations. 'bulk.total_operations' |
| `bulkTotalSizeInBytes` | string | The total size in bytes of shard bulk operations. 'bulk.total_size_in_bytes' |
| `bulkTotalTime` | string | The time spent in shard bulk operations. 'bulk.total_time' |
| `completionSize` | string | The size of completion. 'completion.size' |
| `cs` | string | The size of completion. 'completion.size' |
| `d` | string | null | The number of documents in the shard. docs |
| `dataPath` | string | The shard data path. 'path.data' |
| `dataset` | string | null | total size of dataset (including the cache for partially mounted indices) |
| `dc` | string | null | The number of documents in the shard. docs |
| `docs` | string | null | The number of documents in the shard. |
| `fe` | string | The fielddata cache evictions. 'fielddata.evictions' |
| `fielddataEvictions` | string | The fielddata cache evictions. 'fielddata.evictions' |
| `fielddataMemory` | string | The used fielddata cache memory. 'fielddata.memory_size' |
| `fixedBitsetMemory` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. 'segments.fixed_bitset_memory' |
| `flushTotal` | string | The number of flushes. 'flush.total' |
| `flushTotalTime` | string | The time spent in flush. 'flush.total_time' |
| `fm` | string | The used fielddata cache memory. 'fielddata.memory_size' |
| `ft` | string | The number of flushes. 'flush.total' |
| `ftt` | string | The time spent in flush. 'flush.total_time' |
| `gc` | string | The number of current get operations. 'get.current' |
| `getCurrent` | string | The number of current get operations. 'get.current' |
| `getExistsTime` | string | The time spent in successful get operations. 'get.exists_time' |
| `getExistsTotal` | string | The number of successful get operations. 'get.exists_total' |
| `geti` | string | The time spent in successful get operations. 'get.exists_time' |
| `getMissingTime` | string | The time spent in failed get operations. 'get.missing_time' |
| `getMissingTotal` | string | The number of failed get operations. 'get.missing_total' |
| `geto` | string | The number of successful get operations. 'get.exists_total' |
| `getTime` | string | The time spent in get operations. 'get.time' |
| `getTotal` | string | The number of get operations. 'get.total' |
| `globalCheckpoint` | string | The global checkpoint. 'seq_no.global_checkpoint' |
| `gmti` | string | The time spent in failed get operations. 'get.missing_time' |
| `gmto` | string | The number of failed get operations. 'get.missing_total' |
| `gti` | string | The time spent in get operations. 'get.time' |
| `gto` | string | The number of get operations. 'get.total' |
| `i` | string | The index name. index |
| `id` | string | The unique identifier for the node. |
| `idc` | string | The number of current deletion operations. 'indexing.delete_current' |
| `idti` | string | The time spent in deletion operations. 'indexing.delete_time' |
| `idto` | string | The number of delete operations. 'indexing.delete_total' |
| `idx` | string | The index name. index |
| `iic` | string | The number of current indexing operations. 'indexing.index_current' |
| `iif` | string | The number of failed indexing operations. 'indexing.index_failed' |
| `iiti` | string | The time spent in indexing operations. 'indexing.index_time' |
| `iito` | string | The number of indexing operations. 'indexing.index_total' |
| `index` | string | The index name. |
| `indexingDeleteCurrent` | string | The number of current deletion operations. 'indexing.delete_current' |
| `indexingDeleteTime` | string | The time spent in deletion operations. 'indexing.delete_time' |
| `indexingDeleteTotal` | string | The number of delete operations. 'indexing.delete_total' |
| `indexingIndexCurrent` | string | The number of current indexing operations. 'indexing.index_current' |
| `indexingIndexFailed` | string | The number of failed indexing operations. 'indexing.index_failed' |
| `indexingIndexTime` | string | The time spent in indexing operations. 'indexing.index_time' |
| `indexingIndexTotal` | string | The number of indexing operations. 'indexing.index_total' |
| `ip` | string | null | The IP address of the node. |
| `localCheckpoint` | string | The local checkpoint. 'seq_no.local_checkpoint' |
| `maxSeqNo` | string | The maximum sequence number. 'seq_no.max' |
| `mc` | string | The number of current merge operations. 'merges.current' |
| `mcd` | string | The number of current merging documents. 'merges.current_docs' |
| `mcs` | string | The size of current merge operations. 'merges.current_size' |
| `mergesCurrent` | string | The number of current merge operations. 'merges.current' |
| `mergesCurrentDocs` | string | The number of current merging documents. 'merges.current_docs' |
| `mergesCurrentSize` | string | The size of current merge operations. 'merges.current_size' |
| `mergesTotal` | string | The number of completed merge operations. 'merges.total' |
| `mergesTotalDocs` | string | The nuber of merged documents. 'merges.total_docs' |
| `mergesTotalSize` | string | The size of current merges. 'merges.total_size' |
| `mergesTotalTime` | string | The time spent merging documents. 'merges.total_time' |
| `mt` | string | The number of completed merge operations. 'merges.total' |
| `mtd` | string | The nuber of merged documents. 'merges.total_docs' |
| `mts` | string | The size of current merges. 'merges.total_size' |
| `mtt` | string | The time spent merging documents. 'merges.total_time' |
| `n` | string | null | The name of node. node |
| `node` | string | null | The name of node. |
| `p` | string | The shard type: `primary` or `replica`. prirep |
| `pd` | string | The shard data path. 'path.data' |
| `pr` | string | The shard type: `primary` or `replica`. prirep |
| `primaryOrReplica` | string | The shard type: `primary` or `replica`. prirep |
| `prirep` | string | The shard type: `primary` or `replica`. |
| `ps` | string | The shard state path. 'path.state' |
| `qce` | string | The query cache evictions. 'query_cache.evictions' |
| `qcm` | string | The used query cache memory. 'query_cache.memory_size' |
| `queryCacheEvictions` | string | The query cache evictions. 'query_cache.evictions' |
| `queryCacheMemory` | string | The used query cache memory. 'query_cache.memory_size' |
| `refreshListeners` | string | The number of pending refresh listeners. 'refresh.listeners' |
| `refreshTime` | string | The time spent in external refreshes. 'refresh.external_time' |
| `refreshTotal` | string | The total nunber of external refreshes. 'refresh.external_total' |
| `rli` | string | The number of pending refresh listeners. 'refresh.listeners' |
| `rs` | string | The type of recovery source. 'recoverysource.type' |
| `rti` | string | The time spent in external refreshes. 'refresh.external_time' |
| `rto` | string | The total nunber of external refreshes. 'refresh.external_total' |
| `s` | string | The shard name. shard |
| `sc` | string | The number of segments. 'segments.count' |
| `scc` | string | The open scroll contexts. 'search.scroll_current' |
| `scti` | string | The time scroll contexts were held open. 'search.scroll_time' |
| `scto` | string | The number of completed scroll contexts. 'search.scroll_total' |
| `searchFetchCurrent` | string | The current fetch phase operations. 'search.fetch_current' |
| `searchFetchTime` | string | The time spent in fetch phase. 'search.fetch_time' |
| `searchFetchTotal` | string | The total number of fetch operations. 'search.fetch_total' |
| `searchOpenContexts` | string | The number of open search contexts. 'search.open_contexts' |
| `searchQueryCurrent` | string | The current query phase operations. 'search.query_current' |
| `searchQueryTime` | string | The time spent in query phase. 'search.query_time' |
| `searchQueryTotal` | string | The total number of query phase operations. 'search.query_total' |
| `searchScrollCurrent` | string | The open scroll contexts. 'search.scroll_current' |
| `searchScrollTime` | string | The time scroll contexts were held open. 'search.scroll_time' |
| `searchScrollTotal` | string | The number of completed scroll contexts. 'search.scroll_total' |
| `segmentsCount` | string | The number of segments. 'segments.count' |
| `segmentsIndexWriterMemory` | string | The memory used by the index writer. 'segments.index_writer_memory' |
| `segmentsMemory` | string | The memory used by segments. 'segments.memory' |
| `segmentsVersionMapMemory` | string | The memory used by the version map. 'segments.version_map_memory' |
| `sfbm` | string | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. 'segments.fixed_bitset_memory' |
| `sfc` | string | The current fetch phase operations. 'search.fetch_current' |
| `sfti` | string | The time spent in fetch phase. 'search.fetch_time' |
| `sfto` | string | The total number of fetch operations. 'search.fetch_total' |
| `sh` | string | The shard name. shard |
| `shard` | string | The shard name. |
| `siwm` | string | The memory used by the index writer. 'segments.index_writer_memory' |
| `sm` | string | The memory used by segments. 'segments.memory' |
| `so` | string | The number of open search contexts. 'search.open_contexts' |
| `sqc` | string | The current query phase operations. 'search.query_current' |
| `sqg` | string | The global checkpoint. 'seq_no.global_checkpoint' |
| `sql` | string | The local checkpoint. 'seq_no.local_checkpoint' |
| `sqm` | string | The maximum sequence number. 'seq_no.max' |
| `sqti` | string | The time spent in query phase. 'search.query_time' |
| `sqto` | string | The total number of query phase operations. 'search.query_total' |
| `st` | string | The shard state. Returned values include: `INITIALIZING`: The shard is recovering from a peer shard or gateway. `RELOCATING`: The shard is relocating. `STARTED`: The shard has started. `UNASSIGNED`: The shard is not assigned to any node. state |
| `state` | string | The shard state. Returned values include: `INITIALIZING`: The shard is recovering from a peer shard or gateway. `RELOCATING`: The shard is relocating. `STARTED`: The shard has started. `UNASSIGNED`: The shard is not assigned to any node. |
| `statsPath` | string | The shard state path. 'path.state' |
| `sto` | string | null | The disk space used by the shard. store |
| `store` | string | null | The disk space used by the shard. |
| `svmm` | string | The memory used by the version map. 'segments.version_map_memory' |
| `sync_id` | string | The sync identifier. |
| `ua` | string | The time at which the shard became unassigned in Coordinated Universal Time (UTC). 'unassigned.at' |
| `ud` | string | Additional details as to why the shard became unassigned. It does not explain why the shard is not assigned; use the cluster allocation explain API for that information. 'unassigned.details' |
| `uf` | string | The time at which the shard was requested to be unassigned in Coordinated Universal Time (UTC). 'unassigned.for' |
| `ur` | string | The reason for the last change to the state of an unassigned shard. It does not explain why the shard is currently unassigned; use the cluster allocation explain API for that information. Returned values include: `ALLOCATION_FAILED`: Unassigned as a result of a failed allocation of the shard. `CLUSTER_RECOVERED`: Unassigned as a result of a full cluster recovery. `DANGLING_INDEX_IMPORTED`: Unassigned as a result of importing a dangling index. `EXISTING_INDEX_RESTORED`: Unassigned as a result of restoring into a closed index. `FORCED_EMPTY_PRIMARY`: The shard’s allocation was last modified by forcing an empty primary using the cluster reroute API. `INDEX_CLOSED`: Unassigned because the index was closed. `INDEX_CREATED`: Unassigned as a result of an API creation of an index. `INDEX_REOPENED`: Unassigned as a result of opening a closed index. `MANUAL_ALLOCATION`: The shard’s allocation was last modified by the cluster reroute API. `NEW_INDEX_RESTORED`: Unassigned as a result of restoring into a new index. `NODE_LEFT`: Unassigned as a result of the node hosting it leaving the cluster. `NODE_RESTARTING`: Similar to `NODE_LEFT`, except that the node was registered as restarting using the node shutdown API. `PRIMARY_FAILED`: The shard was initializing as a replica, but the primary shard failed before the initialization completed. `REALLOCATED_REPLICA`: A better replica location is identified and causes the existing replica allocation to be cancelled. `REINITIALIZED`: When a shard moves from started back to initializing. `REPLICA_ADDED`: Unassigned as a result of explicit addition of a replica. `REROUTE_CANCELLED`: Unassigned as a result of explicit cancel reroute command. 'unassigned.reason' |
| `warmerCurrent` | string | The number of current warmer operations. 'warmer.current' |
| `warmerTotal` | string | The total number of warmer operations. 'warmer.total' |
| `warmerTotalTime` | string | The time spent in warmer operations. 'warmer.total_time' |
| `wc` | string | The number of current warmer operations. 'warmer.current' |
| `wto` | string | The total number of warmer operations. 'warmer.total' |
| `wtt` | string | The time spent in warmer operations. 'warmer.total_time' |
