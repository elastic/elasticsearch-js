# `ClusterHealthRequest` [interface-ClusterHealthRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; expand_wildcards?: never; level?: never; local?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; wait_for_events?: never; wait_for_nodes?: never; wait_for_no_initializing_shards?: never; wait_for_no_relocating_shards?: never; wait_for_status?: never; }) | All values in `body` will be added to the request body. |
| `expand_wildcards` | [ExpandWildcards](./ExpandWildcards.md) | Whether to expand wildcard expression to concrete indices that are open, closed or both. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams, indices, and index aliases used to limit the request. Wildcard expressions ( `*`) are supported. To target all data streams and indices in a cluster, omit this parameter or use _all or `*`. |
| `level` | [Level](./Level.md) | Can be one of cluster, indices or shards. Controls the details level of the health information returned. |
| `local` | boolean | If true, the request retrieves information from the local node only. Defaults to false, which means information is retrieved from the master node. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { index?: never; expand_wildcards?: never; level?: never; local?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; wait_for_events?: never; wait_for_nodes?: never; wait_for_no_initializing_shards?: never; wait_for_no_relocating_shards?: never; wait_for_status?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_active_shards` | [WaitForActiveShards](./WaitForActiveShards.md) | A number controlling to how many active shards to wait for, all to wait for all shards in the cluster to be active, or 0 to not wait. |
| `wait_for_events` | [WaitForEvents](./WaitForEvents.md) | Can be one of immediate, urgent, high, normal, low, languid. Wait until all currently queued events with the given priority are processed. |
| `wait_for_no_initializing_shards` | boolean | A boolean value which controls whether to wait (until the timeout provided) for the cluster to have no shard initializations. Defaults to false, which means it will not wait for initializing shards. |
| `wait_for_no_relocating_shards` | boolean | A boolean value which controls whether to wait (until the timeout provided) for the cluster to have no shard relocations. Defaults to false, which means it will not wait for relocating shards. |
| `wait_for_nodes` | [ClusterHealthWaitForNodes](./ClusterHealthWaitForNodes.md) | The request waits until the specified number N of nodes is available. It also accepts > =N, < =N, > N and < N. Alternatively, it is possible to use ge(N), le(N), gt(N) and lt(N) notation. |
| `wait_for_status` | [HealthStatus](./HealthStatus.md) | One of green, yellow or red. Will wait (until the timeout provided) until the status of the cluster changes to the one provided or better, i.e. green > yellow > red. By default, will not wait for any status. |
