# SegmentsStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | [`integer`](integer.md) | Total number of segments across all shards assigned to selected nodes. |
| `doc_values_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for doc values across all shards assigned to selected nodes. |
| `doc_values_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for doc values across all shards assigned to selected nodes. |
| `file_sizes` | `Record<string, IndicesStatsShardFileSizeInfo>` | This object is not populated by the cluster stats API.
To get information on segment files, use the node stats API. |
| `fixed_bit_set?` | [`ByteSize`](ByteSize.md) | Total amount of memory used by fixed bit sets across all shards assigned to selected nodes.
Fixed bit sets are used for nested object field types and type filters for join fields. |
| `fixed_bit_set_memory_in_bytes` | [`long`](long.md) | Total amount of memory, in bytes, used by fixed bit sets across all shards assigned to selected nodes. |
| `index_writer_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used by all index writers across all shards assigned to selected nodes. |
| `index_writer_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used by all index writers across all shards assigned to selected nodes. |
| `max_unsafe_auto_id_timestamp` | [`long`](long.md) | Unix timestamp, in milliseconds, of the most recently retried indexing request. |
| `memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for segments across all shards assigned to selected nodes. |
| `memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for segments across all shards assigned to selected nodes. |
| `norms_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for normalization factors across all shards assigned to selected nodes. |
| `norms_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for normalization factors across all shards assigned to selected nodes. |
| `points_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for points across all shards assigned to selected nodes. |
| `points_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for points across all shards assigned to selected nodes. |
| `stored_fields_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for stored fields across all shards assigned to selected nodes. |
| `stored_fields_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for stored fields across all shards assigned to selected nodes. |
| `terms_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for terms across all shards assigned to selected nodes. |
| `terms_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for terms across all shards assigned to selected nodes. |
| `term_vectors_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used for term vectors across all shards assigned to selected nodes. |
| `term_vectors_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used for term vectors across all shards assigned to selected nodes. |
| `version_map_memory?` | [`ByteSize`](ByteSize.md) | Total amount of memory used by all version maps across all shards assigned to selected nodes. |
| `version_map_memory_in_bytes` | [`long`](long.md) | Total amount, in bytes, of memory used by all version maps across all shards assigned to selected nodes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
