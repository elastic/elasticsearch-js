# Client.indices.putDataStreamMappings

Update data stream mappings. This API can be used to override mappings on specific data streams. These overrides will take precedence over what is specified in the template that the data stream matches. The mapping change is only applied to new write indices that are created during rollover after this API is called. No indices are changed by this API.

## Method Signature

```typescript
client.indices.putDataStreamMappings(this: That, params: T.IndicesPutDataStreamMappingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesPutDataStreamMappingsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesPutDataStreamMappingsRequest`](../types/IndicesPutDataStreamMappingsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesPutDataStreamMappingsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
