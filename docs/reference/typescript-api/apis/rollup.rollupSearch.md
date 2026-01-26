# Client.rollup.rollupSearch

Search rolled-up data. The rollup search endpoint is needed because, internally, rolled-up documents utilize a different document structure than the original data. It rewrites standard Query DSL into a format that matches the rollup documents then takes the response and rewrites it back to what a client would expect given the original query. The request body supports a subset of features from the regular search API. The following functionality is not available: `size`: Because rollups work on pre-aggregated data, no search hits can be returned and so size must be set to zero or omitted entirely. `highlighter`, `suggestors`, `post_filter`, `profile`, `explain`: These are similarly disallowed. For more detailed examples of using the rollup search API, including querying rolled-up data only or combining rolled-up and live data, refer to the External documentation.

## Method Signature

```typescript
client.rollup.rollupSearch(this: That, params: T.RollupRollupSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RollupRollupSearchResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`RollupRollupSearchRequest`](../types/RollupRollupSearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.RollupRollupSearchResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
