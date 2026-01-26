# Client.mtermvectors

Get multiple term vectors. Get multiple term vectors with a single request. You can specify existing documents by index and ID or provide artificial documents in the body of the request. You can specify the index in the request body or request URI. The response contains a `docs` array with all the fetched termvectors. Each element has the structure provided by the termvectors API. **Artificial documents** You can also use `mtermvectors` to generate term vectors for artificial documents provided in the body of the request. The mapping used is determined by the specified `_index`.

## Method Signature

```typescript
client.mtermvectors(this: That, params?: T.MtermvectorsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MtermvectorsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MtermvectorsRequest`](../types/MtermvectorsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MtermvectorsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
