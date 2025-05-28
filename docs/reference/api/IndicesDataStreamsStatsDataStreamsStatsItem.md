# `IndicesDataStreamsStatsDataStreamsStatsItem` [interface-IndicesDataStreamsStatsDataStreamsStatsItem]

| Name | Type | Description |
| - | - | - |
| `backing_indices` | [integer](./integer.md) | Current number of backing indices for the data stream. |
| `data_stream` | [Name](./Name.md) | Name of the data stream. |
| `maximum_timestamp` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The data stream’s highest `@timestamp` value, converted to milliseconds since the Unix epoch. NOTE: This timestamp is provided as a best effort. The data stream may contain `@timestamp` values higher than this if one or more of the following conditions are met: The stream contains closed backing indices; Backing indices with a lower generation contain higher `@timestamp` values. |
| `store_size_bytes` | [long](./long.md) | Total size, in bytes, of all shards for the data stream’s backing indices. |
| `store_size` | [ByteSize](./ByteSize.md) | Total size of all shards for the data stream’s backing indices. This parameter is only returned if the `human` query parameter is `true`. |
