# `ClusterStatsClusterIndices` [interface-ClusterStatsClusterIndices]

| Name | Type | Description |
| - | - | - |
| `analysis` | [ClusterStatsCharFilterTypes](./ClusterStatsCharFilterTypes.md) | Contains statistics about analyzers and analyzer components used in selected nodes. |
| `completion` | [CompletionStats](./CompletionStats.md) | Contains statistics about memory used for completion in selected nodes. |
| `count` | [long](./long.md) | Total number of indices with shards assigned to selected nodes. |
| `docs` | [DocStats](./DocStats.md) | Contains counts for documents in selected nodes. |
| `fielddata` | [FielddataStats](./FielddataStats.md) | Contains statistics about the field data cache of selected nodes. |
| `mappings` | [ClusterStatsFieldTypesMappings](./ClusterStatsFieldTypesMappings.md) | Contains statistics about field mappings in selected nodes. |
| `query_cache` | [QueryCacheStats](./QueryCacheStats.md) | Contains statistics about the query cache of selected nodes. |
| `segments` | [SegmentsStats](./SegmentsStats.md) | Contains statistics about segments in selected nodes. |
| `shards` | [ClusterStatsClusterIndicesShards](./ClusterStatsClusterIndicesShards.md) | Contains statistics about indices with shards assigned to selected nodes. |
| `store` | [StoreStats](./StoreStats.md) | Contains statistics about the size of shards assigned to selected nodes. |
| `versions` | [ClusterStatsIndicesVersions](./ClusterStatsIndicesVersions.md)[] | Contains statistics about analyzers and analyzer components used in selected nodes. |
