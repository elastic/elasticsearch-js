## Interface `NodesDiscovery`

| Name | Type | Description |
| - | - | - |
| `cluster_applier_stats` | [NodesClusterAppliedStats](./NodesClusterAppliedStats.md) | &nbsp; |
| `cluster_state_queue` | [NodesClusterStateQueue](./NodesClusterStateQueue.md) | Contains statistics for the cluster state queue of the node. |
| `cluster_state_update` | Record<string, [NodesClusterStateUpdate](./NodesClusterStateUpdate.md)> | Contains low-level statistics about how long various activities took during cluster state updates while the node was the elected master. Omitted if the node is not master-eligible. Every field whose name ends in `_time` within this object is also represented as a raw number of milliseconds in a field whose name ends in `_time_millis`. The human-readable fields with a `_time` suffix are only returned if requested with the `?human=true` query parameter. |
| `published_cluster_states` | [NodesPublishedClusterStates](./NodesPublishedClusterStates.md) | Contains statistics for the published cluster states of the node. |
| `serialized_cluster_states` | [NodesSerializedClusterState](./NodesSerializedClusterState.md) | &nbsp; |
