# Client.nodes.stats

Get node statistics. Get statistics for nodes in a cluster. By default, all stats are returned. You can limit the returned information by using metrics.

## Method Signature

```typescript
client.nodes.stats(this: That, params?: T.NodesStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`NodesStatsRequest`](../types/NodesStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.NodesStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
