# NodesJvmMemoryStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `heap_used_in_bytes?` | `long` | Memory, in bytes, currently in use by the heap. |
| `heap_used_percent?` | `long` | Percentage of memory currently in use by the heap. |
| `heap_committed_in_bytes?` | `long` | Amount of memory, in bytes, available for use by the heap. |
| `heap_max_in_bytes?` | `long` | Maximum amount of memory, in bytes, available for use by the heap. |
| `heap_max?` | [`ByteSize`](ByteSize.md) | Maximum amount of memory, available for use by the heap. |
| `non_heap_used_in_bytes?` | `long` | Non-heap memory used, in bytes. |
| `non_heap_committed_in_bytes?` | `long` | Amount of non-heap memory available, in bytes. |
| `pools?` | `Record<string, NodesPool>` | Contains statistics about heap memory usage for the node. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
