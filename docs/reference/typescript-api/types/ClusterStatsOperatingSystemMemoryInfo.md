# ClusterStatsOperatingSystemMemoryInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adjusted_total_in_bytes?` | [`long`](long.md) | Total amount, in bytes, of memory across all selected nodes, but using the value specified using the `es.total_memory_bytes` system property instead of measured total memory for those nodes where that system property was set. |
| `adjusted_total?` | [`ByteSize`](ByteSize.md) | Total amount of memory across all selected nodes, but using the value specified using the `es.total_memory_bytes` system property instead of measured total memory for those nodes where that system property was set. |
| `free_in_bytes` | [`long`](long.md) | Amount, in bytes, of free physical memory across all selected nodes. |
| `free?` | [`ByteSize`](ByteSize.md) | Amount of free physical memory across all selected nodes. |
| `free_percent` | [`integer`](integer.md) | Percentage of free physical memory across all selected nodes. |
| `total_in_bytes` | [`long`](long.md) | Total amount, in bytes, of physical memory across all selected nodes. |
| `total?` | [`ByteSize`](ByteSize.md) | Total amount of physical memory across all selected nodes. |
| `used_in_bytes` | [`long`](long.md) | Amount, in bytes, of physical memory in use across all selected nodes. |
| `used?` | [`ByteSize`](ByteSize.md) | Amount of physical memory in use across all selected nodes. |
| `used_percent` | [`integer`](integer.md) | Percentage of physical memory in use across all selected nodes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
