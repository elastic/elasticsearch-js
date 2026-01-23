# NodesIndexingPressureMemory

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `limit?` | [`ByteSize`](ByteSize.md) | Configured memory limit for the indexing requests.
Replica requests have an automatic limit that is 1.5x this value. |
| `limit_in_bytes?` | [`long`](long.md) | Configured memory limit, in bytes, for the indexing requests.
Replica requests have an automatic limit that is 1.5x this value. |
| `current?` | [`NodesPressureMemory`](NodesPressureMemory.md) | Contains statistics for current indexing load. |
| `total?` | [`NodesPressureMemory`](NodesPressureMemory.md) | Contains statistics for the cumulative indexing load since the node started. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
