# Client.ml.startDataFrameAnalytics

Start a data frame analytics job. A data frame analytics job can be started and stopped multiple times throughout its lifecycle. If the destination index does not exist, it is created automatically the first time you start the data frame analytics job. The `index.number_of_shards` and `index.number_of_replicas` settings for the destination index are copied from the source index. If there are multiple source indices, the destination index copies the highest setting values. The mappings for the destination index are also copied from the source indices. If there are any mapping conflicts, the job fails to start. If the destination index exists, it is used as is. You can therefore set up the destination index in advance with custom settings and mappings.

## Method Signature

```typescript
client.ml.startDataFrameAnalytics(this: That, params: T.MlStartDataFrameAnalyticsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlStartDataFrameAnalyticsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlStartDataFrameAnalyticsRequest`](../types/MlStartDataFrameAnalyticsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlStartDataFrameAnalyticsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
