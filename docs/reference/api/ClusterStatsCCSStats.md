# `ClusterStatsCCSStats` [interface-ClusterStatsCCSStats]

| Name | Type | Description |
| - | - | - |
| `_esql` | [ClusterStatsCCSUsageStats](./ClusterStatsCCSUsageStats.md) | Information about ES|QL cross-cluster query usage. |
| `_search` | [ClusterStatsCCSUsageStats](./ClusterStatsCCSUsageStats.md) | Information about cross-cluster search usage. |
| `clusters` | Record<string, [ClusterStatsRemoteClusterInfo](./ClusterStatsRemoteClusterInfo.md)> | Contains remote cluster settings and metrics collected from them. The keys are cluster names, and the values are per-cluster data. Only present if `include_remotes` option is set to true. |
