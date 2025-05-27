## Interface `ClusterRemoteInfoClusterRemoteProxyInfo`

| Name | Type | Description |
| - | - | - |
| `cluster_credentials` | string | This field is present and has a value of `::es_redacted::` only when the remote cluster is configured with the API key based model. Otherwise, the field is not present. |
| `connected` | boolean | If it is `true`, there is at least one open connection to the remote cluster. If it is `false`, it means that the cluster no longer has an open connection to the remote cluster. It does not necessarily mean that the remote cluster is down or unavailable, just that at some point a connection was lost. |
| `initial_connect_timeout` | [Duration](./Duration.md) | The initial connect timeout for remote cluster connections. |
| `max_proxy_socket_connections` | [integer](./integer.md) | The maximum number of socket connections to the remote cluster when proxy mode is configured. |
| `mode` | 'proxy' | The connection mode for the remote cluster. |
| `num_proxy_sockets_connected` | [integer](./integer.md) | The number of open socket connections to the remote cluster when proxy mode is configured. |
| `proxy_address` | string | The address for remote connections when proxy mode is configured. |
| `server_name` | string | &nbsp; |
| `skip_unavailable` | boolean | If `true`, cross-cluster search skips the remote cluster when its nodes are unavailable during the search and ignores errors returned by the remote cluster. |
