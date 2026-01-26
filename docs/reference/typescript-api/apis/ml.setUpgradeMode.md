# Client.ml.setUpgradeMode

Set upgrade_mode for ML indices. Sets a cluster wide upgrade_mode setting that prepares machine learning indices for an upgrade. When upgrading your cluster, in some circumstances you must restart your nodes and reindex your machine learning indices. In those circumstances, there must be no machine learning jobs running. You can close the machine learning jobs, do the upgrade, then open all the jobs again. Alternatively, you can use this API to temporarily halt tasks associated with the jobs and datafeeds and prevent new jobs from opening. You can also use this API during upgrades that do not require you to reindex your machine learning indices, though stopping jobs is not a requirement in that case. You can see the current value for the upgrade_mode setting by using the get machine learning info API.

## Method Signature

```typescript
client.ml.setUpgradeMode(this: That, params?: T.MlSetUpgradeModeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlSetUpgradeModeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlSetUpgradeModeRequest`](../types/MlSetUpgradeModeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlSetUpgradeModeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
