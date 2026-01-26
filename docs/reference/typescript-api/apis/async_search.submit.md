# Client.async_search.submit

Run an async search. When the primary sort of the results is an indexed field, shards get sorted based on minimum and maximum value that they hold for that field. Partial results become available following the sort criteria that was requested. Warning: Asynchronous search does not support scroll or search requests that include only the suggest section. By default, Elasticsearch does not allow you to store an async search response larger than 10Mb and an attempt to do this results in an error. The maximum allowed size for a stored async search response can be set by changing the `search.max_async_search_response_size` cluster level setting.

## Method Signature

```typescript
client.async_search.submit(this: That, params?: T.AsyncSearchSubmitRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`AsyncSearchSubmitRequest`](../types/AsyncSearchSubmitRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
