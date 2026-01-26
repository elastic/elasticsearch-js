# Client.features.getFeatures

Get the features. Get a list of features that can be included in snapshots using the `feature_states` field when creating a snapshot. You can use this API to determine which feature states to include when taking a snapshot. By default, all feature states are included in a snapshot if that snapshot includes the global state, or none if it does not. A feature state includes one or more system indices necessary for a given feature to function. In order to ensure data integrity, all system indices that comprise a feature state are snapshotted and restored together. The features listed by this API are a combination of built-in features and features defined by plugins. In order for a feature state to be listed in this API and recognized as a valid feature state by the create snapshot API, the plugin that defines that feature must be installed on the master node.

## Method Signature

```typescript
client.features.getFeatures(this: That, params?: T.FeaturesGetFeaturesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FeaturesGetFeaturesResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`FeaturesGetFeaturesRequest`](../types/FeaturesGetFeaturesRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.FeaturesGetFeaturesResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
