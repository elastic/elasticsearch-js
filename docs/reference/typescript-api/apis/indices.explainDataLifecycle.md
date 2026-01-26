# Client.indices.explainDataLifecycle

Get the status for a data stream lifecycle. Get information about an index or data stream's current data stream lifecycle status, such as time since index creation, time since rollover, the lifecycle configuration managing the index, or any errors encountered during lifecycle execution.

## Method Signature

```typescript
client.indices.explainDataLifecycle(this: That, params: T.IndicesExplainDataLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesExplainDataLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesExplainDataLifecycleRequest`](../types/IndicesExplainDataLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesExplainDataLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
