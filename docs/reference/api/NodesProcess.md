# `NodesProcess` [interface-NodesProcess]

| Name | Type | Description |
| - | - | - |
| `cpu` | [NodesCpu](./NodesCpu.md) | Contains CPU statistics for the node. |
| `max_file_descriptors` | [integer](./integer.md) | Maximum number of file descriptors allowed on the system, or `-1` if not supported. |
| `mem` | [NodesMemoryStats](./NodesMemoryStats.md) | Contains virtual memory statistics for the node. |
| `open_file_descriptors` | [integer](./integer.md) | Number of opened file descriptors associated with the current or `-1` if not supported. |
| `timestamp` | [long](./long.md) | Last time the statistics were refreshed. Recorded in milliseconds since the Unix Epoch. |
