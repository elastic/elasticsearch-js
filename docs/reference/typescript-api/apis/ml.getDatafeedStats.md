# Client.ml.getDatafeedStats

Get datafeed stats. You can get statistics for multiple datafeeds in a single API request by using a comma-separated list of datafeeds or a wildcard expression. You can get statistics for all datafeeds by using `_all`, by specifying `*` as the `<feed_id>`, or by omitting the `<feed_id>`. If the datafeed is stopped, the only information you receive is the `datafeed_id` and the `state`. This API returns a maximum of 10,000 datafeeds.

## Method Signature

```typescript
client.ml.getDatafeedStats(this: That, params?: T.MlGetDatafeedStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetDatafeedStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetDatafeedStatsRequest`](../types/MlGetDatafeedStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetDatafeedStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
