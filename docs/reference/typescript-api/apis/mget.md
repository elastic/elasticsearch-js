# Client.mget

Get multiple documents. Get multiple JSON documents by ID from one or more indices. If you specify an index in the request URI, you only need to specify the document IDs in the request body. To ensure fast responses, this multi get (mget) API responds with partial results if one or more shards fail. **Filter source fields** By default, the `_source` field is returned for every document (if stored). Use the `_source` and `_source_include` or `source_exclude` attributes to filter what fields are returned for a particular document. You can include the `_source`, `_source_includes`, and `_source_excludes` query parameters in the request URI to specify the defaults to use when there are no per-document instructions. **Get stored fields** Use the `stored_fields` attribute to specify the set of stored fields you want to retrieve. Any requested fields that are not stored are ignored. You can include the `stored_fields` query parameter in the request URI to specify the defaults to use when there are no per-document instructions.

## Method Signature

```typescript
client.mget(this: That, params?: T.MgetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MgetResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MgetRequest`](../types/MgetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MgetResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
