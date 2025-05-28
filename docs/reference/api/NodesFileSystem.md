# `NodesFileSystem` [interface-NodesFileSystem]

| Name | Type | Description |
| - | - | - |
| `data` | [NodesDataPathStats](./NodesDataPathStats.md)[] | List of all file stores. |
| `io_stats` | [NodesIoStats](./NodesIoStats.md) | Contains I/O statistics for the node. |
| `timestamp` | [long](./long.md) | Last time the file stores statistics were refreshed. Recorded in milliseconds since the Unix Epoch. |
| `total` | [NodesFileSystemTotal](./NodesFileSystemTotal.md) | Contains statistics for all file stores of the node. |
