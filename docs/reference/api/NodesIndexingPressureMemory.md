# `NodesIndexingPressureMemory` [interface-NodesIndexingPressureMemory]

| Name | Type | Description |
| - | - | - |
| `current` | [NodesPressureMemory](./NodesPressureMemory.md) | Contains statistics for current indexing load. |
| `limit_in_bytes` | [long](./long.md) | Configured memory limit, in bytes, for the indexing requests. Replica requests have an automatic limit that is 1.5x this value. |
| `limit` | [ByteSize](./ByteSize.md) | Configured memory limit for the indexing requests. Replica requests have an automatic limit that is 1.5x this value. |
| `total` | [NodesPressureMemory](./NodesPressureMemory.md) | Contains statistics for the cumulative indexing load since the node started. |
