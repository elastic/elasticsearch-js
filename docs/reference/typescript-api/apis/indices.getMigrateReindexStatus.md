# Client.indices.getMigrateReindexStatus

Get the migration reindexing status. Get the status of a migration reindex attempt for a data stream or index.

## Method Signature

```typescript
client.indices.getMigrateReindexStatus(this: That, params: T.IndicesGetMigrateReindexStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndicesGetMigrateReindexStatusResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`IndicesGetMigrateReindexStatusRequest`](../types/IndicesGetMigrateReindexStatusRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.IndicesGetMigrateReindexStatusResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
