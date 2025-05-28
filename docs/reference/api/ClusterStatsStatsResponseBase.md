# `ClusterStatsStatsResponseBase` [interface-ClusterStatsStatsResponseBase]

| Name | Type | Description |
| - | - | - |
| `ccs` | [ClusterStatsCCSStats](./ClusterStatsCCSStats.md) | Cross-cluster stats |
| `cluster_name` | [Name](./Name.md) | Name of the cluster, based on the cluster name setting. |
| `cluster_uuid` | [Uuid](./Uuid.md) | Unique identifier for the cluster. |
| `indices` | [ClusterStatsClusterIndices](./ClusterStatsClusterIndices.md) | Contains statistics about indices with shards assigned to selected nodes. |
| `nodes` | [ClusterStatsClusterNodes](./ClusterStatsClusterNodes.md) | Contains statistics about nodes selected by the request’s node filters. |
| `status` | [HealthStatus](./HealthStatus.md) | Health status of the cluster, based on the state of its primary and replica shards. |
| `timestamp` | [long](./long.md) | Unix timestamp, in milliseconds, for the last time the cluster statistics were refreshed. |
