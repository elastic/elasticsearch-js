# Client.ml.evaluateDataFrame

Evaluate data frame analytics. The API packages together commonly used evaluation metrics for various types of machine learning features. This has been designed for use on indexes created by data frame analytics. Evaluation requires both a ground truth field and an analytics result field to be present.

## Method Signature

```typescript
client.ml.evaluateDataFrame(this: That, params: T.MlEvaluateDataFrameRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlEvaluateDataFrameResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlEvaluateDataFrameRequest`](../types/MlEvaluateDataFrameRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlEvaluateDataFrameResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
