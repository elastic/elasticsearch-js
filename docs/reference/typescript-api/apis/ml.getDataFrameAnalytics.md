# Client.ml.getDataFrameAnalytics

Get data frame analytics job configuration info. You can get information for multiple data frame analytics jobs in a single API request by using a comma-separated list of data frame analytics jobs or a wildcard expression.

## Method Signature

```typescript
client.ml.getDataFrameAnalytics(this: That, params?: T.MlGetDataFrameAnalyticsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetDataFrameAnalyticsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetDataFrameAnalyticsRequest`](../types/MlGetDataFrameAnalyticsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetDataFrameAnalyticsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
