# Client.indices.migrateReindex

Reindex legacy backing indices. Reindex all legacy backing indices for a data stream. This operation occurs in a persistent task. The persistent task ID is returned immediately and the reindexing work is completed in that task.

## Method Signature

```typescript
client.indices.migrateReindex(this: That, params: T.IndicesMigrateReindexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesMigrateReindexResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesMigrateReindexRequest`](../types/IndicesMigrateReindexRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesMigrateReindexResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
