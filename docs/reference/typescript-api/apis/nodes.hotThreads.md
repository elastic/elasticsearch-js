# Client.nodes.hotThreads

Get the hot threads for nodes. Get a breakdown of the hot threads on each selected node in the cluster. The output is plain text with a breakdown of the top hot threads for each node.

## Method Signature

```typescript
client.nodes.hotThreads(this: That, params?: T.NodesHotThreadsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesHotThreadsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`NodesHotThreadsRequest`](../types/NodesHotThreadsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.NodesHotThreadsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
