# ClusterStatsClusterOperatingSystem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `allocated_processors` | [`integer`](integer.md) | Number of processors used to calculate thread pool size across all selected nodes.
This number can be set with the processors setting of a node and defaults to the number of processors reported by the operating system.
In both cases, this number will never be larger than 32. |
| `architectures?` | [`ClusterStatsClusterOperatingSystemArchitecture`](ClusterStatsClusterOperatingSystemArchitecture.md)[] | Contains statistics about processor architectures (for example, x86_64 or aarch64) used by selected nodes. |
| `available_processors` | [`integer`](integer.md) | Number of processors available to JVM across all selected nodes. |
| `mem` | [`ClusterStatsOperatingSystemMemoryInfo`](ClusterStatsOperatingSystemMemoryInfo.md) | Contains statistics about memory used by selected nodes. |
| `names` | [`ClusterStatsClusterOperatingSystemName`](ClusterStatsClusterOperatingSystemName.md)[] | Contains statistics about operating systems used by selected nodes. |
| `pretty_names` | [`ClusterStatsClusterOperatingSystemPrettyName`](ClusterStatsClusterOperatingSystemPrettyName.md)[] | Contains statistics about operating systems used by selected nodes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
