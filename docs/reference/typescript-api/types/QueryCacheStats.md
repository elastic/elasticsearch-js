# QueryCacheStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cache_count` | `long` | Total number of entries added to the query cache across all shards assigned to selected nodes.
This number includes current and evicted entries. |
| `cache_size` | `long` | Total number of entries currently in the query cache across all shards assigned to selected nodes. |
| `evictions` | `long` | Total number of query cache evictions across all shards assigned to selected nodes. |
| `hit_count` | `long` | Total count of query cache hits across all shards assigned to selected nodes. |
| `memory_size?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for the query cache across all shards assigned to selected nodes. |
| `memory_size_in_bytes` | `long` | Total amount, in bytes, of memory used for the query cache across all shards assigned to selected nodes. |
| `miss_count` | `long` | Total count of query cache misses across all shards assigned to selected nodes. |
| `total_count` | `long` | Total count of hits and misses in the query cache across all shards assigned to selected nodes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
