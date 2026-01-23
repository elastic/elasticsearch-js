# DocStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | `long` | Total number of non-deleted documents across all primary shards assigned to selected nodes.
This number is based on documents in Lucene segments and may include documents from nested fields. |
| `deleted?` | `long` | Total number of deleted documents across all primary shards assigned to selected nodes.
This number is based on documents in Lucene segments.
Elasticsearch reclaims the disk space of deleted Lucene documents when a segment is merged. |
| `total_size_in_bytes` | `long` | Returns the total size in bytes of all documents in this stats.
This value may be more reliable than store_stats.size_in_bytes in estimating the index size. |
| `total_size?` | [`ByteSize`](ByteSize.md) | Human readable total_size_in_bytes |

## See Also

- [All Types](./)
- [API Methods](../index.md)
