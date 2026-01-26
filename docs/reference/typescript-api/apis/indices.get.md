# Client.indices.get

Get index information. Get information about one or more indices. For data streams, the API returns information about the stream’s backing indices.

## Method Signature

```typescript
client.indices.get(this: That, params: T.IndicesGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesGetRequest`](../types/IndicesGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
