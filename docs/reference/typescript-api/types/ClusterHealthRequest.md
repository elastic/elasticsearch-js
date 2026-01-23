# ClusterHealthRequest

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index?` | [`Indices`](Indices.md) | A comma-separated list of data streams, indices, and index aliases that limit the request.
Wildcard expressions (`*`) are supported.
To target all data streams and indices in a cluster, omit this parameter or use _all or `*`. |
| `expand_wildcards?` | [`ExpandWildcards`](ExpandWildcards.md) | Expand wildcard expression to concrete indices that are open, closed or both. |
| `level?` | [`Level`](Level.md) | Return health information at a specific level of detail. |
| `local?` | `boolean` | If true, retrieve information from the local node only.
If false, retrieve information from the master node. |
| `master_timeout?` | [`Duration`](Duration.md) | The period to wait for a connection to the master node.
If no response is received before the timeout expires, the request fails and returns an error. |
| `timeout?` | [`Duration`](Duration.md) | The period to wait for a response.
If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_active_shards?` | [`WaitForActiveShards`](WaitForActiveShards.md) | Wait for the specified number of active shards.
Use `all` to wait for all shards in the cluster to be active.
Use `0` to not wait. |
| `wait_for_events?` | [`WaitForEvents`](WaitForEvents.md) | Wait until all currently queued events with the given priority are processed. |
| `wait_for_nodes?` | [`ClusterHealthWaitForNodes`](ClusterHealthWaitForNodes.md) | Wait until the specified number (N) of nodes is available.
It also accepts `>=N`, `<=N`, `>N` and `<N`.
Alternatively, use the notations `ge(N)`, `le(N)`, `gt(N)`, and `lt(N)`. |
| `wait_for_no_initializing_shards?` | `boolean` | Wait (until the timeout expires) for the cluster to have no shard initializations.
If false, the request does not wait for initializing shards. |
| `wait_for_no_relocating_shards?` | `boolean` | Wait (until the timeout expires) for the cluster to have no shard relocations.
If false, the request not wait for relocating shards. |
| `wait_for_status?` | [`HealthStatus`](HealthStatus.md) | Wait (until the timeout expires) for the cluster to reach a specific health status (or a better status).
A green status is better than yellow and yellow is better than red.
By default, the request does not wait for a particular status. |
| `body?` | `string | { [key: string]: any } & { index?: never, expand_wildcards?: never, level?: never, local?: never, master_timeout?: never, timeout?: never, wait_for_active_shards?: never, wait_for_events?: never, wait_for_nodes?: never, wait_for_no_initializing_shards?: never, wait_for_no_relocating_shards?: never, wait_for_status?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { index?: never, expand_wildcards?: never, level?: never, local?: never, master_timeout?: never, timeout?: never, wait_for_active_shards?: never, wait_for_events?: never, wait_for_nodes?: never, wait_for_no_initializing_shards?: never, wait_for_no_relocating_shards?: never, wait_for_status?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
