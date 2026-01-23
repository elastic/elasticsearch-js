# NodesJvm

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `buffer_pools?` | `Record<string, NodesNodeBufferPool>` | Contains statistics about JVM buffer pools for the node. |
| `classes?` | [`NodesJvmClasses`](NodesJvmClasses.md) | Contains statistics about classes loaded by JVM for the node. |
| `gc?` | [`NodesGarbageCollector`](NodesGarbageCollector.md) | Contains statistics about JVM garbage collectors for the node. |
| `mem?` | [`NodesJvmMemoryStats`](NodesJvmMemoryStats.md) | Contains JVM memory usage statistics for the node. |
| `threads?` | [`NodesJvmThreads`](NodesJvmThreads.md) | Contains statistics about JVM thread usage for the node. |
| `timestamp?` | `long` | Last time JVM statistics were refreshed. |
| `uptime?` | `string` | Human-readable JVM uptime.
Only returned if the `human` query parameter is `true`. |
| `uptime_in_millis?` | `long` | JVM uptime in milliseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
