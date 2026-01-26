# Client.ml.getMemoryStats

Get machine learning memory usage info. Get information about how machine learning jobs and trained models are using memory, on each node, both within the JVM heap, and natively, outside of the JVM.

## Method Signature

```typescript
client.ml.getMemoryStats(this: That, params?: T.MlGetMemoryStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetMemoryStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetMemoryStatsRequest`](../types/MlGetMemoryStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetMemoryStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
