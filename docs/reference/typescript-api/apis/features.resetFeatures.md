# Client.features.resetFeatures

Reset the features. Clear all of the state information stored in system indices by Elasticsearch features, including the security and machine learning indices. WARNING: Intended for development and testing use only. Do not reset features on a production cluster. Return a cluster to the same state as a new installation by resetting the feature state for all Elasticsearch features. This deletes all state information stored in system indices. The response code is HTTP 200 if the state is successfully reset for all features. It is HTTP 500 if the reset operation failed for any feature. Note that select features might provide a way to reset particular system indices. Using this API resets all features, both those that are built-in and implemented as plugins. To list the features that will be affected, use the get features API. IMPORTANT: The features installed on the node you submit this request to are the features that will be reset. Run on the master node if you have any doubts about which plugins are installed on individual nodes.

## Method Signature

```typescript
client.features.resetFeatures(this: That, params?: T.FeaturesResetFeaturesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FeaturesResetFeaturesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`FeaturesResetFeaturesRequest`](../types/FeaturesResetFeaturesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FeaturesResetFeaturesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
