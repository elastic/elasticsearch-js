# Client.indices.resolveIndex

Resolve indices. Resolve the names and/or index patterns for indices, aliases, and data streams. Multiple patterns and remote clusters are supported.

## Method Signature

```typescript
client.indices.resolveIndex(this: That, params: T.IndicesResolveIndexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesResolveIndexResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesResolveIndexRequest`](../types/IndicesResolveIndexRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesResolveIndexResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
