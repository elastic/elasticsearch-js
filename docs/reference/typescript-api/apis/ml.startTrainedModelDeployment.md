# Client.ml.startTrainedModelDeployment

Start a trained model deployment. It allocates the model to every machine learning node.

## Method Signature

```typescript
client.ml.startTrainedModelDeployment(this: That, params: T.MlStartTrainedModelDeploymentRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlStartTrainedModelDeploymentResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlStartTrainedModelDeploymentRequest`](../types/MlStartTrainedModelDeploymentRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlStartTrainedModelDeploymentResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
