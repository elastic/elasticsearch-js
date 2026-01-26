# Client.ml.deleteTrainedModel

Delete an unreferenced trained model. The request deletes a trained inference model that is not referenced by an ingest pipeline.

## Method Signature

```typescript
client.ml.deleteTrainedModel(this: That, params: T.MlDeleteTrainedModelRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteTrainedModelResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteTrainedModelRequest`](../types/MlDeleteTrainedModelRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteTrainedModelResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
