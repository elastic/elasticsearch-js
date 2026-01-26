# Client.knn_search

Run a knn search. NOTE: The kNN search API has been replaced by the `knn` option in the search API.

## Method Signature

```typescript
client.knn_search(this: That, params: T.KnnSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.KnnSearchResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`KnnSearchRequest`](../types/KnnSearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.KnnSearchResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
