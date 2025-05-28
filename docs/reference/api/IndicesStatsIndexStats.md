# `IndicesStatsIndexStats` [interface-IndicesStatsIndexStats]

| Name | Type | Description |
| - | - | - |
| `bulk` | [BulkStats](./BulkStats.md) | &nbsp; |
| `completion` | [CompletionStats](./CompletionStats.md) | Contains statistics about completions across all shards assigned to the node. |
| `docs` | [DocStats](./DocStats.md) | Contains statistics about documents across all primary shards assigned to the node. |
| `fielddata` | [FielddataStats](./FielddataStats.md) | Contains statistics about the field data cache across all shards assigned to the node. |
| `flush` | [FlushStats](./FlushStats.md) | Contains statistics about flush operations for the node. |
| `get` | [GetStats](./GetStats.md) | Contains statistics about get operations for the node. |
| `indexing` | [IndexingStats](./IndexingStats.md) | Contains statistics about indexing operations for the node. |
| `indices` | [IndicesStatsIndicesStats](./IndicesStatsIndicesStats.md) | Contains statistics about indices operations for the node. |
| `merges` | [MergesStats](./MergesStats.md) | Contains statistics about merge operations for the node. |
| `query_cache` | [QueryCacheStats](./QueryCacheStats.md) | Contains statistics about the query cache across all shards assigned to the node. |
| `recovery` | [RecoveryStats](./RecoveryStats.md) | Contains statistics about recovery operations for the node. |
| `refresh` | [RefreshStats](./RefreshStats.md) | Contains statistics about refresh operations for the node. |
| `request_cache` | [RequestCacheStats](./RequestCacheStats.md) | Contains statistics about the request cache across all shards assigned to the node. |
| `search` | [SearchStats](./SearchStats.md) | Contains statistics about search operations for the node. |
| `segments` | [SegmentsStats](./SegmentsStats.md) | Contains statistics about segments across all shards assigned to the node. |
| `shard_stats` | [IndicesStatsShardsTotalStats](./IndicesStatsShardsTotalStats.md) | &nbsp; |
| `store` | [StoreStats](./StoreStats.md) | Contains statistics about the size of shards assigned to the node. |
| `translog` | [TranslogStats](./TranslogStats.md) | Contains statistics about transaction log operations for the node. |
| `warmer` | [WarmerStats](./WarmerStats.md) | Contains statistics about index warming operations for the node. |
