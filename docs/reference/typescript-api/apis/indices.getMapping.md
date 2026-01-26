# Client.indices.getMapping

Get mapping definitions. For data streams, the API retrieves mappings for the stream’s backing indices.

## Method Signature

```typescript
client.indices.getMapping(this: That, params?: T.IndicesGetMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IndicesGetMappingRequest`](../types/IndicesGetMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
