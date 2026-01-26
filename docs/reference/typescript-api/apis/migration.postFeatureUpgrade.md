# Client.migration.postFeatureUpgrade

Start the feature migration. Version upgrades sometimes require changes to how features store configuration information and data in system indices. This API starts the automatic migration process. Some functionality might be temporarily unavailable during the migration process. TIP: The API is designed for indirect use by the Upgrade Assistant. We strongly recommend you use the Upgrade Assistant.

## Method Signature

```typescript
client.migration.postFeatureUpgrade(this: That, params?: T.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationPostFeatureUpgradeResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MigrationPostFeatureUpgradeRequest`](../types/MigrationPostFeatureUpgradeRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MigrationPostFeatureUpgradeResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
