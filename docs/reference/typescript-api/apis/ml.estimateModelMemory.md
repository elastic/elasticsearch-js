# Client.ml.estimateModelMemory

Estimate job model memory usage. Make an estimation of the memory usage for an anomaly detection job model. The estimate is based on analysis configuration details for the job and cardinality estimates for the fields it references.

## Method Signature

```typescript
client.ml.estimateModelMemory(this: That, params?: T.MlEstimateModelMemoryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlEstimateModelMemoryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlEstimateModelMemoryRequest`](../types/MlEstimateModelMemoryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlEstimateModelMemoryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
