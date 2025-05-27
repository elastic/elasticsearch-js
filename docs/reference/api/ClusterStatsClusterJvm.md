## Interface `ClusterStatsClusterJvm`

| Name | Type | Description |
| - | - | - |
| `max_uptime_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Uptime duration, in milliseconds, since JVM last started. |
| `mem` | [ClusterStatsClusterJvmMemory](./ClusterStatsClusterJvmMemory.md) | Contains statistics about memory used by selected nodes. |
| `threads` | [long](./long.md) | Number of active threads in use by JVM across all selected nodes. |
| `versions` | [ClusterStatsClusterJvmVersion](./ClusterStatsClusterJvmVersion.md)[] | Contains statistics about the JVM versions used by selected nodes. |
