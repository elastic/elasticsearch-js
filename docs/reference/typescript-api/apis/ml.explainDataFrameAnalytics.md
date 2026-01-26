# Client.ml.explainDataFrameAnalytics

Explain data frame analytics config. This API provides explanations for a data frame analytics config that either exists already or one that has not been created yet. The following explanations are provided: * which fields are included or not in the analysis and why, * how much memory is estimated to be required. The estimate can be used when deciding the appropriate value for model_memory_limit setting later on. If you have object fields or fields that are excluded via source filtering, they are not included in the explanation.

## Method Signature

```typescript
client.ml.explainDataFrameAnalytics(this: That, params?: T.MlExplainDataFrameAnalyticsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlExplainDataFrameAnalyticsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlExplainDataFrameAnalyticsRequest`](../types/MlExplainDataFrameAnalyticsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlExplainDataFrameAnalyticsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
