## Interface `CcrStatsAutoFollowStats`

| Name | Type | Description |
| - | - | - |
| `auto_followed_clusters` | [CcrStatsAutoFollowedCluster](./CcrStatsAutoFollowedCluster.md)[] | &nbsp; |
| `number_of_failed_follow_indices` | [long](./long.md) | The number of indices that the auto-follow coordinator failed to automatically follow. The causes of recent failures are captured in the logs of the elected master node and in the `auto_follow_stats.recent_auto_follow_errors` field. |
| `number_of_failed_remote_cluster_state_requests` | [long](./long.md) | The number of times that the auto-follow coordinator failed to retrieve the cluster state from a remote cluster registered in a collection of auto-follow patterns. |
| `number_of_successful_follow_indices` | [long](./long.md) | The number of indices that the auto-follow coordinator successfully followed. |
| `recent_auto_follow_errors` | [ErrorCause](./ErrorCause.md)[] | An array of objects representing failures by the auto-follow coordinator. |
