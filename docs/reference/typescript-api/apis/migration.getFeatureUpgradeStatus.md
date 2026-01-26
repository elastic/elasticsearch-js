# Client.migration.getFeatureUpgradeStatus

Get feature migration information. Version upgrades sometimes require changes to how features store configuration information and data in system indices. Check which features need to be migrated and the status of any migrations that are in progress. TIP: This API is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant.

## Method Signature

```typescript
client.migration.getFeatureUpgradeStatus(this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationGetFeatureUpgradeStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MigrationGetFeatureUpgradeStatusRequest`](../types/MigrationGetFeatureUpgradeStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MigrationGetFeatureUpgradeStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
