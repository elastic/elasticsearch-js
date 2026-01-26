# Client.ml.clearTrainedModelDeploymentCache

Clear trained model deployment cache. Cache will be cleared on all nodes where the trained model is assigned. A trained model deployment may have an inference cache enabled. As requests are handled by each allocated node, their responses may be cached on that individual node. Calling this API clears the caches without restarting the deployment.

## Method Signature

```typescript
client.ml.clearTrainedModelDeploymentCache(this: That, params: T.MlClearTrainedModelDeploymentCacheRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlClearTrainedModelDeploymentCacheResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlClearTrainedModelDeploymentCacheRequest`](../types/MlClearTrainedModelDeploymentCacheRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlClearTrainedModelDeploymentCacheResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
