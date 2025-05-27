## `Migration`

### Constructor

:::
new Migration(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `deprecations` | `deprecations(this: [That](./That.md), params?: [MigrationDeprecationsRequest](./MigrationDeprecationsRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[MigrationDeprecationsResponse](./MigrationDeprecationsResponse.md)>;` | Get deprecation information. Get information about different cluster, node, and index level settings that use deprecated features that will be removed or changed in the next major version. TIP: This APIs is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant. |
| `deprecations` | `deprecations(this: [That](./That.md), params?: [MigrationDeprecationsRequest](./MigrationDeprecationsRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[MigrationDeprecationsResponse](./MigrationDeprecationsResponse.md), unknown>>;` | &nbsp; |
| `deprecations` | `deprecations(this: [That](./That.md), params?: [MigrationDeprecationsRequest](./MigrationDeprecationsRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[MigrationDeprecationsResponse](./MigrationDeprecationsResponse.md)>;` | &nbsp; |
| `getFeatureUpgradeStatus` | `getFeatureUpgradeStatus(this: [That](./That.md), params?: [MigrationGetFeatureUpgradeStatusRequest](./MigrationGetFeatureUpgradeStatusRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[MigrationGetFeatureUpgradeStatusResponse](./MigrationGetFeatureUpgradeStatusResponse.md)>;` | Get feature migration information. Version upgrades sometimes require changes to how features store configuration information and data in system indices. Check which features need to be migrated and the status of any migrations that are in progress. TIP: This API is designed for indirect use by the Upgrade Assistant. You are strongly recommended to use the Upgrade Assistant. |
| `getFeatureUpgradeStatus` | `getFeatureUpgradeStatus(this: [That](./That.md), params?: [MigrationGetFeatureUpgradeStatusRequest](./MigrationGetFeatureUpgradeStatusRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[MigrationGetFeatureUpgradeStatusResponse](./MigrationGetFeatureUpgradeStatusResponse.md), unknown>>;` | &nbsp; |
| `getFeatureUpgradeStatus` | `getFeatureUpgradeStatus(this: [That](./That.md), params?: [MigrationGetFeatureUpgradeStatusRequest](./MigrationGetFeatureUpgradeStatusRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[MigrationGetFeatureUpgradeStatusResponse](./MigrationGetFeatureUpgradeStatusResponse.md)>;` | &nbsp; |
| `postFeatureUpgrade` | `postFeatureUpgrade(this: [That](./That.md), params?: [MigrationPostFeatureUpgradeRequest](./MigrationPostFeatureUpgradeRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[MigrationPostFeatureUpgradeResponse](./MigrationPostFeatureUpgradeResponse.md)>;` | Start the feature migration. Version upgrades sometimes require changes to how features store configuration information and data in system indices. This API starts the automatic migration process. Some functionality might be temporarily unavailable during the migration process. TIP: The API is designed for indirect use by the Upgrade Assistant. We strongly recommend you use the Upgrade Assistant. |
| `postFeatureUpgrade` | `postFeatureUpgrade(this: [That](./That.md), params?: [MigrationPostFeatureUpgradeRequest](./MigrationPostFeatureUpgradeRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[MigrationPostFeatureUpgradeResponse](./MigrationPostFeatureUpgradeResponse.md), unknown>>;` | &nbsp; |
| `postFeatureUpgrade` | `postFeatureUpgrade(this: [That](./That.md), params?: [MigrationPostFeatureUpgradeRequest](./MigrationPostFeatureUpgradeRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[MigrationPostFeatureUpgradeResponse](./MigrationPostFeatureUpgradeResponse.md)>;` | &nbsp; |
