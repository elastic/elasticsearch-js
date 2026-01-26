# Client.indices.deleteDataLifecycle

Delete data stream lifecycles. Removes the data stream lifecycle from a data stream, rendering it not managed by the data stream lifecycle.

## Method Signature

```typescript
client.indices.deleteDataLifecycle(this: That, params: T.IndicesDeleteDataLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesDeleteDataLifecycleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesDeleteDataLifecycleRequest`](../types/IndicesDeleteDataLifecycleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesDeleteDataLifecycleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
