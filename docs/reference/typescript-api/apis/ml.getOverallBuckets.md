# Client.ml.getOverallBuckets

Get overall bucket results. Retrievs overall bucket results that summarize the bucket results of multiple anomaly detection jobs. The `overall_score` is calculated by combining the scores of all the buckets within the overall bucket span. First, the maximum `anomaly_score` per anomaly detection job in the overall bucket is calculated. Then the `top_n` of those scores are averaged to result in the `overall_score`. This means that you can fine-tune the `overall_score` so that it is more or less sensitive to the number of jobs that detect an anomaly at the same time. For example, if you set `top_n` to `1`, the `overall_score` is the maximum bucket score in the overall bucket. Alternatively, if you set `top_n` to the number of jobs, the `overall_score` is high only when all jobs detect anomalies in that overall bucket. If you set the `bucket_span` parameter (to a value greater than its default), the `overall_score` is the maximum `overall_score` of the overall buckets that have a span equal to the jobs' largest bucket span.

## Method Signature

```typescript
client.ml.getOverallBuckets(this: That, params: T.MlGetOverallBucketsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetOverallBucketsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlGetOverallBucketsRequest`](../types/MlGetOverallBucketsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetOverallBucketsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
