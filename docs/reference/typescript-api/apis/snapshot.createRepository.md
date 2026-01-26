# Client.snapshot.createRepository

Create or update a snapshot repository. IMPORTANT: If you are migrating searchable snapshots, the repository name must be identical in the source and destination clusters. To register a snapshot repository, the cluster's global metadata must be writeable. Ensure there are no cluster blocks (for example, `cluster.blocks.read_only` and `clsuter.blocks.read_only_allow_delete` settings) that prevent write access. Several options for this API can be specified using a query parameter or a request body parameter. If both parameters are specified, only the query parameter is used.

## Method Signature

```typescript
client.snapshot.createRepository(this: That, params: T.SnapshotCreateRepositoryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SnapshotCreateRepositoryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SnapshotCreateRepositoryRequest`](../types/SnapshotCreateRepositoryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SnapshotCreateRepositoryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
