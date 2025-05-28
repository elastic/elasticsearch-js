# `Features` [class-Features]

## Constructor

```typescript
new Features(transport: [Transport](./Transport.md));
```

## Properties [class-properties-Features]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-Features]

| Name | Signature | Description |
| - | - | - |
| `getFeatures` | `getFeatures(this: [That](./That.md), params?: [FeaturesGetFeaturesRequest](./FeaturesGetFeaturesRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[FeaturesGetFeaturesResponse](./FeaturesGetFeaturesResponse.md)>;` | Get the features. Get a list of features that can be included in snapshots using the `feature_states` field when creating a snapshot. You can use this API to determine which feature states to include when taking a snapshot. By default, all feature states are included in a snapshot if that snapshot includes the global state, or none if it does not. A feature state includes one or more system indices necessary for a given feature to function. In order to ensure data integrity, all system indices that comprise a feature state are snapshotted and restored together. The features listed by this API are a combination of built-in features and features defined by plugins. In order for a feature state to be listed in this API and recognized as a valid feature state by the create snapshot API, the plugin that defines that feature must be installed on the master node. |
| `getFeatures` | `getFeatures(this: [That](./That.md), params?: [FeaturesGetFeaturesRequest](./FeaturesGetFeaturesRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[FeaturesGetFeaturesResponse](./FeaturesGetFeaturesResponse.md), unknown>>;` | &nbsp; |
| `getFeatures` | `getFeatures(this: [That](./That.md), params?: [FeaturesGetFeaturesRequest](./FeaturesGetFeaturesRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[FeaturesGetFeaturesResponse](./FeaturesGetFeaturesResponse.md)>;` | &nbsp; |
| `resetFeatures` | `resetFeatures(this: [That](./That.md), params?: [FeaturesResetFeaturesRequest](./FeaturesResetFeaturesRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[FeaturesResetFeaturesResponse](./FeaturesResetFeaturesResponse.md)>;` | Reset the features. Clear all of the state information stored in system indices by Elasticsearch features, including the security and machine learning indices. WARNING: Intended for development and testing use only. Do not reset features on a production cluster. Return a cluster to the same state as a new installation by resetting the feature state for all Elasticsearch features. This deletes all state information stored in system indices. The response code is HTTP 200 if the state is successfully reset for all features. It is HTTP 500 if the reset operation failed for any feature. Note that select features might provide a way to reset particular system indices. Using this API resets all features, both those that are built-in and implemented as plugins. To list the features that will be affected, use the get features API. IMPORTANT: The features installed on the node you submit this request to are the features that will be reset. Run on the master node if you have any doubts about which plugins are installed on individual nodes. |
| `resetFeatures` | `resetFeatures(this: [That](./That.md), params?: [FeaturesResetFeaturesRequest](./FeaturesResetFeaturesRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[FeaturesResetFeaturesResponse](./FeaturesResetFeaturesResponse.md), unknown>>;` | &nbsp; |
| `resetFeatures` | `resetFeatures(this: [That](./That.md), params?: [FeaturesResetFeaturesRequest](./FeaturesResetFeaturesRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[FeaturesResetFeaturesResponse](./FeaturesResetFeaturesResponse.md)>;` | &nbsp; |
