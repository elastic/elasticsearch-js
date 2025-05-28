# `QueryCacheStats` [interface-QueryCacheStats]

| Name | Type | Description |
| - | - | - |
| `cache_count` | [long](./long.md) | Total number of entries added to the query cache across all shards assigned to selected nodes. This number includes current and evicted entries. |
| `cache_size` | [long](./long.md) | Total number of entries currently in the query cache across all shards assigned to selected nodes. |
| `evictions` | [long](./long.md) | Total number of query cache evictions across all shards assigned to selected nodes. |
| `hit_count` | [long](./long.md) | Total count of query cache hits across all shards assigned to selected nodes. |
| `memory_size_in_bytes` | [long](./long.md) | Total amount, in bytes, of memory used for the query cache across all shards assigned to selected nodes. |
| `memory_size` | [ByteSize](./ByteSize.md) | Total amount of memory used for the query cache across all shards assigned to selected nodes. |
| `miss_count` | [long](./long.md) | Total count of query cache misses across all shards assigned to selected nodes. |
| `total_count` | [long](./long.md) | Total count of hits and misses in the query cache across all shards assigned to selected nodes. |
