# Client.ml.getTrainedModelsStats

Get trained models usage info. You can get usage information for multiple trained models in a single API request by using a comma-separated list of model IDs or a wildcard expression.

## Method Signature

```typescript
client.ml.getTrainedModelsStats(this: That, params?: T.MlGetTrainedModelsStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetTrainedModelsStatsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetTrainedModelsStatsRequest`](../types/MlGetTrainedModelsStatsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetTrainedModelsStatsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
