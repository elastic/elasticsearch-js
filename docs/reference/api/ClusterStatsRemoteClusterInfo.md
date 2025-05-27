## Interface `ClusterStatsRemoteClusterInfo`

| Name | Type | Description |
| - | - | - |
| `cluster_uuid` | string | The UUID of the remote cluster. |
| `indices_count` | [integer](./integer.md) | The total number of indices in the remote cluster. |
| `indices_total_size_in_bytes` | [long](./long.md) | Total data set size, in bytes, of all shards assigned to selected nodes. |
| `indices_total_size` | string | Total data set size of all shards assigned to selected nodes, as a human-readable string. |
| `max_heap_in_bytes` | [long](./long.md) | Maximum amount of memory, in bytes, available for use by the heap across the nodes of the remote cluster. |
| `max_heap` | string | Maximum amount of memory available for use by the heap across the nodes of the remote cluster, as a human-readable string. |
| `mem_total_in_bytes` | [long](./long.md) | Total amount, in bytes, of physical memory across the nodes of the remote cluster. |
| `mem_total` | string | Total amount of physical memory across the nodes of the remote cluster, as a human-readable string. |
| `mode` | string | The connection mode used to communicate with the remote cluster. |
| `nodes_count` | [integer](./integer.md) | The total count of nodes in the remote cluster. |
| `shards_count` | [integer](./integer.md) | The total number of shards in the remote cluster. |
| `skip_unavailable` | boolean | The `skip_unavailable` setting used for this remote cluster. |
| `status` | [HealthStatus](./HealthStatus.md) | Health status of the cluster, based on the state of its primary and replica shards. |
| `transport_compress` | string | Transport compression setting used for this remote cluster. |
| `version` | [VersionString](./VersionString.md)[] | The list of Elasticsearch versions used by the nodes on the remote cluster. |
