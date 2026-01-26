# Client.indices.getFieldMapping

Get mapping definitions. Retrieves mapping definitions for one or more fields. For data streams, the API retrieves field mappings for the stream’s backing indices. This API is useful if you don't need a complete mapping or if an index mapping contains a large number of fields.

## Method Signature

```typescript
client.indices.getFieldMapping(this: That, params: T.IndicesGetFieldMappingRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetFieldMappingResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesGetFieldMappingRequest`](../types/IndicesGetFieldMappingRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetFieldMappingResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
