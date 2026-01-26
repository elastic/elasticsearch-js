# Client.indices.rollover

Roll over to a new index. TIP: We recommend using the index lifecycle rollover action to automate rollovers. However, Serverless does not support Index Lifecycle Management (ILM), so don't use this approach in the Serverless context. The rollover API creates a new index for a data stream or index alias. The API behavior depends on the rollover target. **Roll over a data stream** If you roll over a data stream, the API creates a new write index for the stream. The stream's previous write index becomes a regular backing index. A rollover also increments the data stream's generation. **Roll over an index alias with a write index** TIP: Prior to Elasticsearch 7.9, you'd typically use an index alias with a write index to manage time series data. Data streams replace this functionality, require less maintenance, and automatically integrate with data tiers. If an index alias points to multiple indices, one of the indices must be a write index. The rollover API creates a new write index for the alias with `is_write_index` set to `true`. The API also `sets is_write_index` to `false` for the previous write index. **Roll over an index alias with one index** If you roll over an index alias that points to only one index, the API creates a new index for the alias and removes the original index from the alias. NOTE: A rollover creates a new index and is subject to the `wait_for_active_shards` setting. **Increment index names for an alias** When you roll over an index alias, you can specify a name for the new index. If you don't specify a name and the current index ends with `-` and a number, such as `my-index-000001` or `my-index-3`, the new index name increments that number. For example, if you roll over an alias with a current index of `my-index-000001`, the rollover creates a new index named `my-index-000002`. This number is always six characters and zero-padded, regardless of the previous index's name. If you use an index alias for time series data, you can use date math in the index name to track the rollover date. For example, you can create an alias that points to an index named `<my-index-{now/d}-000001>`. If you create the index on May 6, 2099, the index's name is `my-index-2099.05.06-000001`. If you roll over the alias on May 7, 2099, the new index's name is `my-index-2099.05.07-000002`.

## Method Signature

```typescript
client.indices.rollover(this: That, params: T.IndicesRolloverRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesRolloverResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesRolloverRequest`](../types/IndicesRolloverRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesRolloverResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
