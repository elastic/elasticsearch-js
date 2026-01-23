# IndicesDataStreamsStatsResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_shards` | [`ShardStatistics`](ShardStatistics.md) | Contains information about shards that attempted to execute the request. |
| `backing_indices` | `integer` | Total number of backing indices for the selected data streams. |
| `data_stream_count` | `integer` | Total number of selected data streams. |
| `data_streams` | `IndicesDataStreamsStatsDataStreamsStatsItem[]` | Contains statistics for the selected data streams. |
| `total_store_sizes?` | [`ByteSize`](ByteSize.md) | Total size of all shards for the selected data streams.
This property is included only if the `human` query parameter is `true` |
| `total_store_size_bytes` | `long` | Total size, in bytes, of all shards for the selected data streams. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
