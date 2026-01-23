# ClusterStatsStatsResponseBase

## Interface

### Extends

- [`NodesNodesResponseBase`](NodesNodesResponseBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cluster_name` | [`Name`](Name.md) | Name of the cluster, based on the cluster name setting. |
| `cluster_uuid` | [`Uuid`](Uuid.md) | Unique identifier for the cluster. |
| `indices` | [`ClusterStatsClusterIndices`](ClusterStatsClusterIndices.md) | Contains statistics about indices with shards assigned to selected nodes. |
| `nodes` | [`ClusterStatsClusterNodes`](ClusterStatsClusterNodes.md) | Contains statistics about nodes selected by the request’s node filters. |
| `repositories` | `Record<Name, Record<Name, long>>` | Contains stats on repository feature usage exposed in cluster stats for telemetry. |
| `snapshots` | [`ClusterStatsClusterSnapshotStats`](ClusterStatsClusterSnapshotStats.md) | Contains stats cluster snapshots. |
| `status?` | [`HealthStatus`](HealthStatus.md) | Health status of the cluster, based on the state of its primary and replica shards. |
| `timestamp` | [`long`](long.md) | Unix timestamp, in milliseconds, for the last time the cluster statistics were refreshed. |
| `ccs` | [`ClusterStatsCCSStats`](ClusterStatsCCSStats.md) | Cross-cluster stats |

## See Also

- [All Types](./)
- [API Methods](../index.md)
