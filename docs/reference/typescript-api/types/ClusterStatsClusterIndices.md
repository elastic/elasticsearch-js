# ClusterStatsClusterIndices

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `analysis?` | [`ClusterStatsCharFilterTypes`](ClusterStatsCharFilterTypes.md) | Contains statistics about analyzers and analyzer components used in selected nodes. |
| `completion` | [`CompletionStats`](CompletionStats.md) | Contains statistics about memory used for completion in selected nodes. |
| `count` | `long` | Total number of indices with shards assigned to selected nodes. |
| `docs` | [`DocStats`](DocStats.md) | Contains counts for documents in selected nodes. |
| `fielddata` | [`FielddataStats`](FielddataStats.md) | Contains statistics about the field data cache of selected nodes. |
| `query_cache` | [`QueryCacheStats`](QueryCacheStats.md) | Contains statistics about the query cache of selected nodes. |
| `search` | [`ClusterStatsSearchUsageStats`](ClusterStatsSearchUsageStats.md) | Holds a snapshot of the search usage statistics.
Used to hold the stats for a single node that's part of a ClusterStatsNodeResponse, as well as to
accumulate stats for the entire cluster and return them as part of the ClusterStatsResponse. |
| `segments` | [`SegmentsStats`](SegmentsStats.md) | Contains statistics about segments in selected nodes. |
| `shards` | [`ClusterStatsClusterIndicesShards`](ClusterStatsClusterIndicesShards.md) | Contains statistics about indices with shards assigned to selected nodes. |
| `store` | [`StoreStats`](StoreStats.md) | Contains statistics about the size of shards assigned to selected nodes. |
| `mappings?` | [`ClusterStatsFieldTypesMappings`](ClusterStatsFieldTypesMappings.md) | Contains statistics about field mappings in selected nodes. |
| `versions?` | `ClusterStatsIndicesVersions[]` | Contains statistics about analyzers and analyzer components used in selected nodes. |
| `dense_vector` | [`ClusterStatsDenseVectorStats`](ClusterStatsDenseVectorStats.md) | Contains statistics about indexed dense vector |
| `sparse_vector` | [`ClusterStatsSparseVectorStats`](ClusterStatsSparseVectorStats.md) | Contains statistics about indexed sparse vector |

## See Also

- [All Types](./)
- [API Methods](../index.md)
