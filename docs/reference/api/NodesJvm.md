## Interface `NodesJvm`

| Name | Type | Description |
| - | - | - |
| `buffer_pools` | Record<string, [NodesNodeBufferPool](./NodesNodeBufferPool.md)> | Contains statistics about JVM buffer pools for the node. |
| `classes` | [NodesJvmClasses](./NodesJvmClasses.md) | Contains statistics about classes loaded by JVM for the node. |
| `gc` | [NodesGarbageCollector](./NodesGarbageCollector.md) | Contains statistics about JVM garbage collectors for the node. |
| `mem` | [NodesJvmMemoryStats](./NodesJvmMemoryStats.md) | Contains JVM memory usage statistics for the node. |
| `threads` | [NodesJvmThreads](./NodesJvmThreads.md) | Contains statistics about JVM thread usage for the node. |
| `timestamp` | [long](./long.md) | Last time JVM statistics were refreshed. |
| `uptime_in_millis` | [long](./long.md) | JVM uptime in milliseconds. |
| `uptime` | string | Human-readable JVM uptime. Only returned if the `human` query parameter is `true`. |
