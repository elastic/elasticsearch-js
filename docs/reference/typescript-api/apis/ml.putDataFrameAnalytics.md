# Client.ml.putDataFrameAnalytics

Create a data frame analytics job. This API creates a data frame analytics job that performs an analysis on the source indices and stores the outcome in a destination index. By default, the query used in the source configuration is `{"match_all": {}}`. If the destination index does not exist, it is created automatically when you start the job. If you supply only a subset of the regression or classification parameters, hyperparameter optimization occurs. It determines a value for each of the undefined parameters.

## Method Signature

```typescript
client.ml.putDataFrameAnalytics(this: That, params: T.MlPutDataFrameAnalyticsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutDataFrameAnalyticsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutDataFrameAnalyticsRequest`](../types/MlPutDataFrameAnalyticsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutDataFrameAnalyticsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
