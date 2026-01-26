# Client.cluster.reroute

Reroute the cluster. Manually change the allocation of individual shards in the cluster. For example, a shard can be moved from one node to another explicitly, an allocation can be canceled, and an unassigned shard can be explicitly allocated to a specific node. It is important to note that after processing any reroute commands Elasticsearch will perform rebalancing as normal (respecting the values of settings such as `cluster.routing.rebalance.enable`) in order to remain in a balanced state. For example, if the requested allocation includes moving a shard from node1 to node2 then this may cause a shard to be moved from node2 back to node1 to even things out. The cluster can be set to disable allocations using the `cluster.routing.allocation.enable` setting. If allocations are disabled then the only allocations that will be performed are explicit ones given using the reroute command, and consequent allocations due to rebalancing. The cluster will attempt to allocate a shard a maximum of `index.allocation.max_retries` times in a row (defaults to `5`), before giving up and leaving the shard unallocated. This scenario can be caused by structural problems such as having an analyzer which refers to a stopwords file which doesn’t exist on all nodes. Once the problem has been corrected, allocation can be manually retried by calling the reroute API with the `?retry_failed` URI query parameter, which will attempt a single retry round for these shards.

## Method Signature

```typescript
client.cluster.reroute(this: That, params?: T.ClusterRerouteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterRerouteResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterRerouteRequest`](../types/ClusterRerouteRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterRerouteResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
