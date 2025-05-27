## Interface `ClusterRemoteInfoClusterRemoteSniffInfo`

| Name | Type | Description |
| - | - | - |
| `connected` | boolean | If it is `true`, there is at least one open connection to the remote cluster. If it is `false`, it means that the cluster no longer has an open connection to the remote cluster. It does not necessarily mean that the remote cluster is down or unavailable, just that at some point a connection was lost. |
| `initial_connect_timeout` | [Duration](./Duration.md) | The initial connect timeout for remote cluster connections. |
| `max_connections_per_cluster` | [integer](./integer.md) | The maximum number of connections maintained for the remote cluster when sniff mode is configured. |
| `mode` | 'sniff' | The connection mode for the remote cluster. |
| `num_nodes_connected` | [long](./long.md) | The number of connected nodes in the remote cluster when sniff mode is configured. |
| `seeds` | string[] | The initial seed transport addresses of the remote cluster when sniff mode is configured. |
| `skip_unavailable` | boolean | If `true`, cross-cluster search skips the remote cluster when its nodes are unavailable during the search and ignores errors returned by the remote cluster. |
