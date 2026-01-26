# Client.ilm.migrateToDataTiers

Migrate to data tiers routing. Switch the indices, ILM policies, and legacy, composable, and component templates from using custom node attributes and attribute-based allocation filters to using data tiers. Optionally, delete one legacy index template. Using node roles enables ILM to automatically move the indices between data tiers. Migrating away from custom node attributes routing can be manually performed. This API provides an automated way of performing three out of the four manual steps listed in the migration guide: 1. Stop setting the custom hot attribute on new indices. 1. Remove custom allocation settings from existing ILM policies. 1. Replace custom allocation settings from existing indices with the corresponding tier preference. ILM must be stopped before performing the migration. Use the stop ILM and get ILM status APIs to wait until the reported operation mode is `STOPPED`.

## Method Signature

```typescript
client.ilm.migrateToDataTiers(this: That, params?: T.IlmMigrateToDataTiersRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmMigrateToDataTiersResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`IlmMigrateToDataTiersRequest`](../types/IlmMigrateToDataTiersRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IlmMigrateToDataTiersResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
