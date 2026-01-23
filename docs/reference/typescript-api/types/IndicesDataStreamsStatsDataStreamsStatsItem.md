# IndicesDataStreamsStatsDataStreamsStatsItem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `backing_indices` | `integer` | Current number of backing indices for the data stream. |
| `data_stream` | [`Name`](Name.md) | Name of the data stream. |
| `maximum_timestamp` | `EpochTime<UnitMillis>` | The data stream’s highest `@timestamp` value, converted to milliseconds since the Unix epoch.
NOTE: This timestamp is provided as a best effort.
The data stream may contain `@timestamp` values higher than this if one or more of the following conditions are met:
The stream contains closed backing indices;
Backing indices with a lower generation contain higher `@timestamp` values. |
| `store_size?` | [`ByteSize`](ByteSize.md) | Total size of all shards for the data stream’s backing indices.
This parameter is only returned if the `human` query parameter is `true`. |
| `store_size_bytes` | `long` | Total size, in bytes, of all shards for the data stream’s backing indices. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
