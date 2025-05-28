# `NodesJvmMemoryStats` [interface-NodesJvmMemoryStats]

| Name | Type | Description |
| - | - | - |
| `heap_committed_in_bytes` | [long](./long.md) | Amount of memory, in bytes, available for use by the heap. |
| `heap_max_in_bytes` | [long](./long.md) | Maximum amount of memory, in bytes, available for use by the heap. |
| `heap_used_in_bytes` | [long](./long.md) | Memory, in bytes, currently in use by the heap. |
| `heap_used_percent` | [long](./long.md) | Percentage of memory currently in use by the heap. |
| `non_heap_committed_in_bytes` | [long](./long.md) | Amount of non-heap memory available, in bytes. |
| `non_heap_used_in_bytes` | [long](./long.md) | Non-heap memory used, in bytes. |
| `pools` | Record<string, [NodesPool](./NodesPool.md)> | Contains statistics about heap memory usage for the node. |
