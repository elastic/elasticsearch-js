# Client.async_search.get

Get async search results. Retrieve the results of a previously submitted asynchronous search request. If the Elasticsearch security features are enabled, access to the results of a specific async search is restricted to the user or API key that submitted it.

## Method Signature

```typescript
client.async_search.get(this: That, params: T.AsyncSearchGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`AsyncSearchGetRequest`](../types/AsyncSearchGetRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
