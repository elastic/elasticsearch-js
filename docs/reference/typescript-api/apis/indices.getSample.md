# Client.indices.getSample

Request for a random sample of raw documents ingested into the given index or data stream.

## Method Signature

```typescript
client.indices.getSample(this: That, params: T.IndicesGetSampleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetSampleResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesGetSampleRequest`](../types/IndicesGetSampleRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetSampleResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
