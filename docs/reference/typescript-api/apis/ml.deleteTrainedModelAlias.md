# Client.ml.deleteTrainedModelAlias

Delete a trained model alias. This API deletes an existing model alias that refers to a trained model. If the model alias is missing or refers to a model other than the one identified by the `model_id`, this API returns an error.

## Method Signature

```typescript
client.ml.deleteTrainedModelAlias(this: That, params: T.MlDeleteTrainedModelAliasRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlDeleteTrainedModelAliasResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlDeleteTrainedModelAliasRequest`](../types/MlDeleteTrainedModelAliasRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlDeleteTrainedModelAliasResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
