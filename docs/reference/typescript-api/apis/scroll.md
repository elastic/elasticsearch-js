# Client.scroll

Run a scrolling search. IMPORTANT: The scroll API is no longer recommend for deep pagination. If you need to preserve the index state while paging through more than 10,000 hits, use the `search_after` parameter with a point in time (PIT). The scroll API gets large sets of results from a single scrolling search request. To get the necessary scroll ID, submit a search API request that includes an argument for the `scroll` query parameter. The `scroll` parameter indicates how long Elasticsearch should retain the search context for the request. The search response returns a scroll ID in the `_scroll_id` response body parameter. You can then use the scroll ID with the scroll API to retrieve the next batch of results for the request. If the Elasticsearch security features are enabled, the access to the results of a specific scroll ID is restricted to the user or API key that submitted the search. You can also use the scroll API to specify a new scroll parameter that extends or shortens the retention period for the search context. IMPORTANT: Results from a scrolling search reflect the state of the index at the time of the initial search request. Subsequent indexing or document changes only affect later search and scroll requests.

## Method Signature

```typescript
client.scroll(this: That, params: T.ScrollRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ScrollResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ScrollRequest`](../types/ScrollRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ScrollResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
