# CatShardsShardsRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | `string` | The index name. |
| `i?` | `string` | The index name. |
| `idx?` | `string` | The index name. |
| `shard?` | `string` | The shard name. |
| `s?` | `string` | The shard name. |
| `sh?` | `string` | The shard name. |
| `prirep?` | `string` | The shard type: `primary` or `replica`. |
| `p?` | `string` | The shard type: `primary` or `replica`. |
| `pr?` | `string` | The shard type: `primary` or `replica`. |
| `primaryOrReplica?` | `string` | The shard type: `primary` or `replica`. |
| `state?` | `string` | The shard state.
Returned values include:
`INITIALIZING`: The shard is recovering from a peer shard or gateway.
`RELOCATING`: The shard is relocating.
`STARTED`: The shard has started.
`UNASSIGNED`: The shard is not assigned to any node. |
| `st?` | `string` | The shard state.
Returned values include:
`INITIALIZING`: The shard is recovering from a peer shard or gateway.
`RELOCATING`: The shard is relocating.
`STARTED`: The shard has started.
`UNASSIGNED`: The shard is not assigned to any node. |
| `docs?` | `string | null` | The number of documents in the shard. |
| `d?` | `string | null` | The number of documents in the shard. |
| `dc?` | `string | null` | The number of documents in the shard. |
| `store?` | `string | null` | The disk space used by the shard. |
| `sto?` | `string | null` | The disk space used by the shard. |
| `dataset?` | `string | null` | total size of dataset (including the cache for partially mounted indices) |
| `ip?` | `string | null` | The IP address of the node. |
| `id?` | `string` | The unique identifier for the node. |
| `node?` | `string | null` | The name of node. |
| `n?` | `string | null` | The name of node. |
| `sync_id?` | `string` | The sync identifier. |
| `'unassigned.reason'?` | `string` | The reason for the last change to the state of an unassigned shard.
It does not explain why the shard is currently unassigned; use the cluster allocation explain API for that information.
Returned values include:
`ALLOCATION_FAILED`: Unassigned as a result of a failed allocation of the shard.
`CLUSTER_RECOVERED`: Unassigned as a result of a full cluster recovery.
`DANGLING_INDEX_IMPORTED`: Unassigned as a result of importing a dangling index.
`EXISTING_INDEX_RESTORED`: Unassigned as a result of restoring into a closed index.
`FORCED_EMPTY_PRIMARY`: The shard’s allocation was last modified by forcing an empty primary using the cluster reroute API.
`INDEX_CLOSED`: Unassigned because the index was closed.
`INDEX_CREATED`: Unassigned as a result of an API creation of an index.
`INDEX_REOPENED`: Unassigned as a result of opening a closed index.
`MANUAL_ALLOCATION`: The shard’s allocation was last modified by the cluster reroute API.
`NEW_INDEX_RESTORED`: Unassigned as a result of restoring into a new index.
`NODE_LEFT`: Unassigned as a result of the node hosting it leaving the cluster.
`NODE_RESTARTING`: Similar to `NODE_LEFT`, except that the node was registered as restarting using the node shutdown API.
`PRIMARY_FAILED`: The shard was initializing as a replica, but the primary shard failed before the initialization completed.
`REALLOCATED_REPLICA`: A better replica location is identified and causes the existing replica allocation to be cancelled.
`REINITIALIZED`: When a shard moves from started back to initializing.
`REPLICA_ADDED`: Unassigned as a result of explicit addition of a replica.
`REROUTE_CANCELLED`: Unassigned as a result of explicit cancel reroute command. |
| `ur?` | `string` | The reason for the last change to the state of an unassigned shard.
It does not explain why the shard is currently unassigned; use the cluster allocation explain API for that information.
Returned values include:
`ALLOCATION_FAILED`: Unassigned as a result of a failed allocation of the shard.
`CLUSTER_RECOVERED`: Unassigned as a result of a full cluster recovery.
`DANGLING_INDEX_IMPORTED`: Unassigned as a result of importing a dangling index.
`EXISTING_INDEX_RESTORED`: Unassigned as a result of restoring into a closed index.
`FORCED_EMPTY_PRIMARY`: The shard’s allocation was last modified by forcing an empty primary using the cluster reroute API.
`INDEX_CLOSED`: Unassigned because the index was closed.
`INDEX_CREATED`: Unassigned as a result of an API creation of an index.
`INDEX_REOPENED`: Unassigned as a result of opening a closed index.
`MANUAL_ALLOCATION`: The shard’s allocation was last modified by the cluster reroute API.
`NEW_INDEX_RESTORED`: Unassigned as a result of restoring into a new index.
`NODE_LEFT`: Unassigned as a result of the node hosting it leaving the cluster.
`NODE_RESTARTING`: Similar to `NODE_LEFT`, except that the node was registered as restarting using the node shutdown API.
`PRIMARY_FAILED`: The shard was initializing as a replica, but the primary shard failed before the initialization completed.
`REALLOCATED_REPLICA`: A better replica location is identified and causes the existing replica allocation to be cancelled.
`REINITIALIZED`: When a shard moves from started back to initializing.
`REPLICA_ADDED`: Unassigned as a result of explicit addition of a replica.
`REROUTE_CANCELLED`: Unassigned as a result of explicit cancel reroute command. |
| `'unassigned.at'?` | `string` | The time at which the shard became unassigned in Coordinated Universal Time (UTC). |
| `ua?` | `string` | The time at which the shard became unassigned in Coordinated Universal Time (UTC). |
| `'unassigned.for'?` | `string` | The time at which the shard was requested to be unassigned in Coordinated Universal Time (UTC). |
| `uf?` | `string` | The time at which the shard was requested to be unassigned in Coordinated Universal Time (UTC). |
| `'unassigned.details'?` | `string` | Additional details as to why the shard became unassigned.
It does not explain why the shard is not assigned; use the cluster allocation explain API for that information. |
| `ud?` | `string` | Additional details as to why the shard became unassigned.
It does not explain why the shard is not assigned; use the cluster allocation explain API for that information. |
| `'recoverysource.type'?` | `string` | The type of recovery source. |
| `rs?` | `string` | The type of recovery source. |
| `'completion.size'?` | `string` | The size of completion. |
| `cs?` | `string` | The size of completion. |
| `completionSize?` | `string` | The size of completion. |
| `'fielddata.memory_size'?` | `string` | The used fielddata cache memory. |
| `fm?` | `string` | The used fielddata cache memory. |
| `fielddataMemory?` | `string` | The used fielddata cache memory. |
| `'fielddata.evictions'?` | `string` | The fielddata cache evictions. |
| `fe?` | `string` | The fielddata cache evictions. |
| `fielddataEvictions?` | `string` | The fielddata cache evictions. |
| `'query_cache.memory_size'?` | `string` | The used query cache memory. |
| `qcm?` | `string` | The used query cache memory. |
| `queryCacheMemory?` | `string` | The used query cache memory. |
| `'query_cache.evictions'?` | `string` | The query cache evictions. |
| `qce?` | `string` | The query cache evictions. |
| `queryCacheEvictions?` | `string` | The query cache evictions. |
| `'flush.total'?` | `string` | The number of flushes. |
| `ft?` | `string` | The number of flushes. |
| `flushTotal?` | `string` | The number of flushes. |
| `'flush.total_time'?` | `string` | The time spent in flush. |
| `ftt?` | `string` | The time spent in flush. |
| `flushTotalTime?` | `string` | The time spent in flush. |
| `'get.current'?` | `string` | The number of current get operations. |
| `gc?` | `string` | The number of current get operations. |
| `getCurrent?` | `string` | The number of current get operations. |
| `'get.time'?` | `string` | The time spent in get operations. |
| `gti?` | `string` | The time spent in get operations. |
| `getTime?` | `string` | The time spent in get operations. |
| `'get.total'?` | `string` | The number of get operations. |
| `gto?` | `string` | The number of get operations. |
| `getTotal?` | `string` | The number of get operations. |
| `'get.exists_time'?` | `string` | The time spent in successful get operations. |
| `geti?` | `string` | The time spent in successful get operations. |
| `getExistsTime?` | `string` | The time spent in successful get operations. |
| `'get.exists_total'?` | `string` | The number of successful get operations. |
| `geto?` | `string` | The number of successful get operations. |
| `getExistsTotal?` | `string` | The number of successful get operations. |
| `'get.missing_time'?` | `string` | The time spent in failed get operations. |
| `gmti?` | `string` | The time spent in failed get operations. |
| `getMissingTime?` | `string` | The time spent in failed get operations. |
| `'get.missing_total'?` | `string` | The number of failed get operations. |
| `gmto?` | `string` | The number of failed get operations. |
| `getMissingTotal?` | `string` | The number of failed get operations. |
| `'indexing.delete_current'?` | `string` | The number of current deletion operations. |
| `idc?` | `string` | The number of current deletion operations. |
| `indexingDeleteCurrent?` | `string` | The number of current deletion operations. |
| `'indexing.delete_time'?` | `string` | The time spent in deletion operations. |
| `idti?` | `string` | The time spent in deletion operations. |
| `indexingDeleteTime?` | `string` | The time spent in deletion operations. |
| `'indexing.delete_total'?` | `string` | The number of delete operations. |
| `idto?` | `string` | The number of delete operations. |
| `indexingDeleteTotal?` | `string` | The number of delete operations. |
| `'indexing.index_current'?` | `string` | The number of current indexing operations. |
| `iic?` | `string` | The number of current indexing operations. |
| `indexingIndexCurrent?` | `string` | The number of current indexing operations. |
| `'indexing.index_time'?` | `string` | The time spent in indexing operations. |
| `iiti?` | `string` | The time spent in indexing operations. |
| `indexingIndexTime?` | `string` | The time spent in indexing operations. |
| `'indexing.index_total'?` | `string` | The number of indexing operations. |
| `iito?` | `string` | The number of indexing operations. |
| `indexingIndexTotal?` | `string` | The number of indexing operations. |
| `'indexing.index_failed'?` | `string` | The number of failed indexing operations. |
| `iif?` | `string` | The number of failed indexing operations. |
| `indexingIndexFailed?` | `string` | The number of failed indexing operations. |
| `'merges.current'?` | `string` | The number of current merge operations. |
| `mc?` | `string` | The number of current merge operations. |
| `mergesCurrent?` | `string` | The number of current merge operations. |
| `'merges.current_docs'?` | `string` | The number of current merging documents. |
| `mcd?` | `string` | The number of current merging documents. |
| `mergesCurrentDocs?` | `string` | The number of current merging documents. |
| `'merges.current_size'?` | `string` | The size of current merge operations. |
| `mcs?` | `string` | The size of current merge operations. |
| `mergesCurrentSize?` | `string` | The size of current merge operations. |
| `'merges.total'?` | `string` | The number of completed merge operations. |
| `mt?` | `string` | The number of completed merge operations. |
| `mergesTotal?` | `string` | The number of completed merge operations. |
| `'merges.total_docs'?` | `string` | The nuber of merged documents. |
| `mtd?` | `string` | The nuber of merged documents. |
| `mergesTotalDocs?` | `string` | The nuber of merged documents. |
| `'merges.total_size'?` | `string` | The size of current merges. |
| `mts?` | `string` | The size of current merges. |
| `mergesTotalSize?` | `string` | The size of current merges. |
| `'merges.total_time'?` | `string` | The time spent merging documents. |
| `mtt?` | `string` | The time spent merging documents. |
| `mergesTotalTime?` | `string` | The time spent merging documents. |
| `'refresh.total'?` | `string` | The total number of refreshes. |
| `'refresh.time'?` | `string` | The time spent in refreshes. |
| `'refresh.external_total'?` | `string` | The total nunber of external refreshes. |
| `rto?` | `string` | The total nunber of external refreshes. |
| `refreshTotal?` | `string` | The total nunber of external refreshes. |
| `'refresh.external_time'?` | `string` | The time spent in external refreshes. |
| `rti?` | `string` | The time spent in external refreshes. |
| `refreshTime?` | `string` | The time spent in external refreshes. |
| `'refresh.listeners'?` | `string` | The number of pending refresh listeners. |
| `rli?` | `string` | The number of pending refresh listeners. |
| `refreshListeners?` | `string` | The number of pending refresh listeners. |
| `'search.fetch_current'?` | `string` | The current fetch phase operations. |
| `sfc?` | `string` | The current fetch phase operations. |
| `searchFetchCurrent?` | `string` | The current fetch phase operations. |
| `'search.fetch_time'?` | `string` | The time spent in fetch phase. |
| `sfti?` | `string` | The time spent in fetch phase. |
| `searchFetchTime?` | `string` | The time spent in fetch phase. |
| `'search.fetch_total'?` | `string` | The total number of fetch operations. |
| `sfto?` | `string` | The total number of fetch operations. |
| `searchFetchTotal?` | `string` | The total number of fetch operations. |
| `'search.open_contexts'?` | `string` | The number of open search contexts. |
| `so?` | `string` | The number of open search contexts. |
| `searchOpenContexts?` | `string` | The number of open search contexts. |
| `'search.query_current'?` | `string` | The current query phase operations. |
| `sqc?` | `string` | The current query phase operations. |
| `searchQueryCurrent?` | `string` | The current query phase operations. |
| `'search.query_time'?` | `string` | The time spent in query phase. |
| `sqti?` | `string` | The time spent in query phase. |
| `searchQueryTime?` | `string` | The time spent in query phase. |
| `'search.query_total'?` | `string` | The total number of query phase operations. |
| `sqto?` | `string` | The total number of query phase operations. |
| `searchQueryTotal?` | `string` | The total number of query phase operations. |
| `'search.scroll_current'?` | `string` | The open scroll contexts. |
| `scc?` | `string` | The open scroll contexts. |
| `searchScrollCurrent?` | `string` | The open scroll contexts. |
| `'search.scroll_time'?` | `string` | The time scroll contexts were held open. |
| `scti?` | `string` | The time scroll contexts were held open. |
| `searchScrollTime?` | `string` | The time scroll contexts were held open. |
| `'search.scroll_total'?` | `string` | The number of completed scroll contexts. |
| `scto?` | `string` | The number of completed scroll contexts. |
| `searchScrollTotal?` | `string` | The number of completed scroll contexts. |
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
| `'segments.fixed_bitset_memory'?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. |
| `sfbm?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. |
| `fixedBitsetMemory?` | `string` | The memory used by fixed bit sets for nested object field types and export type filters for types referred in `_parent` fields. |
| `'seq_no.max'?` | `string` | The maximum sequence number. |
| `sqm?` | `string` | The maximum sequence number. |
| `maxSeqNo?` | `string` | The maximum sequence number. |
| `'seq_no.local_checkpoint'?` | `string` | The local checkpoint. |
| `sql?` | `string` | The local checkpoint. |
| `localCheckpoint?` | `string` | The local checkpoint. |
| `'seq_no.global_checkpoint'?` | `string` | The global checkpoint. |
| `sqg?` | `string` | The global checkpoint. |
| `globalCheckpoint?` | `string` | The global checkpoint. |
| `'warmer.current'?` | `string` | The number of current warmer operations. |
| `wc?` | `string` | The number of current warmer operations. |
| `warmerCurrent?` | `string` | The number of current warmer operations. |
| `'warmer.total'?` | `string` | The total number of warmer operations. |
| `wto?` | `string` | The total number of warmer operations. |
| `warmerTotal?` | `string` | The total number of warmer operations. |
| `'warmer.total_time'?` | `string` | The time spent in warmer operations. |
| `wtt?` | `string` | The time spent in warmer operations. |
| `warmerTotalTime?` | `string` | The time spent in warmer operations. |
| `'path.data'?` | `string` | The shard data path. |
| `pd?` | `string` | The shard data path. |
| `dataPath?` | `string` | The shard data path. |
| `'path.state'?` | `string` | The shard state path. |
| `ps?` | `string` | The shard state path. |
| `statsPath?` | `string` | The shard state path. |
| `'bulk.total_operations'?` | `string` | The number of bulk shard operations. |
| `bto?` | `string` | The number of bulk shard operations. |
| `bulkTotalOperations?` | `string` | The number of bulk shard operations. |
| `'bulk.total_time'?` | `string` | The time spent in shard bulk operations. |
| `btti?` | `string` | The time spent in shard bulk operations. |
| `bulkTotalTime?` | `string` | The time spent in shard bulk operations. |
| `'bulk.total_size_in_bytes'?` | `string` | The total size in bytes of shard bulk operations. |
| `btsi?` | `string` | The total size in bytes of shard bulk operations. |
| `bulkTotalSizeInBytes?` | `string` | The total size in bytes of shard bulk operations. |
| `'bulk.avg_time'?` | `string` | The average time spent in shard bulk operations. |
| `bati?` | `string` | The average time spent in shard bulk operations. |
| `bulkAvgTime?` | `string` | The average time spent in shard bulk operations. |
| `'bulk.avg_size_in_bytes'?` | `string` | The average size in bytes of shard bulk operations. |
| `basi?` | `string` | The average size in bytes of shard bulk operations. |
| `bulkAvgSizeInBytes?` | `string` | The average size in bytes of shard bulk operations. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
