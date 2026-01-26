# Client.snapshot.deleteRepository

Delete snapshot repositories. When a repository is unregistered, Elasticsearch removes only the reference to the location where the repository is storing the snapshots. The snapshots themselves are left untouched and in place.

## Method Signature

```typescript
client.snapshot.deleteRepository(this: That, params: T.SnapshotDeleteRepositoryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotDeleteRepositoryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotDeleteRepositoryRequest`](../types/SnapshotDeleteRepositoryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotDeleteRepositoryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
