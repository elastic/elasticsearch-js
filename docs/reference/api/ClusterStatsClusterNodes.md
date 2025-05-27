## Interface `ClusterStatsClusterNodes`

| Name | Type | Description |
| - | - | - |
| `count` | [ClusterStatsClusterNodeCount](./ClusterStatsClusterNodeCount.md) | Contains counts for nodes selected by the request’s node filters. |
| `discovery_types` | Record<string, [integer](./integer.md)> | Contains statistics about the discovery types used by selected nodes. |
| `fs` | [ClusterStatsClusterFileSystem](./ClusterStatsClusterFileSystem.md) | Contains statistics about file stores by selected nodes. |
| `indexing_pressure` | [ClusterStatsIndexingPressure](./ClusterStatsIndexingPressure.md) | &nbsp; |
| `ingest` | [ClusterStatsClusterIngest](./ClusterStatsClusterIngest.md) | &nbsp; |
| `jvm` | [ClusterStatsClusterJvm](./ClusterStatsClusterJvm.md) | Contains statistics about the Java Virtual Machines (JVMs) used by selected nodes. |
| `network_types` | [ClusterStatsClusterNetworkTypes](./ClusterStatsClusterNetworkTypes.md) | Contains statistics about the transport and HTTP networks used by selected nodes. |
| `os` | [ClusterStatsClusterOperatingSystem](./ClusterStatsClusterOperatingSystem.md) | Contains statistics about the operating systems used by selected nodes. |
| `packaging_types` | [ClusterStatsNodePackagingType](./ClusterStatsNodePackagingType.md)[] | Contains statistics about Elasticsearch distributions installed on selected nodes. |
| `plugins` | [PluginStats](./PluginStats.md)[] | Contains statistics about installed plugins and modules by selected nodes. If no plugins or modules are installed, this array is empty. |
| `process` | [ClusterStatsClusterProcess](./ClusterStatsClusterProcess.md) | Contains statistics about processes used by selected nodes. |
| `versions` | [VersionString](./VersionString.md)[] | Array of Elasticsearch versions used on selected nodes. |
