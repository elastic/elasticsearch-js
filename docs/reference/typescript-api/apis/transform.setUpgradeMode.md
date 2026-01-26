# Client.transform.setUpgradeMode

Set upgrade_mode for transform indices. Sets a cluster wide upgrade_mode setting that prepares transform indices for an upgrade. When upgrading your cluster, in some circumstances you must restart your nodes and reindex your transform indices. In those circumstances, there must be no transforms running. You can close the transforms, do the upgrade, then open all the transforms again. Alternatively, you can use this API to temporarily halt tasks associated with the transforms and prevent new transforms from opening. You can also use this API during upgrades that do not require you to reindex your transform indices, though stopping transforms is not a requirement in that case. You can see the current value for the upgrade_mode setting by using the get transform info API.

## Method Signature

```typescript
client.transform.setUpgradeMode(this: That, params?: T.TransformSetUpgradeModeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformSetUpgradeModeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`TransformSetUpgradeModeRequest`](../types/TransformSetUpgradeModeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TransformSetUpgradeModeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
