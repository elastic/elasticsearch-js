# Client.cluster.allocationExplain

Explain the shard allocations. Get explanations for shard allocations in the cluster. This API accepts the current_node, index, primary and shard parameters in the request body or in query parameters, but not in both at the same time. For unassigned shards, it provides an explanation for why the shard is unassigned. For assigned shards, it provides an explanation for why the shard is remaining on its current node and has not moved or rebalanced to another node. This API can be very useful when attempting to diagnose why a shard is unassigned or why a shard continues to remain on its current node when you might expect otherwise. Refer to the linked documentation for examples of how to troubleshoot allocation issues using this API.

## Method Signature

```typescript
client.cluster.allocationExplain(this: That, params?: T.ClusterAllocationExplainRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClusterAllocationExplainResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`ClusterAllocationExplainRequest`](../types/ClusterAllocationExplainRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ClusterAllocationExplainResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
