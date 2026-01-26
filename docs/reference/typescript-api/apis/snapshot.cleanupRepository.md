# Client.snapshot.cleanupRepository

Clean up the snapshot repository. Trigger the review of the contents of a snapshot repository and delete any stale data not referenced by existing snapshots.

## Method Signature

```typescript
client.snapshot.cleanupRepository(this: That, params: T.SnapshotCleanupRepositoryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotCleanupRepositoryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotCleanupRepositoryRequest`](../types/SnapshotCleanupRepositoryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotCleanupRepositoryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
