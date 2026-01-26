# Client.search_application.search

Run a search application search. Generate and run an Elasticsearch query that uses the specified query parameteter and the search template associated with the search application or default template. Unspecified template parameters are assigned their default values if applicable.

## Method Signature

```typescript
client.search_application.search(this: That, params: T.SearchApplicationSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchApplicationSearchResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SearchApplicationSearchRequest`](../types/SearchApplicationSearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchApplicationSearchResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
