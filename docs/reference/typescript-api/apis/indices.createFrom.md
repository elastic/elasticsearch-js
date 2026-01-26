# Client.indices.createFrom

Create an index from a source index. Copy the mappings and settings from the source index to a destination index while allowing request settings and mappings to override the source values.

## Method Signature

```typescript
client.indices.createFrom(this: That, params: T.IndicesCreateFromRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesCreateFromResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesCreateFromRequest`](../types/IndicesCreateFromRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesCreateFromResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
